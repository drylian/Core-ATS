/** @type {import('tailwindcss').Config} */
/**
 * Codigo gerado com o tailwind padrão, doc usada
 * https://www.tailwindcss.cn/docs/guides/vite
 */
module.exports = {
	content: [
		"./resources/index.html",
		"./resources/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		// container: {
		// 	center: true,
		// },
		extend: {
			colors: {
				"dark-purple": "#081A51",
				"light-white": "rgba(255,255,255,0.17)",
			},
		},
	},
	plugins: [],
};

