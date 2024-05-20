import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "@/models/User";
import I18alt from "@/controllers/Language";
import AuthenticatorController from "@/http/controllers/AuthenticatorController";

const router = express.Router();
const PERMISSION = 1000
// Rota de autenticação
router.post("/:type", async (Request: Request, Response: Response) => {
	const { req, res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION, only:["Cookie"] }).auth();
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
