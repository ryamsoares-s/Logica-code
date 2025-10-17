import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Rota de Login
router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;

    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const validPassword = await bcrypt.compare(
      userInfo.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Login inválido." });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login realizado com sucesso.", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login.", error: error.message });
  }
});

router.all("{*splat}", (req, res) => {
  res
    .status(405)
    .json({ error: `Método ${req.method} não permitido nesta rota.` });
});

export default router;
