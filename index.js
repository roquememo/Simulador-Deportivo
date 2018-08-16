var express= require("express");
var app=express();

app.use(express.static('public'));

app.get("/",function (peticion,respuesta) {
	respuesta.send('Simulador Deportivo');
})

app.listen(3000);