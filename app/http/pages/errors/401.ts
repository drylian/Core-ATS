import { json } from '@/utils';
import configuractions from "@/controllers/settings/Default"
import { ColorJson, SettingsJson } from '@/interfaces';
import Loggings from '@/controllers/Loggings';
export default function ForbiddenAccess(message: string, decoded?: { username: string, id: number }) {
  const core = new Loggings("Segurança", "red");
  const config: SettingsJson = json(configuractions.configPATH + "/settings.json");
  const color: ColorJson = json(configuractions.configPATH + "/color.json");

  // Usar as configurações de cor
  const primaryColor = color.primaria;
  const secondaryColor = color.secundaria;

  if (decoded) {
    const { username, id } = decoded
    core.warn("Alerta Acesso de conta sem privilegios administrativos na api protegida " + `[usuário:${username}].blue - [id:${id}].blue`)
  }
  return (`
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="${color.logo || "/img/core-logo.png"}" />
        <title>${config.server.title || "Core"} - Erro 401 - Acesso Proibido</title>
        <style>
          body {
            background: url(${color.background.type === 'img' ? color.background.value : ''}) no-repeat;
            background-attachment: fixed;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }

          .blur {
            background: rgba(255, 255, 255, 0.35);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(13.5px);
            -webkit-backdrop-filter: blur(13.5px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
          }

          .error-container {
            text-align: center;
            background-color: transparent;
            border-radius: 10px;
            padding: 30px;
            max-width: 400px;
          }

          .rounded-image {
            max-width: 150px;
            max-height: 150px;
            border-radius: 50%;
            border: 5px solid #fff;
            margin-bottom: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }

          h1 {
            font-size: 36px;
            color: ${primaryColor}; /* Use a cor primária aqui */
            margin-bottom: 10px;
          }

          p {
            font-size: 18px;
            color: ${secondaryColor}; /* Use a cor secundária aqui */
            margin-bottom: 20px;
          }

          a {
            text-decoration: none;
            color: #fff;
            background-color: #007bff;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 18px;
            transition: background-color 0.3s;
          }

          a:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="blur">
          <div class="error-container">
            <h1>Erro 401</h1>
            <p>${message ? message : "O acesso desta página é proibido, isso foi registrado."}.</p>
            <a href="/">Voltar à página inicial</a>
          </div>
        </div>
      </body>
      </html>
    `);
}
