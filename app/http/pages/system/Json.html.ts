import { json } from '@/utils';
import configuractions from "@/controllers/settings/Default";
import { ColorJson, SettingsJson } from '@/interfaces';
import JsonJS from '../javascript/Json.js';
import JsonCss from '../styles/Json.css';

// Função para criar um visualizador de JSON
export default function JsonViewer<T>(jsonData: T) {
  const config: SettingsJson = json(configuractions.configPATH + "/settings.json");
  const color: ColorJson = json(configuractions.configPATH + "/color.json");

  // Converte o objeto JSON em uma string JSON formatada
  const formattedJSON = JSON.stringify(jsonData, null, 2);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
      <title>${config.server.title || "Core"} - Visualizador de JSON</title>
      ${JsonCss(color)}
    </head>
    <body>
      <div class="blur">
        <div class="container">
          <div class="rounded-image">
            <img src="${config.server.logo || "/img/favicon.png"}" alt="Imagem Redonda" />
            <h1 style="margin-left: 10px;">Visualizador de JSON</h1>
          </div>
          <pre><code id="json"></code></pre>
          <a href="/">Voltar à página inicial</a>
        </div>
      </div>
      ${JsonJS(formattedJSON)}
    </body>
    </html>
  `;
}
