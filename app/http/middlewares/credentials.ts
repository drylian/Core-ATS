import { NextFunction, Request, Response } from "express";
import { SettingsJson } from "@/interfaces";
import { SetAllowedRoutes } from "@/controllers/express/AllowedRoutes";
import storage from "@/controllers/Storage";

export default function Credentials() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const valores: SettingsJson = storage.get("settings");
		if (valores?.server?.cors) {
			if (!valores.server.cors.allowedroutes) {
				valores.server.cors.allowedroutes = [];
			}
			valores.server.cors.allowedroutes.push(`${valores.server.url}`);
		}
		const origin = req.headers.origin
			? req.headers.origin
			: req.headers.host
				? SetAllowedRoutes(req.headers.host, valores.server.protocol, valores.server.port)
				: undefined;
		const allowedOrigins = SetAllowedRoutes(
			valores.server.cors.allowedroutes,
			valores.server.protocol,
			valores.server.port,
		);

		if (origin && typeof origin === "string" && allowedOrigins.includes(origin)) {
			res.header("Access-Control-Allow-Credentials", "true");
		} else if (Array.isArray(origin)) {
			origin.forEach((originItem) => {
				if (typeof originItem === "string" && allowedOrigins.includes(originItem)) {
					res.header("Access-Control-Allow-Credentials", "true");
				}
			});
		}
		next();
	};
}
