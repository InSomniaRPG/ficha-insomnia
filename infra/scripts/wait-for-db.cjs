const { exec } = require("node:child_process");

require("node:child_process");

function checkDatabase() {
  exec("docker exec db-dev pg_isready", handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkDatabase();
      return;
    }
    console.log("\n\n🟢 O banco de dados está pronto e aceitando conexões!\n");
  }
}

process.stdout.write("\n\n🔴 Aguardando banco de dados aceitar conexão");
checkDatabase();
