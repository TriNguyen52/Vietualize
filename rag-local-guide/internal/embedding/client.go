package embedding

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"os"
)

type EmbedRequest struct {
	Text string `json:"text"`
}

type EmbedResponse struct {
	Vector []float32 `json:"vector"`
}

func GetEmbedding(text string) ([]float32, error) {
	endpoint := os.Getenv("EMBEDDING_ENDPOINT")
	if endpoint == "" {
		return nil, errors.New("EMBEDDING_ENDPOINT not set")
	}
	body, _ := json.Marshal(EmbedRequest{Text: text})
	resp, err := http.Post(endpoint, "application/json", bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	var er EmbedResponse
	if err := json.NewDecoder(resp.Body).Decode(&er); err != nil {
		return nil, err
	}
	return er.Vector, nil
}
