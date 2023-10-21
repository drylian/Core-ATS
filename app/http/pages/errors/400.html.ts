import { json } from "@/utils";
import configuractions from "@/controllers/settings/Default";
import { ColorJson, SettingsJson } from "@/interfaces";
import ErrorCss from "../styles/Error.css";
export default function BadRequest(message?: string) {
	const config: SettingsJson = json(configuractions.configPATH + "/settings.json");
	const color: ColorJson = json(configuractions.configPATH + "/color.json");

	return (`
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
        <title>${config.server.title || "Core"} - Erro 400 - Bad Request</title>
        ${ErrorCss(color)}
      </head>
      <body>
        <div class="blur">
          <div class="error-container">
            <h1>Erro 400</h1>
            <div class="rounded-image">
              <img src="${config.server.logo || "/img/favicon.png"}" alt="Imagem Redonda" />
            </div>
            <p>${message ? message : "A solicitação é inválida. Parâmetros de solicitação ausentes ou malformados."}.</p>
            <a href="/">Voltar à página inicial</a>
          </div>
        </div>
      </body>
      </html>
    `);
}
