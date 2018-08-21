$(document).ready(function () {
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
	
});



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

$('#btnSimular').click(function(){
	 	$('#divbotones').show();
	 	$('#divboton').hide();
	 	$('#divlocal').removeClass('col-lg-5');
	 	$('#divlocal').addClass('col-lg-6');
	 	$('#divvisitante').removeClass('col-lg-5');
	 	$('#divvisitante').addClass('col-lg-6');

	 });

	$('#btnSimular2').click(function(){
	 	
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
	 	cargarEquipos();
	 });