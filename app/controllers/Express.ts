import * as path from "path";
import express, { Application, Request, Response, application } from "express";
import Loggings from "controllers/Loggings";
import ViteExpress from "vite-express";
import fileUpload from "express-fileupload";
import configuractions from "controllers/settings/Default";
import { AppRouter as ApplicationBackend } from "http/Application";
import { json } from "utils/Json";
import credentials from "http/middlewares/credentials";
import Cors from "http/middlewares/cors";
import cookieParser from "cookie-parser";
// import { app as ApplicationFrontend } from "controllers/express/Viteless";

const core = new Loggings("Express", "cyan");
export const webpanel = async () => {
	try {

		const config = json(configuractions.configPATH + "/settings.json");
		const buildPath = path.join(configuractions.rootPATH + "/http/public");

		core.log("Iniciando [conexões].blue do painel.");
		const app = express();

		app.set("views", configuractions.rootPATH + "/http/pages");
		app.set("view engine", "ejs");
		// await ProxyConnects(app);

		// Manipular opções de verificação de credenciais - antes do CORS!
		// e buscar requisitos de credenciais de cookies
		app.use(credentials);
		

		app.use('/', express.static(path.join(configuractions.rootPATH + "/http/static")));

		// Configurações do express e middlewares
		app.use(express.json()); // Equivalente ao bodyParser.json()
		app.use(express.urlencoded({ extended: true })); // Equivalente ao bodyParser.urlencoded({ extended: true })
		app.use(cookieParser())


		// Configuração do express-fileupload
		app.use(fileUpload());

		await Cors(app);

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

		// app.use("/", ApplicationFrontend)

		if (config.mode !== "production") {
			core.log("Aplicação em modo de desenvolvimento, iniciando...");

			const server = app.listen(config.server.port, "0.0.0.0", () =>
				core.log(`Servidor iniciado em ${config.server.url}:${config.server.port}.`)
			);

			await ViteExpress.bind(app, server);
			core.log("Vite iniciado com sucesso.");
			await ExtendExpress(app, config);

			// Eventos de erros vindos do express
			server.on("error", (error) => {
				core.error(`Erro não tratado no servidor: ${error.stack}`);
			});
		} else {
			core.log("Servidor esta inciando...");

			await ExtendExpress(app, config);

			app.use('/', express.static(path.join(buildPath)));

			const server = app.listen(config.server.port, "0.0.0.0", () =>
				core.log(`Servidor iniciado em ${config.server.url}:${config.server.port}.`)
			);

			// Eventos de erros vindos do express
			server.on("error", (error) => {
				core.error(`Erro não tratado no servidor: ${error.stack}`);
			});

		}

		// await ExtendExpress(app, config);		
		// const server = app.listen(config.server.port, "0.0.0.0", () =>
		// 		core.log(`Servidor iniciado em [${config.server.url}:${config.server.port}].magenta.`)
		// 	);

		// 	// Eventos de erros vindos do express
		// 	server.on("error", (error) => {
		// 		core.error(`Erro não tratado no servidor: [${error.stack}].red`);
		// 	});

	} catch (err: any) {
		core.error(`Erro ao tentar carregar conexões do painel: [${err?.stack}].red`);
	}
};

async function ExtendExpress(app: Application, config: any) {

	app.all("*", (req, res) => {
		res.status(404);
		if (req.accepts("html")) {
			res.render("errors/404", { title: config.server.title });
		} else if (req.accepts("json")) {
			res.json({ "error": "404 - Não encontrado" });
		} else {
			res.type("txt").send("404 - Não encontrado");
		}
	});
	app.all("*", (error: any, req: Request, res: Response) => {
		core.error(`Erro : [${error.stack}].red`);
		res.status(500);
		if (req.accepts("html")) {
			res.render("errors/500", { title: config.server.title });
		} else if (req.accepts("json")) {
			res.json({ "error": "500 - Erro interno" });
		} else {
			res.type("txt").send("500 - Erro interno");
		}
	});
}