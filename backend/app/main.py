from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from app.processing import preprocess_data
from app.feature_selection import select_features
from app.classification import predict_sample
import logging
import os
import uuid
import shutil
import pandas as pd
from typing import Dict, List, Optional
import time

app = FastAPI(title="Lung Cancer Classification API")

logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

# Create directories for storing uploaded files and results
os.makedirs("uploads", exist_ok=True)
os.makedirs("results", exist_ok=True)

# Dictionary to store processing status
file_status: Dict[str, Dict] = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3005",
        "http://127.0.0.1:3005",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

results_cache = {}


@app.get("/")
def home():
    return {"message": "Lung Cancer Classification API is running"}


@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...), model: str = Form(...)):
    logging.info(f"Received file upload request: {file.filename}")

    # Validate file type
    is_csv = file.filename.endswith('.csv')
    is_txt = file.filename.endswith('.txt')

    if not (is_csv or is_txt):
        raise HTTPException(
            status_code=400, detail="Only CSV and TXT files are allowed")

    # Generate a unique ID for the file
    file_id = str(uuid.uuid4())

    # Save the file
    file_path = f"uploads/{file_id}.csv" if is_csv else f"uploads/{file_id}.txt"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    results_cache[file_id] = {
        "status": "processing",
        "predictions": []
    }

    processed_data = preprocess_data(file, file_path)

    reduced_data = select_features(processed_data)

    predictions = predict_sample(reduced_data, model)

    results = [
                {"target": "Diagnosis", "result": predictions[0]},
                {"target": "Stage", "result": predictions[1]},
                {"target": "Subtype", "result": predictions[2]}
              ]

    results_cache[file_id] = {
        "status": "completed",
        "predictions": results
    }

    logging.info(predictions)

    return {"fileId": file_id, "message": "File uploaded successfully"}

@app.get("/api/status/{file_id}")
async def get_status(file_id: str):
    if file_id not in results_cache:
        raise HTTPException(status_code=404, detail="File not found")

    return results_cache[file_id]


@app.get("/api/download/{file_id}")
async def download_results(file_id: str):
    if file_id not in file_status:
        raise HTTPException(status_code=404, detail="File not found")

    if file_status[file_id]["status"] != "completed":
        raise HTTPException(
            status_code=400, detail="Processing not completed yet")

    result_path = f"results/{file_id}_results.csv"

    # Create a simple CSV with the predictions
    # ! This is a mock implementation

    return FileResponse(
        path=result_path,
        filename=f"{file_status[file_id]['filename'].replace('.csv', '')}_results.csv",
        media_type="text/csv"
    )

# Add a cleanup endpoint for testing


@app.delete("/api/cleanup")
async def cleanup():
    file_status.clear()
    return {"message": "Cleanup completed"}
