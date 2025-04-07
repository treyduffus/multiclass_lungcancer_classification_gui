# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Create directories for file storage
RUN mkdir -p uploads results

# Expose port
EXPOSE 5001

# Command to run the application
CMD ["uvicorn", "run:app", "--host", "0.0.0.0", "--port", "5001"]