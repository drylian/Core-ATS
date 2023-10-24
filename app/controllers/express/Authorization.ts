import NotAcceptable from "@/http/pages/errors/406.html";
import { ALTdcp, json } from "@/utils";
import configuractions from "@/controllers/settings/Default";
import User, { UserE } from "@/models/User";
import { Request, Response } from "express";
import ForbiddenAccess from "@/http/pages/errors/401.html";
import { ErrType, SettingsJson } from "@/interfaces";
import ErrorInternal from "@/http/pages/errors/500.html";
import Loggings from "../Loggings";
import Token, { TokenI } from "@/models/Token";

export default function Authenticator(req: Request, res: Response, permission: number): Promise<{ req: Request, res: Response }> {
	const core = new Loggings("Authorization", "cyan");
	// é necessario await para o User e o Token
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve) => {
		/**
		 * Configurações Previas e que podem ser usadas em todos os casos
		 */
		const config: SettingsJson = json(configuractions.configPATH + "/settings.json");
		const acceptHeader = req.headers.accept || "";

		try {
			if (req.checked === "user") {
				let token: string;

				if (req.headers.authorization !== null && typeof req.headers.authorization === "string") {
					token = req.headers.authorization.split(" ")[1]; // configura o token de usuário por UserAuth
				} else if (req.cookies.authorization !== undefined && typeof req.cookies.authorization === "string") {
					token = req.cookies.authorization; // configura o token de usuário por cookie, caso o Bearer não esteja presente
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
					if (DatabaseUser !== null) {
						req.user = DatabaseUser;
						req.access.permissions = DatabaseUser.permissions !== null ? DatabaseUser.permissions : 0;
						req.access.type = "user";
						req.access.uuid = DatabaseUser.uuid;
					} else {
						if (acceptHeader.includes("text/html")) {
							return res.status(401).send(ForbiddenAccess("Usuário não encontrado, como você chegou até aqui?.", { id: TokenData?.id || 0, username: TokenData?.username }));
						} else if (acceptHeader.includes("application/json")) {
							return res.status(401).json({ message: "Usuário não encontrado, como você chegou até aqui?" });
						} else if (acceptHeader.includes("text/plain")) {
							return res.status(401).send("Usuário não encontrado, como você chegou até aqui?");
						} else {
							return res.status(406).send("Request invalida");
						}
					}
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
				let token: string;

				if (req.headers.authorization !== null && typeof req.headers.authorization === "string")
					token = req.headers.authorization.split(" ")[1]; // configura o token de usuário por Bearer
				else return res.status(401).json({ message: "Token inválido" });

				const TokenData = ALTdcp<TokenI | null>(token, config.server.accessTokenSecret);
				if (TokenData) {
					const DatabaseToken: TokenI | null = await Token.findOne({ where: { uuid: TokenData.uuid } });
					if (DatabaseToken && DatabaseToken.permissions !== null && DatabaseToken.permissions < permission) {
						if (acceptHeader.includes("application/json")) {
							return res.status(401).json({ message: "Você não possui autoridade o suficiente para usar esta rota" });
						} else if (acceptHeader.includes("text/plain")) {
							return res.status(401).send("Você não possui autoridade o suficiente para usar esta rota");
						} else {
							return res.status(406).send("Request invalida");
						}
					}
					// Carrega params de usuário
					if (DatabaseToken !== null) {
						req.access.permissions = DatabaseToken.permissions !== null ? DatabaseToken.permissions : 0;
						req.access.type = "token";
						req.access.uuid = DatabaseToken.uuid;
					} else {
						if (acceptHeader.includes("text/html")) {
							return res.status(401).send(ForbiddenAccess("Token não encontrado, como você chegou até aqui?."));
						} else if (acceptHeader.includes("application/json")) {
							return res.status(401).json({ message: "Token não encontrado, como você chegou até aqui?" });
						} else if (acceptHeader.includes("text/plain")) {
							return res.status(401).send("Token não encontrado, como você chegou até aqui?");
						} else {
							return res.status(406).send("Request invalida");
						}
					}
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

			} else {
				if (acceptHeader.includes("text/html")) {
					return res.status(406).send(NotAcceptable("Sua solicitação não pode ser verificada corretamente, tente novamente mais tarde."));
				} else if (acceptHeader.includes("application/json")) {
					return res.status(406).json({ message: "Sua solicitação não pode ser verificada corretamente, tente novamente mais tarde." });
				} else {
					return res.status(406).send("Sua solicitação não pode ser verificada corretamente, tente novamente mais tarde");
				}
			}
		} catch (e) {
			core.error("Erro ao tentar processar o Authorization : " + (e as ErrType).message);
			if (acceptHeader.includes("text/html")) {
				return res.status(406).send(ErrorInternal("Ocorreu um erro ao tentar processar a verificação, tente novamente mais tarde."));
			} else if (acceptHeader.includes("application/json")) {
				return res.status(406).json({ message: "Ocorreu um erro ao tentar processar a verificação, tente novamente mais tarde." });
			} else {
				return res.status(406).send("Ocorreu um erro ao tentar processar a verificação, tente novamente mais tarde");
			}
		}
	});
}
