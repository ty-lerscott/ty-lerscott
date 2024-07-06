"use client";

import { useState, useEffect } from "react";
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

const BlurImageBackground = ({
  url,
  width,
  height,
}: {
  url: string;
  width: number;
  height: number;
}) => {
  const [currentSrc, setCurrentSrc] = useState(
    setBlurImageUrl({
      url,
      width,
      height,
    }),
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const imageUrl = `https:${url}`;
    const highQuality = new Image();

    highQuality.src = imageUrl;
    highQuality.onload = () => {
      timer = setTimeout(() => {
        setCurrentSrc(imageUrl);
      }, 1500);
    };

    return () => {
      highQuality.onload = null;
      clearTimeout(timer);
    };
  }, [url]);

  return (
    <div
      className={"transition-all h-full w-full bg-cover bg-no-repeat bg-center"}
      style={{
        backgroundImage: `url(${currentSrc})`,
      }}
    />
  );
};
BlurImageBackground.displayName = "BlurImageBackground";

export default BlurImageBackground;
