import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { UserE } from "@/models/User";
import { ALTcpt, AlTexp } from "@/utils";
import Loggings from "@/controllers/Loggings";
import { v4 as uuidv4 } from "uuid"; // Importa a função uuidv4 para gerar UUIDs
import { ErrType, SettingsJson } from "@/interfaces";
import storage from "@/controllers/Storage";
import I18alt from "@/controllers/Language";
import MakeActivity from "@/controllers/database/MakeActivity";

const core = new Loggings("Login", "green");
const router = express.Router();

// Rota de autenticação
router.post("/", async (req: Request, res: Response) => {
	const config: SettingsJson = storage.get("config");
	const i18n = new I18alt();
	// Verifique se os campos necessários estão presentes no corpo da solicitação
	const { email, password, remember_me = false, lang } = req.body;
	if (lang) i18n.setLanguage(lang);
	try {
		if (!email || !password) {
			return res.status(400).json({ message: i18n.t("react:auth.ObrigatoryCampsNotFound") });
		}

		// Procura o usuário pelo email
		const userRecord = await User.findOne({ where: { email: email } });

		// Verifica se o usuário existe e se a senha está correta
		if (userRecord && bcrypt.compareSync(password, userRecord.dataValues.password)) {
			const UserData: UserE = userRecord.dataValues;
			delete UserData.password;
			if (remember_me && UserData.uuid) {
				const rememberMeUUID = uuidv4();
				await User.update({ remember: rememberMeUUID }, { where: { uuid: UserData.uuid } });
				res.cookie(
					"X-Application-Refresh",
					ALTcpt({ remember: rememberMeUUID }, config.server.refreshTokenSecret, {
						ip: req.access.ip?.toString(),
						expires: "90d",
					}),
					{ maxAge: AlTexp("90d"), httpOnly: true },
				);
			}
			res.cookie(
				"X-Application-Access",
				ALTcpt(UserData, config.server.accessTokenSecret, {
					ip: req.access.ip?.toString(),
					expires: remember_me ? "15m" : "1h",
				}),
				{ maxAge: AlTexp(remember_me ? "15m" : "1h"), httpOnly: true },
			);
			await MakeActivity(req, "react:auth.MakedLogin", UserData.uuid);

			return res.status(200).json({
				message: i18n.t("react:auth.WelcomeBack", { Username: UserData.username }),
				complete: true,
			});
		} else {
			return res.status(401).json({ type: "success", message: i18n.t("react:auth.EmailOrPasswordInvalid") });
		}
	} catch (error) {
		core.error(`Erro ao autenticar um usuário : "${(error as ErrType).stack}"`);
		return res.status(500).json({ message: i18n.t("react:auth.GeralError") });
	}
});

export default router;
