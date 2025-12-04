import pickle
import numpy as np
import re
import difflib
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from quart_api.model import MODEL_PATH, ENCODER_PATH, SPECIALIST_PATH
from quart_api.utils import encode_symptoms

try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt')
    nltk.download('stopwords')
    nltk.download('punkt_tab')

def load_resources():
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    with open(ENCODER_PATH, "rb") as f:
        encoder = pickle.load(f)
    with open(SPECIALIST_PATH, "rb") as f:
        specialist = pickle.load(f)
    return model, encoder, specialist

model, encoder, specialist = load_resources()

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

    return extracted

def predict_disease(user_text):
    try:
        symptom_cols = encoder['symptom_columns']
        extracted = extract_symptoms_from_text(user_text)
        
        if not extracted:
            return {
                "success": False,
                "error": "No recognizable symptoms found. Please describe symptoms clearly."
            }, 400

        X_input = encode_symptoms(extracted, symptom_cols)
        
        prediction_idx = model.predict(X_input)[0]
        prediction_class = str(model.classes_[np.argmax(model.predict_proba(X_input))])
        
        proba = model.predict_proba(X_input)[0]
        top3_idx = np.argsort(proba)[::-1][:3]
        
        top3_predictions = [
            {
                "disease": str(model.classes_[i]),
                "probability": float(proba[i])
            }
            for i in top3_idx
        ]

        return {
            "success": True,
            "prediction": specialist.get(prediction_class, "General Physician"),
            "top_3_predictions": top3_predictions,
            "confidence": float(proba[top3_idx[0]]),
            "symptoms_matched": [s for s in extracted if s in encoder['symptom_columns']],
            "symptoms_not_found": [s for s in extracted if s not in encoder['symptom_columns']]
        }

    except Exception as e:
        return {"success": False, "error": str(e)}, 500