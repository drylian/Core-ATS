import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from 'models/User';
const router = express.Router();

// Rota de autenticação
router.post('/:type', async (req: Request, res: Response) => {
    const type = req.params.type;
    if (type === "password") {
        const { username, password, newpassword } = req.body;
        // Cria um hash da senha
        const saltRounds = 10; // You can adjust the number of salt rounds as needed
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(newpassword, salt);

        const userRecord: any =
            (await User.findOne({ where: { username } }));
        if (userRecord && bcrypt.compareSync(password, userRecord.password)) {
            /**
             * Atualiza a senha atual
             */
            await User.update({ password: hashedPassword }, { where: { uuid: userRecord.uuid } });
            return res.status(200).json({ complete: true, message: "Senha Alterada com sucesso." });
        }
        return res.status(401).json({message: "Senha inválida." });

    } else if (type === "email") {
        const { email, password , newemail } = req.body;
        const userRecord: any =
            (await User.findOne({ where: { email } }));
        if (userRecord && bcrypt.compareSync(password, userRecord.password)) {
            /**
             * Atualiza o email atual
             */
            await User.update({ email: newemail }, { where: { uuid: userRecord.uuid } });
            return res.status(200).json({ complete: true, message: "Email Alterado com sucesso.", email: newemail });
        }
        return res.status(401).json({message: "Senha/Email atual inválidos." });
    } else {
        return res.status(404).json({ message: "Metodo não encontrado." });
    }
});

export default router;