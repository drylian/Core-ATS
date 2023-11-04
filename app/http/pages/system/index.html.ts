import { SettingsJson } from "@/interfaces";
import ViteRender from "@/controllers/express/vite/ViteRender";
import SenderError from "@/http/pages/errors/Error.html";
import I18alt from "@/controllers/Language";
import storage from "@/controllers/Storage";

/**
 *
 * @returns Html principal do sistema, usado para rederizar o React
 */
export default function HtmlIndex(csrftoken: string, dev?: string) {
	const i18n = new I18alt();
	const config: SettingsJson = storage.get("config");
	const { scriptTags, linkTags, scssLinkTags, error } = ViteRender(); // Chama a função ViteRender aqui.

	if (error) {
		return SenderError({ status: 500, message: i18n.t("http:errors.ReactResourcesNotFound") });
	} else
		return `
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <!-- Server Params-->
    <script>
        window.CsrfToken = ${csrftoken}
    </script>
    ${dev ? "<!-- Modo Desenvolvedor -->" : "<!-- Modo Produção --> \n" + linkTags + scriptTags + scssLinkTags}
</head>

<body>
    <div id="root"></div>
    <script type="module" src="/Index.tsx"></script>
</body>

</html>
`;
}
