import { json } from '@/utils';
import configuractions from "@/controllers/settings/Default"
import { ColorJson, SettingsJson } from '@/interfaces';
import ErrorCss from '@/http/pages/styles/Error.css';

export default function Forbidden(message?: string) {
    const config: SettingsJson = json(configuractions.configPATH + "/settings.json");
    const color: ColorJson = json(configuractions.configPATH + "/color.json");
  
    return (`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />

        <title>${config.server.title || "Core"} - Erro 403 - Proibido</title>
        ${ErrorCss(color)}
      </head>
      <body>
        <div class="blur">
          <div class="error-container">
            <div class="rounded-image">
                <img src="${config.server.logo || "/img/favicon.png"}" alt="Imagem Redonda" />
            </div>
            <h1>Erro 403</h1>
            <p>${message ? message : "Acesso não autorizado."}</p>
          </div>
        </div>
      </body>
      </html>
    `);
  }
  