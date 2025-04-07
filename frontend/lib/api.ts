/**
 * API utilities for communicating with the Flask backend
 */
import { UPLOAD_ENDPOINT, STATUS_ENDPOINT, DOWNLOAD_ENDPOINT } from "./config";

/**
 * Upload a CSV/TXT file to the backend for processing
 * @param file The file to upload
 * @returns The response from the backend
 */
export async function uploadFile(formData: FormData) {
  try {
    const response = await fetch(UPLOAD_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

/**
 * Get the processing status of a file
 * @param fileId The ID of the file to check
 * @returns The status of the file processing
 */
export async function getFileStatus(fileId: string) {
  try {
    const response = await fetch(`${STATUS_ENDPOINT}/${fileId}`);

    if (!response.ok) {
      throw new Error(`Status check failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking file status:", error);
    throw error;
  }
}

/**
 * Download the results for a file
 * @param fileId The ID of the file to download results for
 */
export async function downloadResults(fileId: string) {
  try {
    window.open(`${DOWNLOAD_ENDPOINT}/${fileId}`, "_blank");
  } catch (error) {
    console.error("Error downloading results:", error);
    throw error;
  }
}
