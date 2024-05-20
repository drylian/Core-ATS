import { NextFunction, Request, Response } from "express";

export default function PresenceChecker(req: Request, res: Response, next: NextFunction) {
    const AuthorizationToken = req.headers.authorization
    /**
     * Define que o acesso é um usuário
     */
    if (req.declares && req.declares.type === "Cookie") {
        return next();
    }
    /**
     * Define que talvez o acesso seja um Token
     */
    if (AuthorizationToken !== undefined) {
        /**
         * Válida se o acesso foi configurado direito, e para garantir que apenas api do tipo Client e Administration
         */
        if (AuthorizationToken.split(" ")[1] && ["Administration", "Client"].includes(AuthorizationToken.split(" ")[0])) {
            req.declares = {
                token: AuthorizationToken.split(" ")[1],
                type: AuthorizationToken.split(" ")[0] as "Administration" | "Client"
            }
            return next();
        }
    }
    /**
     * Tratamento para Requests Inválidas (Security 1)
     */
    switch (req.accepts(["html", "json", "txt"])) {
        case "html":
            req.declares = {
                type: "Guest"
            }
            return next();
        case "json":
            req.declares = {
                type: "Guest"
            }
            return next();
        case "txt":
            return res.status(401).type("txt").send('Invalid Request, use Authorization Token or Cookie Form.')
        default:
            return res.status(401).type("txt").send('Invalid Request, use Authorization Token or Cookie Form.')
    }
}
