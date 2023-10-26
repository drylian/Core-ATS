import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import fsBackend from 'i18next-fs-backend';
import configurations from '@/controllers/settings/Default';

i18next
    .use(fsBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        lng: 'pt-BR',
        ns: ["backend"],
        backend: {
            loadPath: configurations.rootPATH + '/langs/{{lng}}/{{ns}}.json', 
        },
        fallbackLng: 'en',
        preload: ['en', 'pt-BR'],
    });

export default i18next;
export { i18nextMiddleware };
