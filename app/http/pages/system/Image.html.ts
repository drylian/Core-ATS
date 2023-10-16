import { json } from '@/utils';
import configuractions from "@/controllers/settings/Default"
import { ColorJson, SettingsJson } from '@/interfaces';
import ImageCss from '../styles/Image.css';

// Função para criar um visualizador de imagem
export default function ImageViewer(Imagem: any) {
  const config: SettingsJson = json(configuractions.configPATH + "/settings.json");
  const color: ColorJson = json(configuractions.configPATH + "/color.json");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
      <title>${config.server.title || "Core"} - Visualizador de Imagem</title>
      ${ImageCss(color,Imagem)}
    </head>
    <body>
      <div class="blur">
        <div class="container">
          <h1>Visualizador de Imagem</h1>
          <div class="imagem">
            <img src="data:image/png;base64, ${Imagem.data}" alt="${Imagem.name}">
          </div>
          <p>${Imagem.name}</p>
          <a href="/">Voltar à página inicial</a>
        </div>
      </div>
    </body>
    </html>
  `;
}
