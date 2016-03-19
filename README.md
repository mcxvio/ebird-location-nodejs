# ebird-location-nodes

eBird 1.1 only provides csv or xml format files for location data.

https://confluence.cornell.edu/display/CLOISAPI/eBird-1.1-LocationReference

This node.js application provides an API that follows eBird's but it converts csv files to return json.

### BCR

/location/bcr

/location/bcr/match/[search]

### Country

/location/country

/location/country/match/[search]

### Subnational1

/location/subnational1

/location/subnational1/[countryCode]

/location/subnational1/match/[search]

### Subnational2

/location/subnational2

/location/subnational2/[countryCode]

/location/subnational2/subnational1/[subnational1Code]

/location/subnational2/match/[search]
