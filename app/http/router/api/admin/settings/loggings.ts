import storage from "@/controllers/Storage";
import AuthenticatorController from "@/http/controllers/AuthenticatorController";
import Controller from "@/http/Controller";
import { LoggingsJson } from "@/interfaces";
const PERMISSION = 2000
export default class LoggingsSettings extends Controller {
    constructor() {
        super();
        this.get("/loggings", async (Request, Response) => {
            const { res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION }).auth();
            const logs: LoggingsJson = storage.get("loggings");
            return res.status(200).sender({ json: logs });
        });

        this.post("/loggings", async (Request, Response) => {
            const { req, res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION }).auth();
            const Message: string[] = [];
            const changed: string[] = [];

            // Verificação e atualização da cor padrão do painel
            if (req.body.level && typeof req.body.level === 'string' && ["Debug", "Info", "Warn", "Error"].includes(req.body.level)) {
                storage.set("loggings", { level: req.body.level }, true);
                changed.push("Level");
            } else {
                Message.push("O Level de Log do painel deve ser 'Debug', 'Info','Warn' ou 'Error'. O Level de Log não foi alterado");
            }
            // Verificação e atualização da cor padrão do painel
            if (req.body.autodelete && typeof req.body.autodelete === 'number') {
                storage.set("loggings", { autodelete: req.body.autodelete }, true);
                changed.push("AutoDelete");
            } else {
                Message.push("O Auto Delete do painel deve ser um numero e não pode estar vizio. O Auto Delete não foi alterado");
            }

            // Verificação e atualização da cor padrão do painel
            if (req.body.activedelete && typeof req.body.activedelete === 'string' && ["off", "on"].includes(req.body.level)) {
                storage.set("loggings", { activedelete: req.body.activedelete }, true);
                changed.push("ActiveDelete");
            } else {
                Message.push("O ActiveDelete do painel deve ser 'on' ou 'off'. O ActiveDelete não foi alterado");
            }

            if (Message.length === 0) Message.push("Configurações alteradas com sucesso.")
            else {
                Message.push(`Configurações alteradas : ` + changed.join(" ,"))
            }
            // Envie uma resposta de sucessoS
            res.status(200).json({ type: Message.length > 1 ? "warning" : "success", message: Message.join("\n") });
        });
    }
}
