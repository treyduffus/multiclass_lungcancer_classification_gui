import pandas as pd
from fastapi import HTTPException
import logging

logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

# Read the file into a pandas DataFrame
def preprocess_data(file, file_path):

    logging.info(file)

    if file.filename.endswith('.csv'):
        df = pd.read_csv(file.file)
        return df

    elif file.filename.endswith('.txt'):
        with open(file_path, 'r') as txt_data:
            lines = txt_data.readlines()

        # Skip the header (first line)
        lines = lines[1:]

        genes = []
        read_counts = []

        for line in lines:
            # Split the line by tab 
            parts = line.strip().split("\t")
            
            gene = parts[0]
            reads_per_million = float(parts[2]) 

            genes.append(gene)
            read_counts.append(reads_per_million)

        # Create a DataFrame with genes as columns and the read counts as a single row
        df = pd.DataFrame([read_counts], columns=genes)

        return df

    else:
        raise HTTPException(
            status_code=400, detail="Only CSV and TXT files are allowed")

