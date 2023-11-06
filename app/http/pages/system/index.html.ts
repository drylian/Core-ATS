import { SettingsJson } from "@/interfaces";
import SenderError from "@/http/pages/errors/Error.html";
import I18alt from "@/controllers/Language";
import storage from "@/controllers/Storage";
import { Request } from "express";
import ApplicationConfigs from "@/controllers/express/ApplicationConfigs";

/**
 *
 * @returns Html principal do sistema, usado para rederizar o React
 */
export default function HtmlIndex(csrftoken: string, req: Request,manifest:string[], dev?:string) {
    const i18n = new I18alt();
    const config: SettingsJson = storage.get("config");

    if (manifest.length === 0 && !dev) {
        return SenderError({ status: 500, message: i18n.t("http:errors.ReactResourcesNotFound") }, req);
    } else
        return `
        <!DOCTYPE html>
        <html lang="${req?.access.lang
                ? req?.access.lang
                : req?.language
                    ? req.language
                    : config.server.lang
                        ? config.server.lang
                        : "pt-BR"
            }">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <!-- Server Params-->
    <script>
        window.CsrfToken = "${csrftoken}"
        window.WebsiteConf = ${JSON.stringify(ApplicationConfigs().Website, null, 2)}
    </script>
    ${dev ? "<!-- Modo Desenvolvedor -->" : "<!-- Modo Produção --> \n" + manifest.join("\n")}
</head>

<body>
    <div id="root"></div>
    <script nonce="${req?.generated?.nonce}" type="module" src="/Index.tsx"></script>
</body>

</html>
`;
}
