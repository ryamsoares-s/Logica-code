import express from "express";
import publicRoutesLogin from "./public/login.js";
import publicRoutesCadastro from "./public/cadastro.js";
import privateRoutesUsuarios from "./private/usuarios.js";

import auth from "../middlewares/auth.js";

const app = express();
app.use(express.json());

app.use("/api", auth, privateRoutesUsuarios);
app.use("/api", publicRoutesCadastro);
app.use("/api", publicRoutesLogin);

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
