const prompt = require("prompt-sync")();

let dia = prompt("Infome um dia da semana: ");

switch (dia) {
  case "Segunda-feira":
    console.log("Boa semana!");
    break;
  case "Quarta-feira":
    console.log("Bom meio de semana kkkk!");
    break;
  case "Sexta-feira":
    console.log("Bom final de semana!");
    break;
  default:
    console.log("Dia comum");
}
