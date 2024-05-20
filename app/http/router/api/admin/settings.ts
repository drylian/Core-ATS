import express, { Router } from "express";
import ColorsSettings from "./settings/colors";
import LoggingsSettings from "./settings/loggings";
import ConfigsSettings from "./settings/config";
import MailerSettings from "./settings/mail";
export default class AdminSettings {
    private router: Router
    constructor() {
        this.router = express.Router()
        this.router.use("/settings", new ColorsSettings().route)
        this.router.use("/settings", new LoggingsSettings().route)
        this.router.use("/settings", new ConfigsSettings().route)
        this.router.use("/settings", new MailerSettings().route)

    }
    public get route() {
        return this.router;
    }
}
