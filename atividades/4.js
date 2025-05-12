const prompt = require("prompt-sync")();

let idade = parseFloat(prompt("Informe sua idade "));

// Utilizando if e else.

// if (idade >= 18) {
//   console.log("Acesso liberado!");
// } else {
//   console.log("Acesso negado!");
// }

idade >= 18 ? console.log("Acesso liberado!") : console.log("Acesso negado!"); // Utilizando Ternário.
