import Authenticator from "@/controllers/express/Authorization";
import Controller from "@/http/Controller";
import User from "@/models/User";
export default class Account extends Controller {
	constructor() {
		super();
		this.get("/account", async (Request, Response) => {
			const { res } = await Authenticator(Request, Response, 1000);
			const users = await User.findAll();
			// Verifique se existem usuários
			if (users.length === 0) {
				return res.status(404).sender({ message: "Nenhum usuário encontrado" });
			}
			return res.status(200).sender({ json: users });
		});
	}
}
