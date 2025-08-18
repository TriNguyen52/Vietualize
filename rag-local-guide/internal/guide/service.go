package guide

import (
	"fmt"
	"rag-local-guide/internal/db"
	"rag-local-guide/internal/embedding"

	"github.com/google/uuid"
)

// Guide represents a local guide entry.
type Guide struct {
	ID       string
	Title    string
	Content  string
	Location string
}

// Service provides methods to manage local guides.
type Service struct {
	Qdrant *db.QdrantClient
}

const collectionName = "guides"

// NewService creates a new instance of Service.
func NewService(qdrantClient *db.QdrantClient) *Service {
	return &Service{
		Qdrant: qdrantClient,
	}
}

// CreateGuide adds a new guide to the service.
func (s *Service) IngestGuide(title, content, location string) error {
	id := uuid.NewString()
	vector, err := embedding.GetEmbedding(content)
	if err != nil {
		return err
	}
	payload := map[string]interface{}{
		"id":       id,
		"title":    title,
		"content":  content,
		"location": location,
	}
	return s.Qdrant.UpsertGuide(collectionName, id, vector, payload)
}

// SearchGuides searches for guides based on a query and location.
func (s *Service) SearchGuides(query string, location string) ([]Guide, error) {
	vector, err := embedding.GetEmbedding(query)
	if err != nil {
		return nil, err
	}
	results, err := s.Qdrant.Search(collectionName, vector, 10)
	if err != nil {
		return nil, err
	}
	var guides []Guide
	for _, r := range results {
		if location == "" || r["location"] == location {
			guides = append(guides, Guide{
				ID:       fmt.Sprintf("%v", r["id"]),
				Title:    fmt.Sprintf("%v", r["title"]),
				Content:  fmt.Sprintf("%v", r["content"]),
				Location: fmt.Sprintf("%v", r["location"]),
			})
		}
	}
	return guides, nil
}
