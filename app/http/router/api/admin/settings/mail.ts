import storage from "@/controllers/Storage";
import AuthenticatorController from "@/http/controllers/AuthenticatorController";
import Controller from "@/http/Controller";
import { SettingsJson } from "@/interfaces";
import configuractions, { version as ModeVersion } from "@/controllers/settings/Default";
import { json } from "@/utils";
const PERMISSION = 6000
export default class MailerSettings extends Controller {
    constructor() {
        super();
        this.get("/mail", async (Request, Response) => {
            const { res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION, only: ["Administration", "Cookie"] }).auth();
            const config: SettingsJson = json(configuractions.configPATH + "/settings.json")
            const data = {
                active: config.smtp.active,
                host: config.smtp.host,
                port: config.smtp.port,
                secure: config.smtp.secure,
                username: config.smtp.username,
                from: config.smtp.from,
            };
            return res.status(200).sender({ json: data });
        });
        this.post("/mail", async (Request, Response) => {
            const { req, res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION }).auth();
            const Message: string[] = [];
            const changed: string[] = [];

            // Verificação e atualização da porta
            if (req.body.port && typeof req.body.port === 'number') {
                storage.set("settings", { smtp: { port: req.body.port } }, true);
                changed.push("Porta");
            } else {
                Message.push("A porta do SMTP deve ser um número e não deve estar vazia. A porta do SMTP não foi alterada.");
            }

            // Verificação e atualização da URL
            if (req.body.host && typeof req.body.host === 'string') {
                storage.set("settings", { smtp: { host: req.body.host } }, true);
                changed.push("Host");
            } else {
                Message.push("A Host do SMTP deve ser um domínio ou IP e não deve estar vazia. A Host do SMTP não foi alterada.");
            }

            // Verificação e atualização do título
            if (req.body.password && typeof req.body.password === 'string') {
                storage.set("settings", { smtp: { username: req.body.password } }, true);
                changed.push("Senha");
            } else {
                Message.push("A senha do SMTP deve ser uma string e não deve estar vazio. A senha do SMTP não foi alterado.");
            }

            if (req.body.username && typeof req.body.username === 'string') {
                storage.set("settings", { smtp: { username: req.body.username } }, true);
                changed.push("Usuário");
            } else {
                Message.push("O usuário do SMTP deve ser uma string e não deve estar vazio. O usuário do SMTP não foi alterado.");
            }

            if (req.body.secure && typeof req.body.secure === 'boolean') {
                storage.set("settings", { smtp: { secure: req.body.cors.active } }, true);
                changed.push(`Secure`);
            } else {
                Message.push("Ativar ou desativar o Secure do SMTP deve ser um booleano (true/false) e não pode estar vazio. O Secure do SMTP não foi alterado.");
            }

            if (req.body.active && typeof req.body.active === 'boolean') {
                storage.set("settings", { smtp: { active: req.body.active } }, true);
                changed.push(`SMTP`);
            } else {
                Message.push("Ativar ou desativar o SMTP deve ser um booleano (true/false) e não pode estar vazio. O SMTP não foi modificado.");
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
