
import ResponseSender from "@/controllers/express/ResponseSender";
import { NextFunction, Request, Response } from "express";
/**
 * Middleware para o res.sender(params), para dar alias a algumas configurações do req e res
 */
export function SenderSettings() {
    return (req: Request, res: Response, next: NextFunction) => {
        res.header({"Content-Security-Policy":""})
        res.sender = (params) => {
            ResponseSender(req, res, params);
        };
        next();
    };
}