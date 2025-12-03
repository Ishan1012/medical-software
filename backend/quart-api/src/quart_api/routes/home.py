from quart import Blueprint

home_bp = Blueprint("home", __name__)

@home_bp.get('/')
async def home() -> dict[str, str]:
    return { 'message' : 'Quart API is running.' }