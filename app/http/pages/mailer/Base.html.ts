import storage from "@/controllers/Storage";
import MailerCss from "./Styles.ccs";
import { SettingsJson } from "@/interfaces";
import I18alt from "@/controllers/Language";

export default function MailerHtml(Content: string, lang: string = "pt-BR") {
	const i18n = new I18alt(lang);
	const config = storage.get<SettingsJson>("config");
	return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${MailerCss()}
        </head>
        <body>
            <div class="container">
                <div class="gradient-container">
                    ${Content}
                </div>
                <p class="footer">
                    ${i18n.t("attributes.ServiceThanks")}
                    <br>
                    <a href="${config.server.url}" class="blue-text" target="_blank"
                        rel="noopener noreferrer">${config.server.title}</a> Team
                </p>

                <footer class="footer">
                    &copy; <a href="${config.server.url}" class="blue-text" target="_blank"
                        rel="noopener noreferrer">${config.server.title}</a> - ${new Date().getFullYear()} ${i18n.t(
	"attributes.AllRightsReserved",
)}
                </footer>
            </div>
        </body>
    `;
}
