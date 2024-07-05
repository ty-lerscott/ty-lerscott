"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { querify } from "@/lib/contentful/helpers";
import NextImage, { type ImageProps } from "next/image";

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

const BlurImage = ({
  url,
  alt,
  width,
  height,
  ...props
}: Omit<ImageProps, "src" | "width" | "height"> & {
  url: string;
  width: number;
  height: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(
    setBlurImageUrl({
      url,
      width,
      height,
    }),
  );

  useEffect(() => {
    const highQuality = new Image();
    const imageUrl = `https:${url}`;
    highQuality.src = imageUrl;

    highQuality.onload = () => {
      setCurrentSrc(imageUrl);
      setIsLoading(false);
    };

    return () => {
      highQuality.onload = null;
    };
  }, [url]);

  return (
    <NextImage
      {...props}
      width={width}
      alt={alt || ""}
      height={height}
      src={currentSrc}
      className={cn("transition-all", isLoading ? "opacity-75" : "opacity-1")}
    />
  );
};
BlurImage.displayName = "BlurImage";

export default BlurImage;
