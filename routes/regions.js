exports.default = function(req, res) {
  res.send("Hello world");
};

exports.findAll = function(req, res) {
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    
    converter.on("end_parsed", function (jsonArray) {
        res.send(JSON.stringify(jsonArray));
    });

    require("fs").createReadStream("./data/ebird_api_ref_location_eBird_list_country.csv").pipe(converter);
};

exports.findSubNat1ByCountryCode = function(req, res) {
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    
    converter.on("end_parsed", function (jsonArray) {
        res.send(JSON.stringify(jsonArray));
    });

    var file = "./data/ebird_api_ref_location_eBird_list_subnational1_" + req.params.code + ".csv";
    var stream = require("fs").createReadStream(file);

    stream.on('error', function (error) { res.send("Caught: " + error); });
    stream.on('readable', function () { stream.pipe(converter); });
};

exports.findSubNat2ByCountryCode = function(req, res) {
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});

    converter.on("end_parsed", function (jsonArray) {
        res.send(JSON.stringify(jsonArray));
    });

    var file = "./data/ebird_api_ref_location_eBird_list_subnational2_" + req.params.code + ".csv";
    var stream = require("fs").createReadStream(file);

    stream.on('error', function (error) { res.send("Caught: " + error); });
    stream.on('readable', function () { stream.pipe(converter); });
};
