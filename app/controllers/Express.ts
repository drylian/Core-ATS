import express, { Request, Response } from "express";
import { Helmet } from "@/http/middlewares/Helmet";
import storage from "@/controllers/Storage";
import { ErrType, SettingsJson } from "@/interfaces";
import Loggings from "@/controllers/Loggings";
import i18alt from "@/controllers/Language";
import { MorganLogs } from "@/http/middlewares/Morgan";
import cookieParser from "cookie-parser";
import path from "path";
import configuractions from "./settings/Default";
import { i18AltRequests } from "@/http/middlewares/i18AltRequests";
import { Protocols } from "@/http/middlewares/Protocols";
import fileUpload from "express-fileupload";
import { SenderSettings } from "@/http/middlewares/SenderSettings";
import Credentials from "@/http/middlewares/Credentials";
import Cors from "@/http/middlewares/Cors";
import { Connections } from "@/http/middlewares/Connections";
import { ApplicationRoutes } from "@/http/Application";
import { ViteInjector } from "./express/vite/ViteInjector";
import { LanguageRequests } from "@/http/router/base/Languages";
import { CookieController } from "@/http/controllers/CookieController";
import http from "http";
import { Server } from "socket.io";
import ServerUptime from "@/http/sockets/ServerUptime";
import compression from "compression"
import SocketUserLoad from "@/http/sockets/middlewares/UserAuth";
import OnlineUsersSystem from "@/http/sockets/OnlineUsers";
class Express {
	public express: express.Application;
	public server: http.Server;
	private core: Loggings;
	private i18n: i18alt;
	private apache: Loggings;
	private config: SettingsJson;
	private io: Server;
	constructor() {
		this.core = new Loggings("Express", "green");
		this.i18n = new i18alt();
		this.apache = new Loggings("Apache-Logs", "blue");
		storage.rel("config");
		this.config = storage.get("settings");
		this.core.log("Iniciando Rotas do painel.");
		this.express = express();
		this.server = http.createServer(this.express);
		this.io = new Server(this.server);
		this.middlewares();
		this.routers();
		this.sockets();
	}
	private sockets(): void {
		this.io.use(SocketUserLoad)
		this.io.sockets.on("connection", function (socket) {
			// OnlineUsersSystem(socket);
			ServerUptime(socket);
		});
	}
	private middlewares(): void {
		/**
		 * Middlewares padrões
		 */
		this.express.use((req, res, next) => {
			const start = new Date().getTime();
			res.locals.ping = start
			next();
		})
		this.express.disable("x-powered-by")
		this.express.use(MorganLogs(this.apache));
		this.express.use(Helmet());
		this.express.use(express.json());
		this.express.use(fileUpload());
		this.express.use(express.urlencoded({ extended: true }));
		this.express.use(cookieParser(this.config.server.signature));
		this.express.use("/", express.static(path.join(configuractions.rootPATH + "/http/static")));
		this.express.use(i18AltRequests(this.i18n));
		this.express.use(CookieController());
		this.express.use(Credentials());
		this.express.use(compression());
		/**
		 * Core Middlewares
		 */
		this.express.use(SenderSettings()); // adiciona o res.sender
		this.express.use(Cors()); // sender necessario
		this.express.use(Protocols()); // sender necessario
		this.express.use(Connections(this.core)); // sender e Protocols necessario
	}

	private routers(): void {
		new LanguageRequests(this.express);
		new ApplicationRoutes(this.express);
		const rotas = this.express._router.stack
			.filter((rota: any) => rota.route)
			.map((rota: any) => rota.route.path);

		// Exiba a contagem e as rotas
		console.log(`Número total de rotas: ${rotas.length}`);
		console.log('Rotas registradas:', rotas);
	}

	public async listen() {
		if (this.config.mode !== "production" && this.config.mode !== "pro") {
			this.core.log("Aplicação em modo de [desenvolvimento].gray, inicializando...");
			await new ViteInjector(this.express).development();
			const server = this.server.listen(parseInt(this.config?.server?.port), "0.0.0.0", () =>
				this.core.log(
					`Servidor [iniciado].green em [${this.config.server.url}:${this.config.server.port}].blue.`,
				),
			);
			this.core.log("[Vite].magenta iniciou com [sucesso].green.");
			this.extend();
			// Handle unhandled errors from Express
			server.on("error", (error) => {
				this.core.error(`[Erro].red não detectado pelo servidor servidor: ${error.stack}`);
			});
		} else {
			this.core.log("Servidor está iniciando...");
			await new ViteInjector(this.express).production();
			this.extend();
			const server = this.server.listen(parseInt(this.config?.server?.port), "0.0.0.0", () =>
				this.core.log(
					`Servidor [iniciado].green em [${this.config.server.url}:${this.config.server.port}].blue.`,
				),
			);

			// Handle unhandled errors from Express
			server.on("error", (error) => {
				this.core.error(`Uncaught error in the server: ${error.stack}`);
			});
		}
	}

	private extend() {
		this.express.all("*", (req, res) => {
			res.status(404).sender({ message: this.i18n.t("http:errors.ResourcesNotFound") });
		});

		this.express.all("*", (error: ErrType, req: Request, res: Response) => {
			this.core.error(`[Error:].red ${error.stack}`);
			res.status(500).sender({ message: "http:errors.InternalServerError" });
		});
	}
}

export default Express;
