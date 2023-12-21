import Authenticator from "@/controllers/express/Authorization";
import Controller from "@/http/Controller";
import Token, { TokenI } from "@/models/Token";
import { gen, genv5 } from "@/utils";
import bcrypt from "bcrypt";
import Loggings from "@/controllers/Loggings";
import I18alt from "@/controllers/Language";
import MakeActivity from "@/controllers/database/MakeActivity";
const core = new Loggings("Administração", "green");
const PERMISSION = 3000; // Permissão padrão para api/admin/tokens
export default class AdminsTokens extends Controller {
    constructor() {
        super();
        this.get("/tokens", async (Request, Response) => {
            const { res } = await Authenticator(Request, Response, PERMISSION);
            const Tokens = await Token.findAll();
            // Verifique se existem tokens
            if (Tokens.length === 0) {
                return res.status(200).sender({ json: [] });
            }
            const modifiedData = Tokens.map((Token) => ({
                id: Token.dataValues.id,
                memo: Token.dataValues.memo,
                token: (Token.dataValues.token.substring(0, 20)),
                permissions: Token.dataValues.permissions,
                uuid: Token.dataValues.uuid,
                lang: Token.dataValues.lang,
            }));

            // console.log(modifiedData);
            return res.status(200).sender({ json: modifiedData });
        });
        this.put("/tokens/new", async (Request, Response) => {
            const { req, res } = await Authenticator(Request, Response, PERMISSION);
            const i18n = new I18alt();
            i18n.setLanguage(req.access.lang);
            const { lang, permissions, memo } = req.body;

            if (!lang || !permissions || !memo)
                return res.status(400).json({ type: "error", message: "Params Obrigatorío não encontrado." });
            let token: string, existingToken;
            do {
                // Gera um novo token
                token = "core_" + gen(32);

                // Verifica se o token já está em uso
                existingToken = await Token.findOne({ where: { token } });

            } while (existingToken);

            // Cria o token no banco de dados
            await Token.create({
                memo,
                lang,
                token,
                permissions,
                uuid: genv5(token, "tokens"),
            });
            core.log(`Novo token foi criado "${token.substring(0, 20)}" com o rank de permissão "${permissions}"`);
            await MakeActivity(req, `criou um novo token "${token.substring(0, 20)}" que tem de permissão "${permissions}"`);

            return res.status(200).json({ type: "success", message: "Token criado com sucesso.", data: { token: token } });
        });

        this.get("/tokens/:id", async (Request, Response) => {
            const Tokenid = Request.params.id;
            const { res } = await Authenticator(Request, Response, PERMISSION);
            const TokenRecord = await Token.findOne({ where: { id: Tokenid } });
            if (!TokenRecord) {
                return res.status(404).sender({ message: "Token Não encontrado" });
            }
            let TokenData: TokenI = TokenRecord.dataValues;
            TokenData.token = TokenData.token.substring(0, 20)

            return res.status(200).sender({ json: TokenData });
        });

        this.delete("/tokens/:id/delete", async (Request, Response) => {
            const TokenId = Request.params.id;
            const { req, res } = await Authenticator(Request, Response, PERMISSION);

            // Verifica se o usuário existe antes de excluí-lo
            const TokenRecord = await Token.findOne({ where: { id: TokenId } });
            if (!TokenRecord) {
                return res.status(404).sender({ message: "Token não encontrado" });
            }
            if ((req.access.permissions ?? 0) < (TokenRecord.dataValues.permissions ?? PERMISSION)) {
                return res.status(401).sender({ message: "Não é possivel deletar um token com uma permissão maior que a sua." });
            }
            if (req.access.tokenref === TokenRecord.dataValues.token) return res.status(404).sender({ message: "É impossivel um token deletar a si mesmo na api administrativa, delete esse token usando um Administrador com as permissões necessarias." });

            // Realiza a exclusão do usuário
            await Token.destroy({ where: { id: TokenId } });
            await MakeActivity(req, `deletou um o token "${TokenRecord.dataValues.token.substring(0, 20)}" que tinha a permissão de "${TokenRecord.dataValues.permissions}"`
            );
            return res.status(200).sender({ message: "Token excluído com sucesso" });
        });
    }
}
