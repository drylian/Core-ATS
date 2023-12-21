import Authenticator from "@/controllers/express/Authorization";
import Controller from "@/http/Controller";
import Activity from "@/models/Activity";
import path from "path";
export default class AdminActivity extends Controller {
	constructor() {
		super();
		this.get("/activity", async (Request, Response) => {
			const { res } = await Authenticator(Request, Response, 4000);
			const data = await Activity.findAll({
				where: {
					admin: true,
				},
			});
			if (data) {
				const modifiedData = data.map(({ dataValues: activity }) => ({
					type: activity.type,
					identification: activity.identification,
					identity: activity.identity,
					action: activity.action,
					path: activity.path,
					requested: activity.requested,
					ip: activity.ip,
					create_at: activity.createdAt,
				}));
				return res.status(200).sender({ json: modifiedData });
			}
			return res.status(200).sender({ json: [] });
		});
		this.get("/activity/:type/:id", async (Request, Response) => {
			const type = Request.params.id;
			const id = Request.params.id;
			const { res } = await Authenticator(Request, Response, 4000);
			if (!type || !["user", "client", "authorization", "system"].includes(type)) {
				return res.status(400).sender({ message: 'Apenas os tipos "user", "client", "authorization" e "system" possuem atividades, tente novamente em /activity/"user" ou "authorization" ou "system"' })
			}
			const data = await Activity.findAll({
				where: {
					admin: true,
				},
			});
			if (data) {
				const filteredData = data
					.filter((activity) => activity.type === type)
					.filter((activity) => activity.identification === (type === "system" ? "system" : id))
					.map((activity) => ({
						type: activity.type,
						identification: activity.identification,
						identity: activity.identity,
						action: activity.action,
						path: activity.path,
						requested: activity.requested,
						ip: activity.ip,
						create_at: activity.createdAt,
					}));

				return res.status(200).sender({ json: filteredData });
			}
			return res.status(200).sender({ json: [] });
		});

	}
}
