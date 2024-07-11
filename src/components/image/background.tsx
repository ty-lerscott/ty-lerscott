"use client";

import { cn, querify } from "@/lib/utils";
import { useState, useEffect } from "react";
import { HiSparkles } from "react-icons/hi2";
import { Skeleton } from "@/components/ui/skeleton";

const setBlurImageUrl = (url: string) =>
  `/api/image/blur?${querify({
    url: encodeURIComponent(url.replace(/^\/+/, "")),
  })}`;

const FULL = "w-full h-full rounded";
const POSITION = "absolute top-0 left-0 right-0 bottom-0";

const BlurImageBackground = ({ url, alt }: { url: string; alt: string }) => {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(setBlurImageUrl(`https:${url}`));
  const isAIGenerated = alt.toLowerCase().includes("ai generated");

  useEffect(() => {
    let blurTimer: NodeJS.Timeout;
    let highResTimer: NodeJS.Timeout;

    const imageBlur = new Image();
    const imageHighRes = new Image();

    imageBlur.src = src;
    imageHighRes.src = `https:${url}`;

    imageBlur.onload = () => {
      blurTimer = setTimeout(() => {
        setLoading(false);
      }, 100);
    };

    imageHighRes.onload = () => {
      setLoading(false);
      highResTimer = setTimeout(() => {
        setSrc(imageHighRes.src);
      }, 1500);
    };

    return () => {
      imageBlur.onload = null;
      imageHighRes.onload = null;
      clearTimeout(blurTimer);
      clearTimeout(highResTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(FULL, "overflow-hidden")}>
      {isAIGenerated && !loading ? (
        <HiSparkles className="absolute bottom-2 right-2 text-[--ghost] size-6 z-20" />
      ) : null}
      <div
        className={cn(
          FULL,
          POSITION,
          loading ? "opacity-0" : "opacity-100",
          "transition-all bg-cover bg-no-repeat bg-center z-10",
        )}
        style={{
          backgroundImage: `url(${src})`,
        }}
      />

      <Skeleton className={cn(FULL, POSITION, "z-0")} />
    </div>
  );
};
BlurImageBackground.displayName = "BlurImageBackground";

export default BlurImageBackground;
