import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
/**
 * Configuração basica do vite, pode ser obtido usando "pnpm create vite"
 */
// https://vitejs.dev/config/
export default defineConfig({
	root:"./resources/",
	input:"./resources/Index.jsx",
	base:"/",
	plugins: [react()],
	build: {
		outDir: "../app/http/public",
	},
},
);
