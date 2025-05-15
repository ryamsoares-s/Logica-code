let num = [7, 2, 1, 9, 5];

num.push(9); //adiciona o número 9 na última posição do array.
num.length; // Informa o tamanho do arry.
num.indexOf(7); //Verifica se existe o valor 7 dentro do vetor e retorna a posição.

console.log(`Nosso valor é: ${num}`);
console.log(`O Arrey tem ${num.length} posições`);
num.sort(); // Organiza o array em ordem crescente.
console.log(`Arrey em ordem crescente ${num}`);

// for (pos = 0; pos < num.length; pos++) {
//   console.log(`A posição ${pos} do arrey tem valor = ${num[pos]}`);
// }

for (const pos in num) {
  console.log(`A posição ${pos} do arrey tem valor = ${num[pos]}`);
}
