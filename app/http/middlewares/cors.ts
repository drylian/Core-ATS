import { Application, NextFunction, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import { SettingsJson } from '@/interfaces';
import configuractions from '@/controllers/settings/Default';
import { json } from '@/utils';
import Forbidden from '../pages/errors/403.html';

async function configureCors(app: Application) {
	app.use(async (req: Request, res: Response, next: NextFunction) => {
		const valores: SettingsJson = json(configuractions.configPATH + '/settings.json') || [];

		if (valores.server.cors.active) {
			const corsOptions: CorsOptions = {
				origin: (origin, callback) => {
					// Conexões locais

					// Configuração de origins e a origin padrão do sistema (a configurada no settings.json)
					if (valores?.server?.cors) {
						if (!valores.server.cors.allowedroutes) {
							valores.server.cors.allowedroutes = '';
						}
						valores.server.cors.allowedroutes += `,${valores.server.url}:${valores.server.port}`;
					}

					const allowedOrigins = (valores?.server?.cors?.allowedroutes || '').split(',').map((route) => route.trim());
					const origem = origin ? origin : req.headers.origin;

					if (!origin) {
						callback(null, true);
					} else if (typeof origem === 'string' && allowedOrigins.includes(origem)) {
						callback(null, true);
					} else {
						callback(new Error('Acesso não autorizado devido à política CORS.'));
					}
				},

				optionsSuccessStatus: 200,
			};

			cors(corsOptions)(req, res, (err) => {
				if (err) {
					// Se ocorrer um erro, a origem não é permitida
					res.status(403).send(Forbidden('Acesso não autorizado devido à política CORS.'));
				} else {
					next();
				}
			});
		} else {
			next();
		}
	});
}

export default configureCors;
