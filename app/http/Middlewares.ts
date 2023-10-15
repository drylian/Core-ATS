import { CsrfProtection } from "@/http/middlewares/CSRF";

import { Application } from "express";

export default async function Middlewares(app:Application) {
	/**
	 * Carrega a proteção CSRF no painel
	 */
	await CsrfProtection(app);
}