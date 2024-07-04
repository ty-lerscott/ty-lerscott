import { encode, decode } from "blurhash";
import { ImageResponse } from "next/og";
import { PNG } from "pngjs";

const loadImage = async (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};

const encodeImageToBlurhash = async (imageUrl) => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const blurHash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";
  const width = 32; // Width of the decoded image
  const height = 32; // Height of the decoded image

  // Decode the BlurHash string
  const pixels = decode(blurHash, width, height);

  // Create a PNG instance
  const png = new PNG({ width, height });

  // Set the pixel data
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      png.data[idx] = pixels[idx]; // R
      png.data[idx + 1] = pixels[idx + 1]; // G
      png.data[idx + 2] = pixels[idx + 2]; // B
      png.data[idx + 3] = 255; // A (fully opaque)
    }
  }

  // Convert the PNG to a buffer
  const buffer = PNG.sync.write(png);

  // Convert the buffer to a base64 string
  const base64Image = buffer.toString("base64");

  // Return the base64 image as a data URL
  const dataURL = `data:image/png;base64,${base64Image}`;

  console.log(searchParams);
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: `url(${dataURL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100",
          height: "100vh",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        👋 Hello, World!
      </div>
    ),
  );
}
