// import {CsrfConfig} from "@/http/middlewares/csrf-csrf/Config";
import configuractions from "@/controllers/settings/Default";
import { json } from "@/utils";
import { NextFunction, Request, Response } from "express";
import Loggings from "@/controllers/Loggings";
import { SettingsJson } from "@/interfaces";
import Forbidden from "../pages/errors/403.html";
import ErrorInternal from "../pages/errors/500.html";
import * as csrfs from "csrf-csrf";

const core = new Loggings("Segurança", "green");

export function generateCsrfToken() {
	const config: SettingsJson = json(configuractions.configPATH + "/settings.json");

	const { generateToken } = csrfs.doubleCsrf({
		getSecret: () => config.server.csrf.secret,
		// Resto do código de configuração do CSRF
	});

	return generateToken;
}
function ConnectionsCheck(req: Request, res: Response, next: NextFunction) {
	const config: SettingsJson = json(configuractions.configPATH + "/settings.json");

	const { invalidCsrfTokenError, doubleCsrfProtection } = csrfs.doubleCsrf({
		getSecret: () => config.server.csrf.secret,
		cookieName: "X-CSRF-TOKEN",
		cookieOptions: {
			sameSite: config.server.csrf.samesite,
			secure: config.server.csrf.secure,
			signed: config.server.csrf.signed
		},
		size: config.server.csrf.size,
		ignoredMethods: ["HEAD", "OPTIONS"],
	});

	// Error handling, validation error interception
	const csrfErrorHandler = (error: boolean, req: Request, res: Response, next: NextFunction) => {
		if (error == invalidCsrfTokenError) {
			if (req.accepts("text/html")) {
				return res.status(403).send(Forbidden("Erro de validação Csrf, impossivel de continuar"));
			} else {
				// Caso contrário, envie o JSON como resposta normalmente
				return res.json({ message: "Erro de validação Csrf, impossivel de continuar" });
			}
		} else {
			next();
		}
	};
	// Verifica se a chave de autorização está presente no cabeçalho da requisição

	if (req.checked === "authorization") {
		core.warn("Uso de token detectado! O código continuará sem proteção CSRF.");
		next();
	} else if (req.checked === "user") {
		/**
		 * Verifica se esta na lista de ignorados
		 */
		if (config.server.csrf.ignoreroutes) {
			const ignoreRoutesArray = config.server.csrf.ignoreroutes.split(",").map((route) => route.trim());
			if (ignoreRoutesArray.includes(req.path)) {
				// Se a rota estiver na lista de ignorados, permitir o acesso sem proteção CSRF
				core.warn("Uso de rota ignorada para proteção CSRF :" + req.path);
				next();
			} else {
				// Caso contrário, continue com a proteção CSRF normal
				doubleCsrfProtection(req, res, () => {
					csrfErrorHandler(false, req, res, next);
				});
			}
		} else {
			// Se não houver rotas para ignorar definidas, aplicar a proteção CSRF normalmente
			doubleCsrfProtection(req, res, () => {
				csrfErrorHandler(false, req, res, next);
			});
		}
	} else {
		if (req.accepts("html")) {
			res.status(500).send(ErrorInternal());
		} else if (req.accepts("json")) {
			res.status(500).json({ message: "500 - Erro interno" });
		} else if (req.accepts("text")) {
			res.status(500).send("500 - Erro interno");
		}
	}
}

export {
	ConnectionsCheck,
};