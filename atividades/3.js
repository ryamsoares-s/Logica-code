const prompt = require("prompt-sync")();

let num1 = parseFloat(prompt("Informe o primeiro número: "));
let num2 = parseFloat(prompt("Informe o segundo número: "));
let op = prompt(
  "Informe a operação (op) que deseja ( { + } { - } { / } { * } ): "
);

let resultado;

switch (op) {
  case "+":
    resultado = num1 + num2;
    console.log(`Resultado: ${resultado}`);
    break;
  case "-":
    resultado = num1 + num2;
    console.log(`Resultado: ${resultado}`);
    break;
  case "/":
    resultado = num1 + num2;
    console.log(`Resultado: ${resultado}`);
    break;
  case "*":
    resultado = num1 + num2;
    console.log(`Resultado: ${resultado}`);
    break;
  default:
    console.log("Operação inválida.");
}
