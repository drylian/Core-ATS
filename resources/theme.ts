import { WebsiteConf } from "./states/website";
import { css } from "styled-components";
/* eslint-disable  @typescript-eslint/no-explicit-any */

export default function Theme(website: WebsiteConf | undefined) {
	// Determinar a cor do texto com base nas configurações de cores do site
	const color =
        website && website.colors && website.colors.selected
        	? website.colors[website.colors.selected]
        	: website?.colors["black"];

	let backgroundImage = "";

	// Determinar imagem de fundo ou cor
	if (color?.background.startsWith("http://") || color?.background.startsWith("https://")) {
		backgroundImage = `url(${color?.background})`;
	} else if (color?.background.startsWith("/")) {
		backgroundImage = `url('${color?.background}')`;
	} else if (color && /^#[0-9a-fA-F]+$/.test(color?.background)) {
		backgroundImage = color?.background;
	} else {
		backgroundImage = "#FFF";
	}

	return {
		textpri: color?.text?.primary || "white",
		textsec: color?.text?.secondary || "white",
		textter: color?.text?.tertiary || "white",
		corpri: color?.color?.primary || "white",
		corsec: color?.color?.secondary || "white",
		corter: color?.color?.tertiary || "white",
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
