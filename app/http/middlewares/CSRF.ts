import cookieParser from "cookie-parser";
import CsrfConfig from "@/http/middlewares/csrf-csrf/Config";
import configuractions from "@/controllers/settings/Default";
import { json } from "@/utils";
import { Application, NextFunction, Request, Response } from "express";
import Loggings from "@/controllers/Loggings";

const core = new Loggings("Segurança", "green");

async function CsrfProtection(app: Application) {
	const config = json(configuractions.configPATH + "/settings.json");

	const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } = await CsrfConfig(config.server.csrf);

	/**
	 * Cookie de segurança.
	 */
	app.use(cookieParser(config.server.csrf.cookie_secret));

	// Error handling, validation error interception
	const csrfErrorHandler = (error: any, req: any, res: any, next: any) => {
		const acceptHeader = req.headers.accept || "";
		if (error == invalidCsrfTokenError) {
			if (acceptHeader.includes("text/html")) {
				return res.render("errors/CSRFInvalid",{title:config.server.title || "Core"});
			} else {
				// Caso contrário, envie o JSON como resposta normalmente
				return res.json({ message: "erro de validação Csrf, tente novamente mais tarde" });
			}
		} else {
			next();
		}
	};

	app.get("/csrf-token", (req, res) => {
		return res.json({
			token: generateToken(res, req),
			cookie: config.server.csrf.cookie_name,
		});
	});

	function ConnectionsCheck(req: Request, res: Response, next: NextFunction) {
		const config = json(configuractions.configPATH + "/settings.json");
		// Verifica se a chave de autorização está presente no cabeçalho da requisição
		const authorizationKey = req.headers["authorization"];

		if (authorizationKey === "sua_chave_de_autorizacao") {
			/**
			 * Futuro sistema de tokens
			 */
			// Se a chave de autorização estiver correta, você pode permitir que o código continue
			core.warn("Uso de token detectado! O código continuará sem proteção CSRF.");
			next();
		} else {
			/**
			 * Verifica se esta na lista de ignorados
			 */
			if (config.server.csrf.ignoreroutes) {
				const ignoreRoutesArray = config.server.csrf.ignoreroutes.split(",").map((route: any) => route.trim());
				if (ignoreRoutesArray.includes(req.path)) {
					// Se a rota estiver na lista de ignorados, permitir o acesso sem proteção CSRF
					core.warn("Uso de rota ignorada para proteção CSRF :" + req.path);
					next();
				} else {
					// Caso contrário, continue com a proteção CSRF normal
					doubleCsrfProtection(req, res, () => {
						csrfErrorHandler(null, req, res, next);
					});
				}
			} else {
				// Se não houver rotas para ignorar definidas, aplicar a proteção CSRF normalmente
				doubleCsrfProtection(req, res, () => {
					csrfErrorHandler(null, req, res, next);
				});
			}
		}
	}
	app.use(ConnectionsCheck);
}

export {
	CsrfProtection,
};