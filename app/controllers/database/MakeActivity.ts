import Activity from "@/models/Activity";
import { Request } from "express";
import Loggings from "../Loggings";

export default async function MakeActivity(req: Request, action: string, useruuid?: string) {
	const core = new Loggings("Activity", "blue");
	if (!req.access.user && !useruuid) {
		core.warn("Error ao localizar o req.access da ação " + action, req.access);
	}
	core.debug(action);
	return await Activity.create({
		action: action,
		username: req.access.user?.username ?? req.access.tokenref ?? "Desconhecido",
		userid: req.access.user?.id ?? req.access.id ?? -1,
		ip: req.access.ip?.toString() || "0.0.0.0", // Substitua pelo IP real
		useruuid: useruuid || req.access.uuid || "ADMINISTRATION",
	});
}
export async function SystemActivity(action: string) {
	const core = new Loggings("Activity", "blue");
	core.debug(action);
	return await Activity.create({
		action: action,
		userid:  -10,
		username: "Sistema",
		ip: "Interno", // Substitua pelo IP real
		useruuid: "ADMINISTRATION",
	});
}
