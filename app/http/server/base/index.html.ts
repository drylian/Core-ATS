import { load } from "cheerio";
import { SettingsJson } from "@/interfaces";
import I18alt from "@/controllers/Language";
import storage from "@/controllers/Storage";
import { Request } from "express";
/**
 *
 * @returns Html principal do sistema, usado para rederizar o React
 */
export default function render(req: Request) {
    const config: SettingsJson = storage.get("config");
    const language = req?.access.lang
        ? req?.access.lang
        : req?.language
            ? req.language
            : config.server.lang
                ? config.server.lang
                : "pt-BR";
    const i18n = new I18alt(language);
    const html = `
        <!DOCTYPE html>
        <html lang="${language}">
            <head>
                <meta charset="UTF-8" />
                <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="${i18n.t("meta.description")}.">
                <meta name="keywords" content="${i18n.t("meta.keywords")}.">
                <meta name="author" content="${config.server.title || "Core"}">
                <title>${config.server.title || "Core"}</title>
                <!--Server Params-->
                <!--Server Manifest-->
            </head>
            <body>
                <!--Server Responsive-->
            </body>
        </html>
    `;
    return { html, i18n };
}
