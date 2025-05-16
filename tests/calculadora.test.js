const calculadora = require("../atividades/calculadora.js");

test("Espero que 2 + 2 retorne 4", () => {
  const res = calculadora.somar(2, 2);
  expect(res).toBe(4);
});

test("Inserir String ao invés de number deve retornar false", () => {
  const res = calculadora.somar("oi", 10);
  expect(res).toBe(false);
});

test("Espero que -2 + 2 retorne 0", () => {
  const res = calculadora.somar(-2, 2);
  expect(res).toBe(0);
});

