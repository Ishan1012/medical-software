import numpy as np
from rapidfuzz import fuzz

def encode_symptoms(user_input, all_symptom_columns, fuzzy_threshold=80):
    if isinstance(user_input, list):
        user_sentence = " ".join(user_input)
    else:
        user_sentence = user_input

    vec = np.zeros(len(all_symptom_columns))

    sentence = user_sentence.lower().replace("_", " ")
    sentence_tokens = sentence.split()

    for i, col in enumerate(all_symptom_columns):
        col_clean = col.lower().replace("_", " ")
        col_tokens = col_clean.split()

        if any(w in col_clean for w in sentence_tokens):
            vec[i] = 1
            continue

        if any(w in sentence for w in col_tokens):
            vec[i] = 1
            continue

        for w in sentence_tokens:
            if fuzz.partial_ratio(w, col_clean) >= fuzzy_threshold:
                vec[i] = 1
                break

        if vec[i] == 0:
            for w in col_tokens:
                if fuzz.partial_ratio(w, sentence) >= fuzzy_threshold:
                    vec[i] = 1
                    break

    return vec.reshape(1, -1)
