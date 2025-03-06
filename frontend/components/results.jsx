"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Download } from "lucide-react";
import { getFileStatus, downloadResults } from "@/lib/api";

export default function Results({ fileId, onReset }) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    if (!fileId) return;

    try {
      const data = await getFileStatus(fileId);
      setResults(data);

      if (data.status === "processing") {
        setTimeout(fetchResults, 1000);
      }
    } catch (error) {
      setError(error.message || "Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (fileId) {
      downloadResults(fileId);
    }
  };

  useEffect(() => {
    if (fileId) {
      setLoading(true);
      setError(null);
      fetchResults();
    }
  }, [fileId]);

  if (loading && !results) {
    return (
      <Card className="w-full max-w-md animate-fade-up">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
          <div className="relative">
            <Loader2 className="h-8 w-8 text-slate-500 animate-spin" />
            <div className="absolute inset-0 h-8 w-8 border-t-2 border-slate-200 rounded-full animate-ping" />
          </div>
          <p className="text-slate-600 mt-4 animate-fade-up">Processing your CSV file...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md animate-fade-down">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button variant="primary" onClick={onReset} className="animate-scale-up">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card className="w-full max-w-md animate-fade-up">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-slate-600 mb-4">No results available</p>
            <Button variant="primary" onClick={onReset} className="animate-scale-up">
              Upload Another File
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md animate-fade-up">
      <CardHeader>
        <CardTitle>Classification Results</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {results.status === "processing" ? (
          <div className="flex flex-col items-center justify-center py-8 animate-fade-up">
            <div className="relative">
              <Loader2 className="h-8 w-8 text-slate-500 animate-spin" />
              <div className="absolute inset-0 h-8 w-8 border-t-2 border-slate-200 rounded-full animate-ping" />
            </div>
            <p className="text-slate-600 mt-4">Still processing your file...</p>
            <p className="text-sm text-slate-500 mt-2">This should take about 5 seconds</p>
          </div>
        ) : results.status === "completed" ? (
          <div className="space-y-4 animate-fade-up">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-md animate-scale-up">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="font-medium">Processing completed</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleDownload} className="animate-scale-up">
                <Download className="h-4 w-4 mr-2" />
                Download Results
              </Button>
            </div>

            <div className="border rounded-md overflow-hidden animate-fade-up delay-100">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {results.predictions &&
                    results.predictions.map((pred, index) => (
                      <tr
                        key={index}
                        className="animate-fade-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="px-4 py-2 text-sm text-slate-900">
                          {pred.class}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-900">
                          {(pred.confidence * 100).toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
              <Button onClick={onReset} className="animate-scale-up">Upload Another File</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 animate-fade-up">
            <p className="text-red-500 mb-4">
              Processing failed: {results.error || "Unknown error"}
            </p>
            <Button variant="primary" onClick={onReset} className="animate-scale-up">
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
