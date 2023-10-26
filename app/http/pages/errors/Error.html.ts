import { json } from '@/utils';
import configuractions from '@/controllers/settings/Default';
import { ColorJson, SettingsJson } from '@/interfaces';
import ErrorCss from '@/http/pages/styles/Error.css';
import i18next from '@/controllers/express/LanguageLoader';
interface Params {
    message?: string;
    status: number;
    lang: string;
}
export default function SenderError(params: Params) {
    let code: string, title: string;
    const config: SettingsJson = json(configuractions.configPATH + '/settings.json');
    const color: ColorJson = json(configuractions.configPATH + '/color.json');

    switch (params.status) {
        case 400:
            code = i18next.t('HTTPErrors.400.code', { ns: 'backend' });
            title = i18next.t('httpStatus.400.title', { ns: 'backend' });
            break;
        case 401:
            code = i18next.t('httpStatus.401.code', { ns: 'backend' });
            title = i18next.t('httpStatus.401.title', { ns: 'backend' });
            break;
        case 402:
            code = i18next.t('httpStatus.402.code', { ns: 'backend' });
            title = i18next.t('httpStatus.402.title', { ns: 'backend' });
            break;
        case 403:
            code = i18next.t('httpStatus.403.code', { ns: 'backend' });
            title = i18next.t('httpStatus.403.title', { ns: 'backend' });
            break;
        case 404:
            code = i18next.t('httpStatus.404.code', { ns: 'backend' });
            title = i18next.t('httpStatus.404.title', { ns: 'backend' });
            break;
        case 405:
            code = i18next.t('httpStatus.405.code', { ns: 'backend' });
            title = i18next.t('httpStatus.405.title', { ns: 'backend' });
            break;
        case 406:
            code = i18next.t('httpStatus.406.code', { ns: 'backend' });
            title = i18next.t('httpStatus.406.title', { ns: 'backend' });
            break;
        case 500:
            code = i18next.t('httpStatus.500.code', { ns: 'backend' });
            title = i18next.t('httpStatus.500.title', { ns: 'backend' });
            break;
        default:
            code = i18next.t('httpStatus.500.code', { ns: 'backend' });
            title = i18next.t('httpStatus.500.title', { ns: 'backend' });
    }

    return `
    <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="${config.server.logo || '/img/favicon.png'}" />
        <title>${config.server.title || 'Core'} - ${title}</title>
        ${ErrorCss(color)}
      </head>
      <body>
        <div class="blur">
          <div class="error-container">
            <div class="rounded-image">
                <img src="${config.server.logo || '/img/favicon.png'}" alt="--" />
            </div>
            <h1>${code}</h1>
            <p>${params.message ? params.message : 'Algo desconhecido aconteceu.'}</p>
          </div>
        </div>
      </body>
      </html>
    `;
}
