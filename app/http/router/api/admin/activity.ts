import Authenticator from "@/controllers/express/Authorization";
import Controller from "@/http/Controller";
import Activity from "@/models/Activity";
export default class AdminActivity extends Controller {
	constructor() {
		super();
		this.get("/activity", async (Request, Response) => {
			const { res } = await Authenticator(Request, Response, 4000);
			const data = await Activity.findAll({
				where: {
					useruuid: "ADMINISTRATION",
				},
			});
			if (data) {
				const modifiedData = data.map((activity) => ({
					username: activity.username,
					action: activity.action,
					ip: activity.ip,
					create_at: activity.createdAt,
				}));
				return res.status(200).sender({ json: modifiedData });
			}
			return res.status(200).sender({ json: [] });
		});
	}
}
