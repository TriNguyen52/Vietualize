package db

import (
	"context"
	"unsafe"

	go_client "github.com/qdrant/go-client/qdrant"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/types/known/structpb"
)

type QdrantClient struct {
	Conn         *grpc.ClientConn
	PointsClient go_client.PointsClient
}

func NewQdrantClient(addr string) (*QdrantClient, error) {
	conn, err := grpc.Dial(addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, err
	}
	pointsClient := go_client.NewPointsClient(conn)
	return &QdrantClient{Conn: conn, PointsClient: pointsClient}, nil
}

func (q *QdrantClient) UpsertGuide(collection string, id string, vector []float32, payload map[string]interface{}) error {
	points := []*go_client.PointStruct{
		{
			Id:      &go_client.PointId{PointIdOptions: &go_client.PointId_Uuid{Uuid: id}},
			Vectors: &go_client.Vectors{VectorsOptions: &go_client.Vectors_Vector{Vector: &go_client.Vector{Data: vector}}},
			Payload: toQdrantPayload(payload),
		},
	}
	_, err := q.PointsClient.Upsert(context.Background(), &go_client.UpsertPoints{
		CollectionName: collection,
		Points:         points,
	})
	return err
}

func (q *QdrantClient) Search(collection string, vector []float32, limit int) ([]map[string]interface{}, error) {
	res, err := q.PointsClient.Search(context.Background(), &go_client.SearchPoints{
		CollectionName: collection,
		Vector:         vector,
		Limit:          uint64(limit),
	})
	if err != nil {
		return nil, err
	}
	var results []map[string]interface{}
	for _, pt := range res.Result {
		if pt.Payload != nil {
			results = append(results, fromQdrantPayload(pt.Payload))
		}
	}
	return results, nil
}

// Convert map[string]interface{} to map[string]*go_client.Value
func toQdrantPayload(m map[string]interface{}) map[string]*go_client.Value {
	payload := make(map[string]*go_client.Value)
	for k, v := range m {
		val, _ := structpb.NewValue(v)
		payload[k] = (*go_client.Value)(unsafe.Pointer(val))
	}
	return payload
}

// Convert map[string]*go_client.Value to map[string]interface{}
func fromQdrantPayload(m map[string]*go_client.Value) map[string]interface{} {
	out := make(map[string]interface{})
	for k, v := range m {
		out[k] = ((*structpb.Value)(unsafe.Pointer(v))).AsInterface()
	}
	return out
}
