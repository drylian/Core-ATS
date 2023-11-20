import storage from "@/controllers/Storage";
import { SettingsJson } from "@/interfaces";
import express, { NextFunction, Request, Response, Router } from "express";
import SenderError from "./pages/errors/Error.html";
import i18alt from "@/controllers/Language";

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
    this.code = err.code ?? "unknown";
    this.stack = err.stack ?? this.stack;
    this.name = err.name ?? "ControllerRouterError";
    this.message = this.message ?? this.i18n.t("http:errors.InternalServerError");
    this.req = req;
    this.res = res;
    this.error();
  }

  private error() {
    const accepts = this.req.accepts(["html", "json", "txt"]);
    const isDevMode = this.config.mode === "dev";
    const errorResponse = {
      message: this.message,
      status: 500,
      lang: this.req.language,
      err: { message: this.message, stack: this.stack, name: this.name, code: this.code },
    };

    switch (accepts) {
      case "html":
        this.res.send(SenderError(isDevMode ? errorResponse : { message: this.message, status: 500, lang: this.req.language }, this.req));
        break;
      case "json":
        this.res.json(isDevMode ? { status: this.res.statusCode || this.req.statusCode, timestamp: Date.now() } : {
          status: this.res.statusCode || this.req.statusCode,
          timestamp: Date.now(),
          message: this.message,
        });
        break;
      default:
        this.res.type("txt").send(this.i18n.t("http:errors.InternalServerError"));
    }
  }
}

class Controller {
  protected router: Router;

  constructor() {
    this.router = express.Router();
  }

  public get route() {
    return this.router;
  }

  protected async handleRoute(handler: (req: Request, res: Response, next?: NextFunction) => void, req: Request, res: Response, next?: NextFunction) {
    try {
      await handler(req, res, next);
    } catch (err) {
      const errr = {
        message: (err as ErrorController).message,
        stack: (err as ErrorController).stack,
        code: (err as ErrorController).code,
        name: (err as ErrorController).name,
      };
      new ControllerRouterError(errr, req, res);
    }
  }

  protected get(path: string, handler: (req: Request, res: Response, next?: NextFunction) => void): void {
    this.router.get(path, async (req, res, next) => {
      await this.handleRoute(handler, req, res, next);
    });
  }

  protected post(path: string, handler: (req: Request, res: Response, next?: NextFunction) => void): void {
    this.router.post(path, async (req, res, next) => {
      await this.handleRoute(handler, req, res, next);
    });
  }

  protected put(path: string, handler: (req: Request, res: Response, next?: NextFunction) => void): void {
    this.router.put(path, async (req, res, next) => {
      await this.handleRoute(handler, req, res, next);
    });
  }

  protected delete(path: string, handler: (req: Request, res: Response, next?: NextFunction) => void): void {
    this.router.delete(path, async (req, res, next) => {
      await this.handleRoute(handler, req, res, next);
    });
  }
}

export default Controller;
