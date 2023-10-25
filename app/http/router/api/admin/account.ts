import express from 'express';
import User from '@/models/User';
import Authenticator from '@/controllers/express/Authorization';
import { rcore as core } from '@/controllers/Express';

const router = express.Router();

export default router.get('/account', async (req, res) => {
    Authenticator(req, res, 2000).then(async ({ res }) => {
        // Consultar todos os usuários usando o modelo Sequelize User
        try {
            const users = await User.findAll();

            // Verifique se existem usuários
            if (users.length === 0) {
                return res.status(404).json({ message: 'Nenhum usuário encontrado' });
            }
            return res.json(users);
        } catch (e) {
            core.error('Erro ao buscar usuários:' + e);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    });
});
