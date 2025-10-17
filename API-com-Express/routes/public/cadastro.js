import express from "express";
import user from "../../models/user.js";

const router = express.Router();

const methodNotAllowed = (req, res) => {
  res.setHeader("Allow", "POST");
  res
    .status(405)
    .json({ error: `Método ${req.method} não permitido nesta rota.` });
};

router
  .route("/cadastro")
  .post(async (req, res) => {
    try {
      const userImputValues = req.body;

      await user.create(userImputValues);

      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar usuário.", error: error.message });
    }
  })
  .all(methodNotAllowed);

export default router;
