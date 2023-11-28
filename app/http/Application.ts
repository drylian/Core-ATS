import { Application } from "express";
import imagemRoute from "@/http/router/image";
import registerRoute from "@/http/router/auth/register";
import changeRoute from "@/http/router/auth/change";
import loginRoute from "@/http/router/auth/login";
import logoutRoute from "@/http/router/auth/logout";

import Protect from "@/http/Protect";
import CheckRequest from "@/http/middlewares/CheckRequest";
import { Csrf } from "@/http/middlewares/Csrf";
import { LoggingsMethods } from "@/controllers/Loggings";
class ApplicationRoutes {
	private server: Application;
	private core: LoggingsMethods;

	constructor(server: Application, core: LoggingsMethods) {
		this.server = server;
		this.core = core;
		this.routers();
	}

	private routers(): void {
		// API Routes
		this.server.use("/api/", imagemRoute);

		// Protected Routes
		this.server.use("/api", CheckRequest(), Csrf(this.core), new Protect().Routers());

		// Auth Routes
		this.server.use("/auth/login", loginRoute);
		this.server.use("/auth/register", registerRoute);
		this.server.use("/auth/logout", logoutRoute);

		this.server.use("/auth/change", CheckRequest(), Csrf(this.core), changeRoute);
	}
}

export { ApplicationRoutes };
