import express from "express";
import AdminsAccounts from "@/http/router/api/admin/accounts";
import AdminApplication from "./router/api/admin/application";
import AdminActivity from "./router/api/admin/activity";
import ClientActivity from "./router/api/client/activity";

class Protect {
	private router: express.Router;

	constructor() {
		this.router = express.Router();
		this.routes();
	}

	private routes() {
		this.router.use("/admin", new AdminsAccounts().route);
		this.router.use("/admin", new AdminApplication().route);
		this.router.use("/admin", new AdminActivity().route);
		this.router.use("/client", new ClientActivity().route);
	}

	Routers() {
		return this.router;
	}
}

export default Protect;
