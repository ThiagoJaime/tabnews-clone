import { createRouter } from "next-connect";
import { onNoMatchHandler, onErrorHandler } from "infra/controller";
import { listPendingMigrations, runMigrations } from "models/migrator";

const router = createRouter();

router.get(GetHandler).post(PostHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

async function GetHandler(req, res) {
  const pendingMigrations = await listPendingMigrations();
  return res.status(200).json(pendingMigrations);
}

async function PostHandler(req, res) {
  const migrations = await runMigrations();

  if (migrations.length > 0) {
    return res.status(201).json(migrations);
  }

  return res.status(200).json(migrations);
}
