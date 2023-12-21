import { Request, Response } from "express";
import { ErrType, SettingsJson } from "@/interfaces";
import storage from "../Storage";
import HtmlController from "@/http/server/HtmlController";

interface Params<T> {
	message?: string;
	list?: object[];
	json?: T;
	err?: ErrType;
}
function QueryedData(list: object[] = [], page?: number) {
	const data = list || [];
	const perPage = 10; // Itens por página (ajuste de acordo com sua necessidade)
	const currentPage = page || 1; // Página atual (ajuste de acordo com sua necessidade)
	const totalItems = data.length; // Total de resultados (tamanho da matriz)
	const totalPages = Math.ceil(totalItems / perPage); // Total de páginas
	const dataOnPage = data.slice((currentPage - 1) * perPage, currentPage * perPage);

	const meta = {
		pagination: {
			pages: totalPages,
			per_page: perPage,
			current: currentPage,
			results: totalItems,
		},
	};
	return { data: dataOnPage, meta: meta };
}

export default async function ResponseSender<T>(req: Request, res: Response, params: Params<T>) {
	const { message, err, json, list } = params;
	const messages = message ? message : "Algo desconhecido aconteceu.";
	switch (req.accepts(["html", "json", "txt"])) {
		case "html":
			const html = new HtmlController(req)
			if (err) {
				res.status(500).send(html.error({ message: "Internal Server Error", status: 500, err: err }));
			} else if (list) {
				res.status(200).send(html.json(QueryedData(list, Number(req.query.page))));
			} else if (json) {
				res.status(200).send(html.json(json));
			} else if (res.statusCode) {
				res.send(html.error({ message: messages, status: res.statusCode }));
			} else if (req.statusCode) {
				res.send(html.error({ message: messages, status: req.statusCode }));
			} else {
				res.send(html.error({ message: messages, status: 500 }));
			}
			break;
		case "json":
			if (err) {
				if (storage.get<SettingsJson>("config").mode.startsWith("dev"))
					return res.json({ status: res.statusCode || req.statusCode, timestamp: Date.now(), ...err });
				else
					res.json({
						type: "error",
						status: res.statusCode || req.statusCode,
						timestamp: Date.now(),
						message: err.message || "Internal Server Error",
					});
			} else if (list) {
				res.json({
					type: "success",
					status: res.statusCode || req.statusCode,
					timestamp: Date.now(),
					...QueryedData(list, Number(req.query.page)),
				});
			} else if (json) {
				res.json({
					type: "success",
					status: res.statusCode || req.statusCode,
					timestamp: Date.now(),
					data: json,
				});
			} else {
				let messageType;

				switch (res.statusCode) {
					case 200:
						messageType = "success";
						break;
					case 400:
						messageType = "error";
						break;
					case 404:
						messageType = "sucess";
						break;
					case 500:
						messageType = "error";
						break;
					default:
						messageType = "warning";
				}

				res.json({
					type: messageType,
					message: message || "unknown",
					status: res.statusCode || req.statusCode || "unknown",
					timestamp: Date.now(),
				});
			}
			break;
		default:
			res.type("txt").send(params);
	}
}
