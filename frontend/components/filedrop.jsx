"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import Dropzone from "react-dropzone";
import EditParams from "@/components/editparameters";
import { uploadCSVFile } from "@/lib/api";

// TODO: Add drawer for sliders - https://ui.shadcn.com/docs/components/drawer

export default function Filedrop({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const handleFileDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      // Check if file is CSV
      if (
        selectedFile.type !== "text/csv" &&
        !selectedFile.name.endsWith(".csv")
      ) {
        toast.error("Please upload a CSV file");
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadSuccess(false);
      setUploadError(false);
      toast.success("File selected successfully");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check if file is CSV
      if (
        selectedFile.type !== "text/csv" &&
        !selectedFile.name.endsWith(".csv")
      ) {
        toast.error("Please upload a CSV file");
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadSuccess(false);
      setUploadError(false);
      toast.success("File selected successfully");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setUploading(true);
    setUploadSuccess(false);
    setUploadError(false);

    try {
      const response = await uploadCSVFile(file);
      setUploading(false);
      setUploadSuccess(true);
      toast.success("File uploaded successfully");
      console.log("Upload response:", response);

      // Call the onUploadSuccess callback with the file ID from the response
      if (onUploadSuccess && response.fileId) {
        onUploadSuccess(response.fileId);
      }
    } catch (error) {
      setUploading(false);
      setUploadError(true);
      toast.error("Failed to upload file: " + error.message);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-medium">Upload CSV File</Label>
          {uploadSuccess && <CheckCircle className="h-5 w-5 text-green-500" />}
          {uploadError && <AlertCircle className="h-5 w-5 text-red-500" />}
        </div>

        <Dropzone
          onDrop={handleFileDrop}
          accept={{
            "text/csv": [".csv"],
          }}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className={`dropzone cursor-pointer border-2 border-dashed rounded-lg flex flex-col gap-2 p-6 items-center transition-colors
                ${
                  file
                    ? "border-green-300 bg-green-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <>
                  <FileText className="w-12 h-12 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {fileName}
                  </span>
                  <span className="text-xs text-gray-500">
                    CSV file selected
                  </span>
                </>
              ) : (
                <>
                  <CSVIcon className="w-12 h-12" />
                  <span className="text-sm font-medium text-gray-700">
                    Drag and drop a CSV file or click to browse
                  </span>
                  <span className="text-xs text-gray-500">
                    Only CSV files are supported
                  </span>
                </>
              )}
            </div>
          )}
        </Dropzone>

        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">
            Or select file manually
          </Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".csv"
            className="cursor-pointer"
          />
        </div>

        {file && (
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 truncate">
                {fileName}
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between space-x-4 p-6 pt-2">
        <EditParams />
        <Button
          size="lg"
          className="w-full"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              Upload <Upload className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

function CSVIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8 13h2" />
      <path d="M8 17h2" />
      <path d="M14 13h2" />
      <path d="M14 17h2" />
    </svg>
  );
}
