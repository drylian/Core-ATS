import I18alt from "@/controllers/Language";
import { Application, Request, Response, NextFunction } from "express";

export class LanguageRequests {
    private app: Application;
    private i18n: I18alt;

    constructor(app: Application) {
        this.app = app;
        this.i18n = new I18alt();
        this.set();
    }

    private set() {
        this.app.get("/languages/request", (req: Request, res: Response, next: NextFunction) => {
            const { namespace, lang, native } = req.query
            console.log(req.query)
            switch (req.accepts(["html", "json", "txt"])) {
                case "json":
                    res.json(this.i18n.getNR(namespace as string, JSON.parse(native as string), lang as string));
                    break;
                default:
                    next();
            }
        });
    }
}
