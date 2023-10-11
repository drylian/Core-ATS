import configuractions from "controllers/settings/Default";
import { NextFunction, Request, Response } from "express";
import { json } from "utils/Json";

const credentials = (req: Request, res: Response, next: NextFunction) => {
	const origin = req.headers.origin;
	const valores = json(configuractions.configPATH + "/settings.json") || [];
	if (valores?.server?.cors) {
		if (!valores.server.cors.allowedroutes) {
			valores.server.cors.allowedroutes = "";
		}
		valores.server.cors.allowedroutes += `,${valores.server.url}:${valores.server.port}`;
	}
	const allowedOrigins = valores?.server?.cors?.allowedroutes.split(",").map((route: any) => route.trim());
	if (allowedOrigins.includes(origin)) {
		res.header("Access-Control-Allow-Credentials", "true");
	}
	next();
};
export default credentials;