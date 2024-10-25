import pandas as pd
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

MODEL_PATH = 'paraphrase-MiniLM-L6-v2'
DATASET = "faq.csv"

# Load Sentence Transformer model
model = SentenceTransformer(MODEL_PATH)

def load_data(file_path=DATASET):
    """Load dataset and precompute embeddings."""
    try:
        df = pd.read_csv(file_path)
        print("CSV Columns:", df.columns)  # Debugging: print available columns
        df = df.dropna()

        # Ensure 'Question' and 'Answer' columns exist
        if 'Question' not in df.columns or 'Answer' not in df.columns:
            raise ValueError("CSV file must contain 'Question' and 'Answer' columns.")
        
        df['embedding'] = df['Question'].apply(lambda x: model.encode(x, convert_to_tensor=True))  # Precompute embeddings
        return df
    except Exception as e:
        print(f"Error loading CSV file: {e}")
        raise

def find_most_similar_question(input_question, df):
    """Find the most similar question using cosine similarity."""
    input_embedding = model.encode(input_question, convert_to_tensor=True).cpu().numpy().reshape(1, -1)  # Reshape to 2D
    question_embeddings = torch.stack(df['embedding'].tolist()).cpu().numpy()  # Precomputed embeddings
    
    # Calculate cosine similarity
    similarities = cosine_similarity(input_embedding, question_embeddings)
    most_similar_index = similarities.argmax()
    
    print("Similarity Scores:", similarities)  # Debugging step
    return most_similar_index

def classify_question(question):
    """Classify a question by finding the most similar one in the dataset."""
    df = load_data()  # Load and validate the dataset
    most_similar_index = find_most_similar_question(question, df)
    return df['Answer'].iloc[most_similar_index]

# Flask app setup
app = Flask(__name__)
CORS(app)

@app.route('/classify', methods=['POST'])
def classify():
    """API endpoint to classify a question."""
    try:
        data = request.json
        text = data.get("question", "")
        if not text:
            return jsonify({"error": "No question provided."}), 400

        answer = classify_question(text)
        return jsonify({"question": text, "answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500   

@app.route('/test', methods=['GET'])
def test():
    """API endpoint for server status check."""
    return jsonify({"message": "Server is up and running!"})

if __name__ == "__main__":
    app.run(debug=True , port=5001)

