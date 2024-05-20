import storage from "@/controllers/Storage";
import AuthenticatorController from "@/http/controllers/AuthenticatorController";
import Controller from "@/http/Controller";
import { ColorJson, SettingsJson } from "@/interfaces";
import configuractions, { version as ModeVersion } from "@/controllers/settings/Default";
import { json } from "@/utils";
const PERMISSION = 2000
export default class ConfigsSettings extends Controller {
    constructor() {
        super();
        this.get("/config", async (Request, Response) => {
            const { res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION, only: ["Administration", "Cookie"] }).auth();
            const config: SettingsJson = json(configuractions.configPATH + "/settings.json")
            const data = {
                port: config.server.port,
                url: config.server.url,
                title: config.server.title,
                protocol: config.server.protocol,
                version: ModeVersion,
                smtp: config.smtp.active,
                cors: {
                    allowed: config.server.cors.allowedroutes,
                    active: config.server.cors.active
                },
                lang: config.server.lang

            };
            return res.status(200).sender({ json: data });
        });
        this.post("/config", async (Request, Response) => {
            const { req, res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION }).auth();
            const Message: string[] = [];
            const changed: string[] = [];

            // Verificação e atualização da porta
            if (req.body.port && typeof req.body.port === 'number') {
                storage.set("settings", { server: { port: req.body.port } }, true);
                changed.push("Porta");
            } else {
                Message.push("A porta do painel deve ser um número e não deve estar vazia. A porta não foi alterada.");
            }

            // Verificação e atualização da URL
            if (req.body.url && (typeof req.body.url === 'string' || typeof req.body.url === 'number')) {
                storage.set("settings", { server: { url: req.body.url } }, true);
                changed.push("Url");

            } else {
                Message.push("A URL do painel deve ser um domínio ou IP e não deve estar vazia. A URL não foi alterada.");
            }

            // Verificação e atualização do título
            if (req.body.title && typeof req.body.title === 'string') {
                storage.set("settings", { server: { title: req.body.title } }, true);
                changed.push("Titulo");
            } else {
                Message.push("O título do painel deve ser uma string e não deve estar vazio. O título não foi alterado.");
            }

            // Verificação e atualização do protocolo
            if (req.body.protocol && ["http", "https", "http/https"].includes(req.body.protocol)) {
                storage.set("settings", { server: { protocol: req.body.protocol } }, true);
                changed.push("Protocolo");
            } else {
                Message.push("O protocolo do painel deve ser 'http', 'https' ou 'http/https' e não deve estar vazio. O protocolo não foi alterado.");
            }

            // Verificação e atualização das rotas permitidas do CORS
            if (req.body.cors.allowedroutes && Array.isArray(req.body.cors.allowedroutes) && req.body.cors.allowedroutes.every((route: any) => typeof route === 'string')) {
                storage.set("settings", { server: { cors: { allowedroutes: req.body.cors.allowedroutes } } }, true);
                changed.push("Rotas CORS");
            } else {
                Message.push("As rotas permitidas do CORS devem ser strings e não podem estar vazias. As rotas permitidas do CORS não foram alteradas.");
            }

            // Verificação e atualização do status do CORS
            if (req.body.cors.active && typeof req.body.cors.active === 'boolean') {
                storage.set("settings", { server: { cors: { active: req.body.cors.active } } }, true);
                changed.push(`Cors foi ${req.body.cors.active ? "ativado" : "desativado"}`);
            } else {
                Message.push("Ativar ou desativar o CORS deve ser um booleano (true/false) e não pode estar vazio. O CORS não foi alterado.");
            }
            if (Message.length === 0) Message.push("Configurações alteradas com sucesso.")
            else {
                Message.push(`Configurações alteradas : ` + changed.join(" ,"))
            }
            // Envie uma resposta de sucesso
            res.status(200).json({ type: Message.length > 1 ? "warning" : "success", message: Message.join("\n") });
        });
    }
}
