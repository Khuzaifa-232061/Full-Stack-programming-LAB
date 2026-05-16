const http = require('http');
http.createServer((req, res) => {
  const data = { name: "Ali", age: 20 };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}).listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
