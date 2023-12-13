import { NextFunction, Request, Response } from "express";
import cors from "cors";
import { ErrType, SettingsJson } from "@/interfaces";
import { SetAllowedRoutes } from "@/controllers/express/AllowedRoutes";
import storage from "@/controllers/Storage";
import I18alt from "@/controllers/Language";

export default function Cors() {
	return (req: Request, res: Response, next: NextFunction) => {
		const i18n = new I18alt();
		const valores: SettingsJson = storage.get("config");
		if (valores.server.cors.active) {
			cors<Request>({
				origin(requestOrigin, callback) {
					// Configuração de origins e a origin padrão do sistema (a configurada no settings.json)
					if (valores?.server?.cors) {
						if (!valores.server.cors.allowedroutes) {
							valores.server.cors.allowedroutes = [];
						}
						valores.server.cors.allowedroutes.push(`${valores.server.url}:${valores.server.port}`);
					}

					const origin = requestOrigin
						? requestOrigin
						: req.headers.host
							? SetAllowedRoutes(req.headers.host, valores.server.protocol, valores.server.port)
							: undefined;
					const allowedOrigins = SetAllowedRoutes(
						valores.server.cors.allowedroutes,
						valores.server.protocol,
						valores.server.port,
					);

					if (origin && typeof origin === "string" && allowedOrigins.indexOf(origin) !== -1) {
						callback(null, true);
					} else if (Array.isArray(origin)) {
						let found = false; // Variável para rastrear se uma origem válida foi encontrada
						origin.forEach((originItem) => {
							if (typeof originItem === "string" && allowedOrigins.indexOf(originItem) !== -1) {
								callback(null, true);
								found = true; // Uma origem válida foi encontrada
								return;
							}
						});

						if (!found) {
							callback(new Error(i18n.t("http:errors.corsError")), false);
						}
					} else {
						callback(new Error(i18n.t("http:errors.corsError")), false);
					}
				},
				optionsSuccessStatus: 200,
				credentials: true,
			})(req, res, (err) => {
				if (err) {
					// Se ocorrer um erro, a origem não é permitida
					return res.status(403).sender({ message: (err as ErrType).message });
				} else {
					next();
				}
			});
		} else {
			next();
		}
	};
}
