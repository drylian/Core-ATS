import express from "express";
import { json } from "utils/Json";
import configuractions, { root, type, version } from "controllers/settings/Default";

import jwt, { JwtPayload } from 'jsonwebtoken';

const router = express.Router();

router.get("/", (req, res) => {
	const config = json(configuractions.configPATH + "/settings.json");
	const colors = json(configuractions.configPATH + "/color.json");
	let user

	const { alternightuser } = req.cookies;

	if (alternightuser) {
		jwt.verify(alternightuser, config.server.accessTokenSecret, async (err: jwt.VerifyErrors | null, decoded: JwtPayload | any) => {
			if (decoded) {
				user = decoded
			}
		});
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
