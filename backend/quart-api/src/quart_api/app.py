from quart import Quart
from quart_api.routes.home import home_bp
from quart_api.routes.predict import predict_bp

def create_app():
    app = Quart(__name__)

    app.register_blueprint(home_bp)
    app.register_blueprint(predict_bp)

    return app