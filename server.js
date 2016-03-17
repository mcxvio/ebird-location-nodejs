var express = require('express'),
    location = require('./routes/location');

var app = express();
app.use(express.static('client'));
//app.use(express.static('data'));


//app.get('/', regions.default);

app.get('/location/', location.default);
app.get('/location/country', location.countriesAll);
app.get('/location/subnational1', location.subnational1All);
app.get('/location/subnational2', location.subnational2All);

app.get('/location/subnational1/:countryCode', location.subNational1ByCountryCode);
app.get('/location/subnational2/:countryCode', location.subNational2ByCountryCode);

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