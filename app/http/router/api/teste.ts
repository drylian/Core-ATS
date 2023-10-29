import express from 'express';
import User from '@/models/User';
import { rcore as core } from '@/controllers/Express';

const router = express.Router();

export default router.get('/account', async (req, res) => {
    // Consultar todos os usuários usando o modelo Sequelize User
    try {
        const users = await User.findAll();

        // Verifique se existem usuários
        if (users.length === 0) {
            return res.status(404).sender({ message: 'Nenhum usuário encontrado' });
        }
        return res.sender({ list: users });
    } catch (e) {
        core.error('Erro ao buscar usuários:' + e);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
