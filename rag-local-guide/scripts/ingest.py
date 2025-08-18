import os
import requests
import json
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer

app = Flask(__name__)
model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route('/embed', methods=['POST'])
def embed():
    data = request.json
    text = data['text']
    vector = model.encode([text])[0].tolist()
    return jsonify({'vector': vector})

def ingest_data(file_path):
    with open(file_path, 'r') as file:
        data = file.readlines()

    for line in data:
        location_data = process_line(line.strip())
        if location_data:
            send_to_embedding_service(location_data)

def process_line(line):
    # Process the line to extract relevant location-based content
    # This is a placeholder for actual processing logic
    return {
        "title": line,
        "description": f"Description for {line}",
        "category": "local guide"
    }

def send_to_embedding_service(location_data):
    embedding_service_url = os.getenv('EMBEDDING_SERVICE_URL')
    response = requests.post(embedding_service_url, json=location_data)
    
    if response.status_code == 200:
        print(f"Successfully sent data for {location_data['title']}")
    else:
        print(f"Failed to send data for {location_data['title']}: {response.text}")

if __name__ == "__main__":
    input_file = os.getenv('INPUT_FILE_PATH', 'data/locations.txt')
    ingest_data(input_file)
    app.run(port=5000)