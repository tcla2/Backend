var arr_temp=[];

function  init_select(){
		$.ajax({
			url: "./data-1.json",
			success: function(datos){
				llenar_select(datos);
				arr_temp=[];
				llenar_tipo(datos);
			}
		});
	}
function init_datos(){	
	$.ajax({
			url: "./data-1.json",
			success: function(datos){
				ver_todos(datos);			
			}
		});	
		}
	
function init_busqueda(ciudad,tipo,precio){	

	$.ajax({		
			 url: "buscador.php",
             dataType: "json",   	
     	     type: 'POST',
			 data:('ciudad='+ciudad+'&tipo='+tipo),
    		 success: function(datos){
				        	ver_todos_busqueda(datos,precio);		
			}
		});	
		}
					

function llenar_select(datos){
	var option = '';	
		$.each(datos,function(indice,ciudad){		
			resp= verificar(ciudad.Ciudad)
			if(resp==0){
			option += '<option name="' + ciudad.Id + '">' + ciudad.Ciudad + '</option>';
			}			
		});	
		$("#selectCiudad").append(option);					
	}
function llenar_tipo(datos){
	var option = '';	
		$.each(datos,function(indice,ciudad){		
			resp= verificar(ciudad.Tipo)
			if(resp==0){
			option += '<option name="' + ciudad.Tipo + '">' + ciudad.Tipo + '</option>';
			}			
		});		
		$("#selectTipo").append(option);		
	}	

	
function verificar(temp){
	var x=0;
	for(var i = 0; i <= arr_temp.length; i++){		
		if (arr_temp[i]==temp){
			x=1;			
			}		
		}
		if(x==0){	
		arr_temp[arr_temp.length]= temp			
			}			
	return(x);
	}

		
function ver_todos(datos){	
	
	var insertar = '';		
		$.each(datos,function(indice,ciudad){		
			 insertar += "<div class='itemMostrado'><div class='card horizontal'><div class='card-image'><img src='img/home.jpg'></div><div class='card-stacked'><div class='card-content'><p><strong>Dirección: </strong>"+ciudad.Direccion+"</p><p><strong>Ciudad: </strong>"+ciudad.Ciudad+"</p><p><strong>Telefono: </strong>"+ciudad.Telefono+"</p><p><strong>Codigo Postal: </strong>"+ciudad.Codigo_Postal+"</p><p><strong>Tipo: </strong>"+ciudad.Tipo+"</p><p><strong>Precio: </strong> <span class='precioTexto'>"+ciudad.Precio+"</span></p> </div></div><div class='card-action'><a href='#'>Ver mas</a></div></div></div>";			
		});		
		$(".colContenido").append(insertar);		
	}	


function ver_todos_busqueda(datos,precio){	
	var insertar = '';	
	var res = precio.split(";");
var p1= res[0];
var p2= res[1];
		
		$.each(datos,function(indice,ciudad){	
		
		var oferta= ciudad.Precio.split("$");
	     var t = oferta[1];
	
		if(p1 <= t &&  p2 > t){	
			 insertar += "<div class='itemMostrado'><div class='card horizontal'><div class='card-image'><img src='img/home.jpg'></div><div class='card-stacked'><div class='card-content'><p><strong>Dirección: </strong>"+ciudad.Direccion+"</p><p><strong>Ciudad: </strong>"+ciudad.Ciudad+"</p><p><strong>Telefono: </strong>"+ciudad.Telefono+"</p><p><strong>Codigo Postal: </strong>"+ciudad.Codigo_Postal+"</p><p><strong>Tipo: </strong>"+ciudad.Tipo+"</p><p><strong>Precio: </strong> <span class='precioTexto'>"+ciudad.Precio+"</span></p> </div></div><div class='card-action'><a href='#'>Ver mas</a></div></div></div>";			
		}});		
		$(".colContenido").append(insertar);		
	}	


 $(document).ready(function() {

init_select();

$( "#mostrarTodos" ).click(function() {
        	$(".itemMostrado").remove();
			init_datos();
		});


$( "#submitButton" ).click(function() {
	$(".itemMostrado").remove();
	var ciudad = document.getElementById('selectCiudad').value,
    tipo       = document.getElementById('selectTipo').value
    precio     = document.getElementById('rangoPrecio').value;
	
		init_busqueda(ciudad,tipo,precio);
		});



})



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


inicializarSlider();

