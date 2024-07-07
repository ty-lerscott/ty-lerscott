"use client";

import { useState } from "react";
import Button from "@/components/button";

const Download = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    // only allow downloading if not already clicked
    if (!isLoading) {
      setIsLoading(true);

      try {
        const resp = await fetch("/api/download/resume", {
          next: { revalidate: 0 },
        });
        const blob = await resp.blob();
        const file = window.URL.createObjectURL(blob);
        const resumeWindow = window.open(file, "_blank");
        if (resumeWindow) {
          resumeWindow.document.title = "Tyler Scott Williams Resume.pdf";
        }
      } catch (err) {
        console.log("Error Downloading Resume", (err as Error).message);
      }
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      loading={isLoading}
      onClick={handleDownload}
      loadingText="Downloading"
    >
      Download
    </Button>
  );
};

export default Download;
