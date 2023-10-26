import { json } from '@/utils';
import configuractions from '@/controllers/settings/Default';
import { SettingsJson } from '@/interfaces';
import ViteRender from '@/controllers/express/vite/ViteRender';
import ErrorInternal from '@/http/pages/errors/500.html';

/**
 *
 * @returns Html principal do sistema, usado para rederizar o React
 */
export default function HtmlIndex(csrftoken: string, dev?: string) {
    const config: SettingsJson = json(configuractions.configPATH + '/settings.json');
    const { scriptTags, linkTags, scssLinkTags, error } = ViteRender(); // Chama a função ViteRender aqui.

    if (error) {
        return ErrorInternal('Erro interno ao tentar carregar o compilado do react, o vite foi buildado?');
    } else
        return `
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="${config.server.logo || '/img/favicon.png'}" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <!-- Server Params-->
    <script>
        window.CsrfToken = ${csrftoken}
    </script>
    ${dev ? '<!-- Modo Desenvolvedor -->' : '<!-- Modo Produção --> \n' + linkTags + scriptTags + scssLinkTags}
</head>

<body>
    <div id="root"></div>
    <script type="module" src="/Index.tsx"></script>
</body>

</html>
`;
}
