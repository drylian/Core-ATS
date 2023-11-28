import express from "express";

const router = express.Router();

// Rota de logout
router.post("/", async (req, res) => {
	res.clearCookie("X-Application-Access"); // limpa o access token
	res.clearCookie("X-Application-Refresh"); // limpa o Refresh
	return res.json({
		type: "success",
		complete: true,
		message: req.t("react:messages.DeslogedForSuccess", { lang: req.access.lang || "pt-BR" }),
	});
});

export default router;
