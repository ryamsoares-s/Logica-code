const prompt = require("prompt-sync")();

let nome = prompt("Digite o nome do aluno: ");
let nota1 = parseFloat(prompt("Informe sua 1º nota: ")); // O parseFloat é uma função que converte uma string para um número.
let nota2 = parseFloat(prompt("Informe sua 2º nota: "));

let media;

media = (nota1 + nota2) / 2;

if (media < 6) {
  console.log(nome + "sua nota é: " + media + ", você está reprovado!");
} else {
  console.log(nome + " sua nota é: " + media + ", você está aprovado!");
}
