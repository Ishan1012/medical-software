from quart import Quart
from quart_api.routes.home import home_bp
from quart_api.routes.predict import predict_bp
from quart_cors import cors

def create_app():
    app = Quart(__name__)

    # app = cors(app, allow_origin=["http://localhost:5000","https://medical-software.onrender.com"])

    app.register_blueprint(home_bp)
    app.register_blueprint(predict_bp)

    return app