import { Request, Response } from "express";
import { ErrType, SettingsJson } from "@/interfaces";
import SenderError from "@/http/pages/errors/Error.html";
import JsonViewer from "@/http/pages/system/Json.html";
import storage from "../Storage";

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
		if (err) {
			res.send(SenderError({ message: "Internal Server Error", status: 500, lang: req.language }, req));
		} else if (list) {
			res.send(JsonViewer(QueryedData(list, Number(req.query.page)), req, "list"));
		} else if (json) {
			res.send(JsonViewer(params.json, req));
		} else if (res.statusCode) {
			res.send(SenderError({ message: messages, status: res.statusCode, lang: req.language }, req));
		} else if (req.statusCode) {
			res.send(SenderError({ message: messages, status: req.statusCode, lang: req.language }, req));
		} else {
			res.send(SenderError({ message: messages, status: 500, lang: req.language }, req));
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
			res.json({ type: "success", status: res.statusCode || req.statusCode, timestamp: Date.now(), ...json });
		} else {
			res.json({
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
