import { NextFunction, Request, Response } from "express";
import Loggings from "@/controllers/Loggings";
import { SettingsJson } from "@/interfaces";
import * as csrfs from "csrf-csrf";
import storage from "@/controllers/Storage";

const core = new Loggings("Segurança", "green");

export function generateCsrfToken() {
	const config: SettingsJson = storage.get("config");

	const { generateToken } = csrfs.doubleCsrf({
		getSecret: () => config?.server?.csrf.secret,
	});

	return generateToken;
}
function ConnectionsCheck(req: Request, res: Response, next: NextFunction) {
	const config: SettingsJson = storage.get("config");

	const { invalidCsrfTokenError, doubleCsrfProtection } = csrfs.doubleCsrf({
		getSecret: () => config?.server?.csrf?.secret,
		cookieName: "X-CSRF-TOKEN",
		cookieOptions: {
			sameSite: config?.server?.csrf?.samesite,
			secure: config?.server?.csrf?.secure,
			signed: config?.server?.csrf?.signed,
		},
		size: config?.server?.csrf?.size,
		ignoredMethods: ["HEAD", "OPTIONS"],
	});

	// Error handling, validation error interception
	const csrfErrorHandler = (error: boolean, req: Request, res: Response, next: NextFunction) => {
		if (error == invalidCsrfTokenError) {
			if (req.accepts("text/html")) {
				return res.status(403).sender({ message: req.t("http:errors.ErrorCSRF") });
			} else {
				// Caso contrário, envie o JSON como resposta normalmente
				return res.json({ message: req.t("http:errors.ErrorCSRF") });
			}
		} else {
			next();
		}
	};
	// Verifica se a chave de autorização está presente no cabeçalho da requisição
	if (req.checked === "guest") {
		res.status(403).sender({
			message: req.t("http:errors.AccessCSRFError"),
		});
	} else if (req.checked === "authorization") {
		core.warn("Uso de token detectado! O código continuará sem proteção CSRF.");
		next();
	} else if (req.checked === "user") {
		/**
         * Verifica se esta na lista de ignorados
         */
		if (config?.server?.csrf.ignoreroutes) {
			const ignoreRoutesArray = config?.server?.csrf.ignoreroutes.split(",").map((route) => route.trim());
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
		res.status(500).sender({ message: req.t("http:errors.500.title") });
	}
}

export { ConnectionsCheck };
