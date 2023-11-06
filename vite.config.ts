import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "pathe";
import { fileURLToPath } from "node:url";
// https://vitejs.dev/config/
export default defineConfig({
	root: "./resources",
	base: "/",
	plugins: [react()],
	server: {
		open: "/",
	},
	build: {
		outDir: "../app/http/public",
		manifest: true,
	},
	resolve: {
		alias: {
			"@": resolve(dirname(fileURLToPath(import.meta.url)), "resources"),
		},
	},
},
);
