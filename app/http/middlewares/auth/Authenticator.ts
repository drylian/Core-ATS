import { NextFunction, Response, Request } from 'express';
import { ALTdcp, json } from '@/utils';
import configuractions from "@/controllers/settings/Default"
import User, { UserE } from '@/models/User';
import ForbiddenAccess from '@/http/pages/errors/401';

// Middleware de verificação
async function Authenticator(req: Request, res: Response, next: NextFunction) {
    const config = json(configuractions.configPATH + "/settings.json")
    if (!req.headers.authorization) {
        const acceptHeader = req.headers.accept || "";

        const { alternightuser } = req.headers;

        let token: string
        if (alternightuser) {
            const [, valores] = (alternightuser as string).split(' ');
            token = valores
        } else if (req.cookies.alternightuser) {
            token = req.cookies.alternightuser
        } else {
            return res.redirect("/auth/login");
        }

        if (!token) {
            if (acceptHeader.includes("text/html")) {
                return res.status(401).send(ForbiddenAccess("Token ausente."));
            } else if (acceptHeader.includes("application/json")) {
                return res.status(401).json({ message: "Token ausente" });
            } else if (acceptHeader.includes("text/plain")) {
                return res.status(401).send("Token ausente");
            } else {
                return res.status(406).send("Request invalida");
            }
        }

        const Userdata = ALTdcp<UserE | null>(token, config.server.accessTokenSecret);
        if (Userdata) {
            const UserCode: UserE | null = await User.findOne({ where: { uuid: (Userdata.uuid as string) } });
            if (UserCode && UserCode.permissions !== null && UserCode.permissions < 2000) {
                if (acceptHeader.includes("text/html")) {
                    return res.status(401).send(ForbiddenAccess("Você não possui permissão para estar aqui.", { id: Userdata?.id || 0, username: Userdata?.username }));
                } else if (acceptHeader.includes("application/json")) {
                    return res.status(401).json({ message: "Você não possui permissão para estar aqui" });
                } else if (acceptHeader.includes("text/plain")) {
                    return res.status(401).send("Você não possui permissão para estar aqui");
                } else {
                    return res.status(406).send("Request invalida");
                }
            }
            req.user = UserCode;
            return next()
        } else {
            if (acceptHeader.includes("text/html")) {
                return res.status(401).send(ForbiddenAccess("Token inválido."));
            } else if (acceptHeader.includes("application/json")) {
                return res.status(401).json({ message: "Token inválido" });
            } else if (acceptHeader.includes("text/plain")) {
                return res.status(401).send("Token inválido");
            } else {
                return res.status(406).send("Request invalida");
            }
        }
    } else {
        console.log("api usada")
    }
}

export default Authenticator;