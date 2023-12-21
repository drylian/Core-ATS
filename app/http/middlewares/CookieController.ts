import storage from "@/controllers/Storage";
import { SettingsJson } from "@/interfaces";
import { NextFunction, Request, Response } from "express";
import User, { UserE } from "@/models/User";
import { ALTcpt, ALTdcp, AlTexp, gen } from "@/utils";
import Loggings from "@/controllers/Loggings";

/**
 * Controllador dos Cookies para o Frontend
 */
export function CookieController() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const core = new Loggings("Cookies Frontend", "cyan")
        /**
         * Obtem o ip do Acesso, seja cookie ou token.
         */
        req.access.ip = req.headers["x-forwarded-for"] ?? req.ip ?? req.socket.remoteAddress;

        // configurações do painel
        const config: SettingsJson = storage.get("config");

        /**
         * Retorno para caso esteja acessando por Bearer ou não está logado
         */
        if (!req.signedCookies["X-Application-Access"] && !req.signedCookies["X-Application-Refresh"]) return next();

        try {
            /**
             * Access que é o token de acesso
             */
            let access: { data: UserE, expires: number } | null = null

            /**
             * Refresh que é o token de renovação, para renovar o acesso
             */
            let refresh: { data: { remember: string }, expires: number } | null = null

            /**
             * Se tiver Access ele é setado
             */
            if (req.signedCookies["X-Application-Access"]) access = ALTdcp<{ data: UserE, expires: number } | null>(
                req.signedCookies["X-Application-Access"],
                config.server.accessTokenSecret,
                req.access.ip?.toString(),
            );

            /**
             * Se tiver Refresh ele é setado
             */
            if (req.signedCookies["X-Application-Refresh"]) refresh = ALTdcp<{ data: { remember: string }, expires: number } | null>(
                req.signedCookies["X-Application-Refresh"],
                config.server.refreshTokenSecret,
                req.access.ip?.toString(),
            );

            if (refresh && !access) {

                const { Access, Refresh, UserResources } = await RefreshUpdate(refresh.data.remember, req.access.ip?.toString(), config)
                if (!Access || !Refresh || !UserResources) {
                    /**
                     * Acontecer isso significa que ou o usuário está com um vencido, ou o token foi modificado/alterado.
                     */
                    res.clearCookie("X-Application-Access");
                    res.clearCookie("X-Application-Refresh");
                    console.log("recebeu a resposta esperada")
                    if (req.accepts("text/html")) {
                        return res.status(302).redirect("/auth/login?callback=" + req.originalUrl);
                    } else {
                        return res.status(302).json({ system:"ReloadPage" })
                    }
                } else {
                    /**
                     * Seta os novos tokens 
                     */
                    res.cookie("X-Application-Access", Access, { signed: true, maxAge: AlTexp("15m"), httpOnly: true });
                    res.cookie("X-Application-Refresh", Refresh, { signed: true, maxAge: AlTexp("90d"), httpOnly: true });
                    // seta o acesso do usuário
                    req.access.cookie = UserResources;
                    return next();
                }
            }
            /**
             * Verificando se access está vencido, 
             * se não verifica se ele tem pelo menos 10m 
             * e se existir refresh, ele atualiza o access com + 15h de duração.
             */
            if (access) {
                const TimerOfUpdate = new Date(Date.now() + AlTexp("10m")).getTime();
                const AccessExpires = new Date(access.expires).getTime();
                if (AccessExpires <= TimerOfUpdate) {
                    if (refresh) {
                        const { Access, Refresh, UserResources } = await RefreshUpdate(refresh.data.remember, req.access.ip?.toString(), config)
                        if (!Access || !Refresh || !UserResources) {
                            /**
                             * Acontecer isso significa que ou o usuário está com um vencido, ou o token foi modificado/alterado
                             */
                            res.clearCookie("X-Application-Access");
                            res.clearCookie("X-Application-Refresh");
                            return res.redirect("/auth/login?callback=" + req.originalUrl)
                        } else {
                            /**
                             * Seta os novos tokens 
                             */
                            res.cookie("X-Application-Access", Access, { signed: true, maxAge: AlTexp("15m"), httpOnly: true });
                            res.cookie("X-Application-Refresh", Refresh, { signed: true, maxAge: AlTexp("90d"), httpOnly: true });
                            // seta o acesso do usuário
                            req.access.cookie = UserResources;
                            return next();
                        }
                    }
                }
                // seta o acesso do usuário
                req.access.cookie = access.data
                return next();
            }
        } catch (e) {
            /**
             * Caso de Erro em algo, ele Reseta completamente a solicitação , 
             * por causa do ALTjwt pode causar isso, 
             * se o tokens principais forem diferentes da dos cookies
             */
            core.debug("Possivelmente não é um erro :", (e as object))
            res.clearCookie("X-Application-Access");
            res.clearCookie("X-Application-Refresh");
            if (req.accepts("text/html")) {
                return res.status(302).redirect("/auth/login?callback=" + req.originalUrl);
            } else {
                return res.status(302).json({ redirect: "/auth/login", callback: req.originalUrl.startsWith("/api") ? null : req.originalUrl })
            }
        }
    }
}

async function RefreshUpdate(remember: string, ip: string | undefined, config: SettingsJson): Promise<{ Access: string | null, Refresh: string | null, UserResources: UserE | null }> {
    const HaveUser = await User.findOne({ where: { remember: remember } });
    let Access: string | null = null, Refresh: string | null = null, UserResources: UserE | null = null;
    if (HaveUser) {
        const data: UserE = HaveUser.dataValues
        delete data.password;
        delete data.id;
        delete (data as { remember?: string }).remember;


        let newRemember: string = "" + gen(64), existRemember;

        /**
         * Loop para achar um refresh que não seja igual a outro(Apenas por Garantia)
         */
        do {
            newRemember = "remember_me_" + gen(64);
            existRemember = await User.findOne({ where: { remember: newRemember } });
        } while (existRemember);

        /**
         * Atualiza o User, renovando o refresh
         */
        await User.update({ remember: newRemember }, { where: { uuid: data.uuid } });

        /**
         * Cria um novo token de acesso
         */
        Access = ALTcpt(data, config.server.accessTokenSecret, {
            ip,
            expires: "15m",
        });

        /**
         * Cria um novo token de renovação
         */
        Refresh = ALTcpt({ remember: newRemember }, config.server.refreshTokenSecret, {
            ip,
            expires: "90d",
        });

        return { Access, Refresh, UserResources: data }
    }
    return { Access, Refresh, UserResources }
}