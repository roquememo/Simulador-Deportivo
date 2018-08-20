var express= require("express");
var request = require('request'); //Necesario para realizar peticiones al API     
var app=express();
/*
	Obteniendo Datos del API
*/

//Token de autentificacion del API
var headers = {

    'X-Auth-Token':'ad1e74e6ca2d457791393a8266d04e0c'
}



app.use(express.static('public'));

app.get("/",function (peticion,respuesta) {
	respuesta.send('Simulador Deportivo');
})



app.get("/obtenerEquipos",function (peticion,respuesta) {
	var liga=peticion.query.id;
	var options = {
    url     : 'http://api.football-data.org/v2/competitions/'+liga+'/teams',
    method  : 'GET',
    jar     : true,
    headers : headers
	}
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			valor=JSON.parse(body);
			respuesta.send(valor);
		}
		else
		{
			console.log("A ocurrido un error al traer datos del API");
		}
		});	
	});

	app.get("/datosliga",function (peticion,respuesta) {
	var liga=peticion.query.id;
	var f=new Date();
	var mes=0;
	if((f.getMonth()+1)<10){
		mes='0'+(f.getMonth()+1);
	}
	var fecha=f.getFullYear()+'-'+mes+'-'+f.getDate();
	var fecha2=(f.getFullYear()-1)+'-'+mes+'-'+f.getDate();
	var options = {
    url     : 'http://api.football-data.org/v2/competitions/'+liga+'/matches/?dateFrom='+fecha2+'&dateTo='+fecha,
    method  : 'GET',
    jar     : true,
    headers : headers
	}
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			valor=JSON.parse(body);
			respuesta.send(valor);
		}
		else
		{
			console.log("A ocurrido un error al traer datos del API");
			console.log(options.url);
		}
			
	});
		
});







app.listen(4000);
