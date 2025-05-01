const prompt = require("prompt-sync")();

let num1 = parseFloat(prompt("Informe o primeiro número: "));
let num2 = parseFloat(prompt("Informe o segundo número: "));
let op = prompt(
  "Informe a operação (op) que deseja ( { + } { - } { / } { * } ): "
);

// if (op === "+") {
//   console.log(num1 + num2);
// } else if (op === "-") {
//   console.log(num1 - num2);
// } else if (op === "/") {
//   console.log(num1 / num2);
// } else if (op === "*") {
//   console.log(num1 * num2);
// } else {
//   console.log("Operação inválida!");
// }

let resultado;

if (op === "+") {
  resultado = num1 + num2;
} else if (op === "-") {
  resultado = num1 - num2;
} else if (op === "*") {
  resultado = num1 * num2;
} else if (op === "/") {
  resultado = num1 / num2;
} else {
  console.log("Operação inválida.");
}

if (resultado !== undefined) {
  console.log(`Resultado: ${resultado}`);
}
