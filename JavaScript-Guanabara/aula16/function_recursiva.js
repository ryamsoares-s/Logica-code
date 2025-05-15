// FUNCTION RECURSIVA

function fatorial(num) {
  if (num == "1") {
    return 1;
  } else {
    return num * fatorial(num - 1);
  }
}

let n = 5;
console.log(`O fatorial de ${n} é igual ${fatorial(5)}`);
