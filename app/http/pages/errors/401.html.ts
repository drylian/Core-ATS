import { json } from "@/utils";
import configuractions from "@/controllers/settings/Default";
import { ColorJson, SettingsJson } from "@/interfaces";
import Loggings from "@/controllers/Loggings";
import ErrorCss from "../styles/Error.css";
export default function Unauthorized(message: string, decoded?: { username: string, id: number }) {
	const core = new Loggings("Segurança", "red");
	const config: SettingsJson = json(configuractions.configPATH + "/settings.json");
	const color: ColorJson = json(configuractions.configPATH + "/color.json");

	if (decoded) {
		const { username, id } = decoded;
		core.warn("Alerta Acesso de conta sem privilegios administrativos na api protegida " + `[usuário:${username}].blue - [id:${id}].blue`);
	}
	return (`
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
        <title>${config.server.title || "Core"} - Erro 401 - Acesso Proibido</title>
        ${ErrorCss(color)}
      </head>
      <body>
        <div class="blur">
          <div class="error-container">
            <h1>Erro 401</h1>
            <div class="rounded-image">
              <img src="${config.server.logo || "/img/favicon.png"}" alt="Imagem Redonda" />
            </div>
            <p>${message ? message : "O acesso desta página é proibido, isso foi registrado."}.</p>
            <a href="/">Voltar à página inicial</a>
          </div>
        </div>
      </body>
      </html>
    `);
}
