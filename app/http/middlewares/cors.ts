import { Application, NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { SettingsJson } from "@/interfaces";
import configuractions from "@/controllers/settings/Default";
import { json } from "@/utils";
import CorsError from "../pages/errors/CorsError";

async function configureCors(app: Application) {
	function corsCheck(req: Request, res: Response, next: NextFunction) {
		const valores: SettingsJson = json(configuractions.configPATH + "/settings.json") || [];

		if (valores.server.cors.active) {
			const corsOptions: CorsOptions = {
				origin: (origin, callback) => {
					if (valores?.server?.cors) {
						if (!valores.server.cors.allowedroutes) {
							valores.server.cors.allowedroutes = "";
						}
						valores.server.cors.allowedroutes += `,${valores.server.url}:${valores.server.port}`;
					}

					const allowedOrigins = valores?.server?.cors?.allowedroutes.split(",").map((route) => route.trim());
					if (allowedOrigins.indexOf(origin || "") !== -1) {
						callback(null, true);
					} else {
						callback(new Error("Não Permitido pelo CORS"));
					}
				},

				optionsSuccessStatus: 200,
			};

			cors(corsOptions)(req, res, (err) => {
				if (err) {
					// Se ocorrer um erro, a origem não é permitida
					res.status(403).send(CorsError());
				} else {
					next();
				}
			});
		} else {
			next();
		}
	}

	app.use(corsCheck);
}

export default configureCors;
