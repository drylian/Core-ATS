import * as path from "path";
import express, { Application, Request, Response } from "express";
import Loggings from "@/controllers/Loggings";
import fileUpload from "express-fileupload";
import configuractions from "@/controllers/settings/Default";
import { AppRouter as ApplicationBackend } from "@/http/Application";
import { json } from "@/utils";
import credentials from "@/http/middlewares/Credentials";
import configureCors from "@/http/middlewares/Cors";
import cookieParser from "cookie-parser";
import { ErrType } from "@/interfaces/Utils";
import { SettingsJson } from "@/interfaces";
import ErrorNotFound from "@/http/pages/errors/404.html";
import ErrorInternal from "@/http/pages/errors/500.html";
import morgan from "morgan";
import HtmlIndex from "@/http/pages/system/index.html";
import ViteInjector from "./express/vite/ViteInjector";
import { generateCsrfToken } from "@/http/middlewares/CSRF";
const core = new Loggings("Express", "green");

// Logs para o simulador de apache
const apache = new Loggings("Apache-Logs", "blue");
export const rcore = new Loggings("Request", "gray");
export const webpanel = async () => {
	try {

		const config: SettingsJson = json(configuractions.configPATH + "/settings.json");

		core.log("Iniciando [conexões].blue do painel.");
		const app = express();

		app.use((req, res, next) => {
			morgan("combined", {

				stream: {
					write: (message: string) => {
						apache.txt(message);
					},
				},
			})(req, res, next);
		});

		app.use(cookieParser(config.server.csrf.cookie_secret));

		// await ProxyConnects(app);

		// Manipular opções de verificação de credenciais - antes do CORS!
		// e buscar requisitos de credenciais de cookies

		app.use("/", express.static(path.join(configuractions.rootPATH + "/http/static")));

		// Configurações do express e middlewares
		app.use(express.json()); // Equivalente ao bodyParser.json()
		app.use(express.urlencoded({ extended: true })); // Equivalente ao bodyParser.urlencoded({ extended: true })
		app.use(cookieParser());
		app.use(cookieParser(config.server.csrf.cookie_secret));


		// Configuração do express-fileupload
		app.use(fileUpload());
		app.use(credentials);
		app.use(configureCors);

		let callCount = 0;

		app.use("/", (req, res, next) => {
			if (req.originalUrl === "/robots.txt") {
				next();
				return;
			}
			if (req.originalUrl === "/favicon.ico") {
				next();
				return;
			}

			core.debug(`Conexões: [${req.originalUrl}].magenta [(${callCount++})].blue`);

			next();
		});
		await ApplicationBackend(app);

		if (config.mode !== "production" && config.mode !== "pro") {
			core.log("Aplicação em modo de desenvolvimento, iniciando...");
			await ViteInjector(app);
			const server = app.listen(parseInt(config?.server?.port), "0.0.0.0", () =>
				core.log(`Servidor iniciado em ${config.server.url}:${config.server.port}.`)
			);
			// ViteExpress.bind(app, server)
			core.log("Vite iniciado com sucesso.");
			await ExtendExpress(app);

			// Eventos de erros vindos do express
			server.on("error", (error) => {
				core.error(`Erro não tratado no servidor: ${error.stack}`);
			});
		} else {
			const buildPath = path.join(configuractions.rootPATH + "/http/public/assets");
			core.log("Servidor esta inciando...");

			app.use("/assets", express.static(path.join(buildPath)));

			app.get("*", (req, res) => {
				if (req.accepts("html")) {
					res.send(HtmlIndex(generateCsrfToken()(req, res, true)));
				}
			});
			await ExtendExpress(app);
			const server = app.listen(parseInt(config?.server?.port), "0.0.0.0", () =>
				core.log(`Servidor iniciado em ${config.server.url}:${config.server.port}.`)
			);

			// Eventos de erros vindos do express
			server.on("error", (error) => {
				core.error(`Erro não tratado no servidor: ${error.stack}`);
			});

		}

	} catch (err) {
		core.error(`Erro ao tentar carregar conexões do painel: [${(err as ErrType).stack}].red`);
	}
};

async function ExtendExpress(app: Application) {
	app.all("*", (req, res) => {
		res.status(404);
		if (req.accepts("html")) {
			res.send(ErrorNotFound());
		} else if (req.accepts("json")) {
			res.json({ "error": "404 - Não encontrado" });
		} else {
			res.type("txt").send("404 - Não encontrado");
		}
	});
	app.all("*", (error: ErrType, req: Request, res: Response) => {
		core.error(`Erro : [${error.stack}].red`);
		res.status(500);
		if (req.accepts("html")) {
			res.send(ErrorInternal());
		} else if (req.accepts("json")) {
			res.json({ "error": "500 - Erro interno" });
		} else {
			res.type("txt").send("500 - Erro interno");
		}
	});
}