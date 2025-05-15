const prompt = require("prompt-sync")();
let senha;

do {
  senha = prompt("Digite sua senha:");
} while (senha !== "1234");

console.log("Acesso permitido!");
