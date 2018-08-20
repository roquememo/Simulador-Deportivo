var express= require("express");
var request = require('request'); //Necesario para realizar peticiones al API     
var app=express();

app.use(express.static('public'));

app.get("/",function (peticion,respuesta) {
	respuesta.send('Simulador Deportivo');
})

/*
	Obteniendo Datos del API
*/

//Token de autentificacion del API
var headers = {

    'X-Auth-Token':'ad1e74e6ca2d457791393a8266d04e0c'
}

var options = {
    //url     : 'http://api.football-data.org/v2/competitions?id=2021',
    url     : 'http://api.football-data.org/v2/competitions/2013/teams',
    method  : 'GET',
    jar     : true,
    headers : headers
}

app.post("/obtenerEquipos",function (peticion,respuesta) {
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			respuesta.send(body);
		}
		else
		{
			console.log("A ocurrido un error al traer datos del API");
		}
			
	});
		
});







app.listen(4000);
