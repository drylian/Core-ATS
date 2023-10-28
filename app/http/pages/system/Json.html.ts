import { json } from '@/utils';
import configuractions from '@/controllers/settings/Default';
import { ColorJson, SettingsJson } from '@/interfaces';
import JsonJS from '@/http/pages/javascript/Json.js';
import JsonCss from '@/http/pages/styles/Json.css';
import i18next from '@/controllers/express/LanguageLoader';

// Função para criar um visualizador de JSON
export default function JsonViewer<T>(jsonData: T) {
  const config: SettingsJson = json(configuractions.configPATH + '/settings.json');
  const color: ColorJson = json(configuractions.configPATH + '/color.json');

  // Converte o objeto JSON em uma string JSON formatada
  const formattedJSON = JSON.stringify(jsonData, null, 2);

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" type="image/png" href="${config.server.logo || '/img/favicon.png'}" />
      <title>${config.server.title || 'Core'} - ${i18next.t('backend:PagesTitles.JsonViewerTitle')}</title>
      ${JsonCss(color)}
    </head>
      <body>
      <div class="pricor min-h-screen flex items-center justify-center min-w-screen">
          <!-- Container principal com margens -->
          <div class="seccor p-6 rounded-lg shadow-lg m-5 box">
              <!-- Título e descrição -->
              <div class="border-b mb-4 pb-4 flex items-center">
                  <img src="${config.server.logo || '/img/favicon.png'}" alt="Imagem"
                      style="max-width: 70px; max-height: 70px; margin-right: 10px;" class="ml-4">

                  <div class="border-b mb-4 pb-4">
                      <h1 class="pritext text-2xl font-bold">${config.server.title || 'Core'} - ${i18next.t('backend:PagesTitles.JsonViewerTitle')}</h1>
                      <p class="sectext text-sm">${i18next.t('backend:messages.JsonViewerApi', { title: `${config.server.title || 'Core'}` })}</p>
                  </div>
              </div>

              <!-- JSON Container -->
              <div class="tercor border mt-4 p-4 overflow-x-auto max-h-screen max-w-screen prebox">
                  <pre class="code" id="codeOutput"></pre>
              </div>
          </div>
      </div>
    ${JsonJS(formattedJSON)}
  </body>

    </html>
  `;
}
