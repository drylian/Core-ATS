import HtmlIndex from "@/http/pages/system/index.html";
import { Application } from "express";
import { generateCsrfToken } from "@/http/middlewares/CSRF";

async function ViteInjector(app: Application) {
	// Import necessary functions and modules
	const { createServer } = await import("vite");

	// Create Vite server in middleware mode
	const vite = await createServer({
		server: { middlewareMode: true },
		appType: "custom", // Don't include Vite's default HTML handling middlewares
	});

	// Use vite's connect instance as middleware
	app.use(vite.middlewares);

	app.use("*", async (req, res) => {
		// Transform and send the index HTML
		vite.transformIndexHtml(req.originalUrl, HtmlIndex(generateCsrfToken()(req, res, true), "dev")).then((html) => {
			res.status(200).send(html);
		});
	});
}

export default ViteInjector;
