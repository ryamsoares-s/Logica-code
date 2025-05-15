function carregar() {
  let msg = window.document.getElementById("msg");
  let img = window.document.getElementById("imagem");
  let data = new Date();
  let hora = data.getHours();

  if (hora >= 0 && hora < 12) {
    msg.innerHTML = `Agora são ${hora} horas. BOM DIA!`;
    img.src = "fotodia.png";
    document.body.style.background = "#FFD700";
  } else if (hora >= 12 && hora <= 18) {
    msg.innerHTML = `Agora são ${hora} horas. BOA TARDE!`;
    img.src = "fototarde.png";
    document.body.style.background = "#FFA500";
  } else {
    msg.innerHTML = `Agora são ${hora} horas. BOA NOITE!`;
    img.src = "fotonoite.png";
    document.body.style.background = "#2F4F4Fs";
  }
}
