const http = require("http");

//created a server
const server = http.createServer((req, res) => {
  console.log(req, "req");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello world from node js.");
});
//running the server on port.
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
