import os

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "Neural_Network_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "symptom_encoder.pkl")
SPECIALIST_PATH = os.path.join(BASE_DIR, "get_specialist.pkl")

__all__ = ["MODEL_PATH","ENCODER_PATH","SPECIALIST_PATH"]