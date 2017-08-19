/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

function addToPage(data){
	
	$('.card').each(function(){
		$(this).remove();
	});
	
	var stringTemp = "<div class='card horizontal'>" +
								"<div class='card-image'>" +
									"<img src='img/home.jpg'>" +
								"</div>" +
								"<div class='card-stacked'>" +
									"<div class='card-content'>" +
										"<p>Direccion: $(direccion)</p>" +
										"<p>Ciudad: $(ciudad)</p>" +
										"<p>Telefono: $(telefono)</p>" +
										"<p>Codigo Postal: $(cp)</p>" +
										"<p>Tipo: $(tipo)</p>" +
										"<p>Precio: <span style='color:yellow;'>$(precio)</span></p>" +
									"</div>" +
									"<div class='card-action'>" +
          								"<a href='#'>VER MAS</a>" +
        							"</div>" +
								"</div>" +
							"</div>";
	
	$.each(data,(i,val)=>{
		
		var direccion = val.Direccion;
		var ciudad = val.Ciudad;
		var telefono = val.Telefono;
		var cp = val.Codigo_Postal;
		var tipo = val.Tipo;
		var precio = val.Precio;
		
		var newString;
		
		newString = stringTemp.replace("$(direccion)",direccion);
		newString = newString.replace("$(ciudad)",ciudad);
		newString = newString.replace("$(telefono)",telefono);
		newString = newString.replace("$(cp)",cp);
		newString = newString.replace("$(tipo)",tipo);
		newString = newString.replace("$(precio)",precio);
		
		$(".colContenido").append(newString);
		
		
	});
	
}

function mostrarTodos(event){
	
	
	
	event.preventDefault();
	$.ajax({
		url: './mostrarTodos.php',
    	cache: false,
    	contentType: false,
    	processData: false,
    	type: 'get',
		dataType: 'json',
    	success: function(data){
      		addToPage(data);
    	},
    	error: function (xhr, ajaxOptions, thrownError) {
        	console.log(xhr.status);
        	console.log(xhr.responseText);
        	console.log(thrownError);
      }
  	});
	
}

function addTipo(data){
	
	$.each(data, function (i, item) {
		var option = "<option value='" + item  + "'>" + item + "</option>";
    	$('#selectTipo').append(option);
	});
	
	 $('select').material_select();
	
}

function addCiudades(data){
	
	$.each(data, function (i, item) {
		var option = "<option value='" + item  + "'>" + item + "</option>";
    	$('#selectCiudad').append(option);
	});
	
	 $('select').material_select();
	
}

function buscar(event){
	
	event.preventDefault();
	
	var precios = $("[name='precio']").val().match(/(\d+)/g);
	
	var form_data = new FormData();
  	form_data.append('ciudad', $("[name='ciudad']").val());
  	form_data.append('tipo', $("[name='tipo']").val());
	form_data.append('precioLow', precios[0]);
	form_data.append('precioHigh', precios[1]);
	
	$.ajax({
		url: './buscador.php',
    	cache: false,
    	contentType: false,
    	processData: false,
    	type: 'post',
		dataType: 'json',
		data: form_data,
    	success: function(data){
      		addToPage(data);
			//console.log(data);
    	},
    	error: function (xhr, ajaxOptions, thrownError) {
        	console.log(xhr.status);
        	console.log(xhr.responseText);
        	console.log(thrownError);
      }
  	});
	
}

$(function(){
	
	var form_data = new FormData();
  	form_data.append('field', 'ciudades');
	$.ajax({
		url: './getSelect.php',
    	cache: false,
    	contentType: false,
    	processData: false,
    	type: 'post',
		data: form_data,
		dataType: 'json',
    	success: function(data){
      		addCiudades(data);
    	},
    	error: function (xhr, ajaxOptions, thrownError) {
        	console.log(xhr.status);
        	console.log(xhr.responseText);
        	console.log(thrownError);
      }
  	});
	
	form_data = new FormData();
  	form_data.append('field', 'tipo');
	$.ajax({
		url: './getSelect.php',
    	cache: false,
    	contentType: false,
    	processData: false,
    	type: 'post',
		data: form_data,
		dataType: 'json',
    	success: function(data){
      		addTipo(data);
    	},
    	error: function (xhr, ajaxOptions, thrownError) {
        	console.log(xhr.status);
        	console.log(xhr.responseText);
        	console.log(thrownError);
      }
  	});
	
	$('#mostrarTodos').on('click',mostrarTodos);
	
	$('#formulario').submit(buscar)
	
})
