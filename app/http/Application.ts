import { Application } from "express";
import imagemRoute from "@/http/router/image";
import ApplicationRoute from "@/http/router/api/application";
import testeRoutes from "@/http/router/api/teste";
import registerRoute from "@/http/router/auth/register";
import refreshRoute from "@/http/router/auth/refresh";
import changeRoute from "@/http/router/auth/change";
import loginRoute from "@/http/router/auth/login";
import Protect from "@/http/Protect";
import CheckRequest from "@/http/middlewares/CheckRequest";
import { Csrf } from "@/http/middlewares/Csrf";
import { LoggingsMethods } from "@/controllers/Loggings";
import TST from "./router/test/tst";

class ApplicationRoutes {
	private server: Application;
	private core: LoggingsMethods;

	constructor(server: Application, core: LoggingsMethods) {
		this.server = server;
		this.core = core;
		this.routers()
	}

	private routers(): void {
		// API Routes
		this.server.use("/api/", imagemRoute);
		this.server.use("/api/application", ApplicationRoute);
		this.server.use("/test", new TST().route);
		this.server.use("/test", testeRoutes);


		// Protected Routes
		this.server.use("/api", CheckRequest(), Csrf(this.core), new Protect().Routers());

		// Auth Routes
		this.server.use("/auth/login", loginRoute);
		this.server.use("/auth/register", registerRoute);
		this.server.use("/auth/refresh", refreshRoute);
		this.server.use("/auth/change", CheckRequest(), Csrf(this.core), changeRoute);
	}
}

export { ApplicationRoutes };
