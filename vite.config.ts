import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
	},
},
);
