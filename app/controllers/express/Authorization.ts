import { ALTdcp } from "@/utils";
import User, { UserE } from "@/models/User";
import { Request, Response } from "express";
import { ErrType, SettingsJson } from "@/interfaces";
import Loggings from "@/controllers/Loggings";
import Token, { TokenI } from "@/models/Token";
import i18alt from "@/controllers/Language";
import storage from "@/controllers/Storage";

export default function Authenticator(
	req: Request,
	res: Response,
	permission: number,
): Promise<{ req: Request; res: Response }> {
	const i18n = new i18alt();
	const core = new Loggings("Authorization", "cyan");
	// é necessario await para o User e o Token
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve) => {
		/**
         * Configurações Previas e que podem ser usadas em todos os casos
         */
		const config: SettingsJson = storage.get("config");

		try {
			if (req.checked === "user") {
				let token: string;

				if (req.headers.authorization !== null && typeof req.headers.authorization === "string") {
					token = req.headers.authorization.split(" ")[1]; // configura o token de usuário por UserAuth
				} else if (req.cookies.authorization !== undefined && typeof req.cookies.authorization === "string") {
					token = req.cookies.authorization; // configura o token de usuário por cookie, caso o Bearer não esteja presente
				} else {
					return res.status(406).sender({ message: i18n.t("http:messages.NotAcceptableAccess") });
				}

				const TokenData = ALTdcp<UserE | null>(token, config.server.accessTokenSecret);
				if (TokenData) {
					const DatabaseUser: UserE | null = await User.findOne({ where: { uuid: TokenData.uuid } });
					if (DatabaseUser && DatabaseUser.permissions !== null && DatabaseUser.permissions < permission) {
						return res.status(401).sender({ message: i18n.t("http:messages.NotHaveAccessForRoute") });
					}
					// Carrega params de usuário
					if (DatabaseUser !== null) {
						req.user = DatabaseUser;
						req.access.permissions = DatabaseUser.permissions !== null ? DatabaseUser.permissions : 0;
						req.access.type = "user";
						req.access.uuid = DatabaseUser.uuid;
						req.access.lang =
                            DatabaseUser.lang !== null
                            	? DatabaseUser.lang
                            	: config.server.lang
                            		? config.server.lang
                            		: "pt-BR";
					} else {
						return res.status(401).sender({
							message: i18n.t("http:messages.NotHaveTypeAcessForRoute", {
								type: i18n.t("attributes.user"),
							}),
						});
					}
					resolve({ req, res });
				} else {
					return res.status(401).sender({
						message: i18n.t("http:messages.NotHaveTypeAccessToken", {
							type: i18n.t("attributes.user"),
						}),
					});
				}
			} else if (req.checked === "authorization") {
				let token: string;

				if (req.headers.authorization !== null && typeof req.headers.authorization === "string")
					token = req.headers.authorization.split(" ")[1]; // configura o token de usuário por Bearer
				else
					return res.status(401).sender({
						message: i18n.t("http:messages.NotHaveTypeAccessToken", {
							type: i18n.t("attributes.token"),
						}),
					});

				const TokenData = ALTdcp<TokenI | null>(token, config.server.accessTokenSecret);
				if (TokenData) {
					const DatabaseToken: TokenI | null = await Token.findOne({ where: { uuid: TokenData.uuid } });
					if (DatabaseToken && DatabaseToken.permissions !== null && DatabaseToken.permissions < permission) {
						return res.status(401).sender({
							message: i18n.t("http:messages.NotHaveTypeAcessForRoute", {
								type: i18n.t("attributes.token"),
							}),
						});
					}
					// Carrega params de usuário
					if (DatabaseToken !== null) {
						req.access.permissions = DatabaseToken.permissions !== null ? DatabaseToken.permissions : 0;
						req.access.type = "token";
						req.access.uuid = DatabaseToken.uuid;
						req.access.lang = config.server.lang ? config.server.lang : "pt-BR";
					} else {
						return res.status(401).sender({
							message: i18n.t("http:messages.NotHaveTypeAcessForRoute", {
								type: i18n.t("attributes.token"),
							}),
						});
					}
					resolve({ req, res });
				} else {
					return res.status(401).sender({
						message: i18n.t("http:messages.NotHaveTypeAccessToken", {
							type: i18n.t("attributes.token"),
						}),
					});
				}
			} else {
				return res.status(406).json({
					message: req.t("http:errors.406.desc"),
				});
			}
		} catch (e) {
			core.error("Erro ao tentar processar o Authorization : " + (e as ErrType).message);
			return res.status(406).json({
				message: req.t("http:errors.406.desc"),
			});
		}
	});
}
