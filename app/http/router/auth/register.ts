import express from "express";
import bcrypt from "bcrypt";
import User from "@/models/User";
import Loggings from "@/controllers/Loggings";
const core = new Loggings("Registro", "green");
import { genv5 } from "@/utils";
import { ErrType, SettingsJson } from "@/interfaces";
import I18alt from "@/controllers/Language";
import { UserActivity } from "@/controllers/database/MakeActivity";
import AuthenticatorController from "@/http/controllers/AuthenticatorController";
import storage from "@/controllers/Storage";

const router = express.Router();

// Rota de registro
router.post("/", async (Request, Response) => {
	const { req, res } = await new AuthenticatorController(Request, Response, { only: ["Guest"] }).auth();
	const { username, email, password, lang } = req.body;
	const i18n = new I18alt();
	const config:SettingsJson = storage.get("settings")
	if(!config.server.register) {
		return res.status(401).sender({ message: "Register System are disabled." });
	}
	if (lang) i18n.setLanguage(lang);

	try {
		if (!username || !email || !password) {
			return res.status(400).sender({ message: "Params Obrigatorío não encontrado." });
		}
		// Verifica se o email já está em uso
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			console.log(existingUser)
			return res.status(409).json({ message: i18n.t("react:auth.EmailHasUsed") });
		}

		// Cria um hash da senha
		const saltRounds = 10; // You can adjust the number of salt rounds as needed
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPassword = bcrypt.hashSync(password, salt);
		const uuid = genv5(email, "users");
		// Cria o usuário no banco de dados
		const newUser = await User.create({
			lang,
			username,
			email,
			password: hashedPassword,
			uuid: uuid,
		});

		core.log(`Novo usuário foi criado : "${newUser.username}"`);
		req.access.user = newUser.dataValues
		await UserActivity(req, "react:auth.SuccessCreatedUser", true)

		return res.status(200).json({ type: "success", complete: true, message: i18n.t("react:auth.SuccessCreatedUser") });
	} catch (error) {
		core.error(`Erro ao tentar registrar um usuário : "${(error as ErrType).stack}"`);
		return res.status(500).json({ message: i18n.t("react:auth.ErrorForProcessRegister") });
	}
});

export default router;
