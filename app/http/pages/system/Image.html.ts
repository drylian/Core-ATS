import { ColorJson, SettingsJson } from "@/interfaces";
import ImageCss from "@/http/pages/styles/Image.css";
import I18alt from "@/controllers/Language";
import storage from "@/controllers/Storage";
import { Request } from "express";

// Função para criar um visualizador de imagem
export default function ImageViewer<T>(Imagem: T, req: Request) {
  const i18n = new I18alt();
  const config: SettingsJson = storage.get("config");
  const color: ColorJson = storage.get("color");

  return `
    <!DOCTYPE html>
    <html lang="${req?.access.lang
      ? req?.access.lang
      : req?.language
        ? req.language
        : config.server.lang
          ? config.server.lang
          : "pt-BR"
    }">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="robots" content="noindex">
      <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
      <title>${config.server.title || "Core"} - ${i18n.t("attributes.VisualizerImage")}</title>
      ${ImageCss(color, Imagem)}
    </head>
    <body>
      <div class="blur">
        <div class="container">
          <h1>${i18n.t("attributes.VisualizerImage")}</h1>
          <div class="imagem">
            <img src="data:image/png;base64, ${(Imagem as { data: string }).data}" alt="${(Imagem as { name: string }).name
    }">
          </div>
          <p>${Imagem as { name: string }}</p>
          <a href="/">${i18n.t("http:messages.BackToMainPage")}</a>
        </div>
      </div>
    </body>
    </html>
  `;
}
