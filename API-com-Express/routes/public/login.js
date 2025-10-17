import express from "express";
import password from "../../models/password.js";
import token from "../../models/token.js";
import user from "../../models/user.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const userInputValues = req.body;

    const userFound = await user.findByEmailOrThrow(userInputValues);

    await password.compare(userInputValues.password, userFound.password);

    const newToken = await token.generate({ id: userFound.id });

    res
      .status(200)
      .json({ message: "Login realizado com sucesso.", token: newToken });
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
