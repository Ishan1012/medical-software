import os

BASE_DIR = os.path.dirname(__file__)

# New models
SPECIALIST_PATH = os.path.join(BASE_DIR, "get_specialist.pkl")
KNN_MODEL_PATH = os.path.join(BASE_DIR, "knn_model.pkl")
DT_MODEL_PATH = os.path.join(BASE_DIR, "decision_tree_model.pkl")
LABEL_ENCODER_PATH = os.path.join(BASE_DIR, "label_encoder.pkl")
SEVERITY_MAP_PATH = os.path.join(BASE_DIR, "severity_map.pkl")
DESCRIPTION_MAP_PATH = os.path.join(BASE_DIR, "description_map.pkl")
PRECAUTION_MAP_PATH = os.path.join(BASE_DIR, "precaution_map.pkl")

__all__ = [
    "SPECIALIST_PATH",
    "KNN_MODEL_PATH",
    "DT_MODEL_PATH",
    "LABEL_ENCODER_PATH",
    "SEVERITY_MAP_PATH",
    "DESCRIPTION_MAP_PATH",
    "PRECAUTION_MAP_PATH"
]