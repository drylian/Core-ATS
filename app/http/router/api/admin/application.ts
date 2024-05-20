import storage from "@/controllers/Storage";
import AuthenticatorController from "@/http/controllers/AuthenticatorController";
import Controller from "@/http/Controller";
import User from "@/models/User";
import Token from "@/models/Token";
import { type as ModeType, version as ModeVersion } from "@/controllers/settings/Default";
import { SettingsJson } from "@/interfaces";
const PERMISSION = 2000
export default class AdminApplication extends Controller {
	constructor() {
		super();
		this.get("/application", async (Request, Response) => {
			const { res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION, only: ["Administration", "Cookie"] }).auth();
			const config: SettingsJson = storage.get("settings");
			const users = await User.findAll();
			const tokens = await Token.findAll();
			const data = {
				users: users.length,
				tokens: tokens.length,
				modetype: ModeType,
				cors: config.server.cors.active,
				version: ModeVersion,
				smtp: config.smtp.active,
				bot: config.discord.active,
				auth: {
					discord: config.discord.active,
					register:config.server.register
				}
			};
			return res.status(200).sender({ json: data });
		});
	}
}
