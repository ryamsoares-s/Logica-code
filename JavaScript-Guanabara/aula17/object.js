const pessoa = {
  nome: "Ryam",
  idade: "22",
  peso: 77.1,
  engordar(p = 0) {
    this.peso += p;
  },
};

const peso_atual = pessoa.peso;
pessoa.engordar(10);

if (pessoa.peso == pessoa.engordar()) {
  console.log(`${pessoa.nome} você manteve seu peso!`);
} else {
  console.log(
    `${pessoa.nome} você pesava ${peso_atual}Kg e passou a pesar ${pessoa.peso}Kg, portanto engordou!`
  );
}
