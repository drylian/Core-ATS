import storage from "@/controllers/Storage";
import { SettingsJson } from "@/interfaces";
import { NextFunction, Request, Response } from "express";
/**
 * Middleware para os Protocolos do painel , Limita o acesso do usuário ao protocolo especificado pelo config
 */
export function Protocols() {
	return (req: Request, res: Response, next: NextFunction) => {
		const config: SettingsJson = storage.get("config");
		if (config.server.protocol === req.protocol.toLocaleLowerCase() || config.server.protocol === "http/https") {
			next();
		} else {
			res.status(403).sender({
				message: req.t("backend:ErrorProtocol", {
					protocol: config.server.protocol.toUpperCase(),
				}),
			});
		}
	};
}