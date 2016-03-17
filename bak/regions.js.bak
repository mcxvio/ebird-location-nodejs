exports.default = function(req, res) {
    //res.send("Hello world");

    var jsonQuery = require("json-query");
  
    //var data = JSON.parse(require("fs").readFileSync("./data/people.json"));
    //var data = require("../data/people.json");
    /*
    var data = require("../data/all_countries_subnationals.json");
    
    //res.send(jsonQuery('people[*country!=].name', { data: data }).value);
    res.send(jsonQuery('result[*subnational1-code=].name', { data: data }).value);
    */
    
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    
    converter.on("end_parsed", function (data) {
        
        //res.send(JSON.stringify(data));
        
        res.send( jsonQuery('[*SUBNATIONAL2_CODE!=]', { data: data }) );        
    });

    require("fs").createReadStream("./data/ebird_api_ref_location_eBird_list_all_subnationals.csv").pipe(converter);
};

/* json query example here - select all from .json for US-
//var jsonQuery = require('json-query')
*/

exports.countriesAll = function(req, res) {
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    
    converter.on("end_parsed", function (jsonArray) {
        res.send(JSON.stringify(jsonArray));
    });

    require("fs").createReadStream("./data/ebird_api_ref_location_eBird_list_all_countries.csv").pipe(converter);
};

exports.subnational1All = function(req, res) {
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    var jsonQuery = require("json-query");
    
    converter.on("end_parsed", function (data) {
        //res.send(JSON.stringify(data));
        res.send( jsonQuery('[*SUBNATIONAL2_CODE=]', { data: data }).value );
    });
    
    // filter from all subnationals, those rows that DON'T have subnational 2 id.
    require("fs").createReadStream("./data/ebird_api_ref_location_eBird_list_all_subnationals.csv").pipe(converter);
};

exports.subnational2All = function(req, res) {
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    var jsonQuery = require("json-query");
    
    converter.on("end_parsed", function (data) {
        //res.send(JSON.stringify(data));
        res.send( jsonQuery('[*SUBNATIONAL2_CODE!=]', { data: data }).value );
    });

    // filter from all subnationals, those rows that DO have subnational 2 id.
    require("fs").createReadStream("./data/ebird_api_ref_location_eBird_list_all_subnationals.csv").pipe(converter);
};

exports.subNational1ByCountryCode = function(req, res) {
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    var jsonQuery = require("json-query");
    var countryCode = req.params.countryCode;
            
    converter.on("end_parsed", function (data) {
        //res.send(JSON.stringify(data));
        var subnat1s = jsonQuery('[*SUBNATIONAL2_CODE=]', { data: data }).value;
        
        res.send( jsonQuery('[*COUNTRY_CODE=' + countryCode + ']', { data: subnat1s }).value );
    });
    
    // filter from all subnationals, those rows that DON'T have subnational 2 id.
    //require("fs").createReadStream("./data/ebird_api_ref_location_eBird_list_all_subnationals.csv").pipe(converter);
    var stream = require("fs").createReadStream("./data/ebird_api_ref_location_eBird_list_all_subnationals.csv");
    stream.pipe(converter);
    
    stream.on('error', function (error) { res.send("Caught: " + error); });
    stream.on('readable', function () { stream.pipe(converter); });
};

exports.subNational2ByCountryCode = function(req, res) {
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    var jsonQuery = require("json-query");
    var countryCode = req.params.countryCode;

    converter.on("end_parsed", function (data) {
        //res.send(JSON.stringify(data));
        var subnat2s = jsonQuery('[*SUBNATIONAL2_CODE!=]', { data: data }).value;
        
        res.send( jsonQuery('[*COUNTRY_CODE=' + countryCode + ']', { data: subnat2s }).value );
    });

    //require("fs").createReadStream("./data/ebird_api_ref_location_eBird_list_all_subnationals.csv").pipe(converter);
    var stream = require("fs").createReadStream("./data/ebird_api_ref_location_eBird_list_all_subnationals.csv");
    stream.pipe(converter);

    stream.on('error', function (error) { res.send("Caught: " + error); });
    stream.on('readable', function () { stream.pipe(converter); });
};
