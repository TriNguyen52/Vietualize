# RAG Local Guide System

## Overview
The RAG Local Guide System is a backend application designed to provide a Retrieval-Augmented Generation (RAG) service for local guides. It ingests location-based content, embeds it into vector format, stores it in a vector database, and exposes a GraphQL API for searching relevant local guides.

## Tech Stack
- **Backend API**: Golang with gqlgen for GraphQL implementation.
- **Vector Embedding**: Python using sentence-transformers for embedding content.
- **Vector Database**: Qdrant, which can be deployed locally or in the cloud.
- **Embedding Communication**: REST API or gRPC for interaction between Go and Python services.
- **RAG (Optional)**: Integration with GPT-4 or Claude via API for enhanced answering capabilities.

## Project Structure
```
rag-local-guide
├── api
│   └── graphql
│       ├── resolver.go
│       ├── schema.graphqls
│       └── generated.go
├── cmd
│   └── server
│       └── main.go
├── internal
│   ├── db
│   │   └── qdrant.go
│   ├── embedding
│   │   └── client.go
│   ├── guide
│   │   ├── model.go
│   │   └── service.go
│   └── rag
│       └── answer.go
├── scripts
│   └── ingest.py
├── go.mod
├── go.sum
├── README.md
└── .env.example
```

## Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd rag-local-guide
   ```

2. **Install Dependencies**:
   - For Go:
     ```
     go mod tidy
     ```
   - For Python (in the `scripts` directory):
     ```
     pip install -r requirements.txt
     ```

3. **Configure Environment Variables**:
   - Copy `.env.example` to `.env` and fill in the necessary values.

4. **Run the Application**:
   ```
   go run cmd/server/main.go
   ```

5. **Access the GraphQL API**:
   - The API will be available at `http://localhost:8080/graphql`.

## Usage
- Use the GraphQL API to query and manipulate local guide data.
- Ingest location-based content using the `ingest.py` script.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.