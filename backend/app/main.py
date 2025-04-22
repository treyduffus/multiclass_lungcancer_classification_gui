from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from app.processing import preprocess_data
from app.feature_selection import select_features
from app.classification import predict_sample
import logging
import os
import csv
import uuid
import shutil
import pandas as pd
from typing import Dict, List, Optional
import time
from dotenv import load_dotenv

app = FastAPI(title="Lung Cancer Classification API")

logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

# Load environment variables from a .env file
load_dotenv()

# Read FRONTEND_URL from environment variable, default to localhost:3005 if not set
#FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3005")

# Define allowed origins
#origins = [
#    "http://localhost:3005",  # Keep localhost for local development
#    "http://127.0.0.1:3005", # Keep localhost IP for local development
#]

# Add FRONTEND_URL to origins if it's different from the defaults
#if FRONTEND_URL not in origins:
#    print(f"Adding {FRONTEND_URL} to allowed origins")
#    origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Use the updated origins list
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

results_cache = {}

# Create directories for storing uploaded files and results
os.makedirs("uploads", exist_ok=True)
os.makedirs("results", exist_ok=True)

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
        "filename": file.filename,
        "predictions": []
    }

    processed_data = preprocess_data(file, file_path)

    reduced_data = select_features(processed_data)
    print("Selected features:")
    print(reduced_data.columns.tolist())

    predictions = predict_sample(reduced_data, model)
    print("Predictions:")

    def chunk_list(lst, n):
        return [lst[i:i + n] for i in range(0, len(lst), n)]

    cleaned_features = [f.replace("hsa-", "") for f in reduced_data.columns.tolist()]
    chunked = chunk_list(cleaned_features, 6)
    pretty_features = "\n".join([", ".join(chunk) for chunk in chunked])


    results = [
                {"target": "Diagnosis", "result": predictions[0]},
                {"target": "Stage", "result": predictions[1]},
                {"target": "Subtype", "result": predictions[2]},
                {"target": "Selected Features", "result": pretty_features}
              ]

    results_cache[file_id] = {
        "status": "completed",
        "filename": file.filename,
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
    if file_id not in results_cache:
        raise HTTPException(status_code=404, detail="File not found")

    if results_cache[file_id]["status"] != "completed":
        raise HTTPException(
            status_code=400, detail="Processing not completed yet")

    result_path = f"results/{file_id}_results.csv"

    with open(result_path, mode="w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=["target", "result"])
        writer.writeheader()
        writer.writerows(results_cache[file_id]["predictions"])

    print(f"Results saved to {result_path}")

    return FileResponse(
        path=result_path,
        filename=f"{results_cache[file_id]['filename'].replace('.csv', '_results.csv')}",
        media_type="text/csv"
    )

# Add a cleanup endpoint for testing
@app.delete("/api/cleanup")
async def cleanup():
    results_cache.clear()
    return {"message": "Cleanup completed"}
