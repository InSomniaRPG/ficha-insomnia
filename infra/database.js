import { Client } from "pg";

async function query(query_obj) {

  let client;
  try {
    client = await getNewClient();
    const result = await client.query(query_obj);
    return result
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }

}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}

async function getNewClient() {

  const credentials = {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      ssl: getSSLValues(),
    }

    const client = new Client(credentials);
    // console.log("Credenciais do Postgres", credentials)
    await client.connect();
    return client;
}

export default {
  query,
  getNewClient,
};
