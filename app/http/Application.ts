import { Application } from "express";
import imagemRoute from "@/http/router/image";
import captchaRoute from "@/http/router/captcha";
import PingRoute from "@/http/router/base/Ping";

import registerRoute from "@/http/router/auth/register";
import changeRoute from "@/http/router/auth/change";
import loginRoute from "@/http/router/auth/login";
import DiscordAuthRoutes from "@/http/router/auth/discord";

import logoutRoute from "@/http/router/auth/logout";
import AdminsAccounts from "@/http/router/api/admin/accounts";
import AdminApplication from "./router/api/admin/application";
import AdminActivity from "./router/api/admin/activity";
import ClientActivity from "./router/api/client/activity";
import AdminsTokens from "./router/api/admin/tokens";
import PresenceChecker from "@/http/middlewares/PresenceChecker";
import ALTCsrf from "@/utils/ALTCsrf";
import type { ALTCsrfType } from "@/utils/ALTCsrf";
import { SettingsJson } from "@/interfaces";
import storage from "@/controllers/Storage";
import AdminSettings from "./router/api/admin/settings";

class ApplicationRoutes {
	private server: Application;
	private csrf: ALTCsrfType;

	constructor(server: Application) {
		const config: SettingsJson = storage.get("settings");

		this.server = server;
		this.csrf = new ALTCsrf({
			secret: config.server.csrf.secret,
			ignores: {
				routes: config.server.csrf.ignored
			},
			csrf: { sender: "Custom", name: "X-Application-Csrf-Token", Custom: (req, res) => res.status(403).sender({ message: req.t("http:errors.AccessCSRFError") }) },
			cookie: { secure: config.server.protocol !== "https" ? false : true, signed: true }
		})
		this.routers();
	}

	private routers(): void {
		/**
		 * Rotas independentes
		 */
		this.server.use("/ping",PingRoute)
		this.server.use("/api/image", imagemRoute);
		this.server.use("/captcha", captchaRoute);
		this.server.use("*", (req, res, next) => {
			if (req.accepts("text/html")) {
				this.csrf.CreateToken(req, res, true);
			}
			next()
		});

		/**
		 * Rotas principais
		 */
		this.server.use("/api", PresenceChecker, this.csrf.ProtectionMiddleware());
		this.server.use("/api/admin", new AdminsAccounts().route);
		this.server.use("/api/admin", new AdminsTokens().route);
		this.server.use("/api/admin", new AdminApplication().route);
		this.server.use("/api/admin", new AdminActivity().route);
		this.server.use("/api/admin", new AdminSettings().route);
		this.server.use("/api/client", new ClientActivity().route);

		/**
		 * Rotas de Auth
		 */
		this.server.use("/auth*", PresenceChecker, this.csrf.ProtectionMiddleware())
		this.server.use("/auth", DiscordAuthRoutes)
		this.server.use("/auth/login", loginRoute);
		this.server.use("/auth/register", registerRoute);
		this.server.use("/auth/logout", logoutRoute);
		this.server.use("/auth/change", changeRoute);
	}
}

export { ApplicationRoutes };
