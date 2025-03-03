# Multiclass Lung Cancer Classification

A web application for classifying lung cancer types using machine learning.

## Project Structure

- `frontend/`: Next.js frontend application
- `backend/`: FastAPI backend application

## Running the Application

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
