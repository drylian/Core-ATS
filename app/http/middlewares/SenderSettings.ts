import storage from "@/controllers/Storage";
import ResponseSender from "@/controllers/express/ResponseSender";
import { SettingsJson } from "@/interfaces";
import { NextFunction, Request, Response } from "express";

/**
 * Middleware para o res.sender(params), para dar alias a algumas configurações do req e res
 */
export function SenderSettings() {
	return (req: Request, res: Response, next: NextFunction) => {
		const config: SettingsJson = storage.get("settings");
		if (config.server.protocol !== "https") {
			res.header({ "Content-Security-Policy": "" });
			res.sender = async (params) => {
				await ResponseSender(req, res, params);
			};
			next();
		} else {
			if (!req.secure) {
				res.redirect(`https://${req.headers.host}${req.url}`);
			} else {
				res.sender = async (params) => {
					await ResponseSender(req, res, params);
				};
				next();
			}
		}
	};
}
