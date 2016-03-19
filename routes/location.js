exports.default = function(req, res) {
    res.send("ebird-location-nodejs");
};

function getConverter() {
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    return converter;    
}

function convertCsvToJson(converter, file, res) {
    var stream = require("fs").createReadStream(file);
    stream.pipe(converter);
    
    stream.on('error', function (error) { res.send("Caught: " + error); });
    stream.on('readable', function () { stream.pipe(converter); });
}

function getCsvFile(type) {
    if (type == "bcr") {
        return "./data/ebird_api_ref_location_eBird_list_bcr.csv";
    }
    if (type == "country") {
        return "./data/ebird_api_ref_location_eBird_list_country.csv";
    }
    if (type == "subnational1") {
        return "./data/ebird_api_ref_location_eBird_list_subnational1.csv";
    }
    if (type == "subnational2") {
        return "./data/ebird_api_ref_location_eBird_list_subnational2.csv";
    }
}

/* BCR */
exports.bcrAll = function(req, res) {
    var converter = getConverter();

    converter.on("end_parsed", function (jsonArray) {
        res.send(JSON.stringify(jsonArray));
    });

    convertCsvToJson(converter, getCsvFile("bcr"), res);
};

exports.bcrMatch = function(req, res) {
    var converter = getConverter();
    var search = req.params.search.toLowerCase();
    
    converter.on("end_parsed", function (data) {
    	var results = data.filter(function(i, n) {
	        return i.PRIMARY_NAME.toLowerCase().indexOf(search) > -1;
        });
        res.send(JSON.stringify(results));
    });

    convertCsvToJson(converter, getCsvFile("bcr"), res);
};

/* Country */
exports.countriesAll = function(req, res) {
    var converter = getConverter();
    
    converter.on("end_parsed", function (jsonArray) {
        res.send(JSON.stringify(jsonArray));
    });

    convertCsvToJson(converter, getCsvFile("country"), res);
};

exports.countriesMatch = function(req, res) {
    var converter = getConverter();
    var search = req.params.search.toLowerCase();
    
    converter.on("end_parsed", function (data) {
    	var results = data.filter(function(i, n) {
	        return i.COUNTRY_NAME.toLowerCase().indexOf(search) > -1;
        });
        res.send(JSON.stringify(results));
    });

    convertCsvToJson(converter, getCsvFile("country"), res);
};

/* Subnational1 */
exports.subnational1All = function(req, res) {
    var converter = getConverter();
    
    converter.on("end_parsed", function (data) {
        res.send(JSON.stringify(data));
    });
    
    convertCsvToJson(converter, getCsvFile("subnational1"), res);
};

exports.subnational1ByCountryCode = function(req, res) {
    var converter = getConverter();
    var jsonQuery = require("json-query");
    var countryCode = req.params.countryCode.toUpperCase();

    converter.on("end_parsed", function (data) {
        var results = jsonQuery('[*COUNTRY_CODE=' + countryCode + ']', { data: data }).value;
        res.send(JSON.stringify(results));
    });
    
    convertCsvToJson(converter, getCsvFile("subnational1"), res);
};

exports.subnational1Match = function(req, res) {
    var converter = getConverter();
    var search = req.params.search.toLowerCase();
    
    converter.on("end_parsed", function (data) {
    	var results = data.filter(function(i, n) {
	        return i.SUBNATIONAL1_NAME.toLowerCase().indexOf(search) > -1;
        });
        res.send(JSON.stringify(results));
    });

    convertCsvToJson(converter, getCsvFile("subnational1"), res);
};

/* Subnational2 */
exports.subnational2All = function(req, res) {
    var converter = getConverter();
    
    converter.on("end_parsed", function (data) {
        res.send(JSON.stringify(data));
    });

    convertCsvToJson(converter, getCsvFile("subnational2"), res);
};

exports.subnational2ByCountryCode = function(req, res) {
    var converter = getConverter();
    var jsonQuery = require("json-query");
    var countryCode = req.params.countryCode.toUpperCase();

    converter.on("end_parsed", function (data) {
        var results = jsonQuery('[*COUNTRY_CODE=' + countryCode + ']', { data: data }).value;
        res.send(JSON.stringify(results));        
    });

    convertCsvToJson(converter, getCsvFile("subnational2"), res);
};

exports.subnational2BySubnational1Code = function(req, res) {
    var converter = getConverter();
    var jsonQuery = require("json-query");
    var subnational1Code = req.params.subnational1Code.toUpperCase();

    converter.on("end_parsed", function (data) {
        var results = jsonQuery('[*SUBNATIONAL1_CODE=' + subnational1Code + ']', { data: data }).value;
        res.send(JSON.stringify(results));
    });

    convertCsvToJson(converter, getCsvFile("subnational2"), res);
};

exports.subnational2Match = function(req, res) {
    var converter = getConverter();
    var search = req.params.search.toLowerCase();
    
    converter.on("end_parsed", function (data) {
    	var results = data.filter(function(i, n) {
	        return i.SUBNATIONAL2_NAME.toLowerCase().indexOf(search) > -1;
        });
        res.send(JSON.stringify(results));
    });

    convertCsvToJson(converter, getCsvFile("subnational2"), res);
};
