function parimp(n) {
  if (n % 2 == 0) {
    return "Para";
  } else {
    return "Impar";
  }
}
let num = 11;
// const res = parimp(Number(num));
// console.log(`O número ${num} é ${res}`);
console.log(`O número ${num} é ${parimp(num)}`);
