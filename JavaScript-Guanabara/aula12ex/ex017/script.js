function verificar() {
  let data = new Date();
  let ano = data.getFullYear();
  let input_ano = document.getElementById("txtano");
  let input_nome = document.getElementById("txtnome");

  if (
    input_ano.value.length <= 0 ||
    Number(input_ano.value) > ano ||
    input_nome.value.trim() === ""
  ) {
    window.alert("ERRO! INFORME NOVAMENTE SEUS DADOS.");
    input_nome.focus();
  } else {
    //window.alert("Deu certo!");
    let idade = ano - Number(input_ano.value);
    let res = document.getElementById("res");
    res.style.textAlign = "center";

    if (idade < 5) {
      //Educação Infantil
      res.innerHTML = `${input_nome.value} você está cursando Educação Infantil`;
    } else if (idade >= 5 && idade < 11) {
      //Ensino Fundamental I
      res.innerHTML = `${input_nome.value} você está cursando o(a) Ensino Fundamental I`;
    } else if (idade >= 11 && idade < 14) {
      //Ensino Fundamental II
      res.innerHTML = `${input_nome.value} você está cursando o(a) Ensino Fundamental II`;
    } else if (idade >= 14 && idade < 18) {
      //Ensino Médio
      res.innerHTML = `${input_nome.value} você está cursando o(a) Ensino Médio`;
    } else if (idade >= 18 && idade < 23) {
      //Ensino Superior
      res.innerHTML = `${input_nome.value} você está cursando o(a) Ensino Superior`;
    } else {
      //Pós ou Mercado de Trabalho
      res.innerHTML = `${input_nome.value} você está cursando uma Pós`;
    }
  }
  input_ano.value = ""; // limpa a caixa de text Ano de nascimento
  input_nome.value = ""; // limpa a caixa de text nome
  input_nome.focus(); // cursor volta para o campo
}
