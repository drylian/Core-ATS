import { dirEX, json } from '@/utils';
import configuractions from "@/controllers/settings/Default";
import { SettingsJson } from '@/interfaces';
import fs from "fs";
import Viteless from '@/controllers/express/ViteTransforme';
import path from 'path';
/**
 * 
 * @returns Html principal do sistema, usado para rederizar o React
 */
export default function HtmlIndex() {
    const config: SettingsJson = json(configuractions.configPATH + "/settings.json");
    let html:string = "";
    if(dirEX(configuractions.rootPATH + '/http/public/index.html')) {
        const indexPath = path.join(configuractions.rootPATH + '/http/public/index.html')
        html = fs.readFileSync(indexPath, 'utf8');
    }

    return `
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
    <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    ${html ? Viteless(html) : "<!-- Html not Found -->"}

</head>

<body>
    <div id="root"></div>
    <script type="module" src="/Index.jsx"></script>
</body>

</html>
`
}