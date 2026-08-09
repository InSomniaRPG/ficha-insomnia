import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersion = await database.query("SHOW server_version;");
  const databaseMaxConn = await database.query(
    "SELECT setting::int FROM pg_settings WHERE name = 'max_connections';"
  );
  const databaseActiveConn = await database.query(
    "SELECT * FROM pg_stat_activity;"
  );

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConn = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity Where datname = $1;",
    values: [databaseName],
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion.rows[0].server_version,
        max_connections: databaseMaxConn.rows[0].setting,
        active_connections: databaseActiveConn.rowCount,
        opened_connections: databaseOpenedConn.rows[0].count,
      },
    },
  });
}

export default status;
