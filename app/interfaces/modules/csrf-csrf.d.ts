// esse type foi retirado do csrf-csrf, os any n é culpa minha
/* eslint-disable  @typescript-eslint/no-explicit-any */
declare module 'csrf-csrf' {
    import type { CookieOptions, NextFunction, Request, Response } from 'express';
    import type { HttpError } from 'http-errors';
    export type SameSiteType = boolean | 'lax' | 'strict' | 'none';
    export type TokenRetriever = (req: Request) => string | null | undefined;
    export type DoubleCsrfCookieOptions = Omit<CookieOptions, 'httpOnly'>;
    declare module 'http' {
        interface IncomingHttpHeaders {
            'x-csrf-token'?: string | undefined;
        }
    }
    declare module 'express-serve-static-core' {
        interface Request {
            csrfToken?: (overwrite?: boolean) => ReturnType<CsrfTokenCreator>;
        }
    }
    export type CsrfSecretRetriever = (req?: Request) => string | any;
    export type DoubleCsrfConfigOptions = Partial<DoubleCsrfConfig> & {
        getSecret: CsrfSecretRetriever;
    };
    export type doubleCsrfProtection = (req: Request, res: Response, next: NextFunction) => void;
    export type RequestMethod =
        | 'GET'
        | 'HEAD'
        | 'PATCH'
        | 'PUT'
        | 'POST'
        | 'DELETE'
        | 'CONNECT'
        | 'OPTIONS'
        | 'TRACE'
        | 'PATCH';
    export type CsrfIgnoredMethods = RequestMethod[];
    export type CsrfRequestValidator = (req: Request) => boolean;
    export type CsrfTokenAndHashPairValidator = (token: string, hash: string, secret: string) => boolean;
    export type CsrfCookieSetter = (
        res: Response,
        name: string,
        value: string,
        options: DoubleCsrfCookieOptions,
    ) => void;
    export type CsrfTokenCreator = (req: Request, res: Response, ovewrite?: boolean) => string;
    export interface DoubleCsrfConfig {
        getSecret: CsrfSecretRetriever;
        cookieName: string;
        size: number;
        cookieOptions: DoubleCsrfCookieOptions;
        ignoredMethods: CsrfIgnoredMethods;
        getTokenFromRequest: TokenRetriever;
    }
    export interface DoubleCsrfUtilities {
        invalidCsrfTokenError: HttpError;
        generateToken: CsrfTokenCreator;
        validateRequest: CsrfRequestValidator;
        doubleCsrfProtection: doubleCsrfProtection;
    }
    export declare function doubleCsrf({
        getSecret,
        cookieName,
        cookieOptions: { sameSite, path, secure, ...remainingCOokieOptions },
        size,
        ignoredMethods,
        getTokenFromRequest,
    }: DoubleCsrfConfigOptions): DoubleCsrfUtilities;
}
