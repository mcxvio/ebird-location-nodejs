var express = require('express'),
    location = require('./routes/location');
var app = express();

app.get('/', location.default);
app.get('/location/', location.default);
//bcr
app.get('/location/bcr', location.bcrAll);
app.get('/location/bcr/match/:search', location.bcrMatch);
// Country
app.get('/location/country', location.countriesAll);
app.get('/location/country/match/:search', location.countriesMatch);
// Subnational1
app.get('/location/subnational1', location.subnational1All);
app.get('/location/subnational1/:countryCode', location.subnational1ByCountryCode);
app.get('/location/subnational1/match/:search', location.subnational1Match);
// Subnational2
app.get('/location/subnational2', location.subnational2All);
app.get('/location/subnational2/:countryCode', location.subnational2ByCountryCode);
app.get('/location/subnational2/subnational1/:subnational1Code', location.subnational2BySubnational1Code);
app.get('/location/subnational2/match/:search', location.subnational2Match);

app.listen(process.env.PORT);
console.log('IP: ' + process.env.IP);
console.log('PORT: ' + process.env.PORT);
