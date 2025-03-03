# Multiclass Lung Cancer Classification Frontend

This is the frontend for the Multiclass Lung Cancer Classification application. It allows users to upload CSV files for analysis and displays the classification results.

## Features

- CSV file upload with drag-and-drop support
- Real-time status updates for file processing
- Display of classification results
- Download of processed results

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, create a `.env.local` file in the root directory with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Adjust the URL if your backend is running on a different host or port.

## Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## File Upload

The application accepts CSV files for lung cancer classification. The CSV files should have the following format:

- Each row represents a sample
- Columns should contain the features used for classification
- The file should not include headers

After uploading, the file will be sent to the backend for processing, and the results will be displayed once processing is complete.

## API Integration

The frontend communicates with the Flask backend through the following endpoints:

- `/api/upload` - POST endpoint for uploading CSV files
- `/api/status/:fileId` - GET endpoint for checking the status of a file
- `/api/download/:fileId` - GET endpoint for downloading the results

## Technologies Used

- Next.js
- React
- Tailwind CSS
- shadcn/ui components
