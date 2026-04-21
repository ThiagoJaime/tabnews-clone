import { join } from "node:path";
import migrationRun from "node-pg-migrate";
import database from "infra/database";

const objectConfigDefault = {
  dryRun: true,
  dir: join("infra", "migrations"),
  direction: "up",
  log: () => {},
  migrationsTable: "pgmigrations",
};

export async function listPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const pendingGetHandler = await migrationRun({
      ...objectConfigDefault,
      dbClient: dbClient,
    });

    return pendingGetHandler;
  } finally {
    await dbClient?.end();
  }
}

export async function runMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migrations = await migrationRun({
      ...objectConfigDefault,
      dbClient: dbClient,
      dryRun: false,
    });

    return migrations;
  } finally {
    await dbClient?.end();
  }
}
