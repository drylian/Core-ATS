import { load } from "cheerio";

/**
 * primeira versão do Viteless, com o objetivo de ler o index.html.*s ao invez de index.html
 */

/**
 * Viteless, serve para obter os params do react usar em .html.ts
 * @param html html gerado pelo react
 * @returns
 */
export default function Viteless(html: string): string {
	// Use cheerio para carregar o HTML
	const $ = load(html);

	// Encontre a tag <title> e, em seguida, os elementos irmãos até o final de </head>
	const titleElement = $("title");
	const elements: string[] = [];

	titleElement.nextUntil("head").each((index, element) => {
		// Converta o elemento para um elemento do DOM
		const domElement = element;

		elements.push($.html(domElement));
	});

	// Formate os elementos em uma única string separada por quebras de linha
	const conteudoHead = elements.join("\n");

	return conteudoHead;
}
