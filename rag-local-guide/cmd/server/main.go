package main

import (
	"log"
	"net/http"
	"os"

	"rag-local-guide/api/graphql"
	"rag-local-guide/internal/db"
	"rag-local-guide/internal/guide"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/joho/godotenv"
)

const defaultPort = "8080"

func main() {
	_ = godotenv.Load()
	qdrantAddr := os.Getenv("QDRANT_ADDR")
	qdrantClient, err := db.NewQdrantClient(qdrantAddr)
	if err != nil {
		log.Fatal(err)
	}
	guideService := &guide.Service{Qdrant: qdrantClient}
	resolver := &graphql.Resolver{GuideService: guideService}

	srv := handler.NewDefaultServer(graphql.NewExecutableSchema(graphql.Config{Resolvers: resolver}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", defaultPort)
	if err := http.ListenAndServe(":"+defaultPort, nil); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
