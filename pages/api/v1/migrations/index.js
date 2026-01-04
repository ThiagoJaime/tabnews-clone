import migrationRun from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(req, res) {
  const method = req.method;
  if (!["GET", "POST"].includes(method)) {
    return res.status(405).end();
  }

  const dbClient = await database.getNewClient();

  const objectConfigDefault = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (method === "GET") {
    const pendingMigrations = await migrationRun(objectConfigDefault);
    await dbClient.end();
    return res.status(200).json(pendingMigrations);
  }

  if (method === "POST") {
    const migrations = await migrationRun({
      ...objectConfigDefault,
      dryRun: false,
    });

    await dbClient.end();

    if (migrations.length > 0) {
      return res.status(201).json(migrations);
    }

    return res.status(200).json(migrations);
  }
}
