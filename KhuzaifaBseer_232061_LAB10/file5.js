const http = require('http');
http.createServer((req, res) => {
  setTimeout(() => {
    res.end("<h2>Async Response After Delay</h2>");
  }, 2000);
}).listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
