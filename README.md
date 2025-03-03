# Multiclass Lung Cancer Classification

A web application for classifying lung cancer types using machine learning.

## Project Structure

- `frontend/`: Next.js frontend application
- `backend/`: FastAPI backend application

## Running with Docker (Recommended)

The easiest way to run the application is using Docker Compose:

```bash
# Build and start the containers
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d --build

# View logs
docker-compose logs -f

# View logs for a specific service
docker-compose logs -f frontend
docker-compose logs -f backend

# Stop the containers
docker-compose down

# Stop the containers and remove volumes
docker-compose down -v
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5001

### Docker Development Tips

- To rebuild a single service:

  ```bash
  docker-compose build frontend
  docker-compose build backend
  ```

- To restart a single service:

  ```bash
  docker-compose restart frontend
  docker-compose restart backend
  ```

- To view container status:

  ```bash
  docker-compose ps
  ```

- To check container health:
  ```bash
  docker-compose ps
  ```

## Running Locally (Development)

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the server:
   ```bash
   python run.py
   ```

The backend will be available at http://localhost:5001

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:3000

## File Upload

The application accepts CSV files for lung cancer classification. The CSV files should have the following format:

- Each row represents a sample
- Columns should contain the features used for classification
- The file should not include headers

After uploading, the file will be sent to the backend for processing, and the results will be displayed once processing is complete.

## API Integration

The frontend communicates with the FastAPI backend through the following endpoints:

- `/api/upload` - POST endpoint for uploading CSV files
- `/api/status/:fileId` - GET endpoint for checking the status of a file
- `/api/download/:fileId` - GET endpoint for downloading the results

## Technologies Used

- Next.js (with standalone output optimization)
- React
- FastAPI
- Docker & Docker Compose
- Tailwind CSS
- shadcn/ui components

## Environment Variables

### Frontend

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:5001/api)

### Backend

- `HOST`: Host to bind to (default: 0.0.0.0)
- `PORT`: Port to run on (default: 5001)
