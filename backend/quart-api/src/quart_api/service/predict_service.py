import pickle
import numpy as np
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import re

try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
    nltk.download('punkt_tab')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

from quart_api.model import MODEL_PATH, ENCODER_PATH, SPECIALIST_PATH
from quart_api.utils.symptom_encoder import encode_symptoms

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(ENCODER_PATH, "rb") as f:
    encoder = pickle.load(f)

with open(SPECIALIST_PATH, "rb") as f:
    specialist = pickle.load(f)

def extract_symptoms_from_text(text):
    if not isinstance(text, str):
        return []
    
    text = text.lower()

    symptom_columns = encoder['symptom_columns']

    def clean_symptom_name(s):
        return s.lower().strip().replace(" ", "").replace("_", "")

    symptom_index = {clean_symptom_name(col): col for col in symptom_columns}

    filler_patterns = [
        r'\bi\s+have\b',
        r'\bi\s+got\b',
        r'\bi\s+feel\b',
        r'\bfeeling\b',
        r'\bsuffering\b',
        r'\bsuffering\s+from\b',
        r'\band\b',
        r'\bwith\b'
    ]
    for p in filler_patterns:
        text = re.sub(p, ' ', text)

    tokens = word_tokenize(text)

    stop_words = set(stopwords.words('english'))
    tokens = [
        word for word in tokens
        if word.isalpha() and word not in stop_words and len(word) > 2
    ]

    extracted = []

    for token in tokens:
        cleaned_token = clean_symptom_name(token)

        # Direct match
        if cleaned_token in symptom_index:
            col = symptom_index[cleaned_token]
            if col not in extracted:
                extracted.append(col)
            continue

        # Fuzzy matching
        for col in symptom_columns:
            cleaned_col = clean_symptom_name(col)

            if cleaned_token in cleaned_col or cleaned_col in cleaned_token:
                if col not in extracted:
                    extracted.append(col)
                break

    print("Extracted:", extracted)
    return extracted

def predict_disease(symptoms):
    try:
        if not symptoms or not isinstance(symptoms, list):
            return {
                "success": False,
                "error": "Symptoms must be a non-empty list"
            }, 400
        
        X_input = encode_symptoms(symptoms, encoder['symptom_columns'])
        
        expected_features = model.n_features_in_
        actual_features = X_input.shape[1]
        
        if actual_features != expected_features:
            return {
                "success": False,
                "error": f"Feature mismatch: got {actual_features} features but model expects {expected_features}",
                "symptoms_received": symptoms,
                "encoder_size": len(encoder['symptom_columns']),
                "matched_symptoms": [s for s in symptoms if s in encoder['symptom_columns']]
            }, 400
        
        prediction = model.predict(X_input)[0]
        proba = model.predict_proba(X_input)[0]
        classes = model.classes_
        top3_idx = np.argsort(proba)[::-1][:3]

        top3_predictions = [
            {
                "disease": classes[i],
                "probability": float(proba[i])
            }
            for i in top3_idx
        ]
        
        return {
            "success": True,
            "prediction": specialist[prediction],
            "top_3_predictions": top3_predictions,
            "confidence": float(proba[top3_idx[0]]),
            "symptoms_matched": [s for s in symptoms if s in encoder['symptom_columns']],
            "symptoms_not_found": [s for s in symptoms if s not in encoder['symptom_columns']]
        }
    
    except Exception as e:
        return {"error": str(e)}, 500