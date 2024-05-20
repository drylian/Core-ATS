import storage from "@/controllers/Storage";
import AuthenticatorController from "@/http/controllers/AuthenticatorController";
import { SettingsJson } from "@/interfaces";
import express from "express";
import axios from 'axios';
import bcrypt from "bcrypt";
import { ALTcpt, genv5 } from "@/utils";
import User from "@/models/User";
import I18alt from "@/controllers/Language";
import { UserActivity } from "@/controllers/database/MakeActivity";
import Loggings from "@/controllers/Loggings";
interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    premium_type: number;
    flags: number;
    banner: string | null;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: string | null;
    banner_color: string;
    mfa_enabled: boolean;
    locale: string;
    email: string;
    verified: boolean;
}
const router = express.Router();

/**
 * Discord Register
 */
router.post("/discord/login", async (Request, Response) => {
    const { res } = await new AuthenticatorController(Request, Response, { only: ["Guest"] }).auth();
    const config: SettingsJson = storage.get("settings")
    const discord = config.discord
    if (discord.auth.active) {
        if (discord.auth.callback && discord.auth.secret && discord.auth.client) {
            return res.status(200).json({ active: true, redirect: `https://discord.com/api/oauth2/authorize?client_id=${discord.auth.client}&redirect_uri=${encodeURIComponent(discord.auth.callback)}&response_type=code&scope=identify` })
        } else {
            res.status(400).json({ active: false, message: "Discord not is configurated" })
        }
    } else {
        res.status(401).json({ active: false, message: "Discord not is active" })
    }
});

router.get('/discord/callback', async (Request, Response) => {
    const core = new Loggings("Registro Discord", "green");

    const { req, res } = await new AuthenticatorController(Request, Response, { only: ["Guest"] }).auth();
    const config = storage.get<SettingsJson>("settings")
    const discord = config.discord
    if (discord.auth.active) {
        if (discord.auth.callback && discord.auth.secret && discord.auth.client && discord.auth.callback) {
            const code = req.query.code as string;
            const tokenResponse = await axios.post(
                'https://discord.com/api/oauth2/token',
                new URLSearchParams({
                    client_id: discord.auth.client,
                    client_secret: discord.auth.secret,
                    code,
                    grant_type: 'authorization_code',
                    redirect_uri: discord.auth.callback,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            // Obter informações do usuário
            const userResponse = await axios.get('https://discord.com/api/users/@me', {
                headers: {
                    Authorization: `Bearer ${tokenResponse.data.access_token}`,
                },
            });
            const user: DiscordUser = userResponse.data;
            const i18n = new I18alt(user.locale)
            if (!user.email) {
                return res.status(401).redirect("/auth/register?Err=" + i18n.t("react:auth.InvalidDiscordEmail"));
            }
            // Verifica se o email já está em uso
            const existingUser = await User.findOne({ where: { email: user.email } });
            if (existingUser) {
                if (bcrypt.compareSync(user.id + config.server.signature, existingUser.dataValues.password)) {
                    req.access.user = existingUser.dataValues
                    await UserActivity(req, "react:auth.MakedLogin", true)
                    res.cookie(
                        "X-Application-Access",
                        ALTcpt(existingUser.dataValues, config.server.accessTokenSecret, {
                            ip: req.access.ip?.toString(),
                        }),
                        { signed: true, httpOnly: true },
                    );
                    return res.status(200).redirect("/");
                } else {
                    return res.status(409).redirect("/auth/register?Err=" + i18n.t("react:auth.EmailHasUsed"));
                }
            }

            const saltRounds = 10; // You can adjust the number of salt rounds as needed
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(user.id + config.server.signature, salt);
            const uuid = genv5(user.email, "users");
            // Cria o usuário no banco de dados
            const newUser = await User.create({
                lang: user.locale,
                username: user.username,
                email: user.email,
                password: hashedPassword,
                uuid: uuid,
            });

            core.log(`Novo usuário foi criado : "${newUser.username}"`);
            req.access.user = newUser.dataValues
            await UserActivity(req, "react:auth.SuccessCreatedUser", true)
            res.cookie(
                "X-Application-Access",
                ALTcpt(newUser.dataValues, config.server.accessTokenSecret, {
                    ip: req.access.ip?.toString(),
                }),
                { signed: true, httpOnly: true },
            );
            return res.status(200).redirect("/");
        } else {
            res.status(400).sender({ message: "Discord not is configurated" })
        }
    } else {
        res.status(401).sender({ message: "Discord not is active" })
    }
});


export default router;
