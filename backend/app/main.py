from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
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


@app.get("/")
def home():
    return {"message": "Lung Cancer Classification API is running"}


@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
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

    # Start processing in background (simulated)
    file_status[file_id] = {
        "status": "processing",
        "filename": file.filename,
        "upload_time": time.time()
    }

    return {"fileId": file_id, "message": "File uploaded successfully and processing started"}


@app.get("/api/status/{file_id}")
async def get_status(file_id: str):
    if file_id not in file_status:
        raise HTTPException(status_code=404, detail="File not found")

    # Simulate processing completion after 5 seconds
    if file_status[file_id]["status"] == "processing":
        elapsed_time = time.time() - file_status[file_id]["upload_time"]
        if elapsed_time > 5:
            # Simulate processing completion
            file_status[file_id]["status"] = "completed"

            # Generate mock predictions
            file_status[file_id]["predictions"] = [
                {"class": "Adenocarcinoma", "confidence": 0.85},
                {"class": "Squamous Cell Carcinoma", "confidence": 0.10},
                {"class": "Small Cell Carcinoma", "confidence": 0.05}
            ]

    return file_status[file_id]


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
    predictions = file_status[file_id]["predictions"]
    df = pd.DataFrame(predictions)
    df.to_csv(result_path, index=False)

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
