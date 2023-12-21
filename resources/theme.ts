import { WebsiteConf } from "./states/website";
import { css } from "styled-components";
/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function Theme(website: WebsiteConf | undefined) {
	const theme = localStorage.getItem('dark-mode') === 'true' ? "black" : "white"
	// Determinar a cor do texto com base nas configurações de cores do site
	const color = website?.colors
	const selected = website?.colors[theme]
	let backgroundImage = "";
	if (theme === "black") {
		document.documentElement.classList.add('dark');
		localStorage.setItem('dark-mode', 'true');
	  } else {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('dark-mode', 'false');
	  }
	// Determinar imagem de fundo ou cor
	if (website?.colors[theme]?.background.startsWith("http://") || website?.colors[theme]?.background.startsWith("https://")) {
		backgroundImage = `url(${website?.colors[theme]?.background})`;
	} else if (website?.colors[theme]?.background.startsWith("/")) {
		backgroundImage = `url('${website?.colors[theme]?.background}')`;
	} else if (website?.colors[theme] && /^#[0-9a-fA-F]+$/.test(website?.colors[theme]?.background)) {
		backgroundImage = website?.colors[theme]?.background;
	} else { 
		backgroundImage = "#FFF";
	}
	console.log(color)
	return {
		dark: {
			color: {
				primary: color?.black.color.primary,
				secondary: color?.black.color.secondary,
				tertiary: color?.black.color.tertiary,
			},
			text: {
				primary: color?.black.text.primary,
				secondary: color?.black.text.secondary,
				tertiary: color?.black.text.tertiary,
			}
		},
		light: {
			color: {
				primary: color?.white.color.primary,
				secondary: color?.white.color.secondary,
				tertiary: color?.white.color.tertiary,
			},
			text: {
				primary: color?.white.text.primary,
				secondary: color?.white.text.secondary,
				tertiary: color?.white.text.tertiary,
			}
		},
		selected:selected?.color.primary,
		background: backgroundImage,
	};
}

type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl";

const sizes: Record<Breakpoints, number> = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
};

export const breakpoint =
	(breakpoint: Breakpoints) =>
		(literals: TemplateStringsArray, ...placeholders: any[]) => css`
        @media (min-width: ${sizes[breakpoint]}px) {
            ${css(literals, ...placeholders)}
        }
    `;
