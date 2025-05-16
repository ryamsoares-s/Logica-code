function verificar(num1, num2) {
  // Usando operador ternário com return
  return typeof num1 !== "number" || typeof num2 !== "number" ? false : true;
}

// Fuction soma 2 números
function somar(num1, num2) {
  // Usando operador ternário com return
  return verificar(num1, num2) != false ? num1 + num2 : false;
}

// Function subtrai 2 números
function subtração(num1, num2) {
  return verificar(num1, num2) != false ? num1 - num2 : false;
}

exports.subtração = subtração;
exports.somar = somar;
