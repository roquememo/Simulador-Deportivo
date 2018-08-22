$(document).ready(function () {
	cargarHistorial();
	$('#divbotones').hide();
	//menu 
	$(".menu-bar").on('click', function(e){
        e.preventDefault();
        $("nav").toggleClass('hide');
        $("span", this).toggleClass("lnr-menu lnr-cross");
        $(".main-menu").addClass('mobile-menu');
    });

	//cargar equipos al seleccionar una liga
	 $('#slc-Liga').unbind('change').bind('change', function (e){
	 	cargarEquipos();
    	
  });

	$('#slc-visitante').unbind('change').bind('change', function (e){
	 	if($('#slc-local').val()!='Seleccione equipo...' && $('#slc-visitante').val()!='Seleccione equipo...'){
	 		$( '#btnSimular' ).prop( "disabled", false );
	 	}else{
	 		$( '#btnSimular' ).prop( "disabled", true );
	 	}
    	
 	 });
	$('#slc-local').unbind('change').bind('change', function (e){
	 	if($('#slc-local').val()!='Seleccione equipo...' && $('#slc-visitante').val()!='Seleccione equipo...'){
	 		$( '#btnSimular' ).prop( "disabled", false );
	 	}else{
	 		$( '#btnSimular' ).prop( "disabled", true );
	 	}
    	
 	 });



	 
	
});



function cargarHistorial() {

	$.ajax({
		url:'/obtenerhistorial',
		method:'GET',
		dataType:"json",
		success:function (respuesta) {
			$("#tabla_historial").html('');
			for (var i = 0; i < respuesta.length; i++) {
				$("#tabla_historial").append('<tr>'+
                  '<td>'+i+'</td>'+
                  '<td>'+respuesta[i].fecha+'</td>'+
                  '<td>'+respuesta[i].liga+'</td>'+
                  '<td>'+respuesta[i].equipo_local+'</td>'+
				  '<td>'+respuesta[i].equipo_visitante+'</td>'+
                  '<td>'+respuesta[i].resultado+'</td>'+
               	'</tr>');
			}
		},
		error:function (error) {
			alert('Error al cargar historial');
		}
	});
}



	 function cargarEquipos() {
	 	var id=$('#slc-Liga').val();
	 	$.ajax({
		url:'/obtenerEquipos',
		method:'GET',
		data:'id='+id,
		dataType:'json',
		success:function (respuesta) {
			var teams=respuesta.teams;
			$("#slc-local").html('<option selected>Seleccione equipo...</option>');
			$("#slc-visitante").html('<option selected>Seleccione equipo...</option>');
			for (i = 0; i < teams.length; i++) {
					
					$("#slc-local").append('<option value='+teams[i].id+'>'+teams[i].name+'</option>');
					
					$("#slc-visitante").append('<option value='+teams[i].id+'>'+teams[i].name+'</option>');
			}
		},
		error:function (error) {
			alert('Error al cargar valores');
		}
	});
	 }

$('#btnguardar').click(function () {
	var liga=$('select[id="slc-Liga"] option:selected').text();
	var local=$('select[id="slc-local"] option:selected').text();
	var visita=$('select[id="slc-visitante"] option:selected').text();
	var resultado=$('#huno').text();
	$.ajax({
		url:'/guardar',
		method:'GET',
		data:'liga='+liga+'&local='+local+'&visita='+visita+'&resultado='+resultado,
		dataType:'json',
		success:function (respuesta) {
			alert('Resultado guardado');
			$( '#btnguardar' ).prop( "disabled", true );
		},
		error:function (error) {
			alert('Error al Guardar resultado');
		}
	});
});

