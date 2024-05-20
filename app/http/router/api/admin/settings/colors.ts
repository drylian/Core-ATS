import storage from "@/controllers/Storage";
import AuthenticatorController from "@/http/controllers/AuthenticatorController";
import Controller from "@/http/Controller";
import { ColorJson } from "@/interfaces";
const PERMISSION = 2000
export default class ColorsSettings extends Controller {
    constructor() {
        super();
        this.get("/colors", async (Request, Response) => {
            const { res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION }).auth();
            const color: ColorJson = storage.get("color");
            return res.status(200).sender({ json: color });
        });
        this.post("/colors", async (Request, Response) => {
            const { req, res } = await new AuthenticatorController(Request, Response, { permission: PERMISSION }).auth();
            const Message: string[] = [];
            const changed: string[] = [];

            // Verificação e atualização da cor padrão do painel
            if (req.body.selected && typeof req.body.selected === 'string' && ["black", "white"].includes(req.body.selected)) {
                storage.set("color", { selected: req.body.selected }, true);
                changed.push("Selected");
            } else {
                Message.push("A cor padrão do painel deve ser 'white' ou 'black'. A cor padrão não foi alterada");
            }

            /**
             * Color Black Args
             */
            if (req.body.black) {
                if (req.body.black.color) {
                    if (req.body.black.color.primary && typeof req.body.black.color.primary === 'string') {
                        storage.set("color", { black: { color: { primary: req.body.black.color.primary } } }, true);
                        changed.push("B-C-Primary");
                    } else {
                        Message.push("A Cor Black Primaria deve ser uma string e não deve estar vazia. A Cor Black Primaria não foi alterada.");
                    }
                    if (req.body.black.color.secondary && typeof req.body.black.color.secondary === 'string') {
                        storage.set("color", { black: { color: { secondary: req.body.black.color.secondary } } }, true);
                        changed.push("B-C-Secondary");

                    } else {
                        Message.push("A Cor Black Secundaria deve ser uma string e não deve estar vazia. A Cor Black Secundaria não foi alterada.");
                    }
                    if (req.body.black.color.tertiary && typeof req.body.black.color.tertiary === 'string') {
                        storage.set("color", { black: { color: { tertiary: req.body.black.color.tertiary } } }, true);
                        changed.push("B-C-Tertiary");

                    } else {
                        Message.push("A Cor Black Terciária deve ser uma string e não deve estar vazia. A Cor Black Terciária não foi alterada.");
                    }
                }
                if (req.body.black.text) {
                    if (req.body.black.text.primary && typeof req.body.black.text.primary === 'string') {
                        storage.set("color", { black: { text: { primary: req.body.black.color.primary } } }, true);
                        changed.push("B-T-Primary");
                    } else {
                        Message.push("O Texto Black Primario deve ser uma string e não deve estar vazia. O Texto Black Primario não foi alterado.");
                    }
                    if (req.body.black.text.secondary && typeof req.body.black.text.secondary === 'string') {
                        storage.set("color", { black: { text: { secondary: req.body.black.color.secondary } } }, true);
                        changed.push("B-T-Secondary");

                    } else {
                        Message.push("O Texto Black Secundario deve ser uma string e não deve estar vazia. O Texto Black Secundario não foi alterado.");
                    }
                    if (req.body.black.text.tertiary && typeof req.body.black.text.tertiary === 'string') {
                        storage.set("color", { black: { text: { tertiary: req.body.black.color.tertiary } } }, true);
                        changed.push("B-T-Tertiary");

                    } else {
                        Message.push("O Texto Black Terciário deve ser uma string e não deve estar vazia. O Texto Black Terciário não foi alterado.");
                    }
                }
                if (req.body.black.background && typeof req.body.black.background === 'string' && (req.body.black.background.startsWith("#") || req.body.black.background.startsWith("/") || req.body.black.background.startsWith("http"))) {
                    storage.set("color", { black: { background: req.body.black.background } }, true);
                    changed.push("B-Background");

                } else {
                    Message.push("O Fundo do Black deve ser uma string, ter '#', 'http/https' ou '/' no começo e não deve estar vazia. O Fundo do Black não foi alterado.");
                }
            }

            /**
             * Color White Args
             */
            if (req.body.white) {
                if (req.body.white.color) {
                    if (req.body.white.color.primary && typeof req.body.white.color.primary === 'string') {
                        storage.set("color", { white: { color: { primary: req.body.white.color.primary } } }, true);
                        changed.push("W-C-Primary");
                    } else {
                        Message.push("A Cor White Primaria deve ser uma string e não deve estar vazia. A Cor White Primaria não foi alterada.");
                    }
                    if (req.body.white.color.secondary && typeof req.body.white.color.secondary === 'string') {
                        storage.set("color", { white: { color: { secondary: req.body.white.color.secondary } } }, true);
                        changed.push("W-C-Secondary");

                    } else {
                        Message.push("A Cor White Secundaria deve ser uma string e não deve estar vazia. A Cor White Secundaria não foi alterada.");
                    }
                    if (req.body.white.color.tertiary && typeof req.body.white.color.tertiary === 'string') {
                        storage.set("color", { white: { color: { tertiary: req.body.white.color.tertiary } } }, true);
                        changed.push("W-C-Tertiary");

                    } else {
                        Message.push("A Cor White Terciária deve ser uma string e não deve estar vazia. A Cor White Terciária não foi alterada.");
                    }
                }
                if (req.body.white.text) {
                    if (req.body.white.text.primary && typeof req.body.white.text.primary === 'string') {
                        storage.set("color", { white: { text: { primary: req.body.white.color.primary } } }, true);
                        changed.push("W-T-Primary");
                    } else {
                        Message.push("O Texto White Primario deve ser uma string e não deve estar vazia. O Texto White Primario não foi alterado.");
                    }
                    if (req.body.white.text.secondary && typeof req.body.white.text.secondary === 'string') {
                        storage.set("color", { white: { text: { secondary: req.body.white.color.secondary } } }, true);
                        changed.push("W-T-Secondary");

                    } else {
                        Message.push("O Texto White Secundario deve ser uma string e não deve estar vazia. O Texto White Secundario não foi alterado.");
                    }
                    if (req.body.white.text.tertiary && typeof req.body.white.text.tertiary === 'string') {
                        storage.set("color", { white: { text: { tertiary: req.body.white.color.tertiary } } }, true);
                        changed.push("W-T-Tertiary");

                    } else {
                        Message.push("O Texto White Terciário deve ser uma string e não deve estar vazia. O Texto White Terciário não foi alterado.");
                    }
                }
                if (req.body.white.background && typeof req.body.white.background === 'string' && (req.body.white.background.startsWith("#") || req.body.white.background.startsWith("/") || req.body.white.background.startsWith("http"))) {
                    storage.set("color", { white: { background: req.body.white.background } }, true);
                    changed.push("W-Background");

                } else {
                    Message.push("O Fundo do White deve ser uma string, ter '#', 'http/https' ou '/' no começo e não deve estar vazia. O Fundo do White não foi alterado.");
                }
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
