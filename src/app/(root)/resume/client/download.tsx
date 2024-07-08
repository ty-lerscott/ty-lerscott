"use client";

import { useState, useEffect } from "react";
import Button from "@/components/button";

const Download = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let errorTimer: NodeJS.Timeout;

  const handleDownload = async () => {
    // only allow downloading if not already clicked
    if (!isLoading) {
      setIsLoading(true);

      try {
        const resp = await fetch("/api/download/resume", {
          next: { revalidate: 0 },
        });
        const blob = await resp.blob();

        if (!blob.type) {
          setError(true);

          errorTimer = setTimeout(() => {
            setError(false);
          }, 3000);
        } else {
          const file = window.URL.createObjectURL(blob);
          const resumeWindow = window.open(file, "_blank");
          if (resumeWindow) {
            resumeWindow.document.title = "Tyler Scott Williams Resume.pdf";
          }
        }
      } catch (err) {
        console.log("Error Downloading Resume", (err as Error).message);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (errorTimer) {
        clearTimeout(errorTimer);
      }
    };
  });
  return (
    <Button
      error={error}
      variant="secondary"
      loading={isLoading}
      onClick={handleDownload}
      loadingText="Downloading"
      errorText="Error Downloading"
    >
      Download
    </Button>
  );
};

export default Download;
