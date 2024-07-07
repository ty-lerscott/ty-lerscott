import pkg from "~/package.json";
import puppeteerLocal from "puppeteer";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const isLocal = process.env.NODE_ENV !== "production";

export async function GET() {
  try {
    // Launch a new browser instance
    let browser;
    if (process.env.NODE_ENV === "development") {
      // For local development, use the installed Chrome
      browser = await puppeteerLocal.launch();
    } else {
      // For production (Vercel)
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    }
    const page = await browser.newPage();

    const url = isLocal
      ? "http://ty.lerscott.local:3000"
      : "https://ty.lerscott.com";

    // Navigate to the desired page
    await page.goto(`${url}/resume/simple`, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdf = await page.pdf({
      format: "A4",
      margin: {
        top: "1cm",
        left: "1cm",
        right: "1cm",
        bottom: "1cm",
      },
    });

    // Close the browser
    await browser.close();

    const fileName = pkg.author.name.toLowerCase().replace(/\s/g, "_");

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${fileName}_resume.pdf"`,
    );

    // Return the response with PDF data
    return new Response(pdf, {
      headers: headers,
    });
  } catch (error) {
    console.error("Error generating PDF:", error);

    return new Response((error as Error).message, { status: 500 });
  }
}
