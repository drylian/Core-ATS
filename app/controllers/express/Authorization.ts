import NotAcceptable from '@/http/pages/errors/406.html';
import { ALTdcp, json } from '@/utils';
import configuractions from "@/controllers/settings/Default"
import User, { UserE } from '@/models/User';
import { Request, Response } from 'express';
import ForbiddenAccess from '@/http/pages/errors/401.html';

export default async function Authenticator(req: Request, res: Response, permission: number): Promise<{ req: Request, res: Response }> {
    return new Promise(async (resolve) => {
        /**
         * Configurações Previas e que podem ser usadas em todos os casos
         */
        const config = json(configuractions.configPATH + "/settings.json")
        const acceptHeader = req.headers.accept || "";
        let token: string;

        if (req.checked === "user") {
            if (req.headers.alternightuser !== null && typeof req.headers.alternightuser === "string") {
                token = req.headers.alternightuser.split(' ')[1]; // configura o token de usuário por Bearer
            } else if (req.cookies.alternightuser !== undefined && typeof req.cookies.alternightuser === "string") {
                token = req.cookies.alternightuser // configura o token de usuário por cookie, caso o Bearer não esteja presente
            } else {
                return res.status(406).send(NotAcceptable("Sua solicitação não pode ser verificada corretamente, tente novamente mais tarde.")); // não sei se é possivel mas...
            }
            const TokenData = ALTdcp<UserE | null>(token, config.server.accessTokenSecret);
            if (TokenData) {
                const DatabaseUser: UserE | null = await User.findOne({ where: { uuid: TokenData.uuid } });
                if (DatabaseUser && DatabaseUser.permissions !== null && DatabaseUser.permissions < permission) {
                    if (acceptHeader.includes("text/html")) {
                        return res.status(401).send(ForbiddenAccess("Você não possui autoridade o suficiente para usar esta rota.", { id: TokenData?.id || 0, username: TokenData?.username }));
                    } else if (acceptHeader.includes("application/json")) {
                        return res.status(401).json({ message: "Você não possui autoridade o suficiente para usar esta rota" });
                    } else if (acceptHeader.includes("text/plain")) {
                        return res.status(401).send("Você não possui autoridade o suficiente para usar esta rota");
                    } else {
                        return res.status(406).send("Request invalida");
                    }
                }
                // Carrega params de usuário
                if (DatabaseUser !== null) req.user = DatabaseUser;
                resolve({ req, res });
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
        } else if (req.checked === "authorization") {
            //Configuração para tokens, ainda não feita

        } else {
            if (acceptHeader.includes("text/html")) {
                return res.status(406).send(NotAcceptable("Sua solicitação não pode ser verificada corretamente, tente novamente mais tarde."));
            } else if (acceptHeader.includes("application/json")) {
                return res.status(406).json({ message: "Sua solicitação não pode ser verificada corretamente, tente novamente mais tarde." });
            } else {
                return res.status(406).send("Sua solicitação não pode ser verificada corretamente, tente novamente mais tarde");
            }
        }
    });
}
