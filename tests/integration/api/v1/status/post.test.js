import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("Testar com POST endpoint de status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status", {
    method: "POST",
  });

  expect(response.status).toBe(405);

  const body = await response.json();

  expect(body).toEqual({
    name: "MethodNotAllowedError",
    message: "Método não permitido para este endpoint.",
    action: "Verifique o método HTTP enviado.",
    status_code: "405",
  });
});
