import { Client } from "pg";

async function query(query_obj) {
    const client = new Client({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
    });
  await client.connect();
  try {
    const result = await client.query(query_obj);
    return result
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
export default {
  query: query,
};
