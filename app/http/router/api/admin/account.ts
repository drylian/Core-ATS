import express from "express";
import User from "@/models/User"

const router = express.Router();

router.get("/account", async (req, res) => {
    try {
        // Consultar todos os usuários usando o modelo Sequelize User
        const users = await User.findAll();

        // Verifique se existem usuários
        if (users.length === 0) {
            return res.status(404).json({ message: "Nenhum usuário encontrado" });
        }

        return res.json(users);

    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

export default router;
