import express from 'express';
import jwt from 'jsonwebtoken';
import User from 'models/User';
import Loggings from 'controllers/Loggings';
const core = new Loggings("Refresh Token", "green")
import { json } from 'utils/Json';
import configuractions from 'controllers/settings/Default';
import bcrypt from 'bcrypt';


const router = express.Router();

// Rota de registro
router.post('/token', async (req, res) => {
    const config = json(configuractions.configPATH + '/settings.json');
    const { remember_token } = req.body;
    if (remember_token) {
        try {
            remember_token
            const decodedToken:any = jwt.verify(remember_token, config.server.refreshTokenSecret);

            // Procura o usuário pelo usuário ou email
            const userRecord: any =
                (await User.findOne({ where: { remember: decodedToken.remember } }));
            if (userRecord) {
                const expirestoken = 7 * 24 * 60 * 60
                const AcessToken = jwt.sign(
                    {
                        id: userRecord.id,
                        email: userRecord.email,
                        username: userRecord.username,
                        uuid: userRecord.uuid,
                    },
                    config.server.accessTokenSecret,
                    { expiresIn: expirestoken }
                );

                // Não retorne a senha no objeto do usuário
                if (userRecord.password) delete userRecord.password;

                const expirationTimeInSeconds = expirestoken;
                const expirationDate = new Date(Date.now() + expirationTimeInSeconds * 1000);
                return res.json({ complete: true, token: AcessToken, expire: expirationDate });
            } else {
                return res.status(400).json({ message: 'não foi possivel encontrar o usuário buscado' });
            }
        } catch (error: any) {
            core.error(`não foi possivel encontrar o usuário buscado : "${error.stack}"`)
            return res.status(500).json({ message: 'Erro ao registrar' });
        }
    }
    return res.status(401).json({ message: 'nem um token foi recebido' });
});

export default router;
