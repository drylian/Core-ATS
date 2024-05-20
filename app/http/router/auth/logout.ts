import AuthenticatorController from "@/http/controllers/AuthenticatorController";
import express from "express";

const router = express.Router();

// Rota de logout
router.post("/", async (Request, Response) => {
	const { req, res } = await new AuthenticatorController(Request, Response, { only: ["Cookie"] }).auth();
	res.clearCookie("X-Application-Access"); // limpa o access token
	res.clearCookie("X-Application-Refresh"); // limpa o Refresh
	return res.status(200).json({
		type: "success",
		complete: true,
		message: req.t("react:messages.DeslogedForSuccess", { lang: req.access.lang || "pt-BR" }),
	});
});

export default router;
