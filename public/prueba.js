var request = require('request');

//Step 1 - Set the headers
var headers = {

    'X-Auth-Token':'ad1e74e6ca2d457791393a8266d04e0c'
}

//Step 2 - Configure the request
var options = {
    url     : 'http://api.football-data.org/v2/competitions?id=2021',
    method  : 'GET',
    jar     : true,
    headers : headers
}

//Step 3 - do the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }else{
    	console.log(body);
    }
});