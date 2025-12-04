from quart import Blueprint, request
from quart_api.service.predict_service import predict_disease, extract_symptoms_from_text

predict_bp = Blueprint('predict', __name__, url_prefix='/predict')

@predict_bp.post('/')
async def predict():
    try:
        try:
            data = await request.get_json()
        except Exception as e:
            return {
                "success": False,
                "error": f"Invalid JSON in request: {str(e)}"
            }, 400
        
        if not data:
            return {
                "success": False,
                "error": "Request body is empty"
            }, 400
        
        symptoms_input = data.get('symptoms', '')
        
        if not symptoms_input:
            return {
                "success": False,
                "error": "No symptoms provided. Send 'i have a headache and fever' or ['headache', 'fever']"
            }, 400
        
        try:
            result = predict_disease(symptoms_input)
            return result
        except Exception as e:
            return {
                "success": False,
                "error": f"Error during prediction: {str(e)}"
            }, 500
    
    except Exception as e:
        return {
            "success": False,
            "error": f"Unexpected server error: {str(e)}"
        }, 500