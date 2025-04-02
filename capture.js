const puppeteer = require("puppeteer");

(async () => {
	// Launch Puppeteer
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Navigate to the webpage
	await page.goto("https://ty.lerscott.local/resume/simple", {
		waitUntil: "networkidle2",
	});

	// Inject custom CSS to add padding
	await page.addStyleTag({
		content: `
      body {
        padding: 1rem; /* Add 1rem padding */
        box-sizing: border-box; /* Ensure padding is included in dimensions */
      }
    `,
	});

	// Generate a PDF with the padded content
	await page.pdf({
		path: "webpage.pdf",
		format: "A4", // Paper size
		printBackground: true, // Include background colors/images
		margin: {
			top: "0px",
			right: "0px",
			bottom: "0px",
			left: "0px",
		}, // Margins are set to zero because padding is handled by CSS
	});

	console.log('PDF saved as "webpage.pdf"');

	// Close Puppeteer
	await browser.close();
})();
