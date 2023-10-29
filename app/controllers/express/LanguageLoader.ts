import i18next from 'i18next';

import i18nextMiddleware from 'i18next-http-middleware';
import fsBackend from 'i18next-fs-backend';
import configurations from '@/controllers/settings/Default';

export const i18nextConfig = {
    lng: 'pt-BR',
    ns: ['backend'],
    backend: {
        loadPath: configurations.rootPATH + '/langs/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    preload: ['en', 'pt-BR', 'cn'],
};
i18next.use(fsBackend).use(i18nextMiddleware.LanguageDetector).init(i18nextConfig);

export default i18next;
export { i18nextMiddleware };
