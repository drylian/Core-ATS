import I18alt from "@/controllers/Language";
import { hashmd5 } from "@/utils";
import { Application, Request, Response } from "express";

export class LanguageRequests {
	private app: Application;
	private i18n: I18alt;

	constructor(app: Application) {
		this.app = app;
		this.i18n = new I18alt();
		this.set();
	}

	private set() {
		this.app.get("/languages/requests", (req: Request, res: Response) => {
			const { namespace, lang, native, hash } = req.query;

			const data = this.i18n.getNR(namespace as string, native !== undefined, lang as string);
			res.header({
				"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
				ETag: hashmd5(data),
				i18hash: hash || "know",
			});
			res.status(200).json(data);
		});
	}
}
