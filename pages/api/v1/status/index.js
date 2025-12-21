import database from "infra/database.js";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const versionResult = await database.query("SHOW server_version;");
  const dbVersion = versionResult.rows[0].server_version;

  const dbMaxConnectionsResult = await database.query("SHOW max_connections;");
  const dbMaxConnections = parseInt(
    dbMaxConnectionsResult.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const connectionsUsageResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseUsageLength = connectionsUsageResult.rows[0].count;

  res.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: dbVersion,
        max_connections: dbMaxConnections,
        current_connections: databaseUsageLength,
      },
    },
  });
}

export default status;
