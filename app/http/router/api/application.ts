import express from "express";
import { ALTdcp } from "@/utils";
import { root, type, version } from "@/controllers/settings/Default";
import { UserE } from "@/models/User";
import { ColorJson, SettingsJson } from "@/interfaces";
import storage from "@/controllers/Storage";

const router = express.Router();

router.get("/", (req, res) => {
	const config: SettingsJson = storage.get("config");
	const colors: ColorJson = storage.get("color");
	let user;

	const { alternightuser } = req.cookies;

	if (alternightuser) {
		const UserData = ALTdcp<UserE | null>(alternightuser, config.server.accessTokenSecret);
		if (UserData !== null) {
			user = UserData;
		}
	}

	const responseData = {
		Website: {
			title: config.server.title,
			url: config.server.url,
			port: config.server.port,
			mode: config.mode,
			source: {
				type: type,
				dir: root,
				version: version ? version : "development",
			},
			colors: { ...colors },
		},
	};

	res.sender({ json: responseData, ...(user ? { User: user } : {}) });
});

export default router;
