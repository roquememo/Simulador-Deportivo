$(document).ready(function () {

	//menu 
	$(".menu-bar").on('click', function(e){
        e.preventDefault();
        $("nav").toggleClass('hide');
        $("span", this).toggleClass("lnr-menu lnr-cross");
        $(".main-menu").addClass('mobile-menu');
    });

	//cargar equipos al seleccionar una liga
	 $('#slc-Liga').unbind('change').bind('change', function (e){
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
  });

	


	
});