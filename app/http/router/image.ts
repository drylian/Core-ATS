import express from "express";
import fs from "fs";
import path from "path";
import configuractions from "@/controllers/settings/Default";
import ImageViewer from "../pages/system/Image.html";

const router = express.Router();

router.get("/image/:image", (req, res) => {
	const imageName = req.params.image;
	const size = req.query.size || 200;
	const imagePath = path.join(configuractions.routesPATH, "static","img", `${imageName}.png`);

	// Verifica se o arquivo da imagem existe
	fs.access(imagePath, fs.constants.F_OK, (err) => {
		if (err) {
			res.status(404).send("Imagem não encontrada");
		} else {
			// Lê a imagem como um buffer
			fs.readFile(imagePath, (err, data) => {
				if (err) {
					res.status(500).send("Erro ao ler a imagem");
				} else {
					// Converte a imagem em base64
					const base64Image = data.toString("base64");

					res.send(ImageViewer({ name: imageName, data: base64Image, size: size }))
				}
			});
		}
	});
});

export default router;
