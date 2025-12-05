
---

## 🧠 Step-by-Step Explanation 

You can use the following structured explanation in your `README.md` file:

---

# 🏥 Disease Prediction System using Symptom Severity Mapping

## 📋 Overview

This project predicts diseases based on input symptoms using **Machine Learning (KNN & Decision Tree classifiers)**.
It uses symptom severity values, description mapping, and precaution suggestions from multiple CSV datasets.

---

## 📂 Datasets Used

1. **`dataset.csv`** – Contains diseases and their corresponding symptoms.
   Example:

   ```
   Disease,Symptom_1,Symptom_2,...,Symptom_17
   Fungal infection,itching,skin_rash,...
   ```
2. **`Symptom-severity.csv`** – Maps symptoms to numeric severity weights.
   Example:

   ```
   Symptom,weight
   itching,1
   skin_rash,3
   ```
3. **`symptom_Description.csv`** – Maps each disease to a human-readable description.
4. **`symptom_precaution.csv`** – Maps each disease to a list of precautions.

---

## ⚙️ Workflow Explanation (Detailed)

### 1. **Importing Libraries**

We import:

* `pandas` and `numpy` → For data manipulation.
* `sklearn` → For encoding, model training, and evaluation.
* `matplotlib` & `seaborn` → For visualization (optional).

### 2. **Loading the Datasets**

```python
df = pd.read_csv("dataset.csv")
df_severity = pd.read_csv("Symptom-severity.csv")
df_desc = pd.read_csv("symptom_Description.csv")
df_prec = pd.read_csv("symptom_precaution.csv")
```

Each CSV is loaded into a Pandas DataFrame.

### 3. **Cleaning the Data**

* Strip unwanted spaces from column names and values.
* Ensure consistent formatting for matching between datasets.

```python
df.columns = df.columns.str.strip()
for col in df.columns:
    df[col] = df[col].str.strip()
```

### 4. **Building Mapping Dictionaries**

We create three lookup dictionaries:

```python
description_map = dict(zip(df_desc["Disease"], df_desc["Description"]))
precaution_map = {
    row["Disease"]: [row["Precaution_1"], row["Precaution_2"], row["Precaution_3"], row["Precaution_4"]]
    for _, row in df_prec.iterrows()
}
severity_map = dict(zip(df_severity["Symptom"], df_severity["weight"]))
```

These allow the program to:

* Fetch description of predicted disease
* Suggest 4 precautions
* Replace symptom names with numeric severity weights

### 5. **Replacing Symptoms with Severity Values**

We replace each symptom name in the main dataset with its numeric weight:

```python
for col in symptom_cols:
    df_filled[col] = df_filled[col].map(severity_map).fillna(0)
```

### 6. **Label Encoding Diseases**

Convert textual disease names into numeric labels for training:

```python
le = LabelEncoder()
df_filled["Disease"] = le.fit_transform(df_filled["Disease"])
```

### 7. **Splitting Data**

Separate features (`X`) and labels (`y`), and split into training/testing sets:

```python
X = df_filled.drop("Disease", axis=1)
y = df_filled["Disease"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

### 8. **Training Models**

Train two classifiers:

* **KNN (K=10)** → For neighborhood-based prediction
* **Decision Tree (Entropy criterion, max depth 10)** → For rule-based prediction

```python
knn = KNeighborsClassifier(n_neighbors=10)
knn.fit(X_train, y_train)

dt = DecisionTreeClassifier(criterion="entropy", max_depth=10)
dt.fit(X_train, y_train)
```

### 9. **Evaluating Models**

We check **accuracy** and **F1-scores** to understand performance:

```python
print(accuracy_score(y_test, knn_pred))
print(accuracy_score(y_test, dt_pred))
```

Also calculate macro and weighted F1-scores for better evaluation.

### 10. **Prediction Function**

The function `predict_disease(symptom_list)`:

1. Takes a list of symptoms
2. Converts them into a 17-length vector of severity weights
3. Predicts using both KNN & Decision Tree
4. Returns:

   * Predicted disease
   * Description
   * 4 Precautions

Example:

```python
test_symptoms = ["headache", "itching", "chest_pain"]
result = predict_disease(test_symptoms)
```

Output:

```python
{
  'Final Predicted Disease': 'Migraine',
  'Description': 'Recurrent headaches, often severe and throbbing...',
  'Precautions': ['rest', 'avoid stress', 'take medication', 'consult doctor']
}
```

---

## 💾 Saving and Loading Models for Future Use

After training, save the models and label encoder using **joblib** (preferred for sklearn objects):

```python
import joblib

# Save models and encoder
joblib.dump(knn, "knn_model.pkl")
joblib.dump(dt, "decision_tree_model.pkl")
joblib.dump(le, "label_encoder.pkl")
joblib.dump(severity_map, "severity_map.pkl")
joblib.dump(description_map, "description_map.pkl")
joblib.dump(precaution_map, "precaution_map.pkl")

print("✅ Models and mappings saved successfully!")
```

To **load them later**:

```python
knn = joblib.load("knn_model.pkl")
dt = joblib.load("decision_tree_model.pkl")
le = joblib.load("label_encoder.pkl")
severity_map = joblib.load("severity_map.pkl")
description_map = joblib.load("description_map.pkl")
precaution_map = joblib.load("precaution_map.pkl")

print("✅ Models loaded successfully!")
```

Now you can predict without retraining:

```python
result = predict_disease(["chest_pain", "shortness_of_breath"])
print(result)
```

---

## 📊 Evaluation Example

You can also visualize confusion matrices:

```python
plt.figure(figsize=(10,6))
sns.heatmap(confusion_matrix(y_test, dt_pred), annot=False)
plt.title("Decision Tree Confusion Matrix")
plt.show()
```

---

## 🧩 Dependencies

Add this in your `requirements.txt`:

```
pandas
numpy
scikit-learn
matplotlib
seaborn
joblib
```

---

## 🧠 Summary

| Step | Task           | Output                    |
| ---- | -------------- | ------------------------- |
| 1    | Data Cleaning  | Consistent CSVs           |
| 2    | Mapping        | Symptom → Severity        |
| 3    | Label Encoding | Disease → Numeric         |
| 4    | Model Training | KNN + Decision Tree       |
| 5    | Evaluation     | Accuracy + F1             |
| 6    | Prediction     | Description + Precautions |
| 7    | Save Models    | `.pkl` for future use     |

---

