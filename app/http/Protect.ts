import express from "express";
import Account from "@/http/router/api/admin/account";

class Protect {
	private router: express.Router;

	constructor() {
		this.router = express.Router();
		this.routes();
	}

	private routes() {
		this.router.use("/admin", new Account().route);
	}

	Routers() {
		return this.router;
	}
}

export default Protect;
