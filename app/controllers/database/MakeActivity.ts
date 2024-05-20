import Activity from "@/models/Activity";
import { Request } from "express";
import Loggings from "../Loggings";

export default async function MakeActivity(req: Request, action: string, success: boolean = true) {
	const core = new Loggings("Activity", "blue");
	core.debug(action);
	/**
	 * Lida com casos separadamente
	 */
	switch (req.declares.type) {
		case "Cookie":
			await UserActivity(req, action, success)
			break;
		case "Administration":
			await TokenActivity(req, action, success)
			break;
		case "Client":
			break;
		case "Guest":
			break;
	}
}
export async function UserActivity(req: Request, action: string, success: boolean = true) {
	let administration = false
	if (req.originalUrl.startsWith("/api/admin")) administration = true
	await Activity.create({
		action: action,
		type: "user",
		identification: req.access.user ? String(req.access.user.id) : "unknown",
		identity: req.access.user ? req.access.user.username : "unknown",
		ip: req.access.ip?.toString() || "0.0.0.0",
		path: req.originalUrl,
		requested: success ? "success" : "error",
		admin: administration
	})
}
async function TokenActivity(req: Request, action: string, success: boolean = true) {
	let administration = false
	if (req.originalUrl.startsWith("/api/admin")) administration = true
	await Activity.create({
		action: action,
		type: "authorization",
		identification: req.access.id ? String(req.access.id) : "unknown",
		identity: req.access.token?.memo ? req.access.token.memo : "unknown",
		ip: req.access.ip?.toString() || "0.0.0.0",
		path: req.originalUrl,
		requested: success ? "success" : "error",
		admin: administration
	})
}
export async function SystemActivity(action: string, success: boolean = true) {
	const core = new Loggings("Activity", "blue");
	core.debug(action);
	return await Activity.create({
		action: action,
		type: "system",
		identification: "system",
		path: "Term",
		identity: "Sistema",
		ip: "Interno", // Substitua pelo IP real
		requested: success ? "success" : "error",
		admin: true
	});
}
