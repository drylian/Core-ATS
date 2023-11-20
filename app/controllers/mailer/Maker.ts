import i18alt from "../Language";
type Color =
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "orange"
    | "purple"
    | "pink"
    | "brown"
    | "gray"
    | "gold"
    | "silver"
    | "turquoise"
    | "aquamarine"
    | "bisque"
    | "chocolate"
    | "cornflowerblue"
    | "darkgreen"
    | "dodgerblue"
    | "firebrick"
    | "hotpink"
    | "indigo"
    | "lawngreen"
    | "lightcoral"
    | "navy"
    | "olive"
    | "plum"
    | "rebeccapurple"
    | "saddlebrown"
    | "seagreen"
    | "tomato"
    | "violet"
    | "wheat"
    | "yellowgreen";

export default class MailMaker {
	private content: string;
	private i18n: i18alt;

	constructor(lang: string = "pt-BR") {
		this.content = "";
		this.i18n = new i18alt(lang);
	}
	public title(text: string, color?: Color) {
		this.content += `<h1 ${color ? `style="color: ${color}"` : ""}>${text}</h1>`;
	}
	public color(text: string, color: Color) {
		this.content += `<span style="color: ${color}">${text}</span>`;
	}

	public user(value: string) {
		this.content += ` <p> ${this.i18n.t("attributes.Hello")} <span class="blue-text">${value}</span>!</p>`;
	}

	public message(value: string) {
		this.content += ` <p>${value}</p>`;
	}

	public link(link: string, text: string, color?: Color) {
		this.content += `<a href="${link}" ${
			color ? `style="color: ${color}"` : "class=\"blue-text\""
		} target="_blank" rel="noopener noreferrer">${text}</a>`;
	}

	public get code(): string {
		return this.content;
	}
}
