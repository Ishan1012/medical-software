import joblib
import pickle
import numpy as np
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk
from quart_api.model import (
    SPECIALIST_PATH,
    KNN_MODEL_PATH,
    DT_MODEL_PATH,
    LABEL_ENCODER_PATH,
    SEVERITY_MAP_PATH,
    DESCRIPTION_MAP_PATH,
    PRECAUTION_MAP_PATH
)

# Download NLTK data
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt')
    nltk.download('stopwords')

# Load all resources using joblib
def load_resources():
    resources = {}
    
    try:
        with open(SPECIALIST_PATH, "rb") as f:
            specialist = pickle.load(f)
        resources["specialist"] = specialist
        print("✓ Specialist loaded successfully")
    except (FileNotFoundError, Exception) as e:
        print(f"✗ Could not load Specialist: {type(e).__name__}: {str(e)[:100]}")
        resources["specialist"] = None
    
    try:
        knn = joblib.load(KNN_MODEL_PATH)
        resources["knn"] = knn
        print("✓ KNN model loaded successfully")
    except (FileNotFoundError, Exception) as e:
        print(f"✗ Could not load KNN model: {type(e).__name__}: {str(e)[:100]}")
        resources["knn"] = None
    
    try:
        dt = joblib.load(DT_MODEL_PATH)
        resources["dt"] = dt
        print("✓ Decision Tree model loaded successfully")
    except (FileNotFoundError, Exception) as e:
        print(f"✗ Could not load Decision Tree model: {type(e).__name__}: {str(e)[:100]}")
        resources["dt"] = None
    
    try:
        le = joblib.load(LABEL_ENCODER_PATH)
        resources["le"] = le
        print("✓ Label Encoder loaded successfully")
    except (FileNotFoundError, Exception) as e:
        print(f"✗ Could not load Label Encoder: {type(e).__name__}: {str(e)[:100]}")
        resources["le"] = None
    
    try:
        severity_map = joblib.load(SEVERITY_MAP_PATH)
        resources["severity_map"] = severity_map
        print("✓ Severity Map loaded successfully")
    except (FileNotFoundError, Exception) as e:
        print(f"✗ Could not load Severity Map: {type(e).__name__}: {str(e)[:100]}")
        resources["severity_map"] = {}
    
    try:
        description_map = joblib.load(DESCRIPTION_MAP_PATH)
        resources["description_map"] = description_map
        print("✓ Description Map loaded successfully")
    except (FileNotFoundError, Exception) as e:
        print(f"✗ Could not load Description Map: {type(e).__name__}: {str(e)[:100]}")
        resources["description_map"] = {}
    
    try:
        precaution_map = joblib.load(PRECAUTION_MAP_PATH)
        resources["precaution_map"] = precaution_map
        print("✓ Precaution Map loaded successfully")
    except (FileNotFoundError, Exception) as e:
        print(f"✗ Could not load Precaution Map: {type(e).__name__}: {str(e)[:100]}")
        resources["precaution_map"] = {}
    
    return resources

# Load resources at module level
_resources = load_resources()
specialist = _resources["specialist"]
knn = _resources["knn"]
dt = _resources["dt"]
le = _resources["le"]
severity_map = _resources["severity_map"]
description_map = _resources["description_map"]
precaution_map = _resources["precaution_map"]


def extract_symptoms_from_text(text):
    if not isinstance(text, str) or not text.strip():
        return []
    
    text = text.lower()
    
    # Remove filler words
    filler_patterns = [
        r'\bi\s+have\b',
        r'\bi\s+got\b',
        r'\bi\s+feel\b',
        r'\bfeeling\b',
        r'\bsuffering\b',
        r'\bsuffering\s+from\b',
        r'\band\b',
        r'\bwith\b',
        r'\bor\b'
    ]
    for pattern in filler_patterns:
        text = re.sub(pattern, ' ', text)
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove stopwords and short words
    stop_words = set(stopwords.words('english'))
    tokens = [
        word for word in tokens
        if word.isalpha() and word not in stop_words and len(word) > 2
    ]
    
    return tokens


def predict_disease(symptom_input):
    try:
        if knn is None or dt is None or le is None:
            return {
                "success": False,
                "error": "Models not loaded. Please check pickle files."
            }, 500
        
        # Handle both string and list inputs
        if isinstance(symptom_input, str):
            symptom_list = extract_symptoms_from_text(symptom_input)
        elif isinstance(symptom_input, list):
            symptom_list = symptom_input
        else:
            return {
                "success": False,
                "error": "Symptoms must be a string or list"
            }, 400
        
        if not symptom_list:
            return {
                "success": False,
                "error": "No recognizable symptoms found"
            }, 400
        
        # Create input vector (17 features for all symptoms)
        input_vector = [0] * 17
        for i, symptom in enumerate(symptom_list):
            if i < 17:
                # Get severity from map, default to 0
                severity = severity_map.get(symptom.strip(), 0)
                input_vector[i] = severity
        
        input_vector = np.array(input_vector).reshape(1, -1)
        
        # Get predictions and probabilities from KNN
        knn_pred_encoded = knn.predict(input_vector)[0]
        knn_pred_proba = knn.predict_proba(input_vector)[0]
        
        # Get top 3 for KNN
        knn_top3_indices = np.argsort(knn_pred_proba)[::-1][:3]
        knn_top3 = [
            {
                "rank": i + 1,
                "disease": le.inverse_transform([idx])[0],
                "probability": float(knn_pred_proba[idx])
            }
            for i, idx in enumerate(knn_top3_indices)
        ]
        
        # Get predictions and probabilities from Decision Tree
        dt_pred_encoded = dt.predict(input_vector)[0]
        dt_pred_proba = dt.predict_proba(input_vector)[0]
        
        # Get top 3 for Decision Tree
        dt_top3_indices = np.argsort(dt_pred_proba)[::-1][:3]
        dt_top3 = [
            {
                "rank": i + 1,
                "disease": le.inverse_transform([idx])[0],
                "probability": float(dt_pred_proba[idx])
            }
            for i, idx in enumerate(dt_top3_indices)
        ]
        
        # Use Decision Tree's top prediction as final
        final_disease = dt_top3[0]["disease"]
        final_confidence = dt_top3[0]["probability"]
        
        # Get description and precautions
        description = description_map.get(final_disease, "No description available")
        precautions = precaution_map.get(final_disease, ["Not available"])
        
        return {
            "success": True,
            "prediction": specialist[final_disease],
            "top_3_predictions": dt_top3,
            "confidence": final_confidence,
            "description": description,
            "precautions": precautions,
            "symptoms_extracted": symptom_list
        }, 200
    
    except Exception as e:
        return {
            "success": False,
            "error": f"Prediction error: {str(e)}"
        }, 500