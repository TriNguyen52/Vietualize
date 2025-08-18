package graphql

import (
	"context"
	"rag-local-guide/internal/guide"
)

type Resolver struct {
	GuideService *guide.Service
}

func (r *Resolver) SearchGuides(ctx context.Context, query string, location *string) ([]*guide.Guide, error) {
	loc := ""
	if location != nil {
		loc = *location
	}
	results, err := r.GuideService.SearchGuides(query, loc)
	if err != nil {
		return nil, err
	}
	var guides []*guide.Guide
	for _, g := range results {
		gg := g
		guides = append(guides, &gg)
	}
	return guides, nil
}
