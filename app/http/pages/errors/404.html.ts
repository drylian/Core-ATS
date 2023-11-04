import { json } from "@/utils";
import configuractions from "@/controllers/settings/Default";
import { ColorJson, SettingsJson } from "@/interfaces";
import ErrorCss from "@/http/pages/styles/Error.css";
import storage from "@/controllers/Storage";
export default function ErrorNotFound(message?: string) {
	const config: SettingsJson = storage.get("config")
	const color: ColorJson = storage.get("color")
	return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
        <title>${config.server.title || "Core"} - Erro 404 - Página não encontrada</title>
        ${ErrorCss(color)}
      </head>
      <body>
        <div class="blur">
          <div class="error-container">
            <div class="rounded-image">
              <img src="${config.server.logo || "/img/favicon.png"}" alt="Imagem Redonda" />
            </div>
            <h1>Erro 404</h1>
            <p>${message ? message : "Desculpe, a página que você está procurando não foi encontrada."}.</p>
            <a href="/">Voltar à página inicial</a>
          </div>
        </div>
      </body>
      </html>
    `;
}
