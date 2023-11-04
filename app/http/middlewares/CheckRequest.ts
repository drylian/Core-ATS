import { Request, Response, NextFunction } from "express";

/**
 * Middleware para verificar a presença de alternightuser, cookie alternightuser ou autorização na solicitação.
 *
 * @param {Request} req - O objeto de solicitação do Express.
 * @param {Response} res - O objeto de resposta do Express.
 * @param {NextFunction} next - A função para continuar o fluxo da solicitação.
 * @returns {void}
 */
export default async function CheckRequest(req: Request, res: Response, next: NextFunction) {
	const hasAuthorization = req.headers.authorization !== undefined && typeof req.headers.authorization === "string";
	const hasAlternightCookie =
        req.cookies.authorization !== undefined && typeof req.cookies.authorization === "string";

	if (hasAuthorization || hasAlternightCookie) {
		if (req.headers.authorization !== undefined && req.headers.authorization.startsWith("Bearer"))
			req.checked = "authorization";
		else if (
			(req.headers.authorization !== undefined && req.headers.authorization.startsWith("UserAuth")) ||
            hasAlternightCookie
		) {
			req.checked = "user";
		} else {
			req.checked = "guest";
		}
		next();
	} else {
		if (req.accepts("text/html")) return res.redirect("/auth/login");
		if (req.accepts("application/json"))
			return res.status(401).json({ message: "O Token de autorização está ausente." });
		if (req.accepts("text/plain")) return res.status(401).send("O Token de autorização está ausente.");
		if (req.accepts("text/html")) return res.status(406).send("Request inválida.");
	}
}
