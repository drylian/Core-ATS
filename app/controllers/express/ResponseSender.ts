import { Request, Response } from 'express';
import { ErrType } from '@/interfaces';
import SenderError from '@/http/pages/errors/Error.html';
import JsonViewer from '@/http/pages/system/Json.html';

interface Params<T> {
    message?: string;
    json?: T;
    err?: ErrType;
}

export default function ResponseSender<T>(req: Request, res: Response, params: Params<T>) {
    const { message, err, json } = params;
    const messages = message ? message : 'Algo desconhecido aconteceu.';
    switch (req.accepts(['html', 'json', 'txt'])) {
        case 'html':
            if (err) {
                res.send(SenderError({ message: messages, status: 500, lang: req.language }));
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
                res.json({ status: res.statusCode || req.statusCode, timestamp: Date.now(), ...err });
            } else if (json) {
                res.json({ status: res.statusCode || req.statusCode, timestamp: Date.now(), ...json });
            } else {
                res.json({
                    message: message,
                    status: res.statusCode || req.statusCode || 'unknown',
                    timestamp: Date.now(),
                });
            }
            break;
        default:
            res.type('txt').send(params);
    }
}
