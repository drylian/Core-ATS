import express from 'express';
import User from '@/models/User';
import Authenticator from '@/controllers/express/Authorization';

const router = express.Router();

export default router.get('/teste', async (req, res) => {
    Authenticator(req, res, 2000)
        .then(async ({ res }) => {
            // Consultar todos os usuários usando o modelo Sequelize User
            try {
                const users = await User.findAll();

                // Verifique se existem usuários
                if (users.length === 0) {
                    return res.status(404).json({ message: 'Nenhum usuário encontrado' });
                }
                return res.json(users);
            } catch (e) {
                return res.json({ message: 'Error' });
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        });
});
