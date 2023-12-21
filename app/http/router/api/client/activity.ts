import I18alt from "@/controllers/Language";
import Authenticator from "@/controllers/express/Authorization";
import Controller from "@/http/Controller";
import Activity from "@/models/Activity";
export default class ClientActivity extends Controller {
	constructor() {
		super();
		this.get("/activity", async (Request, Response) => {
			const { req, res } = await Authenticator(Request, Response, 1000, true);
			const i18n = new I18alt();
			if (req.access.lang) i18n.setLanguage(req.access.lang);
			if (!req.access.user || !req.access.user?.id)
				return res.status(400).sender({ message: i18n.t("react:messages.NotAccessActivity") });

			const data = await Activity.findAll({
				where: {
					type: "user",
					identification: String(req.access.user.id),
				},
			});
			if (data) {
				const modifiedData = data.map((activity) => ({
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
