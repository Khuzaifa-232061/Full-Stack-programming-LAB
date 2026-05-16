const fs = require('fs');
fs.writeFileSync("demo.txt", "Hello Node.js");
const http = require('http');
http.createServer((req, res) => {
  res.end("<h2>File Created Successfully</h2>");
}).listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
