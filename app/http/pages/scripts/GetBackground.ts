import { ColorJson } from "@/interfaces";

export default function getBackground(color: ColorJson) {
	const theme = color[color.selected || "black"];
	const background = theme.background;

	let backgroundImage = "";

	if (background.startsWith("http://") || background.startsWith("https://")) {
		backgroundImage = `url(${background})`;
	} else if (background.startsWith("/")) {
		backgroundImage = `url('${background}')`;
	} else if (/^#[0-9a-fA-F]+$/.test(background)) {
		backgroundImage = background;
	}

	return backgroundImage;
}