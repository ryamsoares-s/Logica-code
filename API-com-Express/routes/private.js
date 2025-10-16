import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } });

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao listar usuários.", error: error.message });
  }
});

export default router;
