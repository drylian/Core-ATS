import Authenticator from "@/controllers/express/Authorization";
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
			const { res } = await Authenticator(Request, Response, PERMISSION);
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

			console.log(modifiedData);
			return res.status(200).sender({ json: modifiedData });
		});
		this.put("/accounts/new", async (Request, Response) => {
			const { req, res } = await Authenticator(Request, Response, PERMISSION);
			const i18n = new I18alt();
			i18n.setLanguage(req.access.lang);
			const { username, email, password, lang, permissions } = req.body;

			if (!username || !email || !password || !lang || !permissions)
				return res.status(400).json({ type: "error", message: "Params Obrigatorío não encontrado." });
			// Verifica se o email já está em uso
			const existingUser = await User.findOne({ where: { email } });
			if (existingUser) {
				return res.status(400).json({ type: "warn", message: i18n.t("react:auth.EmailHasUsed") });
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
			await MakeActivity(req, "novo usuário criado :" + newUser.username, "ADMINISTRATION");

			return res.status(200).json({ type: "success", message: "Usuário criado com sucesso." });
		});

		this.get("/accounts/:id", async (Request, Response) => {
			const userid = Request.params.id;
			const { res } = await Authenticator(Request, Response, PERMISSION);
			const userRecord = await User.findOne({ where: { id: userid } });
			if (!userRecord) {
				return res.status(404).sender({ message: "usuário Não encontrado" });
			}
			const UserData: UserE = userRecord.dataValues;
			delete UserData.password;

			return res.status(200).sender({ json: UserData });
		});

		this.delete("/accounts/:id/delete", async (Request, Response) => {
			const userId = Request.params.id;
			const { req, res } = await Authenticator(Request, Response, 3000);

			// Verifica se o usuário existe antes de excluí-lo
			const userRecord = await User.findOne({ where: { id: userId } });
			if (!userRecord) {
				return res.status(404).sender({ message: "Usuário não encontrado" });
			}

			// Realiza a exclusão do usuário
			await User.destroy({ where: { id: userId } });
			await MakeActivity(
				req,
				"Usuário deletado pelo '" + req.access.user?.username ||
                    "token" + "' , usuário :" + userRecord.username,
				"ADMINISTRATION",
			);
			return res.status(200).sender({ message: "Usuário excluído com sucesso" });
		});

		this.put("/accounts/:id/edit", async (request, response) => {
			try {
				const userId = request.params.id;
				const { req, res } = await Authenticator(request, response, PERMISSION);

				// Verifica se o usuário existe antes de atualizá-lo
				const userRecord = await User.findOne({ where: { id: userId } });
				if (!userRecord) {
					return res.status(404).sender({ message: "Usuário não encontrado" });
				}
				if (request.body.password) {
					const saltRounds = 10; // You can adjust the number of salt rounds as needed
					const salt = bcrypt.genSaltSync(saltRounds);
					request.body.password = bcrypt.hashSync(request.body.password, salt);
				}
				// Atualiza os dados do usuário com base nos dados fornecidos no corpo da requisição
				const updatedUser = await User.update(
					{
						username: request.body.username,
						email: request.body.email,
						lang: request.body.lang,
						permissions: request.body.permissions,
						password: request.body.password,
					},
					{ where: { id: userId } },
				);
				console.log(updatedUser);
				await MakeActivity(
					req,
					`Usuário atualizado pelo "${req.access.user?.username || "token"}" , usuário :${
						request.body.username
					}`,
					"ADMINISTRATION",
				);

				return res.status(200).sender({ message: "Usuário atualizado com sucesso" });
			} catch (error) {
				console.error("Erro ao atualizar usuário:", error);
				return response.status(500).sender({ message: "Erro interno do servidor" });
			}
		});
	}
}
