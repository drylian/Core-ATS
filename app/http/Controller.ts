import storage from '@/controllers/Storage';
import { SettingsJson } from '@/interfaces';
import { Request, Response, Router } from 'express';
import SenderError from './pages/errors/Error.html';
import i18alt from '@/controllers/Language';

interface ErrorController {
    name?: string;
    message?: string;
    stack?: string;
    code?: string | number;
}
export class ControllerRouterError extends Error {
    private config: SettingsJson;
    private req: Request;
    private res: Response;
    private i18n: i18alt;
    private code: string | number;

    constructor(err: ErrorController, req: Request, res: Response) {
        super(err.message);
        this.config = storage.get("config");
        this.i18n = new i18alt();
        this.code = err.code?? "unknown"
        this.stack = err.stack ?? this.stack
        this.name = err.name ?? "ControllerRouterError";
        this.message = this.message ?? this.i18n.t("http:errors.InternalServerError")
        this.req = req;
        this.res = res;
        this.error();
    }

    private error() {
        switch (this.req.accepts(["html", "json", "txt"])) {
            case "html":
                if(this.config.mode === "dev")this.res.send(SenderError({ message: this.message, status: 500, lang: this.req.language, err:{message:this.message,stack:this.stack, name:this.name, code:this.code} }, this.req));
                else this.res.send(SenderError({ message: this.message, status: 500, lang: this.req.language }, this.req));
                break;
            case "json":
                if (storage.get<SettingsJson>("config").mode.startsWith("dev")) return this.res.json({ status: this.res.statusCode || this.req.statusCode, timestamp: Date.now(), });
                else this.res.json({ status: this.res.statusCode || this.req.statusCode, timestamp: Date.now(), message: this.i18n.t("http:errors.InternalServerError") });
                break;
            default:
                this.res.type("txt").send(this.i18n.t("http:errors.InternalServerError"));
        }
    }
}


/**
 * Controlador Principal das Rotas do Projeto.
 * Este controlador lida com as rotas principais do aplicativo.
 */
class Controller {
    protected router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    // Método para adicionar rota GET com tratamento de erro
    protected get(path: string, handler: (req: Request, res: Response, next?: Function) => void): void {
        this.router.get(path, (req, res, next) => {
            try {
                handler(req, res, next);
            } catch (err) {
                const errr = {
                    message: (err as ErrorController).message,
                    stack: (err as ErrorController).stack,
                    code: (err as ErrorController).code,
                    name: (err as ErrorController).name
                }
                throw new ControllerRouterError(errr, req, res);
            }
        });
    }

    // Método para adicionar rota POST com tratamento de erro
    protected post(path: string, handler: (req: Request, res: Response, next?: Function) => void): void {
        this.router.post(path, (req, res, next) => {
            try {
                handler(req, res, next);
            } catch (err) {
                const errr = {
                    message: (err as ErrorController).message,
                    stack: (err as ErrorController).stack,
                    code: (err as ErrorController).code,
                    name: (err as ErrorController).name
                }
                throw new ControllerRouterError(errr, req, res);
            }
        });
    }

    // Método para adicionar rota PUT com tratamento de erro
    protected put(path: string, handler: (req: Request, res: Response, next?: Function) => void): void {
        this.router.put(path, (req, res, next) => {
            try {
                handler(req, res, next);
            } catch (err) {
                const errr = {
                    message: (err as ErrorController).message,
                    stack: (err as ErrorController).stack,
                    code: (err as ErrorController).code,
                    name: (err as ErrorController).name
                }
                throw new ControllerRouterError(errr, req, res);
            }
        });
    }

    // Método para adicionar rota DELETE com tratamento de erro
    protected delete(path: string, handler: (req: Request, res: Response, next?: Function) => void): void {
        this.router.delete(path, (req, res, next) => {
            try {
                handler(req, res, next);
            } catch (err) {
                const errr = {
                    message: (err as ErrorController).message,
                    stack: (err as ErrorController).stack,
                    code: (err as ErrorController).code,
                    name: (err as ErrorController).name
                }
                throw new ControllerRouterError(errr, req, res);
            }
        });
    }
    public get route() {
		return this.router;
	}
}

export default Controller;
