import express from 'express';
import User, { UserE } from '@/models/User';
import Loggings from '@/controllers/Loggings';
const core = new Loggings("Refresh Token", "green")
import { ALTcpt, ALTdcp, AlTexp, json } from '@/utils';
import configuractions from '@/controllers/settings/Default';
import { ErrType } from '@/interfaces';


const router = express.Router();

// Rota de registro
router.post('/token', async (req, res) => {
    const config = json(configuractions.configPATH + '/settings.json');
    const { remember_token } = req.body;
    if (remember_token) {
        try {
            const decodedToken = ALTdcp<{ remember: string }>(remember_token, config.server.refreshTokenSecret)

            if (decodedToken?.remember) {
                const rememberValue = decodedToken.remember;

                const userRecord: UserE | null = await User.findOne({ where: { remember: rememberValue } });
                if (userRecord) {
                    const AcessToken = ALTcpt({
                        id: userRecord.id,
                        email: userRecord.email,
                        username: userRecord.username,
                        uuid: userRecord.uuid,
                    }, config.server.accessTokenSecret, { expires: "15m" })

                    delete userRecord.password;

                    const expirationTimeInSeconds = AlTexp("15m");
                    const expirationDate = new Date(Date.now() + expirationTimeInSeconds * 1000);
                    return res.json({ complete: true, token: AcessToken, expire: expirationDate });
                } else {
                    return res.status(400).json({ message: 'não foi possivel encontrar o usuário buscado' });
                }
            }
        } catch (error) {
            core.error(`não foi possivel encontrar o usuário buscado : "${(error as ErrType).stack}"`)
            return res.status(500).json({ message: 'Erro ao registrar' });
        }
    }
    return res.status(401).json({ message: 'nem um token foi recebido' });
});

export default router;
