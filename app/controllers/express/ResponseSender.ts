import { Request, Response } from 'express';
import { ErrType } from '@/interfaces';
import SenderError from '@/http/pages/errors/Error.html';
import JsonViewer from '@/http/pages/system/Json.html';

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

export default function ResponseSender<T>(req: Request, res: Response, params: Params<T>) {
    const { message, err, json, list } = params;
    const messages = message ? message : 'Algo desconhecido aconteceu.';
    switch (req.accepts(['html', 'json', 'txt'])) {
        case 'html':
            if (err) {
                delete err.stack;
                res.send(SenderError({ message: messages, status: 500, lang: req.language }));
            } else if (list) {
                res.send(JsonViewer(QueryedData(list, Number(req.query.page)), 'list'));
            } else if (json) {
                res.send(JsonViewer(params.json));
            } else if (res.statusCode) {
                res.send(SenderError({ message: messages, status: res.statusCode, lang: req.language }));
            } else if (req.statusCode) {
                res.send(SenderError({ message: messages, status: req.statusCode, lang: req.language }));
            } else {
                res.send(SenderError({ message: messages, status: 500, lang: req.language }));
            }
            break;
        case 'json':
            if (err) {
                delete err.stack;
                res.json({ status: res.statusCode || req.statusCode, timestamp: Date.now(), ...err });
            } else if (list) {
                res.json({
                    status: res.statusCode || req.statusCode,
                    timestamp: Date.now(),
                    ...QueryedData(list, Number(req.query.page)),
                });
            } else if (json) {
                res.json({ status: res.statusCode || req.statusCode, timestamp: Date.now(), ...json });
            } else {
                res.json({
                    message: message || 'unknown',
                    status: res.statusCode || req.statusCode || 'unknown',
                    timestamp: Date.now(),
                });
            }
            break;
        default:
            res.type('txt').send(params);
    }
}
