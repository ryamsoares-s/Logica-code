let data = new Date();
let horario = data.getHours();

console.log(`Horario atual ${horario} horas`);

if (horario < 12) {
  console.log("Bom dia!");
} else if (horario < 19) {
  console.log("Boa tarde!");
} else {
  console.log("Boa noite!");
}
