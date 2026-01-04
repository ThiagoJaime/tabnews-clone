import database from "infra/database.js";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(cleanDatabase);

test("PATCH to api/v1/migrations should return 200", async () => {
  const response = await fetch(
    "https://tabnews-clone-git-fix-migrations-thiago-jaimes-projects.vercel.app/api/v1/migrations",
    {
      method: "PATCH",
    },
  );

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
});
