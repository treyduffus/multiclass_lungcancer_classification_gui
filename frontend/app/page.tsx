"use client";
import { useState } from "react";
import Filedrop from "@/components/filedrop";
import Results from "@/components/results";
import Footer from "@/components/footer";

export default function Home() {
  const [fileId, setFileId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleUploadSuccess = (id: string) => {
    setFileId(id);
    setShowResults(true);
  };

  const handleReset = () => {
    setFileId(null);
    setShowResults(false);
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-12 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl sm:text-4xl font-bold text-center py-4">
        Multiclass Lung Cancer Classification
      </h1>
      <main className="flex flex-col gap-8 w-full max-w-md items-center">
        {showResults ? (
          <Results fileId={fileId} onReset={handleReset} />
        ) : (
          <Filedrop onUploadSuccess={handleUploadSuccess} />
        )}
      </main>
      <Footer />
    </div>
  );
}
