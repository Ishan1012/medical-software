import numpy as np

def encode_symptoms(symptoms, encoder):
    vector = np.zeros(len(encoder))

    for s in symptoms:
        if s in encoder:
            idx = encoder.index(s)
            vector[idx]=1

    return vector.reshape(1, -1)