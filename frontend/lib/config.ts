/**
 * Configuration settings for the application
 */

// Backend API URL
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// File upload endpoint
export const UPLOAD_ENDPOINT = `${API_URL}/upload`;

// File status endpoint
export const STATUS_ENDPOINT = `${API_URL}/status`;

// Download results endpoint
export const DOWNLOAD_ENDPOINT = `${API_URL}/download`;
