"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Download, RefreshCw } from "lucide-react";
import { getFileStatus, downloadResults } from "@/lib/api";

export default function Results({ fileId, onReset }) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchResults = async () => {
    if (!fileId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getFileStatus(fileId);
      setResults(data);
    } catch (error) {
      setError(error.message || "Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchResults();
    setRefreshing(false);
  };

  const handleDownload = () => {
    if (fileId) {
      downloadResults(fileId);
    }
  };

  useEffect(() => {
    if (fileId) {
      fetchResults();
    }
  }, [fileId]);

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600">Processing your CSV file...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                {refreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Retry
              </Button>
              <Button variant="ghost" onClick={onReset}>
                Upload Another File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No results available</p>
            <Button variant="primary" onClick={onReset}>
              Upload Another File
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Classification Results</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {results.status === "processing" ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Still processing your file...</p>
          </div>
        ) : results.status === "completed" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="font-medium">Processing completed</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download Results
              </Button>
            </div>

            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.predictions &&
                    results.predictions.map((pred, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {pred.class}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {(pred.confidence * 100).toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
              <Button onClick={onReset}>Upload Another File</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-red-500 mb-4">
              Processing failed: {results.error || "Unknown error"}
            </p>
            <Button variant="primary" onClick={onReset}>
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
