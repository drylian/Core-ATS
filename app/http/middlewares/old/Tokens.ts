import storage from "@/controllers/Storage";
import { SettingsJson } from "@/interfaces";
import { NextFunction, Request, Response } from "express";
import User, { UserE } from "@/models/User";
import { ALTcpt, ALTdcp, AlTexp } from "@/utils";
import { v4 as uuidv4 } from "uuid"; // Importa a função uuidv4 para gerar UUIDs
import SenderError from "../pages/errors/Error.html";
import I18alt from "@/controllers/Language";
/**
 * Pre definições para os tokens
 */
/**
 * Middleware para o Validar tokens, Access e Refresh para segurança.
 */
export function TokensValiter() {
	return async (req: Request, res: Response, next: NextFunction) => {
		req.access.ip = req.headers["x-forwarded-for"] ?? req.ip ?? req.socket.remoteAddress;

		const config: SettingsJson = storage.get("config");
		// return para api
		if (!req.cookies["X-Application-Access"] || !req.cookies["X-Application-Refresh"]) return next();
		
		try {
			if (req.cookies["X-Application-Access"]) {
				const access = ALTdcp<{ data: UserE, expires: number } | null>(
					req.cookies["X-Application-Access"],
					config.server.accessTokenSecret,
					req.access.ip?.toString(),
				);
				if (access) {
					if (access.expires && req.cookies["X-Application-Refresh"]) {
						const RefreshDate = new Date(Date.now() + AlTexp("10m")).getTime();

						const expirationTime = new Date(access.expires).getTime();
						if (expirationTime <= RefreshDate) {
							const refresh = ALTdcp<{ data: { remember: string } } | null>(
								req.cookies["X-Application-Refresh"],
								config.server.refreshTokenSecret,
								req.access.ip?.toString(),
							);
							if (refresh) {
								const rememberValue = refresh.data.remember;

								const userRecord = await User.findOne({ where: { remember: rememberValue } });

								if (userRecord) {
									const UserData: UserE = userRecord.dataValues;
									delete UserData.password;
									delete UserData.id;
									// Atualiza o Access
									const access = ALTcpt(UserData, config.server.accessTokenSecret, {
										ip: req.access.ip?.toString(),
										expires: "15m",
									});
									res.cookie("X-Application-Access", access, { maxAge: AlTexp("15m"), httpOnly: true });
									req.cookies["X-Application-Access"] = access;
									const rememberMeUUID = uuidv4();
									await User.update({ remember: rememberMeUUID }, { where: { uuid: UserData.uuid } });
									// atualiza o Refresh
									const token = ALTcpt({ remember: rememberMeUUID }, config.server.refreshTokenSecret, {
										ip: req.access.ip?.toString(),
										expires: "90d",
									});
									res.cookie("X-Application-Refresh", token, { maxAge: AlTexp("90d"), httpOnly: true });
									req.cookies["X-Application-Refresh"] = token;
								} else {
									res.clearCookie("X-Application-Refresh");
									req.cookies["X-Application-Refresh"] = undefined;
								}
							}
						}
					}
					if (access.data.lang) req.access.lang = access.data.lang || "unk";
					const i18n = new I18alt(access.data.lang || "unk");

					if (access.data?.suspended) {
						if (config.server.protocol !== "https") res.header({ "Content-Security-Policy": "" });
						switch (req.accepts(["html", "json", "txt"])) {
							case "html":
								return res.status(401).send(
									SenderError(
										{
											lang: access.data.lang || "unk",
											status: 401,
											title: i18n.t("react:titles.Suspended"),
											code: i18n.t("react:messages.SuspendedAccount"),
											message:
												i18n.t("attributes.motive") + access.data.suspendedReason ||
												i18n.t("react:messages.DefaultSuspendedAccoutReason"),
										},
										req,
									),
								);
							case "json":
								return res.status(401).json({
									type: "error",
									message:
										access.data.suspendedReason || i18n.t("react:messages.DefaultSuspendedAccoutReason"),
									status: res.statusCode || req.statusCode || "unknown",
									timestamp: Date.now(),
								});
							default:
								return res
									.status(401)
									.type("txt")
									.send(i18n.t("react:messages.DefaultSuspendedAccoutReason"));
						}
					}
				} else {
					res.clearCookie("X-Application-Access");
					req.cookies["X-Application-Access"] = undefined;
					res.redirect("/auth/login?callback=" + req.originalUrl)
				}
				return next();
			} else {
				res.clearCookie("X-Application-Access");
				req.cookies["X-Application-Access"] = undefined;
				if (req.cookies["X-Application-Refresh"]) {
					const refresh = ALTdcp<{ data: { remember: string } } | null>(
						req.cookies["X-Application-Refresh"],
						config.server.refreshTokenSecret,
						req.access.ip?.toString(),
					);
					if (refresh) {
						const rememberValue = refresh.data.remember;

						const userRecord = await User.findOne({ where: { remember: rememberValue } });

						if (userRecord) {
							const UserData: UserE = userRecord.dataValues;
							delete UserData.password;
							delete UserData.id;
							// Atualiza o Access
							const access = ALTcpt(UserData, config.server.accessTokenSecret, {
								ip: req.access.ip?.toString(),
								expires: "15m",
							});
							res.cookie("X-Application-Access", access, { maxAge: AlTexp("15m"), httpOnly: true });
							req.cookies["X-Application-Access"] = access;
							const rememberMeUUID = uuidv4();
							await User.update({ remember: rememberMeUUID }, { where: { uuid: UserData.uuid } });
							// atualiza o Refresh
							const token = ALTcpt({ remember: rememberMeUUID }, config.server.refreshTokenSecret, {
								ip: req.access.ip?.toString(),
								expires: "90d",
							});
							res.cookie("X-Application-Refresh", token, { maxAge: AlTexp("90d"), httpOnly: true });
							req.cookies["X-Application-Refresh"] = token;
						} else {
							res.clearCookie("X-Application-Refresh");
							req.cookies["X-Application-Refresh"] = undefined;
						}
					} else {
						res.redirect("/auth/login?callback=" + req.originalUrl)
					}
				}
				return next();
			}
		} catch (e) {
			console.log(e);
			res.clearCookie("X-Application-Access");
			req.cookies["X-Application-Access"] = undefined;
			res.clearCookie("X-Application-Refresh");
			req.cookies["X-Application-Refresh"] = undefined;
		}
	};
}
