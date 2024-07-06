"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { querify } from "@/lib/contentful/helpers";

const setBlurImageUrl = ({
  url,
  width,
  height,
}: {
  url: string;
  width: number;
  height: number;
}) =>
  `/api/blur?${querify({
    w: width,
    h: height,
    url: url.replace(/^\/+/, ""),
  })}`;

const FULL = "w-full h-full rounded";
const POSITION = "absolute top-0 left-0 right-0 bottom-0";

const BlurImageBackground = ({
  url,
  width,
  height,
}: {
  url: string;
  width: number;
  height: number;
}) => {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(setBlurImageUrl({ url, height, width }));

  useEffect(() => {
    const imageBlur = new Image();
    const imageHighRes = new Image();

    imageBlur.src = src;
    imageHighRes.src = `https:${url}`;

    let blurTimer: NodeJS.Timeout;
    imageBlur.onload = () => {
      blurTimer = setTimeout(() => {
        setLoading(false);
      }, 100);
    };

    let highResTimer: NodeJS.Timeout;
    imageHighRes.onload = () => {
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
  }, [url, height, width]);

  return (
    <div className={cn(FULL, "overflow-hidden")}>
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
