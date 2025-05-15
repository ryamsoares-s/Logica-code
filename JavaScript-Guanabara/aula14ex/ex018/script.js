function calcular() {
  let n1 = window.document.getElementById("txtn1");
  let lista = document.getElementById("lista_tabuada");

  lista.innerHTML = ""; // limpa a lista antes de adicionar nova tabuada

  // Teste com apenas um núemro.
  // let i = 0;
  // lista.innerHTML = `${n1.value} * ${i} = ${n1.value * i}`;

  // Gera os itens da tabuada de 1 a 10
  if (n1.value.length === 0) {
    alert("Informe um número!");
  } else {
    for (let i = 1; i <= 10; i++) {
      const item = document.createElement("li"); // Cria um novo item de lista (li) para cada linha da tabuada
      item.textContent = `${Number(n1.value)} x ${i} = ${Number(n1.value) * i}`;
      lista.appendChild(item); // Adiciona o item à lista (ul ou ol) no HTML
    }
  }
  document
    .getElementById("txtn1")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        calcular(); // chama a função
      }
    });
}
