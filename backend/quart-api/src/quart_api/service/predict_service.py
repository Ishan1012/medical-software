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
    PRECAUTION_MAP_PATH,
    DISEASE_SYMPTOM_LOOKUP_PATH, 
    SEVERITY_THRESHOLDS_PATH
)

# Download NLTK data
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt')
    nltk.download('punkt_tab')
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

    try:
        resources["disease_lookup"] = joblib.load(DISEASE_SYMPTOM_LOOKUP_PATH)
        print("✓ Disease Lookup loaded successfully")
    except Exception as e:
        print(f"✗ Could not load Disease Lookup: {str(e)}")
        resources["disease_lookup"] = {}

    try:
        resources["thresholds"] = joblib.load(SEVERITY_THRESHOLDS_PATH)
        print("✓ Severity Thresholds loaded successfully")
    except Exception as e:
        print(f"✗ Could not load Thresholds: {str(e)}")
        resources["thresholds"] = {"t1": 0, "t2": 0} # Default fallback
    
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
disease_lookup = _resources.get("disease_lookup", {})
thresholds = _resources.get("thresholds", {"t1": 0, "t2": 0})

def extract_symptoms_from_text(text):
    if not isinstance(text, str) or not text.strip(): return []
    text = text.lower()
    
    # Simple regex cleaning
    text = re.sub(r'[^\w\s]', '', text) 
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    # Keep extracted words
    return [w for w in tokens if w not in stop_words and len(w) > 2]

def normalize_symptoms(extracted_tokens):
    valid_symptoms = []
    
    # 1. Exact Match Check
    for token in extracted_tokens:
        if token in severity_map:
            valid_symptoms.append(token)
    
    if not valid_symptoms:
        known_symptoms = list(severity_map.keys())
        for token in extracted_tokens:
            for known in known_symptoms:
                if token in known.split('_'): 
                    valid_symptoms.append(known)
    
    return list(set(valid_symptoms))

def get_encoded_vector(symptoms):
    weights = []
    for s in symptoms:
        s_clean = s.strip()
        if s_clean in severity_map:
            weights.append(severity_map[s_clean])
    
    weights.sort(reverse=True)
    
    vector = [0] * 17
    for i in range(min(len(weights), 17)):
        vector[i] = weights[i]
    return np.array(vector).reshape(1, -1)

def get_severity_label(symptoms):
    score = sum([severity_map.get(s.strip(), 0) for s in symptoms])
    t1 = thresholds.get("t1", 0)
    t2 = thresholds.get("t2", 0)
    
    if score == 0: return "Unknown", 0
    if score <= t1: return "Mild", score
    if score <= t2: return "Moderate", score
    return "Severe", score
def predict_disease(symptom_input):
    try:
        if knn is None or dt is None or le is None:
            return {
                "success": False,
                "error": "Models not loaded. Please check pickle files."
            }, 500
        
        # 1. Extract & Normalize
        if isinstance(symptom_input, str):
            raw_tokens = extract_symptoms_from_text(symptom_input)
        elif isinstance(symptom_input, list):
            raw_tokens = symptom_input
        else:
            return {"success": False, "error": "Invalid input format"}, 400
        
        valid_symptoms = normalize_symptoms(raw_tokens)
        
        if not valid_symptoms:
            return {
                "success": False, 
                "error": "No recognizable symptoms found. Please use standard medical terms."
            }, 400

        # 2. Create Vector
        input_vector = get_encoded_vector(valid_symptoms)
        
        # 3. Get Probabilities (Ensemble)
        knn_probs = knn.predict_proba(input_vector)[0]
        dt_probs = dt.predict_proba(input_vector)[0]
        
        # Average Probabilities
        final_probs = (dt_probs + knn_probs) / 2
        
        # Get Top Candidates (Scan top 10)
        top_indices = final_probs.argsort()[::-1][:10]
        top_diseases_names = le.inverse_transform(top_indices)
        top_probs_values = final_probs[top_indices]
        
        # 4. VALIDATION & BACKFILL STEP (FIXED)
        validated_predictions = []
        added_diseases = set()
        
        # A. Priority: Diseases where symptoms explicitly match logic
        for i, disease in enumerate(top_diseases_names):
            known_symptoms = disease_lookup.get(disease, set())
            
            # Check for overlap
            if any(s in known_symptoms for s in valid_symptoms):
                validated_predictions.append({
                    "rank": len(validated_predictions) + 1,
                    "disease": disease,
                    "probability": float(top_probs_values[i])
                })
                added_diseases.add(disease)
                
            if len(validated_predictions) >= 3:
                break
        
        # B. Backfill: If we don't have 3 yet, fill with highest probability raw predictions
        if len(validated_predictions) < 3:
            for i, disease in enumerate(top_diseases_names):
                if len(validated_predictions) >= 3:
                    break
                
                # Only add if not already added in step A
                if disease not in added_diseases:
                    validated_predictions.append({
                        "rank": len(validated_predictions) + 1,
                        "disease": disease,
                        "probability": float(top_probs_values[i])
                    })
                    added_diseases.add(disease)

        # Final safety check: if still empty (rare), force top 1
        if not validated_predictions:
             validated_predictions.append({
                "rank": 1,
                "disease": top_diseases_names[0],
                "probability": float(top_probs_values[0])
            })

        final_result = validated_predictions[0]
        final_disease = final_result["disease"]
        
        # 5. Get Details & Severity
        description = description_map.get(final_disease, "No description available")
        precautions = precaution_map.get(final_disease, ["Not available"])
        severity_label, severity_score = get_severity_label(valid_symptoms)
        
        specialist_info = specialist.get(final_disease, "General Physician") if specialist else "General Physician"

        return {
            "success": True,
            "prediction": specialist_info,
            "top_3_predictions": validated_predictions,
            "confidence": final_result["probability"],
            "severity": severity_label,
            "severity_score": severity_score,
            "description": description,
            "precautions": precautions,
            "symptoms_extracted": valid_symptoms
        }, 200
    
    except Exception as e:
        return {
            "success": False,
            "error": f"Prediction error: {str(e)}"
        }, 500