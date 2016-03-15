var express = require('express'),
    regions = require('./routes/regions'),
    path = require('path');

var app = express();
app.use(express.static('client'));

//app.get('/', regions.default);
app.get('/regions', regions.findAll);
app.get('/regions/sub1/:code', regions.findSubNat1ByCountryCode);
app.get('/regions/sub2/:code', regions.findSubNat2ByCountryCode);

app.listen(process.env.PORT);
console.log('IP: ' + process.env.IP);
console.log('PORT: ' + process.env.PORT);

/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(process.env.PORT, process.env.IP);
console.log('IP: ' + process.env.IP);
console.log('PORT: ' + process.env.PORT);
*/