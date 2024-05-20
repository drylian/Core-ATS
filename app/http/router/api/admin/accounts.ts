import AuthenticatorController from "@/http/controllers/AuthenticatorController";
import Controller from "@/http/Controller";
import User, { UserE } from "@/models/User";
import { genv5 } from "@/utils";
import bcrypt from "bcrypt";
import Loggings from "@/controllers/Loggings";
import I18alt from "@/controllers/Language";
import MakeActivity from "@/controllers/database/MakeActivity";
const core = new Loggings("Administração", "green");
const PERMISSION = 3000; // Permissão padrão para api/admin/accounts
export default class AdminsAccounts extends Controller {
	constructor() {
		super();
		this.get("/accounts", async (Request, Response) => {
			const { res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION, only: ["Administration", "Cookie"] }).auth();
			const users = await User.findAll();
			// Verifique se existem usuários
			if (users.length === 0) {
				return res.status(404).sender({ message: "Nenhum usuário encontrado" });
			}
			const modifiedData = users.map((user) => ({
				id: user.id,
				username: user.username,
				email: user.email,
				lang: user.lang,
				permissions: user.permissions,
				remember: user.remember,
				suspended: user.suspended,
				suspendedReason: user.suspendedReason,
			}));

			return res.status(200).sender({ json: modifiedData });
		});
		this.put("/accounts/new", async (Request, Response) => {
			const { req, res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION, only: ["Administration", "Cookie"] }).auth();
			const i18n = new I18alt();
			i18n.setLanguage(req.access.lang);
			const { username, email, password, lang, permissions } = req.body;

			if (!username || !email || !password || !lang || !permissions) {
				await MakeActivity(req, `Request falhou ,Params Obrigatoríos não encontrados`, false);

				return res.status(400).json({ type: "error", message: "Params Obrigatoríos não encontrados." });
			}
			// Verifica se o email já está em uso
			const existingUser = await User.findOne({ where: { email } });
			if (existingUser) {
				return res.status(400).json({ type: "warn", message: i18n.t("react:auth.EmailHasUsed") });
			}
			if (Number(permissions) >= Number(req.access.permissions)) {
				return res.status(401).json({ type: "warn", message: "Não é possivel criar um usuário com uma permissão maior ou igual a sua." });
			}
			const saltRounds = 10; // You can adjust the number of salt rounds as needed
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashedPassword = bcrypt.hashSync(password, salt);

			// Cria o usuário no banco de dados
			const newUser = await User.create({
				lang,
				username,
				email,
				password: hashedPassword,
				permissions,
				uuid: genv5(email, "users"),
			});
			core.log(`Novo usuário foi criado : "${newUser.username}"`);
			await MakeActivity(req, "criou o usuário " + newUser.username);

			return res.status(200).json({ type: "success", message: "Usuário criado com sucesso." });
		});

		this.get("/accounts/:id", async (Request, Response) => {
			const userid = Request.params.id;
			const { req, res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION, only: ["Administration", "Cookie"] }).auth();
			const userRecord = await User.findOne({ where: { id: userid } });
			if (!userRecord) {
				await MakeActivity(req, `Usuário não encontrado(GET)`, false);
				return res.status(404).sender({ message: "usuário Não encontrado" });
			}
			const UserData: UserE = userRecord.dataValues;
			delete UserData.password;

			return res.status(200).sender({ json: UserData });
		});

		this.delete("/accounts/:id/delete", async (Request, Response) => {
			const userId = Request.params.id;
			const { req, res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION, only: ["Administration", "Cookie"] }).auth();

			// Verifica se o usuário existe antes de excluí-lo
			const userRecord = await User.findOne({ where: { id: userId } });
			if (!userRecord) {
				await MakeActivity(req, `Usuário não encontrado(DELETE)`, false);
				return res.status(404).sender({ message: "Usuário não encontrado" });
			}
            if ((req.access.permissions ?? 0) <= (userRecord.dataValues.permissions ?? PERMISSION)) {
				await MakeActivity(req, `tentou deletar "${userRecord.dataValues.email}" que tinha uma permissão maior que a dele "${req.access.permissions}"`, false);
				return res.status(401).sender({ message: "Não é possivel deletar um usuário com uma permissão maior que a sua." });
			}

			if (req.access.user && req.access.id === Number(userId)) return res.status(404).json({ type: "warning", message: "É impossivel um administrador deletar a si mesmo no painel administrativo, delete sua conta pela area do cliente" });

			// Realiza a exclusão do usuário
			await User.destroy({ where: { id: userId } });
			await MakeActivity(req, `deletou o usuário do email "${userRecord.dataValues.email}" que tinha rank de permissão "${userRecord.dataValues.permissions}"`);

			return res.status(200).sender({ message: "Usuário excluído com sucesso" });
		});

		this.put("/accounts/:id/edit", async (Request, Response) => {
			try {
				const userId = Request.params.id;
				const { req, res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION, only: ["Administration", "Cookie"] }).auth();

				// Verifica se o usuário existe antes de atualizá-lo
				const userRecord = await User.findOne({ where: { id: userId } });
				if (!userRecord) {
					await MakeActivity(req, `Usuário não encontrado(EDIT)`, false);
					return res.status(404).sender({ message: "Usuário não encontrado" });
				}
				if (userRecord.permissions && (req.access.permissions ?? 0) <= userRecord.permissions) {
					await MakeActivity(req, `tentou modificar "${userRecord.dataValues.email}" que tinha uma permissão maior que a dele "${req.access.permissions}"`, false);
					return res.status(401).json({ type: "warning", message: "Não é possivel modificar um usuário com uma permissão maior ou igual." });
				}
				if (Request.body.password) {
					const saltRounds = 10; // You can adjust the number of salt rounds as needed
					const salt = bcrypt.genSaltSync(saltRounds);
					Request.body.password = bcrypt.hashSync(Request.body.password, salt);
				}
				if (req.access.user && req.access.user.id && req.access.user.id === Number(userId)) return res.status(404).sender({ message: "É impossivel um administrador editar a si mesmo no painel administrativo, gerencie sua conta pela area do cliente" });

				// Atualiza os dados do usuário com base nos dados fornecidos no corpo da requisição
				await User.update(
					{
						username: Request.body.username,
						email: Request.body.email,
						lang: Request.body.lang,
						permissions: Request.body.permissions,
						password: Request.body.password,
					},
					{ where: { id: userId } },
				);
				if (req.access.user?.username === Request.body.username)
					await MakeActivity(
						req,
						`Atualizou as configurações de conta do email ${Request.body.email}`
					);

				return res.status(200).sender({ message: "Usuário atualizado com sucesso" });
			} catch (error) {
				console.error("Erro ao atualizar usuário:", error);
				return Response.status(500).sender({ message: "Erro interno do servidor" });
			}
		});
	}
}
