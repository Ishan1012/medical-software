from quart import Blueprint, request
from quart_api.service.predict_service import predict_disease, extract_symptoms_from_text

predict_bp = Blueprint('predict', __name__, url_prefix='/predict')

@predict_bp.post('/')
async def predict():
    data = await request.get_json()
    symptoms_input = data.get('symptoms', '')
    
    if isinstance(symptoms_input, list):
        symptoms = symptoms_input
    elif isinstance(symptoms_input, str):
        symptoms = extract_symptoms_from_text(symptoms_input)
    else:
        return {
            "success": False,
            "error": "No symptoms provided or extracted. Send 'i have a headache and fever' or ['headache', 'fever']"
        }, 400        
    
    return predict_disease(symptoms)