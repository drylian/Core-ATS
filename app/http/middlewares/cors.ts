import { Application, NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { SettingsJson } from "@/interfaces";
import configuractions from "@/controllers/settings/Default";
import { json } from "@/utils";
import ErroNotFound from "../pages/errors/403.html";

async function configureCors(app: Application) {
	function corsCheck(req: Request, res: Response, next: NextFunction) {
		const valores: SettingsJson = json(configuractions.configPATH + "/settings.json") || [];

		if (valores.server.cors.active) {
			const corsOptions: CorsOptions = {
				origin: (origin, callback) => {
					if (valores?.server?.cors) {
						console.log(valores.server.cors.allowedroutes)
						if (!valores.server.cors.allowedroutes) {
							valores.server.cors.allowedroutes = "";
						}
						valores.server.cors.allowedroutes += `,${valores.server.url}:${valores.server.port}`;
					}

					const allowedOrigins = (valores?.server?.cors?.allowedroutes || "").split(",").map((route) => route.trim());
					if (typeof origin === "string" && allowedOrigins.includes(origin) || !origin) {
						callback(null, true);
					  } else {
						return callback(new Error("Acesso não autorizado devido à política CORS."));
					  }
				},

				optionsSuccessStatus: 200,
			};

			cors(corsOptions)(req, res, (err) => {
				console.log(err)
				if (err) {
					// Se ocorrer um erro, a origem não é permitida
					return res.status(403).send(ErroNotFound("Acesso não autorizado devido à política CORS."));
				} else {
					return next();
				}
			});			
		} else {
			next();
		}
	}

	app.use(corsCheck);
}

export default configureCors;
