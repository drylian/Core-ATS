import configuractions from "controllers/settings/Default";
import { Application, NextFunction, Request, Response } from "express";
import { json } from "utils/Json";

import cors, { CorsOptions } from "cors";

async function Cors(app: Application) {

	function corsCheck(req: Request, res: Response, next: NextFunction) {
		if (!req.headers["authorization"]) {
			const cors_options: CorsOptions = {
				origin: (origin, callback: Function) => {
					const valores = json(configuractions.configPATH + "/settings.json") || [];
					if (valores?.server?.cors) {
						if (!valores.server.cors.allowedroutes) {
							valores.server.cors.allowedroutes = "";
						}
						valores.server.cors.allowedroutes += `,${valores.server.url}:${valores.server.port}`;
					}
					const allowedOrigins = valores?.server?.cors?.allowedroutes.split(",").map((route: any) => route.trim());
					if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
						callback(null, true);
					} else {
						callback("Não Permitido pelo CORS");
					}
				},
				optionsSuccessStatus: 200
			};
			cors(cors_options)(req, res, next);
		} else {
			next();
		}
	}
	app.use(corsCheck);
}
export default Cors;