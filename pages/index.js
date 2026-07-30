import fs from "fs";
import path from "path";

function index(request, response) {
  const html = fs.readFileSync(
    path.join(process.cwd(), "api", "index.html"),
    "utf8"
  );

  response.setHeader("Content-Type", "text/html");
  response.status(200).send(html);
}

export default index;
