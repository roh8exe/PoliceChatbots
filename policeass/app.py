import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments, pipeline
from datasets import Dataset
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.metrics import classification_report
import json

MODEL_PATH = "./saved_model/"
DATASET = "case_classification.csv"
PROCEDURES_DATASET = "case_procedures.csv"  # Dataset containing procedures for case types

# Disable tokenizers parallelism to avoid deadlocks
os.environ["TOKENIZERS_PARALLELISM"] = "false"

# Load procedures dataset when the application starts
def load_procedures(file_path=PROCEDURES_DATASET):
    """Load procedures dataset from CSV file."""
    df = pd.read_csv(file_path)
    return df.set_index('case_type').to_dict()['procedure']  # Create a dictionary mapping case_type to procedure

procedures = load_procedures()

def get_procedure(case_type):
    """Retrieve procedure based on case type."""
    return procedures.get(case_type, "Procedure not found for this case type.")

def load_data(file_path=DATASET):
    """Load dataset from CSV file."""
    df = pd.read_csv(file_path)
    df = df.dropna()
    df['label'] = df['label'].apply(lambda x: x.strip())
    return df

def preprocess_data(df):
    """Preprocess the dataset: lowercase, remove special characters, and split data."""
    df['case_description'] = df['case_description'].str.lower().str.replace('[^a-zA-Z0-9 ]', '', regex=True)

    # Split data with stratification based on labels
    train_texts, test_texts, train_labels, test_labels = train_test_split(
        df['case_description'],
        df['label'],
        test_size=0.2,
        random_state=42,
        stratify=df['label']
    )
    
    return train_texts.tolist(), test_texts.tolist(), train_labels.tolist(), test_labels.tolist()

def train_model():
    """Train the BERT model on the preprocessed data."""
    df = load_data()
    train_texts, test_texts, train_labels, test_labels = preprocess_data(df)

    # Label encoding
    label_encoder = LabelEncoder()
    label_encoder.fit(df['label'])
    train_labels = label_encoder.transform(train_labels)
    test_labels = label_encoder.transform(test_labels)

    # Create a mapping dictionary for labels
    global label_mapping
    label_mapping = {f"LABEL_{i}": label for i, label in enumerate(label_encoder.classes_)}
    print("Label Mapping:", label_mapping)  # Debugging output
    
    # Save the label mapping to a JSON file
    with open("label_mapping.json", "w") as file:
        json.dump(label_mapping, file)
    print("Label mapping has been saved to label_mapping.json.")

    # Load the tokenizer
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

    # Tokenize the training and testing data
    train_encodings = tokenizer(train_texts, truncation=True, padding=True, max_length=128)
    test_encodings = tokenizer(test_texts, truncation=True, padding=True, max_length=128)

    # Create Hugging Face Dataset objects
    train_dataset = Dataset.from_dict({
        'input_ids': train_encodings['input_ids'],
        'attention_mask': train_encodings['attention_mask'],
        'labels': train_labels
    })
    test_dataset = Dataset.from_dict({
        'input_ids': test_encodings['input_ids'],
        'attention_mask': test_encodings['attention_mask'],
        'labels': test_labels
    })

    # Initialize the pre-trained model
    model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=len(label_encoder.classes_))

    # Define training arguments
    training_args = TrainingArguments(
        output_dir='./results',
        num_train_epochs=10,  # Adjust based on performance
        per_device_train_batch_size=8,
        per_device_eval_batch_size=16,
        warmup_steps=500,
        weight_decay=0.01,
        evaluation_strategy="epoch",  # Evaluate at the end of each epoch
        learning_rate=5e-5,
        load_best_model_at_end=True,
        save_strategy="epoch",
        save_total_limit=2
    )

    # Create Trainer instance
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=test_dataset,
        compute_metrics=compute_metrics
    )

    # Train the model
    trainer.train()

    # Save the model
    model.save_pretrained(MODEL_PATH)
    tokenizer.save_pretrained(MODEL_PATH)
    print("Model has been trained and saved.")

def compute_metrics(pred):
    """Compute evaluation metrics."""
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    report = classification_report(labels, preds, output_dict=True)
    
    return {
        'accuracy': report['accuracy'],
        'f1_score': report['weighted avg']['f1-score'],
        'precision': report['weighted avg']['precision'],
        'recall': report['weighted avg']['recall']
    }

def classify_case(text):
    """Classify a case description."""
    global label_mapping
    try:
        tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
        model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
        
        classifier = pipeline("text-classification", model=model, tokenizer=tokenizer)

        # Classify the input text
        result = classifier(text)

        # Log the raw output for debugging
        print("Raw model output:", result)

        # Retrieve the predicted label
        predicted_label = result[0]['label']
        print(f"Predicted label: {predicted_label}") 
        
        # Map to case type
        case_type = label_mapping.get(predicted_label, "Unknown Case Type")
        return case_type
    except Exception as e:
        return f"Error in classification: {str(e)}"

app = Flask(__name__)
CORS(app)

@app.route('/classify', methods=['POST'])
def classify():
    """API endpoint to classify a case description and return the procedure."""
    try:
        data = request.json
        text = data.get("case_description", "")
        if not text:
            return jsonify({"error": "No case description provided."}), 400

        # Classify the case description
        label = classify_case(text)
        
        # Get the procedure for the predicted case type
        procedure = get_procedure(label)
        
        return jsonify({"case_description": text, "case_type": label, "procedure": procedure})
    except Exception as e:
        return jsonify({"error": str(e)}), 500   

@app.route('/retrain', methods=['POST'])
def retrain():
    """API endpoint to retrain the model on new data."""
    try:
        new_data = request.json.get('data', None)
        if not new_data:
            return jsonify({"error": "No data provided for retraining."}), 400
        
        df = pd.DataFrame(new_data)
        df.to_csv(DATASET, mode='a', header=False, index=False)

        train_model()
        return jsonify({"message": "Model retrained successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/test', methods=['GET'])
def test():
    """API endpoint for server status check."""
    return jsonify({"message": "Server is up and running!"})

if __name__ == "__main__":
    if not os.path.exists(MODEL_PATH) or not os.listdir(MODEL_PATH):
        train_model()
    else:
        print("Model already exists, skipping training.")
        # Check if label_mapping.json exists
        if not os.path.exists("label_mapping.json"):
            print("label_mapping.json not found. Training the model to create it.")
            train_model()  # Call train_model() to create the mapping
        else:
            with open("label_mapping.json", "r") as file:
                label_mapping = json.load(file)
            print("Loaded label mapping:", label_mapping)
    # Run the Flask app
    app.run(debug = True,port=5000)
