import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { UserE } from "@/models/User";
import { ALTcpt, AlTexp } from "@/utils";
import Loggings from "@/controllers/Loggings";
import { v4 as uuidv4 } from "uuid"; // Importa a função uuidv4 para gerar UUIDs
import { ErrType, SettingsJson } from "@/interfaces";
import storage from "@/controllers/Storage";

const core = new Loggings("Login", "green");
const router = express.Router();

// Rota de autenticação
router.post("/", async (req: Request, res: Response) => {
	const config: SettingsJson = storage.get("config");
	try {
		// Verifique se os campos necessários estão presentes no corpo da solicitação
		const { username, password, remember_me = false } = req.body;

		if (!username || !password) {
			return res.status(400).json({ errors: { general: "Campos obrigatórios faltando." } });
		}

		// Procura o usuário pelo usuário ou email
		const userRecord =
			(await User.findOne({ where: { username: username } })) ||
			(await User.findOne({ where: { email: username } }));

		// Verifica se o usuário existe e se a senha está correta
		if (userRecord && bcrypt.compareSync(password, userRecord.dataValues.password)) {
			const UserData: UserE = userRecord.dataValues;
			delete UserData.password;
			delete UserData.id;
			if (remember_me) {
				const rememberMeUUID = uuidv4();
				await User.update({ remember: rememberMeUUID }, { where: { uuid: userRecord.uuid } });
				res.cookie("X-Application-Refresh", ALTcpt({ remember: rememberMeUUID }, config.server.refreshTokenSecret, { ip: req.access.ip?.toString() ,expires: "90d" }), { maxAge: AlTexp("90d"), httpOnly: true })
			}
			res.cookie("X-Application-Access", ALTcpt(UserData, config.server.accessTokenSecret, { ip: req.access.ip?.toString() ,expires: remember_me ? "15m" : "1h" }), { maxAge: AlTexp(remember_me ? "15m" : "1h"), httpOnly: true })

			return res.json({ type: "success", message: "Bem vindo(a) " + UserData.username + ".", complete: true });

		} else {
			return res.status(401).json({ message: "Usuário/email ou senha inválidos." });
		}
	} catch (error) {
		core.error(`Erro ao autenticar um usuário : "${(error as ErrType).stack}"`);
		return res.status(500).json({ errors: { general: "Erro ao autenticar" } });
	}
});

export default router;
