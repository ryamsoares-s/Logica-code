const prompt = require("prompt-sync")();

var nota = prompt("Informe sua nota: ");

// nota > 9
//   ? console.log("Excelente nota!")
//   : nota >= 7 && nota <= 9
//   ? console.log("Boa nota!")
//   : nota < 7 && nota >= 5
//   ? console.log("Nota regular!")
//   : nota < 5
//   ? console.log("Reprovado!")
//   : "";

const mensagem =
  nota > 9 && nota <= 10
    ? "Excelente nota!"
    : nota >= 7
    ? "Boa nota!"
    : nota >= 5
    ? "Nota regular!"
    : "Reprovado!";

console.log(mensagem);
