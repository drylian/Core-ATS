import { UserE } from "@/models/User";

interface Params<T> {
    message?: string;
    json?: T;
    err?: ErrType;
    list?: object[];
}
declare global {
    namespace Express {
        interface Request {
            /**
             * (Alias do translate) Traduz uma chave para o idioma atual.
             * @param {string} key - A chave de tradução.
             * @param {Record<string, string>} params (Opcional) - Parâmetros para substituição na tradução.
             * @returns {string} A tradução resultante.
             */
            t(key: string, params?: Record<string, string>): string;
            /**
             * Traduz uma chave para o idioma atual.
             * @param {string} key - A chave de tradução.
             * @param {Record<string, string>} params - Parâmetros para substituição na tradução.
             * @returns {string} A tradução resultante.
             */
            translate(key: string, params?: Record<string, string>): string;
            /**
             * (Alias do language) Obtém o idioma atual.
             * @returns {string} O idioma atual.
             */
            lang: string;
            /**
             * Obtém o idioma atual.
             * @returns {string} O idioma atual.
             */
            language: string;
            /**
             * Obtém a lista de idiomas disponíveis.
             * @returns {string[]} A lista de idiomas disponíveis em um array.
             */
            languages: string[];
            /**
             * (Alias do languages) Obtém a lista de idiomas disponíveis.
             * @returns {string[]} A lista de idiomas disponíveis em um array.
             */
            langs: string[];
            /**
             * (Alias do setLanguage) Define o idioma atual.
             * @param {string} lang - O idioma a ser definido como idioma atual.
             */
            sl(lang: string | undefined): boolean;
            /**
             * Define o idioma atual.
             * @param {string} lang - O idioma a ser definido como idioma atual.
             */
            setLanguage(lang:string | undefined): boolean;
            /**
             * ( Alias do getNamespaceResource ) Obtem um json do namespace selecionado.
             * @param {string} namespace - o namespace selecionado.
             * @param {string} lang - O idioma a ser definido (opicional, caso não definido será usado o padrão).
             */
            getNR(namespace: string, i18next: boolean, lang?: string): object;
            /**
             * ( Alias do getNamespaceResource ) Obtem um json do namespace selecionado.
             * @param {string} namespace - o namespace selecionado.
             * @param {string} lang - O idioma a ser definido (opicional, caso não definido será usado o padrão).
             */
            getNamespaceResource(namespace: string, i18next: boolean, lang?: string): object;
            /**
             * Configuração de Authorização, retorna alguns params uteis que podem ser usados no request
             */
            access: {
                auth?:boolean;
                user?: UserE;
                permissions?: number;
                type?: "user" | "token";
                tokenref?:string;
                uuid?: string;
                lang?: string;
                ip?: string | string[] | undefined;
                nonce?: string;
                id?:number | null;
                cookie?: UserE;
            };
            checked: "user"| "client" | "authorization" | "guest";
        }
        interface Response {
            sender<T>(params: Params<T>): void;
        }
    }
}
