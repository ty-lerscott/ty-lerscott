import jimp from "jimp";
import pkg from "~/package.json";
import { ImageResponse } from "next/og";

export const dynamic = "force-dynamic";

const SUBTITLE = `${pkg.author.name} | ${pkg.author.profession}`;

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

  try {
    // // Resize the image to a smaller size for faster processing
    const image = await jimp.read(imageUrl);

    image.blur(10);

    const bufferedImage = await image.getBufferAsync(jimp.MIME_PNG);
    const encodedImage = Buffer.from(bufferedImage).toString("base64");

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
            background: `url("data:image/png;base64,${encodedImage}")`,
          }}
        >
          <h1
            style={{
              lineHeight: "0.825em",
              color: "white",
              fontSize: "6rem",
              textAlign: "center",
              paddingLeft: "1rem",
              paddingRight: "1rem",
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
            {SUBTITLE}
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
