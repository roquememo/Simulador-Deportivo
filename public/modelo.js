//Variables por liga
var PartidosTemporada=380; //Numero de partidos en la temporada
var GolesCasaLiga = 557; //Numero total de goles marcados en casa en la liga
var GolesVisitaLiga= 459; //Numero total de goles maracados como visitante en la liga
var MediaGolesCasa=(GolesCasaLiga/PartidosTemporada); //Media de goles marcados en casa
var MediaGolesVisita=(GolesVisitaLiga/PartidosTemporada); //Media de goles marcados fuera de casa

//Variables equipo local
var PartidosLocal=19; //Numero total de partidos jugados en casa 
var GolesEquipoLocal=35; //Numero de goles anotados por el aquipo local en casa
var EncajadosEquipoLocal=15; //Numero de goles encajados por el equipo local en casa
var FuerzaAtacanteLocal=(GolesEquipoLocal/PartidosLocal)/MediaGolesCasa; //Fuerza atacante del quipo local
var FuerzaDefensivaLocal=(EncajadosEquipoLocal/PartidosLocal)/MediaGolesVisita; //Fuerza defensiva del quipo local

//Variables equipo visitante
var PartidosVisitante=19; //Numero de partidos jugados fuera de casa 
var GolesEquipoVisitante=24; //Numero de goles anotados por el quipo visitante fuera de casa
var EncajadosEquipoVisitante=25; //Numero de goles encajados por el quipo visitante fuera de casa
var FuerzaAtacanteVisitante=(GolesEquipoVisitante/PartidosVisitante)/MediaGolesVisita; //Fuerza atacante del quipo visitante
var FuerzaDefensivaVisitante=(EncajadosEquipoVisitante/PartidosVisitante)/MediaGolesCasa; //FUerza defensiva del equipo visitante

//Pronostico de goles
var PronosticoLocal=FuerzaAtacanteLocal*FuerzaDefensivaVisitante*MediaGolesCasa; //Numero probable de goles que marque el equipo local
var PronosticoVisitante=FuerzaAtacanteVisitante*FuerzaDefensivaLocal*MediaGolesVisita //Numero probable de goles que marque el equip Visitante

//Variables poisson
var landalocal = PronosticoLocal  // Landa local
var landavisitante = PronosticoVisitante // Landa visitante
var exponencial = 2.718281828;
var total = 0;
var numerador, denominador;


//arreglos de probabilidades por equipo
var PoissonEquipoLocal = new Array(6);
var PoissonEquipoVisitante= new Array(6);
var temLocal=0;
var MarcadorLocal=0;
var temVisitante=0;
var MarcadorVisitante=0;

function poisson(k, landa) {
	exponencial=2.718281828;
    exponencial = Math.pow(exponencial, -landa); // e elevado a la -landa
    landaK = Math.pow(landa, k); // Landa elavado a k
    numerador = exponencial * landaK;
    denominador = fact(k); // factorial de k
    
    return (numerador / denominador);
}

function fact(x) {
   if(x==0) {
      return 1;
   }
   return x * fact(x-1);
}

for (var i = 0; i <= 5; i++) {
	total = poisson(i, landalocal);
	PoissonEquipoLocal[i]=total;
	if(total>temLocal){
		temLocal=total;
		MarcadorLocal=i;
	}
}
for (var n = 0; n <= 5; n++) {
	total = poisson(n, landavisitante);
	PoissonEquipoVisitante[n]=total;
	if(total>temVisitante){
		temVisitante=total;
		MarcadorVisitante=n;
	}
}



console.log("Equipo local: "+MarcadorLocal+" Equipo visitante: "+MarcadorVisitante);