import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "@/models/User";
import Authenticator from "@/controllers/express/Authorization";
import I18alt from "@/controllers/Language";
// import { rcore as core } from "@/controllers/Express";

const router = express.Router();

// Rota de autenticação
router.post("/:type", async (Request: Request, Response: Response) => {
	const { req, res } = await Authenticator(Request, Response, 1000, true);
	const type = req.params.type;
	const i18n = new I18alt();
	if (req.access.lang) i18n.setLanguage(req.access.lang);

	if (type === "password") {
		const { username, password, newpassword } = req.body;
		if (!username || !password || !newpassword) {
			return res.status(400).json({ type: "error", message: i18n.t("react:auth.ObrigatoryCampsNotFound") });
		}
		// Cria um hash da senha
		const saltRounds = 10; // You can adjust the number of salt rounds as needed
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPassword = bcrypt.hashSync(newpassword, salt);

		const userRecord = await User.findOne({ where: { username } });
		if (userRecord && bcrypt.compareSync(password, userRecord.password)) {
			/**
             * Atualiza a senha atual
             */
			await User.update({ password: hashedPassword }, { where: { uuid: userRecord.uuid } });
			return res
				.status(200)
				.json({ type: "success", complete: true, message: i18n.t("react:auth.PasswordChangedForSuccess") });
		}
		return res.status(401).json({ type: "error", message: i18n.t("react:auth.PassNotMatch") });
	} else if (type === "email") {
		const { email, password, newemail } = req.body;
		if (!email || !password || !newemail) {
			return res.status(400).json({ type: "error", message: i18n.t("react:auth.ObrigatoryCampsNotFound") });
		}
		const userRecord = await User.findOne({ where: { email } });
		if (userRecord && bcrypt.compareSync(password, userRecord.password)) {
			/**
             * Atualiza o email atual
             */
			await User.update({ email: newemail }, { where: { uuid: userRecord.uuid } });
			return res.status(200).json({
				type: "success",
				complete: true,
				message: i18n.t("react:auth.EmailChangedForSuccess"),
				email: newemail,
			});
		}
		return res.status(401).json({ type: "error", message: i18n.t("react:auth.EmailOrPasswordInvalid") });
	} else {
		return res.status(404).json({ type: "info", message: i18n.t("react:auth.MethodNotFound") });
	}
});

export default router;