$('#btnSimular').click(function(){
		$('#progress').removeAttr('value');
		$('#progress').removeAttr('max');
		$('#huno').html('Simulando...');
	 	$('#divbotones').show();
	 	$('#divboton').hide();
	 	$('#divlocal').removeClass('col-lg-5');
	 	$('#divlocal').addClass('col-lg-6');
	 	$('#divvisitante').removeClass('col-lg-5');
	 	$('#divvisitante').addClass('col-lg-6');
	 	$( '#btnguardar' ).prop( "disabled", false );
	 	var altura = $(document).height();
      	$("html, body").animate({scrollTop:altura+"px"},1000);

	 	var id=$('#slc-Liga').val();
	 	$.ajax({
		url:'/datosliga',
		method:'GET',
		data:'id='+id,
		dataType:'json',
		success:function (respuesta) {

			var numeropartidos = respuesta.count;
			var matches=respuesta.matches;

			var equipolocal=$('#slc-local').val();
			var equipovisita=$('#slc-visitante').val();
			
			//Variables equipo local
			var golesequipolocal = 0;
			var encajadoslocal = 0;
			var partidoslocal = 0;
			//Variables equipo visitante
			var golesequipovisita = 0;
			var encajadosvisita = 0;
			var partidosvisita = 0;
			//Variables de la liga
			var golescasa = 0;
			var golesvisita = 0;


			for (i = 0; i < matches.length; i++) {
					
					//Datos de la liga
					var score = matches[i].score.fullTime;
					golescasa = golescasa + score.homeTeam;
					golesvisita = golesvisita + score.awayTeam;

					//Datos de equipo local
					var homeTeam = matches[i].homeTeam;
					if (homeTeam.id == equipolocal)
					{	
						golesequipolocal=golesequipolocal+score.homeTeam;
						encajadoslocal = encajadoslocal+score.awayTeam;
						partidoslocal +=1;
					}
					//Datos de equipo visita
					var awayTeam = matches[i].awayTeam;
					if (awayTeam.id == equipovisita)
					{
						golesequipovisita=golesequipovisita+score.awayTeam;
						encajadosvisita = encajadosvisita+score.homeTeam;
						partidosvisita +=1;
					}
					
					
			}

			//Presentando en interfaz
			$('#partidosliga').val(numeropartidos);
			$('#golesligacasa').val(golescasa);
			$('#golesligavisita').val(golesvisita);

			$('#partidoslocal').val(partidoslocal);
			$('#partidosvisita').val(partidosvisita);
			$('#goleslocal').val(golesequipolocal);
			$('#golesvisita').val(golesequipovisita);
			$('#encajadoslocal').val(encajadoslocal);
			$('#encajadosvisita').val(encajadosvisita);

			modelo();

		},
		error:function (error) {
			alert('Error al cargar valores');
		}
	});

	 });

	$('#btnSimular2').click(function(){
		modelo();
		$( '#btnguardar' ).prop( "disabled", false );
	 });


	$('#btnReiniciar').click(function(){
	 	$('#divbotones').hide();
	 	$('#divboton').show();
	 	$("#slc-local").html('<option selected>Seleccione equipo...</option>');
		$("#slc-visitante").html('<option selected>Seleccione equipo...</option>');
		var id=$('#slc-Liga').val();
	 	$('#slc-Liga').val(id);
	 	$('#divlocal').removeClass('col-lg-6');
	 	$('#divlocal').addClass('col-lg-5');
	 	$('#divvisitante').removeClass('col-lg-6');
	 	$('#divvisitante').addClass('col-lg-5');
	 	$( '#btnSimular' ).prop( "disabled", true );
	 	$('#partidosliga').val('');
		$('#golesligacasa').val('');
		$('#golesligavisita').val('');
		$('#partidoslocal').val('');
		$('#partidosvisita').val('');
		$('#goleslocal').val('');
		$('#golesvisita').val('');
		$('#encajadoslocal').val('');
		$('#encajadosvisita').val('');
		$('#progress').attr('value',50);
		$('#progress').attr('max',100);
		$('#huno').html('');
		$("html, body").animate({scrollTop:"0px"},1000);
	 	cargarEquipos();
	 });


	function modelo() {
		//Variables por liga
var PartidosTemporada=$('#partidosliga').val(); //Numero de partidos en la temporada
var GolesCasaLiga = $('#golesligacasa').val(); //Numero total de goles marcados en casa en la liga
var GolesVisitaLiga= $('#golesligavisita').val(); //Numero total de goles maracados como visitante en la liga
var MediaGolesCasa=(GolesCasaLiga/PartidosTemporada); //Media de goles marcados en casa
var MediaGolesVisita=(GolesVisitaLiga/PartidosTemporada); //Media de goles marcados fuera de casa

//Variables equipo local
var PartidosLocal=$('#partidoslocal').val(); //Numero total de partidos jugados en casa 
var GolesEquipoLocal=$('#goleslocal').val(); //Numero de goles anotados por el aquipo local en casa
var EncajadosEquipoLocal=$('#encajadoslocal').val(); //Numero de goles encajados por el equipo local en casa
var FuerzaAtacanteLocal=(GolesEquipoLocal/PartidosLocal)/MediaGolesCasa; //Fuerza atacante del quipo local
var FuerzaDefensivaLocal=(EncajadosEquipoLocal/PartidosLocal)/MediaGolesVisita; //Fuerza defensiva del quipo local

//Variables equipo visitante
var PartidosVisitante=$('#partidosvisita').val(); //Numero de partidos jugados fuera de casa 
var GolesEquipoVisitante=$('#golesvisita').val(); //Numero de goles anotados por el quipo visitante fuera de casa
var EncajadosEquipoVisitante=$('#encajadosvisita').val(); //Numero de goles encajados por el quipo visitante fuera de casa
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
var suma=(MarcadorLocal+MarcadorVisitante);

$('#progress').attr('value',MarcadorLocal);
$('#progress').attr('max',suma);
$('#huno').html(MarcadorLocal+'-'+MarcadorVisitante);
console.log("Equipo local: "+MarcadorLocal+" Equipo visitante: "+MarcadorVisitante);

}