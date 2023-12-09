import storage from "@/controllers/Storage";
import Authenticator from "@/controllers/express/Authorization";
import Controller from "@/http/Controller";
import User from "@/models/User";
import Token from "@/models/Token";
import { type as ModeType, version as ModeVersion } from "@/controllers/settings/Default";
import { SettingsJson } from "@/interfaces";
export default class AdminApplication extends Controller {
	constructor() {
		super();
		this.get("/application", async (Request, Response) => {
			const { res } = await Authenticator(Request, Response, 1000);
			const config: SettingsJson = storage.get("config");
			const users = await User.findAll();
			const tokens = await Token.findAll();
			const data = {
				users: users.length,
				tokens: tokens.length,
				modetype: ModeType,
				cors: config.server.cors.active,
				version: ModeVersion,
				smtp: config.smtp.active,
			};
			return res.status(200).sender({ json: data });
		});
	}
}
