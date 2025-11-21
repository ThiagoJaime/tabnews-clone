const calc = require("../../models/calc");

test("somar 5 + 6 é igual a 11", () => {
  expect(calc.sum(5, 6)).toBe(11);
});

// test("nome do teste", () => {
//   expect(() => "oi").toBe();
// });
