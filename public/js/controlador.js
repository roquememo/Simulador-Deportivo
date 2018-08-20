$(document).ready(function () {

	$.ajax({
		url:'/obtenerEquipos',
		method:'POST',
		dataType:"json",
		success:function (respuesta) {

       $.each(respuesta,function(key, registro) {
        $("#slc-Liga").append('<option value='+respuesta[0].teams[0].name+'>'+registro.nombre+'</option>');
      }); 

		},
		error:function (error) {
			alert('Error al cargar valores');
		}
	});


	
});