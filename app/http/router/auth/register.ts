import express from "express";
import bcrypt from "bcrypt";
import User from "@/models/User";
import Loggings from "@/controllers/Loggings";
const core = new Loggings("Registro", "green");
import { genv5 } from "@/utils";
import { ErrType } from "@/interfaces";
import I18alt from "@/controllers/Language";
import MakeActivity from "@/controllers/database/MakeActivity";

const router = express.Router();

// Rota de registro
router.post("/", async (req, res) => {
	const { username, email, password, lang } = req.body;
	const i18n = new I18alt();

	if (lang) i18n.setLanguage(lang);

	try {
		// Verifica se o email já está em uso
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: i18n.t("react:auth.EmailHasUsed") });
		}
		if (!username || !email || !password)
			return res.status(400).sender({ message: "Params Obrigatorío não encontrado." });

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
		await MakeActivity(req, "Conta criada", uuid);

		return res.json({ type: "success", complete: true, message: i18n.t("react:auth.SuccessCreatedUser") });
	} catch (error) {
		core.error(`Erro ao tentar registrar um usuário : "${(error as ErrType).stack}"`);
		return res.status(500).json({ message: i18n.t("react:auth.ErrorForProcessRegister") });
	}
});

export default router;
