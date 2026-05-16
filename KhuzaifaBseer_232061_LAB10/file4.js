const fs = require('fs');
const http = require('http');
http.createServer((req, res) => {
  fs.readFile('demo.txt', 'utf8', (err, data) => {
    if (err) {
      res.end("<h2>Error reading file</h2>");
      return;
    }
    res.end("<h2>File Data:</h2><p>" + data + "</p>");
  });
}).listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
