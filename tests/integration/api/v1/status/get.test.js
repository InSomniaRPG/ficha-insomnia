test("GET to /api/v1/status should return status 200 OK", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.active_connections).toBeDefined();
  
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  
  expect(typeof responseBody.dependencies.database.version).toBe("string");
  expect(responseBody.dependencies.database.version).toBe("16.0");
  expect(typeof responseBody.dependencies.database.max_connections).toBe("number");
  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(typeof responseBody.dependencies.database.active_connections).toBe("number");
  expect(typeof responseBody.dependencies.database.opened_connections).toBe("number");
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});

test("Teste de SQL Injection", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status?databaseName=local_db");
});
