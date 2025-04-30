let nome;
let idade;

const prompt = require("prompt-sync")(); // atribuindo o comando de entrada do node a variavel prompt

nome = prompt("Qual seu nome?");
idade = prompt("Qual sua idade?");

if (idade < 18) {
  console.log(nome + " é menor de idade!");
} else {
  console.log(nome + " é maior de idade!");
}
