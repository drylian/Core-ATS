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
					userid: activity.userid,
					username: activity.username,
					action: activity.action,
					ip: activity.ip,
					create_at: activity.createdAt,
				}));
				return res.status(200).sender({ json: modifiedData });
			}
			return res.status(200).sender({ json: [] });
		});
		this.get("/activity/:id", async (Request, Response) => {
			const userid = Request.params.id;
			const { res } = await Authenticator(Request, Response, 4000);
			const data = await Activity.findAll({
				where: {
					useruuid: "ADMINISTRATION",
				},
			});
			if (data && userid !== "system") {
				const filteredData = data
					.filter((activity) => activity.userid === Number(userid))
					.map((activity) => ({
						userid: activity.userid,
						username: activity.username,
						action: activity.action,
						ip: activity.ip,
						create_at: activity.createdAt,
					}));

				return res.status(200).sender({ json: filteredData });
			} else if (data && userid === "system") {
				const filteredData = data
					.filter((activity) => activity.userid === -10)
					.map((activity) => ({
						userid: activity.userid,
						username: activity.username,
						action: activity.action,
						ip: activity.ip,
						create_at: activity.createdAt,
					}));

				return res.status(200).sender({ json: filteredData });
			}
			return res.status(200).sender({ json: [] });
		});

	}
}
