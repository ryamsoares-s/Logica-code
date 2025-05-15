let txtn = document.getElementById("txtn");
let lista = document.getElementById("res");
let res_manipulado = document.getElementById("res_manipulado");
let valores = [];

function valor_duplicado(array, numero) {
  // Verifica se o número já existe no array
  return array.indexOf(numero) !== -1;
}

function adicionar() {
  const valor = Number(txtn.value);

  if (txtn.value.length == 0) {
    window.alert("ERRO! DIGITE UM NÚMERO!");
  } else if (valor_duplicado(valores, valor)) {
    window.alert("ERRO! NÚMERO JÁ FOI ADICIONADO!");
  } else {
    valores.push(valor);
    const novo_item = document.createElement("li");
    novo_item.textContent = `Número adicionado: ${valor}`;
    lista.appendChild(novo_item);
    txtn.value = ""; // limpa o input
    txtn.focus(); // volta o cursor pro campo
  }
}

function confirmar() {
  if (valores.length == 0) {
    alert("ERRO! DIGITE UM NÚMERO!");
  } else {
    res_manipulado.innerHTML = ``;
    res_manipulado.innerHTML += `<p>Array em ordem crescente: [${valores.sort()}] </p>`;
    res_manipulado.innerHTML += `<p>Seu array tem ${valores.length} valores. </p>`;
  }
}
