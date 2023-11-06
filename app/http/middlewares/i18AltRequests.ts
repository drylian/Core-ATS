import { i18t } from "@/controllers/Language";
import { NextFunction, Request, Response } from "express";
/**
 * Middleware para configurar o i18Alt
 * @param i18n
 */
export function i18AltRequests(i18n: i18t) {
    return (req: Request, res: Response, next: NextFunction) => {
        req.t = i18n.t;
        req.translate = i18n.translate;
        req.lang = i18n.lang;
        req.language = i18n.language;
        req.langs = i18n.langs;
        req.languages = i18n.languages;
        req.sl = i18n.sl;
        req.setLanguage = i18n.setLanguage;
        req.getNR = i18n.getNR;
        req.getNamespaceResource = i18n.getNamespaceResource;
        next();
    };
}