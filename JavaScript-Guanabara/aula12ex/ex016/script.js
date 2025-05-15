function verificar() {
  let data = new Date();
  let ano = data.getFullYear();
  let fano = window.document.getElementById("txtano");
  let res = window.document.getElementById("res");
  if (fano.value.length == 0 || Number(fano.value) > ano) {
    window.alert("[ERRO] VERIFIQUE OS DADOS E TENTE NOVAMENTE");
  } else {
    let fsex = window.document.getElementsByName("radsex");
    let idade = ano - Number(fano.value);
    let genero = "";
    let img = document.createElement("img"); // Cria dinamicamente um elemento <img> no DOM
    img.setAttribute("id", "foto"); // Define o atributo "id" da imagem como "foto", permitindo estilização via CSS ou manipulação via JavaScript

    if (fsex[0].checked) {
      genero = "Homem";
      // if (idade > 0 && 12) {
      //   //criança
      //   //img.setAttribute("src", "foto.png") // // Define o caminho da imagem que será exibida
      // } else if (idade >= 12 && idade < 18) {
      //   //jovem
      //   //img.setAttribute("src", "foto1.png") ADICCIONAR IMAGEM
      // } else if (idade >= 18 && idade < 60) {
      //   //adulto
      //   //img.setAttribute("src", "foto2.png") ADICCIONAR IMAGEM
      // } else {
      //   //idoso
      //   //img.setAttribute("src", "foto3.png") ADICCIONAR IMAGEM
      // }
    } else if (fsex[1].checked) {
      genero = "Mulher";

      // if (fsex[0].checked) {
      //   genero = "Homem";
      //   if (idade > 0 && 12) {
      //     //criança
      //     //img.setAttribute("src", "foto4.png") ADICCIONAR IMAGEM
      //   } else if (idade >= 12 && idade < 18) {
      //     //jovem
      //     //img.setAttribute("src", "foto5.png") ADICCIONAR IMAGEM
      //   } else if (idade >= 18 && idade < 60) {
      //     //adulto
      //     //img.setAttribute("src", "foto6.png") ADICCIONAR IMAGEM
      //   } else {
      //     //idoso
      //     //img.setAttribute("src", "foto7.png") ADICCIONAR IMAGEM
      //   }
      // }
    }
    res.style.textAlign = "center";
    res.innerHTML = `Detectamos ${genero} com ${idade} anos`;
    //res.appendChild(img);  Add a (img) como um elemento filho dentro da div com id "res"
  }
}
