import express from 'express';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import Loggings from '@/controllers/Loggings';
const core = new Loggings('Registro', 'green');
import { genv5 } from '@/utils';
import { ErrType } from '@/interfaces';

const router = express.Router();

// Rota de registro
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verifica se o email já está em uso
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já está em uso' });
        }

        // Cria um hash da senha
        const saltRounds = 10; // You can adjust the number of salt rounds as needed
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Cria o usuário no banco de dados
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            uuid: genv5(email, 'users'),
        });

        core.log(`Novo usuário foi criado : "${newUser.username}"`);

        return res.json({ complete: true, message: 'Sucesso ao criar o usuário' });
    } catch (error) {
        core.error(`Erro ao tentar registrar um usuário : "${(error as ErrType).stack}"`);
        return res.status(500).json({ message: 'Erro ao registrar' });
    }
});

export default router;
