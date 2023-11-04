import configuractions from "@/controllers/settings/Default";
import { NextFunction, Request, Response } from "express";
import { json } from "@/utils/Json";
import { SettingsJson } from "@/interfaces";
import { SetAlowedRoutes } from "@/controllers/express/AllowedRoutes";

export default function credentials(req: Request, res: Response, next: NextFunction) {
	const valores: SettingsJson = json(configuractions.configPATH + "/settings.json");
	if (valores?.server?.cors) {
		if (!valores.server.cors.allowedroutes) {
			valores.server.cors.allowedroutes = "";
		}
		valores.server.cors.allowedroutes += `,${valores.server.url}:${valores.server.port}`;
	}
	const origin = req.headers.origin
		? req.headers.origin
		: req.headers.host
			? SetAlowedRoutes(req.headers.host, valores.server.protocol, valores.server.port)
			: undefined;
	const allowedOrigins = SetAlowedRoutes(
		valores.server.cors.allowedroutes,
		valores.server.protocol,
		valores.server.port,
	);

	if (origin && typeof origin === "string" && allowedOrigins.indexOf(origin) !== -1) {
		res.header("Access-Control-Allow-Credentials", "true");
	} else if (Array.isArray(origin)) {
		origin.forEach((originItem) => {
			if (typeof originItem === "string" && allowedOrigins.includes(originItem)) {
				res.header("Access-Control-Allow-Credentials", "true");
				return;
			}
		});
	}
	next();
}
