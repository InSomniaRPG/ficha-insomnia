import { Client } from "pg";

async function query(query_obj) {
  const credentials = {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      ssl:process.env.NODE_ENV === 'development' ? false : true,
    }
    const client = new Client(credentials);
    console.log("Credenciais do Postgres", credentials)
  try {
    await client.connect();
    const result = await client.query(query_obj);
    return result
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}
export default {
  query: query,
};
