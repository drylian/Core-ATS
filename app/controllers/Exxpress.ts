import * as path from "path";
import express, { Application, Request, Response } from "express";
import Loggings from "@/controllers/Loggings";
import fileUpload from "express-fileupload";
import configuractions from "@/controllers/settings/Default";
import { AppRouter as ApplicationBackend } from "@/http/Application";
import { json } from "@/utils";
import credentials from "@/http/middlewares/Credentials";
import configureCors from "@/http/middlewares/Cors";
import cookieParser from "cookie-parser";
import { ErrType } from "@/interfaces/Utils";
import { SettingsJson } from "@/interfaces";
import morgan from "morgan";
import HtmlIndex from "@/http/pages/system/index.html";
import ViteInjector from "@/controllers/express/vite/ViteInjector";
import { generateCsrfToken } from "@/http/middlewares/CSRF";
import i18alt, { i18AltMiddleware } from "@/controllers/Language";
import ResponseSender from "@/controllers/express/ResponseSender";
import storage from "./Storage";
import helmet from 'helmet'

export class App {
  public server: express.Application

  constructor () {
    this.server = express()
    this.middlewares()
    this.router()
  }

  private middlewares (): void {
    this.server.use(helmet())
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
  }

  private router (): void {
    this.server.use()
  }
}
