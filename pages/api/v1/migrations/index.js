import migrationRun from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";
import { createRouter } from "next-connect";
import { onNoMatchHandler, onErrorHandler } from "infra/controller";

const router = createRouter();

router.get(GetHandler).post(PostHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

const objectConfigDefault = {
  dryRun: true,
  dir: join("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function GetHandler(req, res) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const pendingGetHandler = await migrationRun({
      ...objectConfigDefault,
      dbClient: dbClient,
    });

    return res.status(200).json(pendingGetHandler);
  } finally {
    await dbClient.end();
  }
}

async function PostHandler(req, res) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const PostHandler = await migrationRun({
      ...objectConfigDefault,
      dbClient: dbClient,
      dryRun: false,
    });

    return res.status(201).json(PostHandler);
  } finally {
    await dbClient.end();
  }
}
