import { ColorJson, SettingsJson } from "@/interfaces";
import ErrorCss from "@/http/pages/styles/Error.css";
import i18alt from "@/controllers/Language";
import { Request } from "express";
import storage from "@/controllers/Storage";
interface Params {
    req?: Request;
    message?: string;
    status: number;
    lang?: string;
}
export default function SenderError(params: Params) {
	let code: string, title: string;
	const config: SettingsJson = storage.get("config");
	const color: ColorJson = storage.get("color");
	const i18n = new i18alt();
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

	return `
    <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            <h1>${code}</h1>
            <p>${params.message ? params.message : "Algo desconhecido aconteceu."}</p>
          </div>
        </div>
      </body>
      </html>
    `;
}
