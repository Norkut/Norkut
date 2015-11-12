function soloLetras(e) {
		tecla = (document.all) ? e.keyCode : e.which;
		if (tecla==8) return true;
		patron = /[A-Za-z\s]/;
		te = String.fromCharCode(tecla);
		return patron.test(te);
}

function soloNumeros(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8) return true;
    patron = /\d/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

function ValidarAlPresionar(form){
		$(form).find(':input[type=text], :input[type=number]').each(function(){
    	var campo = this;
    	var tipoValidacion = $('#'+campo.id).attr('data-validation');

    	if(tipoValidacion == "sololetras")
			$('#'+campo.id).attr("onkeypress","return soloLetras(event)");
		else if(tipoValidacion == "solonumeros")
			$('#'+campo.id).attr("onkeypress","return soloNumeros(event)");

		});
}

function ValidaFormulario(form){
	var estaValidado = false;

	//Se obtiene la cantidad de inputs para crear un array de esa longitud.
	var inputs = $(form).find(':input[type=text], :input[type=number]').length;
	var cantidadInputs = new Array(inputs);


	/*EXPRESIONES REGULARES*/
	var sinEspacios = /^\s+|\s+$/;    //No admite espacios en blanco.
	var numeros = /^\d+$/;		 //Solo admite números, al menos 1.
	var soloFecha = /^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/;  //Validacion de fecha con formato dd/mm/aaaa || dd-mm-aaaa
	var letrasCaracteres = /^[a-zA-Z_áéíóúñ\s]+$/;
	var soloEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/;
	var cedula = /^([VEJG]\d{7,8})$/;
	var rif = /^[JGVEP][-][0-9]{8}[-][0-9]$/;
	
	var iteracion = 0;
	
	//Se obtiene el objeto de cada input del formulario elegido e itero validando cada uno de ellos.

	$(form).find(':input[type=text], :input[type=number]').each(function() {
    	var campo = this;
    	
    	/*VERIFICAMOS CAMPOS REQUERIDOS, SIN ESPACIOS EN BLANCO.*/
    	if(campo.value == null || campo.value.length == 0 || sinEspacios.test(campo.value)){
    		
    		if($('#'+campo.id+'+ span').hasClass("msj"))
				cantidadInputs[iteracion] = false;
			else
				$('#'+campo.id).after('<span class="msj">Campo requerido. No admite espacios en blanco.</span>');
				cantidadInputs[iteracion] = false;
			
    	}else{
    		$('#'+campo.id+'+ span').html("");
    		cantidadInputs[iteracion] = true;
    	}

    	/*Se Obtiene el tipo de validacion que requiere el campo*/
    	var tipoValidacion = $('#'+campo.id).attr('data-validation');
    

    	switch(tipoValidacion){

    		case "numeros" :
    				if(!numeros.test(campo.value)){
    					if($('#'+campo.id+'+ span').hasClass("msj")){
    						if($('#'+campo.id+'+ span').html() == ""){ 
    							$('#'+campo.id+'+ span').html("Solo se permiten números.");	
    						}
    						cantidadInputs[iteracion] = false;
    					}else{
    						$('#'+campo.id).after('<span class="msj">Solo se permiten números.</span>');
    						cantidadInputs[iteracion] = false
    					}
    				}else{
    					$('#'+campo.id+'+ span').html("");
    					cantidadInputs[iteracion] = true;
    				}
    		break;

    		case "letras" :
    				if(!letrasCaracteres.test(campo.value)){
    					if($('#'+campo.id+'+ span').hasClass("msj")){
    						if($('#'+campo.id+'+ span').html() == ""){ 
    							$('#'+campo.id+'+ span').html("Solo se permiten letras.");	
    						}
    						cantidadInputs[iteracion] = false;
    					}else{
    						$('#'+campo.id).after('<span class="msj">Solo se permiten letras.');
    						cantidadInputs[iteracion] = false
    					}
    				}else{
    					$('#'+campo.id+'+ span').html("");
    					cantidadInputs[iteracion] = true;
    				}
    		break;



    		case "fecha" :
    				if(!soloFecha.test(campo.value)){
    					if($('#'+campo.id+'+ span').hasClass("msj")){
    						if($('#'+campo.id+'+ span').html() == ""){ 
    							$('#'+campo.id+'+ span').html("Ingrese un formato de fecha válida.");	
    						}
    						cantidadInputs[iteracion] = false;
    					}else{
    						$('#'+campo.id).after('<span class="msj">Ingrese un formato de fecha válida.</span>');
    						cantidadInputs[iteracion] = false
    					}
    				}else{
    					$('#'+campo.id+'+ span').html("");
    					cantidadInputs[iteracion] = true;
    				}
    		break;

    		case "email" :
    				if(!soloEmail.test(campo.value)){
    					if($('#'+campo.id+'+ span').hasClass("msj")){
    						if($('#'+campo.id+'+ span').html() == ""){ 
    							$('#'+campo.id+'+ span').html("Ingrese un email válido.");	
    						}
    						cantidadInputs[iteracion] = false;
    					}else{
    						$('#'+campo.id).after('<span class="msj">Ingrese un email válido.</span>');
    						cantidadInputs[iteracion] = false
    					}
    				}else{
    					$('#'+campo.id+'+ span').html("");
    					cantidadInputs[iteracion] = true;
    				}
    		break;

    		case "ced" :
    				if(!cedula.test(campo.value)){
    					if($('#'+campo.id+'+ span').hasClass("msj")){
    						if($('#'+campo.id+'+ span').html() == ""){ 
    							$('#'+campo.id+'+ span').html("Ingrese una número de cédula válido.");	
    						}
    						cantidadInputs[iteracion] = false;
    					}else{
    						$('#'+campo.id).after('<span class="msj">Ingrese una número de cédula válido.</span>');
    						cantidadInputs[iteracion] = false
    					}
    				}else{
    					$('#'+campo.id+'+ span').html("");
    					cantidadInputs[iteracion] = true;
    				}
    		break;


    		case "rif" :
    				if(!rif.test(campo.value)){
    					if($('#'+campo.id+'+ span').hasClass("msj")){
    						if($('#'+campo.id+'+ span').html() == ""){ 
    							$('#'+campo.id+'+ span').html("Ingrese un RIF válido.");	
    						}
    						cantidadInputs[iteracion] = false;
    					}else{
    						$('#'+campo.id).after('<span class="msj">Ingrese un RIF válido.</span>');
    						cantidadInputs[iteracion] = false
    					}
    				}else{
    					$('#'+campo.id+'+ span').html("");
    					cantidadInputs[iteracion] = true;
    				}
    		break;

    	}

    	iteracion++;
    });
    
	//Se verifica si cada input fue validado correctamente.
	for (var x = 0; x < cantidadInputs.length; x++) {
		if (cantidadInputs[x] == false) {
			return false;
		}
	}

	alert("FORMULARIO VALIDADO CORRECTAMENTE");
	return true;
}

