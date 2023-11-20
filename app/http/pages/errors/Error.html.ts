import { ColorJson, SettingsJson } from "@/interfaces";
import ErrorCss from "@/http/pages/styles/Error.css";
import i18alt from "@/controllers/Language";
import { Request } from "express";
import storage from "@/controllers/Storage";
interface Params {
	err?: {
		name?: string;
		stack?: string;
		message?: string;
		code?: string | number;
	};
	message?: string;
	code?: string;
	title?: string;
	status: number;
	lang?: string;
}
export default function SenderError(params: Params, req: Request) {
	let code: string, title: string;
	const config: SettingsJson = storage.get("config");
	const color: ColorJson = storage.get("color");
	const language = req?.access.lang
		? req?.access.lang
		: req?.language
			? req.language
			: config.server.lang
				? config.server.lang
				: "pt-BR";
	const i18n = new i18alt(language);
	switch (params.status) {
		case 400:
			code = i18n.t("http:errors.400.code");
			title = i18n.t("http:errors.400.title");
			break;
		case 401:
			code = i18n.t("http:errors.401.code");
			title = i18n.t("http:errors.401.title");
			break;
		case 402:
			code = i18n.t("http:errors.402.code");
			title = i18n.t("http:errors.402.title");
			break;
		case 403:
			code = i18n.t("http:errors.403.code");
			title = i18n.t("http:errors.403.title");
			break;
		case 404:
			code = i18n.t("http:errors.404.code");
			title = i18n.t("http:errors.404.title");
			break;
		case 405:
			code = i18n.t("http:errors.405.code");
			title = i18n.t("http:errors.405.title");
			break;
		case 406:
			code = i18n.t("http:errors.406.code");
			title = i18n.t("http:errors.406.title");
			break;
		case 500:
			code = i18n.t("http:errors.500.code");
			title = i18n.t("http:errors.500.title");
			break;
		default:
			code = i18n.t("http:errors.500.code");
			title = i18n.t("http:errors.500.title");
	}
	code = params.code ? params.code : code;
	title = params.title ? params.title : title;

	return `
    <!DOCTYPE html>
	<html lang="${language}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="${i18n.t("meta.description")}.">
		<meta name="keywords" content="${i18n.t("meta.keywords")}.">
		<meta name="author" content="${config.server.title || "Core"}">
        <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
        <title>${config.server.title || "Core"} - ${title}</title>
        ${ErrorCss(color)}
      </head>
      <body>
        <div class="blur"> 
          <div class="error-container">
            <div class="rounded-image">
                <img src="${config.server.logo || "/img/favicon.png"}" alt="--" />
            </div>
			${(() => {
			if (params.err && config.mode === "dev") {
				return `
					<h1>Development Mode</h1>
					${params.err.name ? `<h1>${params.err.name}` : ""} - ${params.err.message ? `${params.err.message}` : ""} - ${params.err.code ? `${params.err.code}</h1>` : ""
					}
					${params.err.stack
						? `  <div class="error-box">
					<p>${params.err.stack.toString()}</p></div>`
						: ""
					}`;
			} else {
				return `
					<h1>${code}</h1>
					<p style="font-size: 24px;">${params.message ? params.message : title}</p>
					`;
			}
		})()}
          </div>
        </div>
      </body>
    </html>
    `;
}
