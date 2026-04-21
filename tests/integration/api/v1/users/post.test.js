import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
  await orchestrator.runPendingMigrations();
});

test("POST to api/v1/users should return 201", async () => {
  // await database.query({
  //   text: "INSERT INTO users (username, email) values ($1, $2);",
  //   values: ["thiago", "th@email.com"],
  // });

  await database.query({
    text: "INSERT INTO users (username, email, password) values ($1, $2, $3);",
    values: ["Thiago", "Th@email.com", "senha123"],
  });

  const users = await database.query("SELECT * FROM users;");
  console.log(users.rows);

  const response = await fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
  });
  expect(response.status).toBe(201);
});
