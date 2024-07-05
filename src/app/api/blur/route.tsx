"use server";

import jimp from "jimp";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const { height, width, url } = {
    url: searchParams.get("url"),
    height: Number(searchParams.get("h") || 768),
    width: Number(searchParams.get("w") || 768),
  };

  if (!url) {
    return new Response("Image URL is required", { status: 400 });
  }

  const imageUrl = `https://${url}?fm=png&w=${width}&h=${height}&q=5`;
  console.log({ imageUrl });
  try {
    // // Resize the image to a smaller size for faster processing
    const image = await jimp.read(imageUrl);

    image.blur(10);

    const bufferedImage = await image.getBufferAsync(jimp.MIME_PNG);

    // Return the blurred image as an ImageResponse
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            background: `url("data:image/png;base64,${Buffer.from(bufferedImage).toString("base64")}")`,
          }}
        >
          <h1
            style={{
              lineHeight: "0.825em",
              color: "white",
              fontSize: "6rem",
              textAlign: "center",
              display: title ? "block" : "none",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "2rem",
              color: "#c8c8c8",
              marginTop: "-1rem",
              textAlign: "center",
              display: title ? "block" : "none",
            }}
          >
            Tyler Scott | Senior Software Engineer
          </p>
        </div>
      ),
      {
        width,
        height,
      },
    );
  } catch (error) {
    console.error("Error processing image:", error);
    return new Response("Error processing image", { status: 500 });
  }
}
