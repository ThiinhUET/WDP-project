var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  var file = fs.createReadStream('./login.html');
  file.pipe(response);

}).listen(8080);

console.log('listening on port 8080...');