import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { json } from 'utils/Json';
import configuractions from "controllers/settings/Default"
import User, { UserI } from 'models/User';



// Rota de Verificação , se o token é valido
async function Authenticator(req: Request, res: Response, next: NextFunction) {

    const config = json(configuractions + "/settings.json");
    if (!req.headers.remember_me || req.headers.alternightuser) {
        return next()
    }
    const refreshToken = req.headers.remember_me?.split(' ')[1];

    if (!refreshToken) {
        return res.status(401).json({ message: 'Token de atualização ausente.' });
    }

    try {
        const decoded: any = jwt.verify(refreshToken, config.server.refreshTokenSecret);
        let user: any = await User.findOne({ where: { username: decoded.username } }) || await User.findOne({ where: { email: decoded.email } });;

        if (user.userId === decoded.userId) {
            const user: any = await User.find(user => user.id === decoded.userId);

            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({ message: 'Token de atualização inválido.' });
            }

            // Verifique se o token de atualização está expirado
            const currentTimestamp = Date.now() / 1000; // Converte para segundos
            if (decoded.exp <= currentTimestamp) {
                return res.status(401).json({ message: 'Token de atualização expirado.' });
            }

            const accessToken = jwt.sign({ userId: user.id }, config.server.accessTokenSecret, { expiresIn: '15m' });
            res.json({ accessToken });
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token de atualização expirado.' });
        }

        core("err", "Erro interno :" + error);
        return res.status(500).json({ message: 'Erro na verificação do token de atualização.' });
    }
});

export default router;
