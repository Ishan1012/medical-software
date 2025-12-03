from quart_api.app import create_app

app = create_app()

def run() -> None:
    app.run(port=5050)