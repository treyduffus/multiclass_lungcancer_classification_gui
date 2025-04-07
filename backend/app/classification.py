
from joblib import load
from fastapi import HTTPException


diagnosis_mapping = {0 : "Heathly", 1 : "Cancer Positive"}

stage_mapping = {0 : "Healthy", 1 : "Stage I", 2 : "Stage II", 3 : "Stage III", 4 : "Stage IV"}

subtype_mapping = {0 : "Healthy", 1 : "Adenocarcinoma", 2 : "Squamos Cell Carcinoma", 3 : "Large Cell Carinoma", 4 : "Mesothelimoa", 5 : "Small Cell Lung Cancer"}

# Output : [dignosis, stage, subtype]
def predict_sample(sample, model_type): 

    match model_type:
        case "svm":
            model = load("app/models/svm_model.joblib")
        case _:
            raise HTTPException(status_code=400, detail="Invalid model type found during prediction")
            
    y_pred = model.predict(sample)
    
    stage, subtype = y_pred[:, 0][0], y_pred[:, 1][0]
    
    diagnosis = 0 if stage == 0 else 1

    return (diagnosis_mapping[diagnosis], stage_mapping[stage], subtype_mapping[subtype])
    

    
