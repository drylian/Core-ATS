import express, { Request, Response } from "express";
import { Helmet } from "@/http/middlewares/Helmet";
import storage from "@/controllers/Storage";
import { ErrType, SettingsJson } from "@/interfaces";
import Loggings from "@/controllers/Loggings";
import i18alt from "@/controllers/Language";
import { MorganLogs } from "@/http/middlewares/Morgan";
import cookieParser from "cookie-parser";
import path from "path";
import configuractions from "./settings/Default";
import { i18AltRequests } from "@/http/middlewares/i18AltRequests";
import { Protocols } from "@/http/middlewares/Protocols";
import fileUpload from "express-fileupload";
import { SenderSettings } from "@/http/middlewares/SenderSettings";
import Credentials from "@/http/middlewares/Credentials";
import Cors from "@/http/middlewares/Cors";
import { Connections } from "@/http/middlewares/Connections";
import { ApplicationRoutes } from "@/http/Application";
import HtmlIndex from "@/http/pages/system/index.html";
import { generateCsrfToken } from "@/http/middlewares/Csrf";
import { ViteInjector } from "./express/vite/ViteInjector";
import { LanguageRequests } from "@/http/router/base/Languages";

class Express {
  public server: express.Application;
  private core: Loggings;
  private i18n: i18alt;
  private apache: Loggings;
  private config: SettingsJson;


  constructor() {
    this.core = new Loggings("Express", "green");
    this.i18n = new i18alt();
    this.apache = new Loggings("Apache-Logs", "blue");
    storage.rel("config");
    this.config = storage.get("config");
    this.core.log("Iniciando Rotas do painel.");
    this.server = express();
    this.middlewares();
    this.routers();
    this.listen();
  }

  private middlewares(): void {
    this.server.use(Helmet());
    this.server.use(cookieParser());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(i18AltRequests(this.i18n));
    this.server.use(Protocols());
    this.server.use(Credentials());
    this.server.use(Cors());
    this.server.use(Connections(this.core));
    this.server.use(MorganLogs(this.apache));
    this.server.use(cookieParser(this.config.server.csrf.cookie_secret));
    this.server.use("/", express.static(path.join(configuractions.rootPATH + "/http/static")));
    this.server.use(SenderSettings());
    this.server.use(fileUpload());
  }

  private routers(): void {
    new LanguageRequests(this.server)
    new ApplicationRoutes(this.server, this.core)
  }

  private async listen() {
    if (this.config.mode !== "production" && this.config.mode !== "pro") {
      this.core.log("Aplicação em modo de [desenvolvimento].gray, inicializando...");
      await new ViteInjector(this.server).development();
      const server = this.server.listen(
        parseInt(this.config?.server?.port),
        "0.0.0.0",
        () => this.core.log(`Servidor [iniciado].green em [${this.config.server.url}:${this.config.server.port}].blue.`)
      );
      this.core.log("[Vite].magenta iniciou com [sucesso].green.");
      this.extend();
      // Handle unhandled errors from Express
      server.on("error", (error) => {
        this.core.error(`[Erro].red não detectado pelo servidor servidor: ${error.stack}`);
      });
    } else {
      this.core.log("Servidor está iniciando...");
      await new ViteInjector(this.server).production();
      this.extend();
      const server = this.server.listen(
        parseInt(this.config?.server?.port),
        "0.0.0.0",
        () => this.core.log(`Servidor [iniciado].green em [${this.config.server.url}:${this.config.server.port}].blue.`)
      );

      // Handle unhandled errors from Express
      server.on("error", (error) => {
        this.core.error(`Uncaught error in the server: ${error.stack}`);
      });
    }
  }

  private extend() {
    this.server.all("*", (req, res) => {
      res.status(404).sender({message:this.i18n.t("http:errors.ResourcesNotFound")});
    });

    this.server.all("*", (error: ErrType, req: Request, res: Response) => {
      this.core.error(`[Error:].red ${error.stack}`);
      res.status(500).sender({ message:"http:errors.InternalServerError" });
    });
  }

}

export default Express;
