import express from "express";
import publicRoutesLogin from "./routes/public/login.js";
import publicRoutesCadastro from "./routes/public/cadastro.js";
import privateRoutes from "./routes/private.js";

import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.use("/api", auth, privateRoutes);
app.use("/api", publicRoutesCadastro);
app.use("/api", publicRoutesLogin);

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
