import express from "express";
import { ALTdcp, json } from "@/utils";
import configuractions, { root, type, version } from "@/controllers/settings/Default";
import { UserE } from "@/models/User";

const router = express.Router();

router.get("/", (req, res) => {
	const config = json(configuractions.configPATH + "/settings.json");
	const colors = json(configuractions.configPATH + "/color.json");
	let user

	const { alternightuser } = req.cookies;

	if (alternightuser) {
		const UserData = ALTdcp<UserE | null>(alternightuser, config.server.accessTokenSecret)
		if (UserData !== null) { user = UserData }
	}

	const responseData: {
		[key: string]: any; // Especifica o tipo de User como opcional
	} = {
		Website: {
			title: config.server.title,
			url: config.server.url,
			port: config.server.port,
			mode: config.mode,
			source: {
				type: type,
				dir: root,
				version: version ? version : "development"
			},
			colors: { ...colors },
		},
	};

	if (user) {
		responseData.User = user;
	}

	const acceptHeader = req.headers.accept || "";
	if (acceptHeader.includes("text/html")) {
		res.render("views/JsonViewer", { responseData: responseData });
	} else {
		// Caso contrário, envie o JSON como resposta normalmente
		res.json(responseData);
	}
});

export default router;
