$(function() {
    //jQuery.noConflict();
    
    var config =  {
        empresa: $('#lienzo_recalculable').find('input[name=emp]').val(),
        sucursal: $('#lienzo_recalculable').find('input[name=suc]').val(),
        tituloApp: 'Preorden de Producci&oacute;n' , 
        contextpath : $('#lienzo_recalculable').find('input[name=contextpath]').val(),
        
        userName : $('#lienzo_recalculable').find('input[name=user]').val(),
        ui : $('#lienzo_recalculable').find('input[name=iu]').val(),
        
        getUrlForGetAndPost : function(){
            var url = document.location.protocol + '//' + document.location.host + this.getController();
            return url;
        },
        getEmp: function(){
            return this.empresa;
        },
        getSuc: function(){
            return this.sucursal;
        },
        getUserName: function(){
            return this.userName;
        },
        getUi: function(){
            return this.ui;
        },
        getTituloApp: function(){
            return this.tituloApp;
        },
        getController: function(){
            return this.contextpath + "/controllers/proordenproduccion";
            //  return this.controller;
        }
    };
        
        
    String.prototype.toCharCode = function(){
        var str = this.split(''), len = str.length, work = new Array(len);
        for (var i = 0; i < len; ++i){
            work[i] = this.charCodeAt(i);
        }
        return work.join(',');
    };
    
        var $cadena_especificaciones = "";
        var $cadena_procedimientos = "";
        
        
	$('#header').find('#header1').find('span.emp').text($('#lienzo_recalculable').find('input[name=emp]').val());
	$('#header').find('#header1').find('span.suc').text($('#lienzo_recalculable').find('input[name=suc]').val());
        var $username = $('#header').find('#header1').find('span.username');
	$username.text($('#lienzo_recalculable').find('input[name=user]').val());
	
	var $contextpath = $('#lienzo_recalculable').find('input[name=contextpath]');
	var controller = $contextpath.val()+"/controllers/proordenproduccion";
	
        //Barra para las acciones
        $('#barra_acciones').append($('#lienzo_recalculable').find('.table_acciones'));
        $('#barra_acciones').find('.table_acciones').css({'display':'block'});
	var $new_orden = $('#barra_acciones').find('.table_acciones').find('a[href*=new_item]');
	var $visualiza_buscador = $('#barra_acciones').find('.table_acciones').find('a[href*=visualiza_buscador]');
	
	//aqui va el titulo del catalogo
	$('#barra_titulo').find('#td_titulo').append('Orden de Producci&oacute;n');
	
	//barra para el buscador 
	$('#barra_buscador').append($('#lienzo_recalculable').find('.tabla_buscador'));
	$('#barra_buscador').find('.tabla_buscador').css({'display':'block'});
	
	
	var $cadena_busqueda = "";
	var $campo_busqueda_folio = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_folio]');
	var $select_buscador_tipoorden = $('#barra_buscador').find('.tabla_buscador').find('select[name=buscador_tipoorden]');
        
        var array_productos_proceso = new Array(); //este arreglo carga la maquinas
        
	var $buscar = $('#barra_buscador').find('.tabla_buscador').find('input[value$=Buscar]');
	var $limpiar = $('#barra_buscador').find('.tabla_buscador').find('input[value$=Limpiar]');
	
	var input_json_lineas = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_proordentipos.json';
	$arreglo = {'iu':$('#lienzo_recalculable').find('input[name=iu]').val()}
	$.post(input_json_lineas,$arreglo,function(data){
            //Llena el select tipos de productos en el buscador
            $select_buscador_tipoorden.children().remove();
            var prod_tipos_html = '<option value="0" selected="yes">[-- --]</option>';
            $.each(data['ordenTipos'],function(entryIndex,pt){
                    prod_tipos_html += '<option value="' + pt['id'] + '"  >' + pt['titulo'] + '</option>';
            });
            $select_buscador_tipoorden.append(prod_tipos_html);
	});
        
        
	var to_make_one_search_string = function(){
            var valor_retorno = "";
            
            var signo_separador = "=";
            valor_retorno += "folio_orden" + signo_separador + $campo_busqueda_folio.val() + "|";
            valor_retorno += "tipo_orden" + signo_separador + $select_buscador_tipoorden.val() + "|";
            
            return valor_retorno;
	};
	
	cadena = to_make_one_search_string();
	$cadena_busqueda = cadena.toCharCode();
	
	$buscar.click(function(event){
            event.preventDefault();
            cadena = to_make_one_search_string();
            $cadena_busqueda = cadena.toCharCode();
            $get_datos_grid();
	});
	
	$limpiar.click(function(event){
            event.preventDefault();
            $campo_busqueda_folio.val('');
        });
        
	//visualizar  la barra del buscador
	TriggerClickVisializaBuscador = 0;
	$visualiza_buscador.click(function(event){
            event.preventDefault();
            
            var alto=0;
            if(TriggerClickVisializaBuscador==0){
                 TriggerClickVisializaBuscador=1;
                 var height2 = $('#cuerpo').css('height');
                 //alert('height2: '+height2);
                 
                 alto = parseInt(height2)-220;
                 var pix_alto=alto+'px';
                 //alert('pix_alto: '+pix_alto);
                 
                 $('#barra_buscador').find('.tabla_buscador').css({'display':'block'});
                 $('#barra_buscador').animate({height: '60px'}, 500);
                 $('#cuerpo').css({'height': pix_alto});
                 
                 //alert($('#cuerpo').css('height'));
            }else{
                 TriggerClickVisializaBuscador=0;
                 var height2 = $('#cuerpo').css('height');
                 alto = parseInt(height2)+220;
                 var pix_alto=alto+'px';

                 $('#barra_buscador').animate({height:'0px'}, 500);
                 $('#cuerpo').css({'height': pix_alto});
            };
	});
	
        
        /*funcion para colorear la fila en la que pasa el puntero*/
        $colorea_tr_grid = function($tabla){
            $tabla.find('tr:odd').find('td').css({'background-color' : '#e7e8ea'});
            $tabla.find('tr:even').find('td').css({'background-color' : '#FFFFFF'});
            
            $('tr:odd' , $tabla).hover(function () {
                $(this).find('td').css({background : '#FBD850'});
            }, function() {
                $(this).find('td').css({'background-color':'#e7e8ea'});
            });
            $('tr:even' , $tabla).hover(function () {
                $(this).find('td').css({'background-color':'#FBD850'});
            }, function() {
                $(this).find('td').css({'background-color':'#FFFFFF'});
            });
        };
        
        //----------------------------------------------------------------
	//valida la fecha seleccionada
	function fecha_mayor(fecha, fecha2){
            var xMes=fecha.substring(5, 7);
            var xDia=fecha.substring(8, 10);
            var xAnio=fecha.substring(0,4);
            var yMes=fecha2.substring(5, 7);
            var yDia=fecha2.substring(8, 10);
            var yAnio=fecha2.substring(0,4);
            
            if (xAnio > yAnio){
                return(true);
            }else{
                if (xAnio == yAnio){
                    if (xMes > yMes){
                        return(true);
                    }
                    if (xMes == yMes){
                        if (xDia > yDia){
                            return(true);
                        }else{
                            return(false);
                        }
                    }else{
                        return(false);
                    }
                }else{
                    return(false);
                }
            }
	}
        
        //valida la fecha seleccionada
	function fecha_mayor_igual(fecha, fecha2){
            var xMes=fecha.substring(5, 7);
            var xDia=fecha.substring(8, 10);
            var xAnio=fecha.substring(0,4);
            var yMes=fecha2.substring(5, 7);
            var yDia=fecha2.substring(8, 10);
            var yAnio=fecha2.substring(0,4);
            
            if (xAnio > yAnio){
                return(true);
            }else{
                if (xAnio == yAnio){
                    if (xMes > yMes){
                        return(true);
                    }
                    if (xMes == yMes){
                        if (xDia >= yDia){
                            return(true);
                        }else{
                            return(false);
                        }
                    }else{
                        return(false);
                    }
                }else{
                    return(false);
                }
            }
	}
        
        
	//muestra la fecha actual
	var mostrarFecha = function mostrarFecha(){
            var ahora = new Date();
            var anoActual = ahora.getFullYear();
            var mesActual = ahora.getMonth();
            mesActual = mesActual+1;
            mesActual = (mesActual <= 9)?"0" + mesActual : mesActual;
            var diaActual = ahora.getDate();
            diaActual = (diaActual <= 9)?"0" + diaActual : diaActual;
            var Fecha = anoActual + "-" + mesActual + "-" + diaActual;		
            return Fecha;
	}
	//----------------------------------------------------------------
        
        
        $add_calendar = function($campo, $fecha, $condicion){
            
            $campo.click(function (s){
                $campo.val(null);
                var a=$('div.datepicker');
                a.css({'z-index':100});
            });
            
            $campo.DatePicker({
                format:'Y-m-d',
                date: $campo.val(),
                current: $campo.val(),
                starts: 1,
                position: 'bottom',
                locale: {
                    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
                    daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
                    daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
                    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
                    weekMin: 'se'
                },
                onChange: function(formated, dates){
                    var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
                    $campo.val(formated);
                    if (formated.match(patron) ){
                        
                        switch($condicion){
                            case '>':
                                //code;
                                var valida_fecha=fecha_mayor($campo.val(),mostrarFecha());
                                if (valida_fecha==true){
                                    $campo.DatePickerHide();
                                }else{
                                    jAlert("Fecha no valida. Debe ser mayor a la actual",'! Atencion');
                                    $campo.val($fecha);
                                }
                                break;
                            case '>=':
                                //code;
                                var valida_fecha=fecha_mayor_igual($campo.val(),mostrarFecha());
                                if (valida_fecha==true){
                                    $campo.DatePickerHide();
                                }else{
                                    jAlert("Fecha no valida. Debe ser mayor o igual a la actual",'! Atencion');
                                    $campo.val($fecha);
                                }
                                break;
                            case '==':
                                //code;
                                break;
                            case '<':
                                //code;
                                break;
                            case '<=':
                                //code;
                                break;
                            default:
                                //para cunado no se le pasan parametros de condicion de fecha
                                var valida_fecha=mayor($campo.val(),mostrarFecha());
                                $campo.DatePickerHide();
                                break;
                        }
                    }
                }
            });
        }
        
        
        //verifica si lo que viene es un -1 y lo convierte a letras N.A.
       $convierte_numero_caracter = function(cadena){
           cadena_tmp = parseInt(cadena);
           if(!isNaN(cadena_tmp)){
               if(cadena_tmp == -1 ){
                   return "N.A.";
               }else{
                   return cadena;
               }
           }else{
               return "N.A.";
           }
       }
        
        //verifica si lo que viene es un caracter y lo convierte a numero
        $convierte_caracter_numero = function(cadena){
           cadena = cadena.toUpperCase();
           if(/NA/.test(cadena)  || /N.A./.test(cadena) ){
               return -1;
           }else{
               return cadena;
           }
        }
       
       
       //verifica que lo que se esta mandando en una cadena se vaerdadera
       $verificar_cadena_verdadera = function($option, $cadena){
           $cadena_retorno = "";
           if($cadena == "true" || $cadena == "TRUE"){
               $cadena_retorno = "";
           }else{
               $cadena_retorno = $cadena;
           }
           
           if($option == "true" || $option == "TRUE"){
               if($cadena_retorno == "true" || $cadena_retorno == "TRUE"  || $cadena_retorno == ""){
                   $cadena_retorno = $cadena_retorno;
               }
           }else{
               $cadena_retorno = $cadena+$option+"\n";
           }
           
           return $cadena_retorno;
       }
       
       //valida que no pueda meter valores diferentes de enteros y diferentes de N.A. en las especificaciones
       $compara_cantidades_especificaciones = function(valor1, valor2, campo){
           
           retorno = "true";
           
           valor1 = valor1.toUpperCase();
           valor2 = valor2.toUpperCase();
           if((/^NA$/.test(valor1)  || /^N.A.$/.test(valor1)) && (/^NA$/.test(valor2)  || /^N.A.$/.test(valor2)) ){
              retorno = "true";
           }else{
               valor1_1 = parseFloat(valor1);
               valor2_2 = parseFloat(valor2);
               
               if(!isNaN(valor1_1) && !isNaN(valor2_2) ){
                   if((valor1_1 >  valor2_2) && retorno == "true"){
                       retorno = "El valor uno para "+campo+" debe de ser mayor que el valor 2";
                   }
               }else{
                   retorno = "Verifique el correcto llenado para "+campo;
               }
           }
           
           return retorno;
       }
        
	$tabs_li_funxionalidad = function(){
            var $select_prod_tipo = $('#forma-proordenproduccion-window').find('select[name=prodtipo]');
            $('#forma-proordenproduccion-window').find('#submit').mouseover(function(){
                $('#forma-proordenproduccion-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/bt1.png");
            });
            $('#forma-proordenproduccion-window').find('#submit').mouseout(function(){
                $('#forma-proordenproduccion-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/btn1.png");
            });
            
            $('#forma-proordenproduccion-window').find('#boton_cancelar').mouseover(function(){
                $('#forma-proordenproduccion-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/bt2.png)"});
            });
            $('#forma-proordenproduccion-window').find('#boton_cancelar').mouseout(function(){
                $('#forma-proordenproduccion-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/btn2.png)"});
            });
            
            $('#forma-proordenproduccion-window').find('#close').mouseover(function(){
                $('#forma-proordenproduccion-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close_over.png)"});
            });
            $('#forma-proordenproduccion-window').find('#close').mouseout(function(){
                $('#forma-proordenproduccion-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close.png)"});
            });
            
            $('#forma-proordenproduccion-window').find(".contenidoPes").hide(); //Hide all content
            $('#forma-proordenproduccion-window').find("ul.pestanas li:first").addClass("active").show(); //Activate first tab
            $('#forma-proordenproduccion-window').find(".contenidoPes:first").show(); //Show first tab content
            
            //On Click Event
            $('#forma-proordenproduccion-window').find("ul.pestanas li").click(function() {
                $('#forma-proordenproduccion-window').find(".contenidoPes").hide();
                $('#forma-proordenproduccion-window').find("ul.pestanas li").removeClass("active");
                var activeTab = $(this).find("a").attr("href");
                $('#forma-proordenproduccion-window').find( activeTab , "ul.pestanas li" ).fadeIn().show();
                $(this).addClass("active");
                return false;
            });
	}
        
        
        
        $autocomplete_input = function($campo, json_input){
            
            $campo.autocomplete({
                source: function(request, response){
                    
                    $arreglo = {'cadena':$campo.val(),
                            'iu':config.getUi()
                            };
                           
                    $.post(json_input, $arreglo, function(data){
                        response($.map(data, function(item) {
                            return {
                                label: item.titulo,
                                value: item.id
                              }
                        }))
                    }, "json");
                },
                 minLength: 2,
                 dataType: "json",
                 cache: false,
                 focus: function(event, ui) {
                    return false;
                 },
                 select: function(event, ui) {
                    this.value = ui.item.label;
                    return false;
                 }
             });
        }
        
        $add_suboprocesos = function(id_reg,producto_id, persona,equipo,eq_adicional,cantidad,subprocesos, unidad, unidad_id, densidad){
            
            contador = 0;
            $.each(subprocesos,function(entryIndex,subproceso){
                if(contador != 0){
                    
                    var $tabla_productos_orden = $('#forma-proordenproduccion-window').find('#grid_productos_seleccionados');
                    var trCount = $("tr", $tabla_productos_orden).size();
                    trCount++;
                    
                    trr = '<tr>';
                    if(id_reg == "0"){
                        
                            trr += '<td width="65"  align="center" colspan="3" class="grid1">';
                                trr += '<input type="hidden" id="delete" name="eliminar" value="1">';
                                trr += '<input type="hidden" id="id_reg" name="id_reg" value="'+id_reg+'">';
                                trr += '<input type="hidden" id="inv_prod_id" name="inv_prod_id" value="'+producto_id +'">';
                                trr += '<input type="hidden" name="densidad" value="'+densidad+'" >';
                                trr += '<input type="hidden" name="unidad_id" value="'+unidad_id+'" >';
                                trr += '<input type="hidden" name="unidad_default" value="'+unidad_id+'" >';
                            trr += '</td>';
                            
                            trr += '<td width="100" class="grid1">';
                                trr += '<input type="text" name="subproceso" value="'+subproceso['pro_subprocesos_titulo']+'"  class="borde_oculto" style="width:70px;" readOnly="true" >';
                                trr += '<input type="hidden" name="subproceso_id" value="'+subproceso['pro_subprocesos_id']+'" >';
                                trr += '<input type="hidden" name="pro_subproceso_prod_id" value="'+subproceso['pro_subproceso_prod_id']+'" >';
                            trr += '</td>';
                            
                            trr += '<td width="100" class="grid1">';
                                //trr += '<a href="#remov_persona" id="remov_persona'+trCount+'">-</a>';
                                trr += '<input type="text" name="persona" id="persona'+trCount+'" value="'+persona+'"  style="width:70px;">';
                                //trr += '<a href="#add_persona" id="add_persona'+trCount+'">+</a>';
                            trr += '</td>';
                            
                            
                            trr += '<td width="100" class="grid1">';
                                trr += '<input type="text" name="equipo" id="equipo'+trCount+'" value="'+equipo+'"  style="width:70px;">';
                            trr += '</td>';
                            trr += '<td width="100" class="grid1">';
                                trr += '<input type="text" name="eq_adicional" id="eq_adicional'+trCount+'" value="'+eq_adicional+'"  style="width:70px;">';
                            trr += '</td>';
                            trr += '<td width="100" class="grid1"><input type="text" id="cantidad'+trCount+'" name="cantidad" value="'+cantidad+'"  style="width:70px;"></td>';
                        
                    }else{
                        
                            trr += '<td width="65"  align="center" colspan="3" class="grid1">';
                                trr += '<input type="hidden" id="delete" name="eliminar" value="1">';
                                trr += '<input type="hidden" id="id_reg" name="id_reg" value="'+id_reg+'">';
                                trr += '<input type="hidden" id="inv_prod_id" name="inv_prod_id" value="'+producto_id +'">';
                                trr += '<input type="hidden" name="densidad" value="'+densidad+'" >';
                                trr += '<input type="hidden" name="unidad_default" value="'+unidad_id+'" >';
                            trr += '</td>';
                            
                            trr += '<td width="100" class="grid1">';
                                trr += '<input type="text" name="subproceso" value="'+subproceso['pro_subprocesos_titulo']+'"  class="borde_oculto" style="width:70px;" readOnly="true" >';
                                trr += '<input type="hidden" name="subproceso_id" value="'+subproceso['pro_subprocesos_id']+'" >';
                                trr += '<input type="hidden" name="pro_subproceso_prod_id" value="'+subproceso['pro_subproceso_prod_id']+'" >';
                            trr += '</td>';
                            
                            trr += '<td width="100" class="grid1">';
                                //trr += '<a href="#remov_persona" id="remov_persona'+trCount+'">-</a>';
                                trr += '<input type="text" name="persona" id="persona'+trCount+'" value="'+persona+'"  style="width:70px;">';
                                //trr += '<a href="#add_persona" id="add_persona'+trCount+'">+</a>';
                            trr += '</td>';
                            
                            
                            trr += '<td width="100" class="grid1">';
                                trr += '<input type="text" name="equipo" id="equipo'+trCount+'" value="'+equipo+'"  style="width:70px;">';
                            trr += '</td>';
                            trr += '<td width="100" class="grid1">';
                                trr += '<input type="text" name="eq_adicional" id="eq_adicional'+trCount+'" value="'+eq_adicional+'"  style="width:70px;">';
                            trr += '</td>';
                            trr += '<td width="100" class="grid1"><input type="text" id="cantidad'+trCount+'" name="cantidad" value="'+cantidad+'"  style="width:70px;"></td>';
                    }
                        trr += '<td width="80" class="grid1">';
                        trr += '<select id="unidad_default'+trCount+'" name="unidad_default" >';
                        unidad = unidad.toUpperCase();
                        if(/^KILO*|KILOGRAMO$/.test(unidad)){
                            trr += '<option value="'+unidad_id+'" name="unidad_id" selected="yes">'+unidad+'</option>';
                            trr += '<option value="0">LITRO</option>';
                            //, unidad_id, densidad
                        }else{
                            trr += '<option value="'+unidad_id+'" selected="yes">'+unidad+'</option>';
                            trr += '<option value="0">KILO</option>';
                        }
                        trr += '</select>';
                        trr += '<input type="hidden" name="densidad" value="'+densidad+'" >';
                        trr += '<input type="hidden" name="unidad_id" value="'+unidad_id+'" >';
                        trr += '</td>';
                        
                    trr += '</tr>';
                    
                    $tabla_productos_orden.append(trr);
                    
                    
                    $aplicar_evento_keypress($tabla_productos_orden.find('#cantidad'+ trCount));
                    
                    //se pone todo en kilos, que es lo que debe de ser por defecto
                    $tmp_parent = $tabla_productos_orden.find('#unidad_default'+ trCount).parent().parent();
                    $tmp_parent = $(this).parent().parent();
                    densidad_tmp = $tmp_parent.find('input[name=densidad]').val();
                    text_selected = $tmp_parent.find('select option:selected').text();
                    cantidad_default = $tmp_parent.find('input[name=cantidad]');
                    $event_changue_umedida(cantidad_default, text_selected, densidad_tmp, 'inicio');
                    $event_changue_input_cantidad(cantidad_default);
                    
                    //para que al cambiar de kilos a litros o de litros a kilos, realize los calculos de acuerdp a la densidad
                    $tabla_productos_orden.find('#unidad_default'+ trCount).change(function() {
                        $tmp_parent = $(this).parent().parent();
                        densidad_tmp = $tmp_parent.find('input[name=densidad]').val();
                        text_selected = $tmp_parent.find('select option:selected').text();
                        cantidad_default = $tmp_parent.find('input[name=cantidad]');
                        $event_changue_umedida(cantidad_default, text_selected, densidad_tmp, 'grid');
                    });
                    
                    //AL CAMBIAR UNA CANTIDAD EN UN SUBPROCESO, LO CAMBIA EN TODOS LOS DEMAS SUBPROCESOS DEL PRODUCTO
                    $tabla_productos_orden.find('#cantidad'+ trCount).blur(function() {
                        cantidad_tr = $(this).val();
                        inv_prod_id_tr = $(this).parent().parent().find('input[name=inv_prod_id]').val();
                        if( ($(this).val() != ' ') && ($(this).val() != '') && ($(this).val() != null ) ){
                            $tabla_productos_orden.find('tr').each(function(){
                                inv_prod_id_tmp = $(this).find('input[name=inv_prod_id]').val();
                                if(inv_prod_id_tr == inv_prod_id_tmp){
                                    $(this).find('input[name=cantidad]').val(cantidad_tr);
                                }
                            });
                        }
                    });
                    
                    $tabla_productos_orden.find('#remov_persona'+ trCount).bind('click',function(event){
                        alert($(this).parent().html());
                    });
                    
                    $tabla_productos_orden.find('#add_persona'+ trCount).bind('click',function(event){
                        alert($(this).parent().html());
                    });
                    
                    //para el autocomplete
                    var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_autocomplete_operarios.json';
                    $autocomplete_input($tabla_productos_orden.find('#persona'+trCount+''), input_json);
                    
                    var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_autocomplete_equipo.json';
                    $autocomplete_input($tabla_productos_orden.find('#equipo'+trCount+''), input_json);
                    
                    var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_autocomplete_equipoadicional.json';
                    $autocomplete_input($tabla_productos_orden.find('#eq_adicional'+trCount+''), input_json);
                    
                    /*
                    $tabla_productos_orden.find('a[href^=eliminar'+ trCount+']').bind('click',function(event){
                        event.preventDefault();
                        if(parseInt($(this).parent().find('#delete').val()) != 0){
                            $(this).parent().find('#delete').val(0);
                            $(this).parent().parent().hide();
                        }
                    });
                    */
                    
                }
                contador++;
            });
        }
	
        
        
        
        //para agregar productos, cuando la orden esta en estatus 1 y 2
        //$add_grid_componente_orden(0,prod['Sku'][0]['id'],prod['Sku'][0]['sku'],prod['Sku'][0]['descripcion'],""       ,""    ,""          , 0);
        $add_grid_componente_orden = function(id_reg,producto_id,sku,descripcion,persona,maquina,eq_adicional,cantidad, subprocesos, proceso_flujo_id, unidad, unidad_id, densidad){
            
            if(subprocesos == ""){
                jAlert("El producto "+sku+" no tiene subprocesos", 'Atencion!');
            }else{
                
                var $tabla_productos_orden = $('#forma-proordenproduccion-window').find('#grid_productos_seleccionados');
                var trCount = $("tr", $tabla_productos_orden).size();
                trCount++;
                
                trr = '<tr>';
                    trr += '<td width="61" class="grid1" align="center">';
                        trr += '<a href="#eliminar'+trCount+'">Eliminar</a>';
                        
                        trr += '<input type="hidden" id="delete" name="eliminar" value="1">';
                        trr += '<input type="hidden" id="id_reg" name="id_reg" value="'+id_reg+'">';
                        trr += '<input type="hidden" id="inv_prod_id" name="inv_prod_id" value="'+producto_id +'">';
                    trr += '</td>';
                    trr += '<td width="80" class="grid1" align="center">';
                        trr += '<input type="text" name="sku'+trCount+'" value="'+sku+'"  class="borde_oculto" readOnly="true" style="width:88px;">';
                    trr += '</td>';
                    trr += '<td width="200" class="grid1"><input type="text" name="descripcion'+trCount+'" value="'+descripcion+'"  class="borde_oculto" readOnly="true" style="width:198px;"></td>';
                    if(id_reg == "0"){
                        trr += '<td width="100" class="grid1">';
                            trr += '<input type="text" name="subproceso" value="'+subprocesos[0]['pro_subprocesos_titulo']+'"  class="borde_oculto" style="width:70px;" readOnly="true" >';
                            trr += '<input type="hidden" name="subproceso_id" value="'+subprocesos[0]['pro_subprocesos_id']+'" >';
                            trr += '<input type="hidden" name="pro_subproceso_prod_id" value="'+subprocesos[0]['pro_subproceso_prod_id']+'" >';
                        trr += '</td>';
                    }else{
                        trr += '<td width="100" class="grid1">';
                            trr += '<input type="text" name="subproceso" value="'+subprocesos['subproceso']+'"  class="borde_oculto" style="width:70px;" readOnly="true" >';
                            trr += '<input type="hidden" name="subproceso_id" value="'+subprocesos['pro_subprocesos_id']+'" >';
                            trr += '<input type="hidden" name="pro_subproceso_prod_id" value="'+subprocesos['pro_subprocesos_id']+'" >';
                        trr += '</td>';
                    }
                    
                    if(proceso_flujo_id == "1"){
                        trr += '<td width="100" class="grid1">';
                            trr += '<input type="text" name="persona" id="persona'+trCount+'" value="'+persona+'"  style="width:70px;" readOnly="true">';
                        trr += '</td>';
                        trr += '<td width="100" class="grid1">';
                            trr += '<input type="text" name="equipo" id="equipo'+trCount+'" value="'+maquina+'"  style="width:70px;" readOnly="true">';
                        trr += '</td>';
                        trr += '<td width="100" class="grid1">';
                            trr += '<input type="text" name="eq_adicional" id="eq_adicional'+trCount+'" value="'+eq_adicional+'"  style="width:70px;" readOnly="true">';
                        trr += '</td>';
                        trr += '<td width="80" class="grid1"><input type="text" name="cantidad" id="cantidad'+trCount+'" value="'+cantidad+'"  style="width:70px;"></td>';
                    }
                    
                    if(proceso_flujo_id == "2"){
                        trr += '<td width="100" class="grid1">';
                            trr += '<input type="text" name="persona" id="persona'+trCount+'" value="'+persona+'"  style="width:70px;" title="'+persona+'">';
                        //    trr += '<a href="#add_persona" id="add_persona'+trCount+'">+</a>';
                        trr += '</td>';
                        trr += '<td width="100" class="grid1">';
                            trr += '<input type="text" name="equipo" id="equipo'+trCount+'" value="'+maquina+'"  style="width:70px;" >';
                        trr += '</td>';
                        trr += '<td width="100" class="grid1">';
                            trr += '<input type="text" name="eq_adicional" id="eq_adicional'+trCount+'" value="'+eq_adicional+'"  style="width:70px;" title="'+eq_adicional+'">';
                        trr += '</td>';
                        trr += '<td width="80" class="grid1"><input type="text" id="cantidad'+trCount+'" name="cantidad" value="'+cantidad+'"  style="width:70px;" readOnly="true"></td>';
                    }
                    
                    trr += '<td width="80" class="grid1">';
                    trr += '<select id="unidad_default'+trCount+'" name="unidad_default" >';
                    unidad = unidad.toUpperCase();
                    if(/^KILO*|KILOGRAMO$/.test(unidad)){
                        trr += '<option value="'+unidad_id+'" name="unidad_id" selected="yes">'+unidad+'</option>';
                        trr += '<option value="0">LITRO</option>';
                        //, unidad_id, densidad
                    }else{
                        trr += '<option value="'+unidad_id+'" selected="yes">'+unidad+'</option>';
                        trr += '<option value="0">KILO</option>';
                    }
                    trr += '</select>';
                    trr += '<input type="hidden" name="densidad" value="'+densidad+'" >';
                    trr += '<input type="hidden" name="unidad_id" value="'+unidad_id+'" >';
                    trr += '</td>';
                    
                trr += '</tr>';
                
                $tabla_productos_orden.append(trr);
                
                $aplicar_evento_keypress($tabla_productos_orden.find('#cantidad'+ trCount));
                
                //se pone todo en kilos, que es lo que debe de ser por defecto
                $tmp_parent = $tabla_productos_orden.find('#unidad_default'+ trCount).parent().parent();
                $tmp_parent = $(this).parent().parent();
                densidad_tmp = $tmp_parent.find('input[name=densidad]').val();
                text_selected = $tmp_parent.find('select option:selected').text();
                cantidad_default = $tmp_parent.find('input[name=cantidad]');
                $event_changue_umedida(cantidad_default, text_selected, densidad_tmp, 'inicio');
                //$event_changue_input_cantidad(cantidad_default);
                
                
                $tabla_productos_orden.find('#cantidad'+ trCount).focus(function(e){
                    if($(this).val() == ' '){
                        $(this).val('0');
                    }
                });
                
                //AL CAMBIAR UNA CANTIDAD EN UN SUBPROCESO, LO CAMBIA EN TODOS LOS DEMAS SUBPROCESOS DEL PRODUCTO
                $tabla_productos_orden.find('#cantidad'+ trCount).blur(function() {
                    cantidad_tr = $(this).val();
                    inv_prod_id_tr = $(this).parent().parent().find('input[name=inv_prod_id]').val();
                    if( ($(this).val() != ' ') && ($(this).val() != '') && ($(this).val() != null ) ){
                        $tabla_productos_orden.find('tr').each(function(){
                            inv_prod_id_tmp = $(this).find('input[name=inv_prod_id]').val();
                            if(inv_prod_id_tr == inv_prod_id_tmp){
                                $(this).find('input[name=cantidad]').val(cantidad_tr);
                            }
                        });
                    }
                });
                
                //para que al cambiar de kilos a litros o de litros a kilos, realize los calculos de acuerdp a la densidad
                $tabla_productos_orden.find('#unidad_default'+ trCount).change(function() {
                    $tmp_parent = $(this).parent().parent();
                    densidad_tmp = $tmp_parent.find('input[name=densidad]').val();
                    text_selected = $tmp_parent.find('select option:selected').text();
                    cantidad_default = $tmp_parent.find('input[name=cantidad]');
                    $event_changue_umedida(cantidad_default, text_selected, densidad_tmp, 'grid');
                });
                
                $tabla_productos_orden.find('#add_persona'+ trCount).bind('click',function(event){
                    $tmp_parent = $(this).parent();
                    tmp_html = '<span class="person_adicionl">';
                        tmp_html += '<input type="text" name="add_persona" id="add_persona" style="width:70px;">';
                        tmp_html += '<a href="#remov_persona" id="remov_persona'+trCount+'">-</a>';
                    tmp_html += '</span>';
                    $tmp_parent.append(tmp_html);
                    alert($tmp_parent.html());
                });
                
                
                
                //para el autocomplete
                var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_autocomplete_operarios.json';
                $autocomplete_input($tabla_productos_orden.find('#persona'+trCount+''), input_json);
                
                
                var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_autocomplete_equipo.json';
                $autocomplete_input($tabla_productos_orden.find('#equipo'+trCount+''), input_json);
                
                
                var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_autocomplete_equipoadicional.json';
                $autocomplete_input($tabla_productos_orden.find('#eq_adicional'+trCount+''), input_json);
                
                
                $tabla_productos_orden.find('a[href^=eliminar'+ trCount+']').bind('click',function(event){
                    if(parseInt($(this).parent().find('#delete').val()) != 0){
                        $(this).parent().find('#delete').val(0);
                        $(this).parent().parent().hide();
                    }
                });
                
                if(id_reg == "0"){
                    $add_suboprocesos(id_reg,producto_id, persona,maquina,eq_adicional, cantidad, subprocesos, unidad, unidad_id, densidad);
                }
            }
        }
        
        
        $recalcula_cantidades = function($tr, $table, text_selected){
            
            inv_prod_id_tr = $tr.find('input[name=inv_prod_id]').val();
            cantidad_tr = $tr.find('input[name=cantidad]').val();
            unidad_id_tr = $tr.find('select[name=unidad_default]').val();
            text_selected = $tr.find('select option:selected').text();
            
            $table.find('tr').each(function(){
                inv_prod_id_tmp = $(this).find('input[name=inv_prod_id]').val();
                if(inv_prod_id_tr == inv_prod_id_tmp){
                    $(this).find('input[name=cantidad]').val(cantidad_tr);
                    option_selected = $(this).find('select option:selected').text();
                    select_value =$(this).find('select[name=unidad_default]').val();
                    select =$(this).find('select[name=unidad_default]');
                    
                    id_unidad = "0";
                    select.find('option').each(function(){
                        if($(this).val() != "0"){
                            id_unidad = $(this).val();
                        }
                    });
                    
                    trr = '';
                    select.children().remove();
                    if(/^KILO*|KILOGRAMO*$/.test(text_selected) ){
                        
                        if( unidad_id_tr != "0" ){
                            trr += '<option value="'+unidad_id_tr+'" selected="yes">'+text_selected+'</option>';
                            trr += '<option value="0">LITRO</option>';
                        }else{
                            trr += '<option value="0" selected="yes">'+text_selected+'</option>';
                            trr += '<option value="'+unidad_id_tr+'">LITRO</option>';
                        }
                        
                    }else{
                        if( unidad_id_tr != "0" ){
                            trr += '<option value="'+unidad_id_tr+'" selected="yes">'+text_selected+'</option>';
                            trr += '<option value="0">KILO</option>';
                        }else{
                            trr += '<option value="0" selected="yes">'+text_selected+'</option>';
                            trr += '<option value="'+unidad_id_tr+'">KILO</option>';
                        }
                    }
                    select.append(trr);
                }
            });
            
        }
        
        $event_changue_input_cantidad = function(input_cantidad){
            $this_tr = input_cantidad.parent().parent();
            $this_table = input_cantidad.parent().parent().parent();
            cantidad_tr = $this_tr.find('input[name=cantidad]').val();
            inv_prod_id_tr = $this_tr.find('input[name=inv_prod_id]').val();
            
            input_cantidad.focus(function() {
                alert("asd");
                $this_table.find('tr').each(function(){
                    inv_prod_id_tmp = $(this).find('input[name=inv_prod_id]').val();
                    if(inv_prod_id_tr == inv_prod_id_tmp){
                        $(this).find('input[name=cantidad]').val(cantidad_tr);
                    }
                });
            });
            
        }
        
        $event_changue_umedida = function(input_cantidad, titulo_selected, densidad, desde){
            titulo_selected = titulo_selected.toUpperCase();
            densidad_tmp = parseFloat(densidad);
            cantidad_original = parseFloat(input_cantidad.val());
            if(desde == 'grid'){
                if(!isNaN(cantidad_original) && !isNaN(densidad_tmp)){
                    if(/^KILO*|KILOGRAMO*$/.test(titulo_selected)){
                        calculo = parseFloat(cantidad_original) * parseFloat(densidad_tmp);
                        input_cantidad.val(parseFloat(calculo).toFixed(4));
                    }else{
                        calculo = parseFloat(cantidad_original) / parseFloat(densidad_tmp);
                        input_cantidad.val(parseFloat(calculo).toFixed(4));
                    }
                }else{
                    input_cantidad.val(0);
                }
                
                $this_tr = input_cantidad.parent().parent();
                $this_table = input_cantidad.parent().parent().parent();
            }else{
                if(!isNaN(cantidad_original) && !isNaN(densidad_tmp)){
                    if(!/^KILO*|KILOGRAMO*$/.test(titulo_selected)){
                        //aqui falta que se seleccione kilogramo por defecto
                        calculo = parseFloat(cantidad_original) * parseFloat(densidad_tmp);
                        input_cantidad.val(parseFloat(calculo).toFixed(4));
                    }
                }else{
                    input_cantidad.val(0);
                }
                
                $this_tr = input_cantidad.parent().parent();
                $this_table = input_cantidad.parent().parent().parent();
                
            }
            $recalcula_cantidades($this_tr, $this_table, titulo_selected);
            
        }
        
        
        $add_grid_componente_orden_finalizada_o_cancelada = function(id_reg,producto_id,sku,descripcion,persona,maquina,eq_adicional,cantidad, subprocesos, proceso_flujo_id, unidad, unidad_id, densidad){
            if(subprocesos == ""){
                jAlert("El producto "+sku+" no tiene subprocesos", 'Atencion!');
            }else{
                
                var $tabla_productos_orden = $('#forma-proordenproduccion-window').find('#grid_productos_seleccionados');
                var trCount = $("tr", $tabla_productos_orden).size();
                trCount++;
                
                trr = '<tr>';
                    trr += '<td width="61" class="grid1" align="center">';
                        trr += 'Eliminar';
                        trr += '<input type="hidden" id="delete" name="eliminar" value="1">';
                        trr += '<input type="hidden" id="id_reg" name="id_reg" value="'+id_reg+'">';
                        trr += '<input type="hidden" id="inv_prod_id" name="inv_prod_id" value="'+producto_id +'">';
                    trr += '</td>';
                    trr += '<td width="100" class="grid1" align="center">';
                        trr += '<input type="text" name="sku'+trCount+'" value="'+sku+'"  class="borde_oculto" readOnly="true" style="width:98px;">';
                    trr += '</td>';
                    trr += '<td width="220" class="grid1"><input type="text" name="descripcion'+trCount+'" value="'+descripcion+'"  class="borde_oculto" readOnly="true" style="width:208px;"></td>';
                    
                    trr += '<td width="100" class="grid1">';
                        trr += '<input type="text" name="subproceso" value="'+subprocesos['subproceso']+'"  class="borde_oculto" style="width:70px;" readOnly="true" >';
                        trr += '<input type="hidden" name="subproceso_id" value="'+subprocesos['pro_subprocesos_id']+'" >';
                        trr += '<input type="hidden" name="pro_subproceso_prod_id" value="'+subprocesos['pro_subprocesos_id']+'" >';
                    trr += '</td>';
                    
                    
                    trr += '<td width="100" class="grid1">';
                        trr += '<input type="text" name="persona" id="persona'+trCount+'" value="'+persona+'"  style="width:70px;" title="'+persona+'" readOnly="true">';
                    trr += '</td>';
                    trr += '<td width="100" class="grid1">';
                        trr += '<input type="text" name="equipo" id="equipo'+trCount+'" value="'+maquina+'"  style="width:70px;" readOnly="true">';
                    trr += '</td>';
                    trr += '<td width="100" class="grid1">';
                        trr += '<input type="text" name="eq_adicional" id="eq_adicional'+trCount+'" value="'+eq_adicional+'"  style="width:70px;" title="'+eq_adicional+'" readOnly="true">';
                    trr += '</td>';
                    trr += '<td width="100" class="grid1"><input type="text" name="cantidad" value="'+cantidad+'"  style="width:70px;" readOnly="true"></td>';
                    
                    trr += '<td width="80" class="grid1">';
                    trr += '<select id="unidad_default'+trCount+'" name="unidad_default" >';
                    unidad = unidad.toUpperCase();
                    if(/^[KILO*]$/.test(unidad)){
                        trr += '<option value="'+unidad_id+'">'+unidad+'</option>';
                        trr += '<option value="0">LITRO</option>';
                        //, unidad_id, densidad
                    }else{
                        trr += '<option value="'+unidad_id+'">'+unidad+'</option>';
                        trr += '<option value="0">KILO</option>';
                    }
                    trr += '</select>';
                    trr += '<input type="hidden" name="densidad" value="'+densidad+'" >';
                    trr += '<input type="hidden" name="unidad_id" value="'+unidad_id+'" >';
                    trr += '</td>';
                    
                trr += '</tr>';
                
                $tabla_productos_orden.append(trr);
                
                
                //se pone todo en kilos, que es lo que debe de ser por defecto
                $tmp_parent = $tabla_productos_orden.find('#unidad_default'+ trCount).parent().parent();
                $tmp_parent = $(this).parent().parent();
                densidad_tmp = $tmp_parent.find('input[name=densidad]').val();
                text_selected = $tmp_parent.find('select option:selected').text();
                cantidad_default = $tmp_parent.find('input[name=cantidad]');
                $event_changue_umedida(cantidad_default, text_selected, densidad_tmp, 'inicio');
                $event_changue_input_cantidad(cantidad_default);
                
                $tabla_productos_orden.find('#unidad_default'+ trCount).change(function() {
                    $tmp_parent = $(this).parent().parent();
                    densidad_tmp = $tmp_parent.find('input[name=densidad]').val();
                    text_selected = $tmp_parent.find('select option:selected').text();
                    cantidad_default = $tmp_parent.find('input[name=cantidad]');
                    $event_changue_umedida(cantidad_default, text_selected, densidad_tmp, 'grid');
                });
                
                $tabla_productos_orden.find('#add_persona'+ trCount).bind('click',function(event){
                    $tmp_parent = $(this).parent();
                    tmp_html = '<span class="person_adicionl">';
                        tmp_html += '<input type="text" name="add_persona" id="add_persona" style="width:70px;">';
                        tmp_html += '<a href="#remov_persona" id="remov_persona'+trCount+'">-</a>';
                    tmp_html += '</span>';
                    $tmp_parent.append(tmp_html);
                    alert($tmp_parent.html());
                });
                
                
                
                //para el autocomplete
                var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_autocomplete_operarios.json';
                $autocomplete_input($tabla_productos_orden.find('#persona'+trCount+''), input_json);
                
                
                var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_autocomplete_equipo.json';
                $autocomplete_input($tabla_productos_orden.find('#equipo'+trCount+''), input_json);
                
                
                var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_autocomplete_equipoadicional.json';
                $autocomplete_input($tabla_productos_orden.find('#eq_adicional'+trCount+''), input_json);
                
                
                $tabla_productos_orden.find('a[href^=eliminar'+ trCount+']').bind('click',function(event){
                    if(parseInt($(this).parent().find('#delete').val()) != 0){
                        $(this).parent().find('#delete').val(0);
                        $(this).parent().parent().hide();
                    }
                });
                
                if(id_reg == "0"){
                    $add_suboprocesos(id_reg,producto_id, persona,maquina,eq_adicional, cantidad, subprocesos, unidad, unidad_id, densidad);
                }
            }
        }
        
        $aplicar_evento_keypress = function( $campo_input ){
            //validar campo cantidad recibida, solo acepte numeros y punto
            $campo_input.keypress(function(e){
                // Permitir  numeros, borrar, suprimir, TAB, puntos, comas
                if(e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
                        return true;
                }else {
                        return false;
                }
            });
	}
        
        $aplicar_evento_keypress_input_lote = function( $campo_input ){
            //validar campo cantidad recibida, solo acepte numeros y punto
            $campo_input.keypress(function(e){
                // Permitir  numeros, borrar, suprimir, TAB, puntos, comas
                if(e.which==13 ) {
                    if ( $(this).val()!=''  &&  $(this).val()!=' ' && $(this).val()!=null ){
                        var $tr_padre = $(this).parent().parent();
                        $obtiene_datos_lote($tr_padre);
                    }else{
                        jAlert("Ingresa un n&uacute;mero de Lote.", 'Atencion!');
                    }
                    return false;
                }
            });
	}
        
        
	$aplicar_evento_focus_input_lote = function( $campo_input ){
            //al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
            $campo_input.focus(function(e){
                if($(this).val() == ' '){
                    $(this).val('');
                }
            });
	}
        
        
	$aplicar_evento_click_input_lote = function( $campo_input ){
            //validar campo cantidad recibida, solo acepte numeros y punto
            $campo_input.dblclick(function(e){
                $(this).select();
            });
	}
	
        $aplicar_evento_blur_input_lote = function( $campo_input ){
            //pone espacio en blanco al perder el enfoque, cuando no se ingresa un valor
            $campo_input.blur(function(e){
                if ( $(this).val() == ''  || $(this).val() == null ){
                    $(this).val(' ');
                }else{
                    //aqui va llamada a funcion que busca datos del lote
                    //var $tr_padre = $(this).parent().parent();
                    //$obtiene_datos_lote($tr_padre);
                }
            });
	}
        
        $aplicar_evento_focus_input_lote = function( $campo_input ){
            //al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
            $campo_input.focus(function(e){
                if($(this).val() == ' '){
                        $(this).val('');
                }
            });
	}
        
        /* Plugin para agregar las espedificaciones */
        //$tr_parent//el ter al que se le da click
        //$table_parent //la tabla completa
        $plugin_especificaciones = function(id_reg, id_subp,id_prod, sku, data_string, accion, $tr_parent, $subproceso, id_reg_esp){
            
            $cadeana_retorno = data_string;
            $(this).modalPanel_Especificaciones();
            var $dialogoc =  $('#forma-especificaciones-window');
            //var $dialogoc.prependTo('#forma-buscaproduct-window');
            $dialogoc.append($('div.panel_especificacoines').find('table.forma_especificacoines').clone());
            
            $('#forma-especificaciones-window').css({"margin-left": -200, 	"margin-top": -140});
            
            
            /*campos para las especificaciones*/
            var $campo_id_reg = $('#forma-especificaciones-window').find('input[name=id_reg]');
            var $campo_id_subp = $('#forma-especificaciones-window').find('input[name=id_subp]');
            var $campo_id_prod = $('#forma-especificaciones-window').find('input[name=id_prod]');
            
            
            
            var $campo_fineza = $('#forma-especificaciones-window').find('input[name=fineza]');
            var $campo_viscosidad1 = $('#forma-especificaciones-window').find('input[name=viscosidad1]');
            var $campo_viscosidad2 = $('#forma-especificaciones-window').find('input[name=viscosidad2]');
            var $campo_viscosidad3 = $('#forma-especificaciones-window').find('input[name=viscosidad3]');
            var $campo_densidad = $('#forma-especificaciones-window').find('input[name=densidad]');
            var $campo_volatil = $('#forma-especificaciones-window').find('input[name=volatil]');
            var $campo_cubriente = $('#forma-especificaciones-window').find('input[name=cubriente]');
            var $campo_tono = $('#forma-especificaciones-window').find('input[name=tono]');
            var $campo_brillo = $('#forma-especificaciones-window').find('input[name=brillo]');
            var $campo_dureza = $('#forma-especificaciones-window').find('input[name=dureza]');
            var $campo_adherencia = $('#forma-especificaciones-window').find('input[name=adherencia]');
            var $campo_hidrogeno = $('#forma-especificaciones-window').find('input[name=hidrogeno]');
            
            var $campo_fineza1 = $('#forma-especificaciones-window').find('input[name=fineza1]');
            var $campo_viscosidad11 = $('#forma-especificaciones-window').find('input[name=viscosidad11]');
            var $campo_viscosidad21 = $('#forma-especificaciones-window').find('input[name=viscosidad21]');
            var $campo_viscosidad31 = $('#forma-especificaciones-window').find('input[name=viscosidad31]');
            var $campo_densidad1 = $('#forma-especificaciones-window').find('input[name=densidad1]');
            var $campo_volatil1 = $('#forma-especificaciones-window').find('input[name=volatil1]');
            var $campo_cubriente1 = $('#forma-especificaciones-window').find('input[name=cubriente1]');
            var $campo_tono1 = $('#forma-especificaciones-window').find('input[name=tono1]');
            var $campo_brillo1 = $('#forma-especificaciones-window').find('input[name=brillo1]');
            var $campo_dureza1 = $('#forma-especificaciones-window').find('input[name=dureza1]');
            var $campo_adherencia1 = $('#forma-especificaciones-window').find('input[name=adherencia1]');
            var $campo_hidrogeno1 = $('#forma-especificaciones-window').find('input[name=hidrogeno1]');
            
            var $aceptar_acepta_especificacaiones = $('#forma-especificaciones-window').find('#acepta_especificacaiones');
            var $cancelar_cencela_especificacaiones = $('#forma-especificaciones-window').find('#cencela_especificacaiones');
            
            $campo_id_reg.val(id_reg);
            $campo_id_subp.val(id_subp);
            $campo_id_prod.val(id_prod);
            //id_reg, id_subp,id_prod
            
            //alert(accion+"  edit   "+data_string+"       "+data_string);
            
            if(accion == "edit" && data_string != "" && data_string != " "){
                
                $campos_espliteados = data_string.split("&&&");
                
                $campo_fineza.val($convierte_numero_caracter($campos_espliteados[0]));
                $campo_viscosidad1.val($convierte_numero_caracter($campos_espliteados[1]));
                $campo_viscosidad2.val($convierte_numero_caracter($campos_espliteados[2]));
                $campo_viscosidad3.val($convierte_numero_caracter($campos_espliteados[3]));
                $campo_densidad.val($convierte_numero_caracter($campos_espliteados[4]));
                $campo_volatil.val($convierte_numero_caracter($campos_espliteados[5]));
                $campo_cubriente.val($convierte_numero_caracter($campos_espliteados[6]));
                $campo_tono.val($convierte_numero_caracter($campos_espliteados[7]));
                $campo_brillo.val($convierte_numero_caracter($campos_espliteados[8]));
                $campo_dureza.val($campos_espliteados[9]);
                $campo_adherencia.val($convierte_numero_caracter($campos_espliteados[10]));
                $campo_hidrogeno.val($convierte_numero_caracter($campos_espliteados[11]));
                
                $campo_fineza1.val($convierte_numero_caracter($campos_espliteados[12]));
                $campo_viscosidad11.val($convierte_numero_caracter($campos_espliteados[13]));
                $campo_viscosidad21.val($convierte_numero_caracter($campos_espliteados[14]));
                $campo_viscosidad31.val($convierte_numero_caracter($campos_espliteados[15]));
                $campo_densidad1.val($convierte_numero_caracter($campos_espliteados[16]));
                $campo_volatil1.val($convierte_numero_caracter($campos_espliteados[17]));
                $campo_cubriente1.val($convierte_numero_caracter($campos_espliteados[18]));
                $campo_tono1.val($convierte_numero_caracter($campos_espliteados[19]));
                $campo_brillo1.val($convierte_numero_caracter($campos_espliteados[20]));
                $campo_dureza1.val($campos_espliteados[21]);
                $campo_adherencia1.val($convierte_numero_caracter($campos_espliteados[22]));
                $campo_hidrogeno1.val($convierte_numero_caracter($campos_espliteados[23]));
                
            }else{
                $campo_fineza.val('N.A.');
                $campo_viscosidad1.val('N.A.');
                $campo_viscosidad2.val('N.A.');
                $campo_viscosidad3.val('N.A.');
                $campo_densidad.val('N.A.');
                $campo_volatil.val('N.A.');
                $campo_cubriente.val('N.A.');
                $campo_tono.val('N.A.');
                $campo_brillo.val('N.A.');
                $campo_dureza.val('N.A.');
                $campo_adherencia.val('N.A.');
                $campo_hidrogeno.val('N.A.');
                
                $campo_fineza1.val('N.A.');
                $campo_viscosidad11.val('N.A.');
                $campo_viscosidad21.val('N.A.');
                $campo_viscosidad31.val('N.A.');
                $campo_densidad1.val('N.A.');
                $campo_volatil1.val('N.A.');
                $campo_cubriente1.val('N.A.');
                $campo_tono1.val('N.A.');
                $campo_brillo1.val('N.A.');
                $campo_dureza1.val('N.A.');
                $campo_adherencia1.val('N.A.');
                $campo_hidrogeno1.val('N.A.');
            }
            
            $aceptar_acepta_especificacaiones.click(function(event){
                
                event.preventDefault();
                
                $valida_result = "";
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_fineza.val(), $campo_fineza1.val(), "Fineza"), $valida_result);
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_viscosidad1.val(), $campo_viscosidad11.val(), "Viscosidad"), $valida_result);
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_viscosidad2.val(), $campo_viscosidad21.val(), "Viscosidad"), $valida_result);
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_viscosidad3.val(), $campo_viscosidad31.val(), "Viscosidad"), $valida_result);
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_densidad.val(), $campo_densidad1.val(), "Densidad"), $valida_result);
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_volatil.val(), $campo_volatil1.val(), "No Vol&aacute;tiles"), $valida_result);
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_cubriente.val(), $campo_cubriente1.val(), "Cubriente"), $valida_result);
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_tono.val(), $campo_tono1.val(), "Tono"), $valida_result);
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_brillo.val(), $campo_brillo1.val(), "Brillo"), $valida_result);
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_adherencia.val(), $campo_adherencia1.val(), "Adherencia"), $valida_result);
                $valida_result = $verificar_cadena_verdadera($compara_cantidades_especificaciones($campo_hidrogeno.val(), $campo_hidrogeno1.val(), "pH"), $valida_result);
                
                
                if($valida_result == "true" || $valida_result == "TRUE" || $valida_result == ""){
                    
                    $tr_posicion = $tr_parent.find('input[name=posicion]').val();
                    td_seleccionado = $tr_parent.find('.subproceso'+$tr_posicion);
                    
                    $cadeana_retorno = $convierte_caracter_numero($campo_fineza.val())+"&&&"+$convierte_caracter_numero($campo_viscosidad1.val())+"&&&"+$convierte_caracter_numero($campo_viscosidad2.val())+"&&&";
                    $cadeana_retorno += $convierte_caracter_numero($campo_viscosidad3.val())+"&&&"+$convierte_caracter_numero($campo_densidad.val())+"&&&"+$convierte_caracter_numero($campo_volatil.val())+"&&&"+$convierte_caracter_numero($campo_cubriente.val())+"&&&"+$convierte_caracter_numero($campo_tono.val())+"&&&";
                    $cadeana_retorno += $convierte_caracter_numero($campo_brillo.val())+"&&&"+$campo_dureza.val()+"&&&"+$convierte_caracter_numero($campo_adherencia.val())+"&&&"+$convierte_caracter_numero($campo_hidrogeno.val())+"&&&";
                    
                    $cadeana_retorno += $convierte_caracter_numero($campo_fineza1.val())+"&&&"+$convierte_caracter_numero($campo_viscosidad11.val())+"&&&"+$convierte_caracter_numero($campo_viscosidad21.val())+"&&&";
                    $cadeana_retorno += $convierte_caracter_numero($campo_viscosidad31.val())+"&&&"+$convierte_caracter_numero($campo_densidad1.val())+"&&&"+$convierte_caracter_numero($campo_volatil1.val())+"&&&"+$convierte_caracter_numero($campo_cubriente1.val())+"&&&"+$convierte_caracter_numero($campo_tono1.val())+"&&&";
                    $cadeana_retorno += $convierte_caracter_numero($campo_brillo1.val())+"&&&"+$campo_dureza1.val()+"&&&"+$convierte_caracter_numero($campo_adherencia1.val())+"&&&"+$convierte_caracter_numero($campo_hidrogeno1.val());
                    
                    if(accion == "edit"){
                        $tr_parent.find('input[name=especificaciones]').val($cadeana_retorno);
                    }
                    
                    if(accion == "new"){
                        //alert($grid_parent.html());
                        //$tr_parent.after(html_tabla);
                        var $tabla_productos_orden = $('#forma-proordenproduccion-window').find('#grid_productos_seleccionados');
                        var trCount = $("tr", $tabla_productos_orden).size();
                        trCount++;
                        
                        //alert($tr_posicion);
                        posicion_mas_1 = (parseInt($tr_posicion) + 1);
                        //tr_actual = td_seleccionado.parent().parent();
                        
                        html_tabla = '<tr>';
                            html_tabla += '<td width="681" colspan="5" class="grid1" align="center">&nbsp;';
                                html_tabla += '<input type="hidden" id="delete" name="eliminar" value="1">';
                                html_tabla += '<input type="hidden" id="inv_prod_id" name="inv_prod_id" value="1">';
                                html_tabla += '<input type="hidden" id="id_reg" name="id_reg" value="'+id_reg+'">';
                                html_tabla += '<input type="hidden" id="id_reg_esp" name="id_reg_esp" value="'+id_reg_esp+'">';
                                html_tabla += '<input type="hidden" name="subproceso_id" value="'+id_subp+'" >';
                            html_tabla += '</td>';
                            html_tabla += '<td width="100" class="grid1" align="center">&nbsp;';
                                html_tabla += '<input type="hidden" name="especificaciones" id="especificaciones'+trCount+'" value="'+$cadeana_retorno+'"  style="width:70px;" readOnly="true">';
                                html_tabla += '<a href="#ver_especificaciones" id="ver_especificaciones'+trCount+'" title="Ver las especificaici&oacute;n">Res. Analisis</a>&nbsp;&nbsp;&nbsp;';
                                html_tabla += '<a href="#remov_especificacion" id="remov_especificacion'+trCount+'" title="ELiminar especificaci&oacute;n">-</a>';
                            html_tabla += '</td>';
                            html_tabla += '<td width="100" class="grid1" align="center">&nbsp;';
                            html_tabla += '</td>';
                        html_tabla += '</tr>';
                        
                        $tr_parent.after(html_tabla);
                        //$table_parent
                        $tabla_productos_orden.find('#remov_especificacion'+trCount).click(function(event){
                            event.preventDefault();
                            $(this).parent().parent().find('input[name=eliminar]').val("0");
                            $(this).parent().parent().find('input[name=especificaciones1]').val("");
                            
                            $(this).parent().parent().hide();
                        });
                        
                        
                        //para pder ver el detalle de la especificacion
                        $tabla_productos_orden.find('#ver_especificaciones'+ trCount).bind('click',function(event){
                            event.preventDefault();
                            
                            $tr_parent = $(this).parent().parent();
                            $id_producto = $tr_parent.find('input[name=inv_prod_id]');
                            $subproceso_id = $tr_parent.find('input[name=subproceso_id]');
                            $subproceso = $tr_parent.find('input[name=subproceso]');
                            $especificaciones = $tr_parent.find('input[name=especificaciones]');
                            
                            $id_reg_tmp = $tr_parent.find('input[name=id_reg]');
                            $id_reg_esp = $tr_parent.find('input[name=id_reg_esp]');
                            
                            accion = "edit";
                            
                            $plugin_especificaciones($id_reg_tmp.val(), $subproceso_id.val(),$id_producto.val(), "s", $especificaciones.val(), accion, $tr_parent, $subproceso, $id_reg_esp.val());
                        });
                    }
                    
                    var remove = function() {$(this).remove();};
                    $('#forma-especificaciones-overlay').fadeOut(remove);
                    $cadena_especificaciones = $cadeana_retorno;
                    
                    
                    /*variables para accesar a los campos de el prugin principal*/
                    var $submit_actualizar = $('#forma-proordenproduccion-window').find('#submit');
                    var $command_selected = $('#forma-proordenproduccion-window').find('input[name=command_selected]');
                    var $confirmar_enviar_produccion = $('#forma-proordenproduccion-window').find('#confirmar_enviar_produccion');
                    var $tabla_productos_preorden = $('#forma-proordenproduccion-window').find('#grid_productos_seleccionados');
                    var $especificaicones_lista = $('#forma-proordenproduccion-window').find('input[name=especificaicones_lista]');
                    var $submit_actualizar = $('#forma-proordenproduccion-window').find('#submit');
                    
                    /*guarda resultados de analisis*/
                    //$confirmar_enviar_produccion.bind('click',function(){
                        
                        $command_selected.val("3");
                        $agrega_esp_en_blanco_grid();
                        var trCount = $("tr", $tabla_productos_preorden).size();
                        if(trCount > 0){
                            
                            jConfirm('Desea guardar los cambios ?', 'Dialogo de Confirmacion', function(r) {
                                
                                cadena_pos = "";
                                $tabla_productos_preorden.find('tr').each(function(){
                                    
                                    eliminar_tmp = $(this).find('input[name=eliminar]').val();
                                    id_reg_tmp = $(this).find('input[name=id_reg]').val();
                                    inv_prod_id = $(this).find('input[name=inv_prod_id]').val();
                                    subproceso_id = $(this).find('input[name=subproceso_id]').val();
                                    especificaciones = $(this).find('input[name=especificaciones]').val();
                                    id_reg_esp = $(this).find('input[name=id_reg_esp]').val();
                                    
                                    if(eliminar_tmp != null && id_reg_tmp != null && subproceso_id != null && especificaciones != null){
                                        //                  1               2                   3           
                                        cadena_pos += eliminar_tmp+"___"+id_reg_tmp+"___"+inv_prod_id+"___"+
                                            //      4                   5 
                                            subproceso_id+"___"+especificaciones+"___"+id_reg_esp+"$$$$";
                                    }
                                });
                                
                                $especificaicones_lista.val(cadena_pos);
                                
                                if (r) $submit_actualizar.parents("FORM").submit();
                            });
                            
                        }else{
                            jAlert("Es necesario agregar productos.", 'Atencion!');
                        }
                        // Always return false here since we don't know what jConfirm is going to do
                        return false;
                    //});
                    
               }else{
                  jAlert($valida_result, 'Atencion!');
               }
            });
            
            $cancelar_cencela_especificacaiones.click(function(event){
                event.preventDefault();
                
                $cadena_especificaciones = $cadeana_retorno;
                
                var remove = function() {$(this).remove();};
                $('#forma-especificaciones-overlay').fadeOut(remove);
            });
        }
        
        
        $calcula_cantidad_por_porducto = function(cantidad , total){
            cantidad_retorno = 0;
            
            cantidad_retorno = parseFloat(cantidad).toFixed(4);
            return parseFloat(cantidad_retorno).toFixed(4);
        }
        
        //agrega productos a el grid de ORDEN DE PRODUCCION en estatus produccion
        //$add_grid_componente_orden(0,prod['Sku'][0]['id'],prod['Sku'][0]['sku'],prod['Sku'][0]['descripcion'],""       ,""    ,""          , 0);
        $add_grid_componente_orden_en_produccion = function(id_reg,producto_id,sku,descripcion,cantidad, proceso_flujo_id, subproceso,pro_subprocesos_id ,lote,especificaciones, id_reg_esp, unidad, unidad_id, densidad){
                
                var $tabla_productos_orden = $('#forma-proordenproduccion-window').find('#grid_productos_seleccionados');
                var trCount = $("tr", $tabla_productos_orden).size();
                trCount++;
                
                trr = '<tr >';
                    trr += '<td width="61" class="grid1" align="center">';
                        trr += '<a href="#ver_detalle" id="ver_detalle'+trCount+'">Detalle</a>';
                        trr += '<input type="hidden" id="estatus_detalle" name="estatus_detalle" value="0">';
                        trr += '<input type="hidden" id="delete" name="eliminar" value="1">';
                        trr += '<input type="hidden" id="id_reg" name="id_reg" value="'+id_reg+'">';
                        trr += '<input type="hidden" id="id_reg_esp" name="id_reg_esp" value="'+id_reg_esp+'">';
                        trr += '<input type="hidden" id="inv_prod_id" name="inv_prod_id" value="'+producto_id +'">';
                        trr += '<input type="hidden" id="posicion" name="posicion" value="'+trCount +'">';
                    trr += '</td>';
                    trr += '<td width="80" class="grid1" align="center">';
                        trr += '<input type="text" name="sku'+trCount+'" value="'+sku+'"  class="borde_oculto" readOnly="true" style="width:78px;">';
                    trr += '</td>';
                    trr += '<td width="200" class="grid1"><input type="text" name="descripcion'+trCount+'" value="'+descripcion+'"  class="borde_oculto" readOnly="true" style="width:208px;"></td>';
                    
                    
                    trr += '<td width="100" class="grid1">';
                        trr += '<span class="subproceso'+trCount+'"></span>';
                        trr += '<input type="text" name="subproceso" value="'+subproceso+'"  class="borde_oculto" style="width:70px;" readOnly="true" >';
                        trr += '<input type="hidden" name="subproceso_id" value="'+pro_subprocesos_id+'" >';
                    trr += '</td>';
                    
                    trr += '<td width="100" class="grid1">';
                        trr += '<input type="text" name="lote" id="lote'+trCount+'" value="'+lote+'"  style="width:70px;" readOnly="true">';
                    trr += '</td>';
                    trr += '<td width="100" class="grid1">';
                        trr += '<input type="hidden" name="especificaciones" id="especificaciones'+trCount+'" value="'+especificaciones+'"  style="width:70px;" readOnly="true">';
                        trr += '<a href="#ver_especificaciones" id="ver_especificaciones'+trCount+'" title="Ver las especificaici&oacute;n">Res. Analisis</a>&nbsp;&nbsp;&nbsp;';
                        trr += '<a href="#add_especificaciones" id="add_especificaciones'+trCount+'" title="Agregar nueva especificaici&oacute;n">+</a>';
                    trr += '</td>';
                    
                    trr += '<td width="80" class="grid1"><input type="text" name="cantidad" value="'+cantidad+'"  style="width:70px;" readOnly="true" ></td>';
                    trr += '<td width="80" class="grid1">';
                    trr += '<select id="unidad_default'+trCount+'" name="unidad_default" >';
                    unidad = unidad.toUpperCase();
                    if(/^KILO*|KILOGRAMO*$/.test(unidad)){
                        trr += '<option value="'+unidad_id+'" name="unidad_id">'+unidad+'</option>';
                        trr += '<option value="0">LITRO</option>';
                        //, unidad_id, densidad
                    }else{
                        trr += '<option value="'+unidad_id+'">'+unidad+'</option>';
                        trr += '<option value="0">KILO</option>';
                    }
                    trr += '</select>';
                    trr += '<input type="hidden" name="densidad" value="'+densidad+'" >';
                    trr += '<input type="hidden" name="unidad_id" value="'+unidad_id+'" >';
                    trr += '</td>';
                trr += '</tr>';
                
                $tabla_productos_orden.append(trr);
                
                //se pone todo en kilos, que es lo que debe de ser por defecto
                $tmp_parent = $tabla_productos_orden.find('#unidad_default'+ trCount).parent().parent();
                $tmp_parent = $(this).parent().parent();
                densidad_tmp = $tmp_parent.find('input[name=densidad]').val();
                text_selected = $tmp_parent.find('select option:selected').text();
                cantidad_default = $tmp_parent.find('input[name=cantidad]');
                $event_changue_umedida(cantidad_default, text_selected, densidad_tmp, 'inicio');
                $event_changue_input_cantidad(cantidad_default);
                
                //al cambiar de unidad de medida, realiza los calculos de acuerdo a la densidad
                $tabla_productos_orden.find('#unidad_default'+ trCount).change(function() {
                    $tmp_parent = $(this).parent().parent();
                    densidad_tmp = $tmp_parent.find('input[name=densidad]').val();
                    text_selected = $tmp_parent.find('select option:selected').text();
                    cantidad_default = $tmp_parent.find('input[name=cantidad]');
                    $event_changue_umedida(cantidad_default, text_selected, densidad_tmp, 'grid');
                });
                
                
                
                $tabla_productos_orden.find('#ver_especificaciones'+ trCount).bind('click',function(event){
                    event.preventDefault();
                    
                    $tr_parent = $(this).parent().parent();
                    $id_producto = $tr_parent.find('input[name=inv_prod_id]');
                    $subproceso_id = $tr_parent.find('input[name=subproceso_id]');
                    $subproceso = $tr_parent.find('input[name=subproceso]');
                    $especificaciones = $tr_parent.find('input[name=especificaciones]');
                    $id_reg_tmp = $tr_parent.find('input[name=id_reg]');
                    $id_reg_esp = $tr_parent.find('input[name=id_reg_esp]');
                    accion = "edit";
                    //id_reg_esp
                    //id_reg
                    $plugin_especificaciones($id_reg_tmp.val(), $subproceso_id.val(),$id_producto.val(), "s", $especificaciones.val(), accion, $tr_parent, $subproceso, $id_reg_esp.val());
                });
                
                
                $tabla_productos_orden.find('#add_especificaciones'+ trCount).bind('click',function(event){
                    event.preventDefault();
                    
                    $tr_parent = $(this).parent().parent();
                    $id_producto = $tr_parent.find('input[name=inv_prod_id]');
                    $subproceso_id = $tr_parent.find('input[name=subproceso_id]');
                    $subproceso = $tr_parent.find('input[name=subproceso]');
                    $especificaciones = $tr_parent.find('input[name=especificaciones]');
                    $id_reg_tmp = $tr_parent.find('input[name=id_reg]');
                    $id_reg_esp = $tr_parent.find('input[name=id_reg_esp]');
                    
                    accion = "new";
                    
                    $plugin_especificaciones($id_reg_tmp.val(), $subproceso_id.val(),$id_producto.val(), "s", $especificaciones.val(), accion, $tr_parent, $subproceso, "0");
                });
                
                
                /*Para que uestre el subgrid de el detalle de la formula, para este producto*/
                $tabla_productos_orden.find('#ver_detalle'+ trCount).bind('click',function(event){
                    
                    $grid_parent = $(this).parent().parent().parent();
                    $tr_parent = $(this).parent().parent();
                    $id_producto = $tr_parent.find('input[name=inv_prod_id]');
                    $estatus_detalle = $tr_parent.find('input[name=estatus_detalle]');
                    $posicion = $tr_parent.find('input[name=posicion]');
                    $cantidad = $tr_parent.find('input[name=cantidad]');
                    $subproceso_id  = $tr_parent.find('input[name=subproceso_id]');
                    
                    $id_reg_parent  = $tr_parent.find('input[name=id_reg]');
                    $id_reg_esp = $tr_parent.find('input[name=id_reg_esp]');
                    
                    
                    if($estatus_detalle.val() == "0"){
                        $estatus_detalle.val("1");
                        var $id_orden = $('#forma-proordenproduccion-window').find('input[name=id_orden]');
                        var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/detalle_elementos_prod_formula.json';
                        $arreglo = {
                                        'id_orden':$id_orden.val(),
                                        'id_producto':$id_producto.val(),
                                        'id_subproceso':$subproceso_id.val(),
                                        'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                                    }
                        
                        
                        $.post(input_json,$arreglo,function(producto){
                            html_tabla = '<tr>';
                                html_tabla += '<td colspan="8">';
                                    //html_tabla += '<form id="guarda_lotes" action="guarda_lotes.json" method="POST" >';
                                        html_tabla += '<table class="detalle_por_prod" >';
                                            html_tabla += '<header>';
                                                html_tabla += '<td class="grid" width="100">&nbsp;Codigo</td>';
                                                html_tabla += '<td class="grid" width="260">&nbsp;Descripci&oacute;n</td>';
                                                html_tabla += '<td class="grid" width="100">&nbsp;Cantidad</td>';
                                                html_tabla += '<td class="grid" width="100">&nbsp;Adicional</td>';
                                                html_tabla += '<td class="grid" width="300" colspna="2">&nbsp;Lote</td>';
                                            html_tabla += '</header>';
                                        html_tabla += '</table>';
                                        html_tabla += '<div style="overflow:scroll; overflow-x: hidden; overflow-y: auto;  width:910; height: 200px; border:1px solid #C1DAD7 !important;">';
                                            html_tabla += '<table class="detalle_por_prod" >';
                                                html_tabla += '<tbody style="background-color: #FFFFFF;" valign="top" id="detalle_por_prod'+$id_producto.val()+$posicion.val()+'">';
                                                html_tabla += '</tbody>';
                                            html_tabla += '</table>';
                                        html_tabla += '</div>';
                                    //html_tabla += '</form>';
                                html_tabla += '</td>';
                            html_tabla += '</tr>';
                            
                            $tr_parent.after(html_tabla);
                            
                            
                            if(producto['productos'] != null){
                                $id_tabla = '#detalle_por_prod'+$id_producto.val()+$posicion.val();
                                $.each(producto['productos'],function(entryIndex,prod){
                                    //alert(prod['cantidad']+'    '+ prod['sku']);
                                    
                                    if(prod['cantidad_adicional'] == "" || prod['cantidad_adicional'] == "0.0" || prod['cantidad_adicional'] == null){
                                        prod['cantidad_adicional'] = "0";
                                    }
                                    
                                    if(prod['id_reg_det'] == "" || prod['id_reg_det'] == null){
                                        prod['id_reg_det'] = "0";
                                    }
                                    if(prod['num_lote'] == "" || prod['num_lote'] == null){
                                        prod['num_lote'] = " ";
                                    }
                                    //alert(prod['cantidad_adicional']);
                                    prod['cantidad'] = $calcula_cantidad_por_porducto(prod['cantidad'] , $cantidad.val());
                                    //                        function(id_reg, $id_prod, $id_prod_detalle,            $sku,         $descripcion,       $cantidad,          $con_lote,                  clase_tmp,  grid,       cantidad_adicional,             posicion,       subproceso_id, id_reg_parent)
                                    $add_producto_eleemnto_detalle(prod['id'],$id_producto.val(), prod['inv_prod_id'], prod['sku'], prod['descripcion'], prod['cantidad'], prod['requiere_numero_lote'], $id_tabla, $grid_parent, prod['cantidad_adicional'], $posicion.val(), $subproceso_id.val(), $id_reg_parent.val(),prod['num_lote'], prod['id_reg_det'] );
                                });
                                
                                
                                $tmp_tr = $grid_parent.find($id_tabla);
                                var trCount = $("tr", $tmp_tr).size();
                                
                                tmp_html = '<tr>';
                                    tmp_html += '<td width="560" class="grid1" align="center" colspan="4">&nbsp;';
                                    tmp_html += '</td>';
                                    tmp_html += '<td width="300" class="grid1" >';
                                        tmp_html += '<INPUT TYPE="button" id="guardar_detalle_prod'+trCount+'" name="guardar_detalle_prod" value="Guardar" style="height:20px;" class="confirmar">&nbsp;&nbsp;&nbsp;&nbsp;';
                                    tmp_html += '</td>';
                                    
                                tmp_html += '</tr>';
                                
                                $tmp_tr.append(tmp_html);
                                
                                
                                $tmp_tr.find('#guardar_detalle_prod'+trCount).click(function(event){
                                    event.preventDefault();
                                    
                                    $guardar_detalle_prod = $(this).parent().parent().parent().find('input[name=guardar_detalle_prod]');
                                    
                                    if( $guardar_detalle_prod != null ){
                                        var $id_orden = $('#forma-proordenproduccion-window').find('input[name=id_orden]');
                                        var $tipoorden = $('#forma-proordenproduccion-window').find('input[name=tipoorden]');
                                        var $fecha_elavorar = $('#forma-proordenproduccion-window').find('input[name=fecha_elavorar]');
                                        
                                        var $command_selected = $('#forma-proordenproduccion-window').find('input[name=command_selected]');
                                        var $proceso_flujo_id = $('#forma-proordenproduccion-window').find('input[name=proceso_flujo_id]');
                                        var $observaciones = $('#forma-proordenproduccion-window').find('textarea[name=observaciones]');
                                        
                                        $command_selected.val(3);
                                        
                                        //alert($(this).parent().parent().parent().parent().parent().html());
                                        
                                        table_producto = $(this).parent().parent().parent().parent().parent();
                                        
                                        $id_prod = table_producto.find('input[name=inv_prod_id_elemento]');
                                        $id_prod_detalle = table_producto.find('input[name=id_prod_detalle]');
                                        $posicion_detalle = table_producto.find('input[name=posicion]');
                                        $subproceso_id = table_producto.find('input[name=subproceso_id]');
                                        
                                        //subproceso_id
                                        $id_tabla = '#detalle_por_prod'+$id_prod.val()+$posicion_detalle.val();
                                        
                                        table_producto_detalle = table_producto.find($id_tabla);
                                        //detalle_por_prod3602
                                        
                                        
                                        lotes_completos = 1;
                                        cadena_pos = "";
                                        table_producto_detalle.find('tr').each(function(){
                                            
                                            eliminar_tmp = $(this).find('input[name=eliminar]').val();
                                            id_reg_tmp = $(this).find('input[name=id_reg]').val();
                                            id_reg_parent = $(this).find('input[name=id_reg_parent]').val();
                                            inv_prod_id_elemento_tmp = $(this).find('input[name=inv_prod_id_elemento]').val();
                                            id_prod_detalle_tmp = $(this).find('input[name=id_prod_detalle]').val();
                                            cantidad_elemento_tmp = $(this).find('input[name=cantidad_elemento]').val();
                                            cantidad_adicional_tmp = $(this).find('input[name=cantidad_adicional]').val();
                                            lote_tmp = $(this).find('input[name=lote]').val();
                                            id_reg_det = $(this).find('input[name=id_reg_det]').val();
                                            
                                            //1___0___1483___12___d3da21c7-c4ba-49be-a241-9529336c5e75&&&1___0___158___0___2471c2a0-f253-4504-9bca-b7f843a5c72d&&&1___0___148___0___f84b5f6c-6cd4-45cb-a404-b532527f60e2&&&1___0___147___0___ &&&1___0___191___0___ &&&1___0___151___0___ &&&1___0___1493___0___ &&&1___0___1397___0___ &&&1___0___1390___0___ &&&1___0___374___0___ &&&1___0___378___0___ &&&1___0___1180___0___ &&&1___0___149___0___ &&&1___0___150___0___ &&&1___0___91___0___ &&&1___0___160___0___ &&&1___0___127___0___ &&&1___0___1483___0___ 
                                            
                                            if(eliminar_tmp != null && lote_tmp != null){
                                                if(lote_tmp == "" || lote_tmp == " " ){
                                                    lotes_completos = 0;
                                                }
                                                
                                                cadena_pos += eliminar_tmp+"___"+id_reg_tmp+"___"+id_prod_detalle_tmp+"___"+
                                                    cantidad_elemento_tmp+"___"+cantidad_adicional_tmp+"___"+lote_tmp+"___"+
                                                    inv_prod_id_elemento_tmp+"___"+id_reg_parent+"___"+$subproceso_id.val()+"___"+id_reg_det+"$$$$";
                                            }
                                            
                                        });
                                        
                                        cadena_pos = cadena_pos.substring(0, (cadena_pos.length - 4 ));
                                        
                                        //if(lotes_completos == 1){
                                            
                                        
                                            jConfirm('Desea guardar los cambios ?', 'Dialogo de Confirmacion', function(r) {
                                                // If they confirmed, manually trigger a form submission
                                                if (r){
                                                    
                                                    var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/guarda_lotes.json';
                                                    $arreglo = {
                                                                'id':$id_orden.val(),
                                                                'id_prod':$id_prod.val(),
                                                                'tipoorden':3,
                                                                'id_subproceso':$subproceso_id.val(),
                                                                'cadena':cadena_pos,
                                                                'command_selected':$command_selected.val() ,
                                                                'observaciones': $observaciones.val(),
                                                                'fecha_elavorar':$fecha_elavorar.val(),
                                                                'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                                                                }
                                                       
                                                    $.post(input_json,$arreglo,function(data){
                                                        if(data['success'] == "true"){
                                                            var remove = function() {$(this).remove();};
                                                            $('#forma-proordenproduccion-overlay').fadeOut(remove);
                                                            jAlert("Lotes registrados", 'Atencion!');
                                                        }else{
                                                            jAlert("Error al registrar los lotes", 'Atencion!');
                                                        }
                                                    });
                                                    
                                                    return true;
                                                }else{
                                                    return false;
                                                }
                                            });
                                            /*
                                         }else{
                                             jAlert("Ingrese todos los lotes", 'Atencion!');
                                         }
                                        */
                                        
                                    }
                                    //alert(alert($(this).parent().parent().parent().parent().parent().parent().parent().html()));
                                });
                                
                            }
                        },"json");
                        
                    }else{
                        
                        $id_tabla = '#detalle_por_prod'+$id_producto.val()+$posicion.val();
                        $table_pos_pros = $grid_parent.find($id_tabla).parent().parent().parent().parent();
                        if($estatus_detalle.val() == "1"){
                            $estatus_detalle.val("2");
                            $table_pos_pros.hide();
                        }else{
                            $estatus_detalle.val("1");
                            $table_pos_pros.show();
                        }
                    }
                    
                });
        }
        
        
                                //prod['id'],$id_producto.val(), prod['inv_prod_id'], prod['sku'], prod['cantidad'], p $id_tabla, $grid_parent, prod['cantidad_adicional'], $posicion.val(), $subproceso_id.val(), $id_reg_parent.val(),prod['num_lote'], prod['id_reg_det'] );
        //para ver la lista de productos de que esta formulado el producto
                                                 //prod['id'],
                                                 //$id_producto.val(), 
                                                 //prod['inv_prod_id'], prod['sku'], prod['descripcion'], prod['cantidad'], prod $id_tabla, $grid_parent, prod['cant $posicion$subproceso_id.$id_reg_parent.val(),prod['num_lote'], prod['id_reg_det'] 
        $add_producto_eleemnto_detalle = function(id_reg, $id_prod, $id_prod_detalle, $sku, $descripcion, $cantidad, $con_lote, clase_tmp, grid, cantidad_adicional, posicion, subproceso_id, id_reg_parent, num_lote, id_reg_det){
            
            $tmp_tr = grid.find(clase_tmp);
            var trCount = $("tr", $tmp_tr).size();
            trCount++;
            
            tmp_html = '<tr>';
                tmp_html += '<td width="100" class="grid1" align="center" >';
                    tmp_html += '<input type="hidden" id="id_reg_parent" name="id_reg_parent" value="'+id_reg_parent+'">';
                    tmp_html += '<input type="hidden" id="id_reg" name="id_reg" value="'+id_reg+'">';
                    tmp_html += '<input type="hidden" id="id_reg_det" name="id_reg_det" value="'+id_reg_det+'">';
                    tmp_html += '<input type="hidden" id="delete" name="eliminar" value="1">';
                    tmp_html += '<input type="hidden" id="inv_prod_id_elemento" name="inv_prod_id_elemento" value="'+$id_prod +'">';
                    tmp_html += '<input type="hidden" id="subproceso_id" name="subproceso_id" value="'+subproceso_id +'">';
                    tmp_html += '<input type="hidden" id="id_prod_detalle" name="id_prod_detalle" value="'+$id_prod_detalle +'">';
                    tmp_html += '<input type="hidden" id="posicion" name="posicion" value="'+posicion +'">';
                    tmp_html += '<input type="hidden" name="sku" value="'+$sku+'"  class="borde_oculto" style="width:70px;" readOnly="true" >';
                    tmp_html += '<a href="#buscar_contratipo" id="buscar_contratipo'+trCount+'">';
                    tmp_html += $sku;
                    tmp_html += '</a>';
                    
                tmp_html += '</td>';
                
                tmp_html += '<td width="260" class="grid1">';
                    tmp_html += '<input type="text" name="sku" value="'+$descripcion+'"  class="borde_oculto" style="width:250px;" readOnly="true" >';
                tmp_html += '</td>';
                tmp_html += '<td width="100" class="grid1">';
                    tmp_html += '<input type="text" name="cantidad_elemento" value="'+$cantidad+'"  class="borde_oculto" style="width:70px;" readOnly="true" >';
                tmp_html += '</td>';
                tmp_html += '<td width="100" class="grid1">';
                    tmp_html += '<input type="text" id="cantidad_adicional'+trCount+'" name="cantidad_adicional" value="'+cantidad_adicional+'"  style="width:70px;" readOnly="true">';
                tmp_html += '</td>';
                
                if(num_lote == " " || num_lote == ""){
                    tmp_html += '<td width="300" class="grid1">';
                        tmp_html += '<input type="text" name="lote" id="lote'+trCount+'" value="'+num_lote+'"  style="width:280px;">';
                        tmp_html += '<a href="#add_lote" id="add_lote'+trCount+'">+</a>';
                    tmp_html += '</td>';
                }else{
                    tmp_html += '<td width="300" class="grid1" colspan="2">';
                        tmp_html += '<input type="text" name="lote" id="lote'+trCount+'" value="'+num_lote+'"  style="width:280px;" readOnly="true">';
                        tmp_html += '<a href="#add_lote" id="add_lote'+trCount+'">+</a>';
                    tmp_html += '</td>';
                }
                
            tmp_html += '</tr>';
            
            $tmp_tr.append(tmp_html);
            
            
            $aplicar_evento_focus_input_lote($tmp_tr.find('#lote'+ trCount ));
            $aplicar_evento_blur_input_lote($tmp_tr.find('#lote'+ trCount ));
            $aplicar_evento_keypress_input_lote($tmp_tr.find('#lote'+ trCount ));
            $aplicar_evento_click_input_lote($tmp_tr.find('#lote'+ trCount ));
            
            $aplicar_evento_keypress($tmp_tr.find('#cantidad_adicional'+ trCount));
            //$tmp_tr.find('#lote'+trCount).click(function(event){
            //  
            //});
            
            $tmp_tr.find('#buscar_contratipo'+trCount).click(function(event){
                event.preventDefault();
                
                /*Codigo para el plugIn*/
                //limpiar_campos_grids();
		$(this).modalPanel_Buscacontratipo();
		var $dialogoc =  $('#forma-buscacontratipo-window');
		//var $dialogoc.prependTo('#forma-buscaproduct-window');
		$dialogoc.append($('div.buscador_buscacontratipo').find('table.formaBusqueda_buscacontratipo').clone());
		
		$('#forma-buscacontratipo-window').css({"margin-left": -200, 	"margin-top": -200});
		
		var $tabla_resultados = $('#forma-buscacontratipo-window').find('#tabla_resultado');
		
		var $campo_sku = $('#forma-buscacontratipo-window').find('input[name=campo_sku]');
		var $select_tipo_contratipo = $('#forma-buscacontratipo-window').find('select[name=tipo_producto]');
		var $campo_descripcion = $('#forma-buscacontratipo-window').find('input[name=campo_descripcion]');
                
		var $buscar_plugin_contratipo = $('#forma-buscacontratipo-window').find('#busca_producto_modalbox');
		var $cancelar_plugin_busca_contratipo = $('#forma-buscacontratipo-window').find('#cencela');
		
                $this_tr = $(this).parent().parent();
                
                
                var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_buscador_equivalentes.json';
                $arreglo = {'id_prod':$this_tr.find('#id_prod_detalle').val(),
                    'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                }
                
                //elimina contratipos de el grid que los muestra si esque los tiene.
                $tabla_resultados.children().remove();
                $.post(input_json,$arreglo,function(entry){
                    $.each(entry['equivalentes'],function(entryIndex,producto){
                        trr = '<tr>';
                            trr += '<td width="120">';
                                    trr += '<span class="sku_prod_buscador">'+producto['sku']+'</span>';
                                    trr += '<input type="hidden" id="id_prod_buscador" value="'+producto['id']+'">';
                            trr += '</td>';
                            trr += '<td width="280"><span class="titulo_prod_buscador">'+producto['descripcion']+'</span></td>';
                            trr += '<td width="90"><span class="unidad_prod_buscador">'+producto['unidad']+'</span></td>';
                            trr += '<td width="90"><span class="tipo_prod_buscador">'+producto['tipo']+'</span></td>';
                        trr += '</tr>';
                        $tabla_resultados.append(trr);
                        
                        $tabla_resultados.find('tr').click(function(){
                            
                            var id_prod=$(this).find('#id_prod_buscador').val();
                            var codigo=$(this).find('span.sku_prod_buscador').html();
                            var descripcion=$(this).find('span.titulo_prod_buscador').html();
                            var producto=$(this).find('span.tipo_prod_buscador').html();
                            var unidad=$(this).find('span.unidad_prod_buscador').html();
                            
                        });
                        
                    });
                });
                
                
                
                
                $cancelar_plugin_busca_contratipo.click(function(event){
                    //event.preventDefault();
                    var remove = function() {$(this).remove();};
                    $('#forma-buscacontratipo-overlay').fadeOut(remove);
		});
                
                
            });
            
            $tmp_tr.find('#add_lote'+trCount).click(function(event){
                event.preventDefault();
                
                $tmp_this_tr = $(this).parent().parent();
                
                //$id_producto.val()+$posicion.val()
                
                id_reg_parent = $tmp_this_tr.find('input[name=id_reg_parent]').val();
                id_reg = $tmp_this_tr.find('input[name=id_reg]').val();
                
                inv_prod_id_elemento = $tmp_this_tr.find('input[name=inv_prod_id_elemento]').val();
                posicion = $tmp_this_tr.find('input[name=posicion]').val();
                id_prod_detalle = $tmp_this_tr.find('input[name=id_prod_detalle]').val();
                cantidad_elemento = $tmp_this_tr.find('input[name=cantidad_elemento]').val();
                cantidad_elemento = 0;
                cantidad_adicional = $tmp_this_tr.find('input[name=cantidad_adicional]').val();
                id_subproceso = $tmp_this_tr.find('input[name=subproceso_id]').val();
                
                $tmp_this_tbody = $(this).parent().parent().parent().parent().find('#detalle_por_prod'+inv_prod_id_elemento+posicion);
                
                
                var trCount = $("tr", $tmp_this_tbody).size();
                trCount++;
                
                
                tmp_html = '<tr>';
                tmp_html += '<td width="100" class="grid1" align="center" colspan="2" >';
                    tmp_html += '<input type="hidden" id="id_reg_parent" name="id_reg_parent" value="'+id_reg_parent+'">';
                    tmp_html += '<input type="hidden" id="id_reg" name="id_reg" value="'+id_reg+'">';
                    tmp_html += '<input type="hidden" id="id_reg_det" name="id_reg_det" value="0">';
                    tmp_html += '<input type="hidden" id="delete" name="eliminar" value="1">';
                    tmp_html += '<input type="hidden" id="subproceso_id" name="subproceso_id" value="'+id_subproceso +'">';
                    tmp_html += '<input type="hidden" id="inv_prod_id_elemento" name="inv_prod_id_elemento" value="'+$id_prod +'">';
                    tmp_html += '<input type="hidden" id="id_prod_detalle" name="id_prod_detalle" value="'+$id_prod_detalle +'">';
                tmp_html += '</td>';
                
                tmp_html += '<td width="100" class="grid1">';
                    tmp_html += '<input type="text" name="cantidad_elemento" value="'+cantidad_elemento+'"  class="borde_oculto" style="width:70px;" readOnly="true" >';
                tmp_html += '</td>';
                tmp_html += '<td width="100" class="grid1">';
                    tmp_html += '<input type="text" name="cantidad_adicional" value="'+cantidad_adicional+'"  style="width:70px;" >';
                tmp_html += '</td>';
                
                tmp_html += '<td width="300" class="grid1">';
                    tmp_html += '<input type="text" name="lote" id="lote'+trCount+'" value=" "  style="width:280px;">';
                    tmp_html += '<a href="#remove_lote'+trCount+'" id="remove_lote'+trCount+'">-</a>';
                tmp_html += '</td>';
                
                tmp_html += '</tr>';
                
                $tmp_this_tr.after(tmp_html);
                
                $aplicar_evento_focus_input_lote($tmp_this_tr.parent().find('#lote'+ trCount ));
                $aplicar_evento_blur_input_lote($tmp_this_tr.parent().find('#lote'+ trCount ));
                $aplicar_evento_keypress_input_lote($tmp_this_tr.parent().find('#lote'+ trCount ));
                $aplicar_evento_click_input_lote($tmp_this_tr.parent().find('#lote'+ trCount ));
                
                $tmp_this_tr.parent().find('#remove_lote'+trCount).click(function(event){
                    event.preventDefault();
                    $(this).parent().parent().find('input[name=eliminar]').val("0");
                    $(this).parent().parent().hide();
                });
                
                
            });
            
            
            /*
             $tr_parent.after(html_tabla);
            //$table_parent
            $tabla_productos_orden.find('#remov_especificacion'+trCount).click(function(event){
                event.preventDefault();
                
                $(this).parent().parent().find('input[name=eliminar]').val("0");
                $(this).parent().parent().find('input[name=especificaciones1]').val("");
                
                $(this).parent().parent().hide();
            });
            
             **/
            //alert($tmp_tr.html());
            
        }
        
        //buscador de de Datos del Lote
	$obtiene_datos_lote = function($tr_padre){
            var numero_lote = $tr_padre.find('input[name=lote]').val();
            var id_producto = $tr_padre.find('input[name=id_prod_detalle]').val();
            var encontrado=0;
            $tabla_padre = $tr_padre.parent();
            
            //buscar el numero de lote en la tabla
            $tabla_padre.find('input[name=lote_int]').each(function (index){
                if($(this).val() == numero_lote ){
                    encontrado++;
                }
            });
            
            //si el numero de lote solo esta una vez es valido, dos veces ya no es valido
            if(parseInt(encontrado)<=1){
                var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getDatosLote.json';
                $arreglo = {'no_lote':numero_lote,
                            'id_producto':id_producto,
                            'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                            };
                            
                $.post(input_json,$arreglo,function(entry){
                    //verifica si el arreglo  retorno datos
                    if (entry['Lote'].length > 0){
                        
                        //crea el tr con los datos del producto seleccionado
                        $.each(entry['Lote'],function(entryIndex,lote){
                            //$tr_padre.find('input[name=lote_int]').val(lote['']);
                            /*
                            $tr_padre.find('input[name=exis_lote]').val(lote['exis_lote']);
                            $tr_padre.find('input[name=pedimento]').val(lote['pedimento']);
                            $tr_padre.find('input[name=caducidad]').val(lote['caducidad']);
                            $tr_padre.find('input[name=cant_sur]').val(lote['exis_lote']);
                            */
                        });//termina llamada json
                        
                    }else{
                        jAlert("El n&uacute;mero de Lote no existe para &eacute;ste producto.", 'Atencion!');
                        $tr_padre.find('input[name=lote]').val(" ");
                        $tr_padre.find('input[name=lote]').select();
                    }
                });
            }else{
                jAlert("El n&uacute;mero de Lote  [ "+numero_lote+" ]  ya se encuentra en la lista.", 'Atencion!');
            }
            
	}//termina buscador de datos del Lote
        
        $opbtiene_datos_producto_por_sku = function($sku){
            
            var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_busca_sku_prod.json';
            $arreglo = {'sku':$sku,
                            'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                        }
            
            $.post(input_json,$arreglo,function(prod){
                var res=0;
                if(prod['Sku'][0] != null){
                    
                    unidad = prod['Sku'][0]['unidad'];
                    unidad_id = prod['Sku'][0]['unidad_id'];
                    densidad = prod['Sku'][0]['densidad'];
                    
                    //                                id, prod_id,              aku,                descripcion,                , persona, maquina,eq_adicional, cantidad , proceso_flujo_id
                    //agrega productos a el grid de formulaciones
                    $add_grid_componente_orden(0,prod['Sku'][0]['id'],prod['Sku'][0]['sku'],prod['Sku'][0]['descripcion'],""       ,""    ,""          , 0, prod['SubProcesos'], 1, unidad, unidad_id, densidad);
                }else{
                    jAlert("El producto que intenta agregar no existe, pruebe ingresando otro.\nHaga clic en Buscar.",'! Atencion');
                }
            },"json");
        }
        
        
        
        //buscador de productos
	$busca_productos = function(tipo_busqueda){
            sku_buscar = "";
                
		//limpiar_campos_grids();
		$(this).modalPanel_Buscaproducto();
		var $dialogoc =  $('#forma-buscaproducto-window');
		//var $dialogoc.prependTo('#forma-buscaproduct-window');
		$dialogoc.append($('div.buscador_productos').find('table.formaBusqueda_productos').clone());
		
		$('#forma-buscaproducto-window').css({"margin-left": -200, 	"margin-top": -200});
		
		var $tabla_resultados = $('#forma-buscaproducto-window').find('#tabla_resultado');
		
		var $campo_sku = $('#forma-buscaproducto-window').find('input[name=campo_sku]');
		var $select_tipo_producto = $('#forma-buscaproducto-window').find('select[name=tipo_producto]');
		var $campo_descripcion = $('#forma-buscaproducto-window').find('input[name=campo_descripcion]');
			
		var $buscar_plugin_producto = $('#forma-buscaproducto-window').find('#busca_producto_modalbox');
		var $cancelar_plugin_busca_producto = $('#forma-buscaproducto-window').find('#cencela');
		
		//funcionalidad botones
		$buscar_plugin_producto.mouseover(function(){
                    $(this).removeClass("onmouseOutBuscar").addClass("onmouseOverBuscar");
		});
		$buscar_plugin_producto.mouseout(function(){
                    $(this).removeClass("onmouseOverBuscar").addClass("onmouseOutBuscar");
		});
		   
		$cancelar_plugin_busca_producto.mouseover(function(){
                    $(this).removeClass("onmouseOutCancelar").addClass("onmouseOverCancelar");
		});
		$cancelar_plugin_busca_producto.mouseout(function(){
                    $(this).removeClass("onmouseOverCancelar").addClass("onmouseOutCancelar");
		});
		
		//buscar todos los tipos de productos
		var input_json_tipos = document.location.protocol + '//' + document.location.host + '/'+controller+'/getProductoTipos.json';
		$arreglo = {'iu':$('#lienzo_recalculable').find('input[name=iu]').val()}
		$.post(input_json_tipos,$arreglo,function(data){
                    
                    //Llena el select tipos de productos en el buscador
                    $select_tipo_producto.children().remove();
                    //<option value="0" selected="yes">[--Seleccionar Tipo--]</option>
                    var prod_tipos_html = '';
                    
                    $.each(data['prodTipos'],function(entryIndex,pt){
                        
                        
                        //para productos para tipo de orden stock
                        if(tipo_busqueda == 2){
                            if(pt['id'] == 2 || pt['id'] == 1 ){
                                prod_tipos_html += '<option value="' + pt['id'] + '"  >' + pt['titulo'] + '</option>';
                            }
                        }
                        
                        //para productos para tipo de orden laboratorio
                        if(tipo_busqueda == 3){
                            if(pt['id'] == 8 ){
                                if(pt['id'] == 8){
                                    prod_tipos_html += '<option value="' + pt['id'] + '" selected="yes">' + pt['titulo'] + '</option>';
                                }else{
                                    prod_tipos_html += '<option value="' + pt['id'] + '"  >' + pt['titulo'] + '</option>';
                                }
                            }
                        }
                        
                    });
                    $select_tipo_producto.append(prod_tipos_html);
		
		$campo_sku.val(sku_buscar);
		
		//click buscar productos
		$buscar_plugin_producto.click(function(event){
			event.preventDefault();
                        
			var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_buscador_productos.json';
			$arreglo = {'sku':$campo_sku.val(),
                                        'tipo':$select_tipo_producto.val(),
                                        'descripcion':$campo_descripcion.val(),
                                        'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                                    }
			var trr = '';
			$tabla_resultados.children().remove();
			$.post(input_json,$arreglo,function(entry){
                            
				$.each(entry['productos'],function(entryIndex,producto){
					trr = '<tr>';
						trr += '<td width="120">';
							trr += '<span class="sku_prod_buscador">'+producto['sku']+'</span>';
							trr += '<input type="hidden" id="id_prod_buscador" value="'+producto['id']+'">';
						trr += '</td>';
						trr += '<td width="280"><span class="titulo_prod_buscador">'+producto['descripcion']+'</span></td>';
						trr += '<td width="90"><span class="unidad_prod_buscador">'+producto['unidad']+'</span></td>';
						trr += '<td width="90"><span class="tipo_prod_buscador">'+producto['tipo']+'</span></td>';
					trr += '</tr>';
					$tabla_resultados.append(trr);
				});
                                
				$colorea_tr_grid($tabla_resultados);
				
                                
				//seleccionar un producto del grid de resultados
				$tabla_resultados.find('tr').click(function(){
                                    var id_prod=$(this).find('#id_prod_buscador').val();
                                    var codigo=$(this).find('span.sku_prod_buscador').html();
                                    var descripcion=$(this).find('span.titulo_prod_buscador').html();
                                    var producto=$(this).find('span.tipo_prod_buscador').html();
                                    var unidad=$(this).find('span.unidad_prod_buscador').html();
                                    
                                    //buscador para los pedidos de tipo, stock y laboratorio
                                    if(tipo_busqueda == 2 || tipo_busqueda == 3){
                                        //asignar a los campos correspondientes el sku y y descripcion
                                        $('#forma-proordenproduccion-window').find('input[name=id_producto_tmp]').val(id_prod);
                                        $('#forma-proordenproduccion-window').find('input[name=sku_tmp]').val(codigo);
                                        $('#forma-proordenproduccion-window').find('input[name=descripcion_tmp]').val(descripcion);
                                    }
                                    
                                    //elimina la ventana de busqueda
                                    var remove = function() {$(this).remove();};
                                    $('#forma-buscaproducto-overlay').fadeOut(remove);
                                    //asignar el enfoque al campo sku del producto
                                });
                            });
			});
                });
		
		//si hay algo en el campo sku al cargar el buscador, ejecuta la busqueda
		if($campo_sku.val() != ''){
			$buscar_plugin_producto.trigger('click');
		}
                
		$cancelar_plugin_busca_producto.click(function(event){
                    //event.preventDefault();
                    var remove = function() {$(this).remove();};
                    $('#forma-buscaproducto-overlay').fadeOut(remove);
		});
                
	}//termina buscador de productos
	
        
        $agrega_esp_en_blanco_grid = function(){
            
            var $tabla_productos_preorden = $('#forma-proordenproduccion-window').find('#grid_productos_seleccionados');
            $tabla_productos_preorden.find('tr').each(function(){
                if($(this).find('#id_reg').val() == ""){
                    $(this).find('#id_reg').val(" ");
                }
                if($(this).find('#inv_prod_id').val() == ""){
                    $(this).find('#id_reg').val(" ");
                }
                
                
                
                if($(this).find('input[name=subproceso_id]').val() == ""){
                    $(this).find('input[name=subproceso_id]').val(" ");
                }
                
                if($(this).find('input[name=pro_subproceso_prod_id]').val() == ""){
                    $(this).find('input[name=pro_subproceso_prod_id]').val(" ");
                }
                
                if($(this).find('input[name=persona]').val() == ""){
                    $(this).find('input[name=persona]').val(" ");
                }
                
                if($(this).find('input[name=equipo]').val() == ""){
                    $(this).find('input[name=equipo]').val(" ");
                }
                
                if($(this).find('input[name=eq_adicional]').val() == ""){
                    $(this).find('input[name=eq_adicional]').val(" ");
                }
                
                if($(this).find('input[name=cantidad]').val() == ""){
                    $(this).find('input[name=cantidad]').val(" ");
                }
                
                
            });
        }
        
        $repaint_header_minigrid = function($estatus){
            var $tabla_productos_header = $('#forma-proordenproduccion-window').find('.subprocesos_seleccionados');
            
            if($estatus == "3"){
                $tabla_productos_header.children().remove();
                
                html_header = '';
                html_header += '<td class="grid" id="td_eliminar" width="61"><div class="delete">&nbsp;#</div></td>';
                html_header += '<td class="grid" width="80">&nbsp;Codigo<td>';
                html_header += '<td class="grid" width="200">&nbsp;Descripci&oacute;n</td>';
                html_header += '<td class="grid" width="100">&nbsp;Subproceso</td>';
                html_header += '<td class="grid" width="100">&nbsp;Lote</td>';
                html_header += '<td class="grid" width="100">&nbsp;Especificaciones</td>';
                html_header += '<td class="grid" width="80">&nbsp;Cantidad</td>';
                html_header += '<td class="grid" width="80">&nbsp;U. Medida</td>';
                
                $tabla_productos_header.append(html_header);
                
            }
        }
        
        
        $ocullta_de_acuerdo_a_el_tipo_y_estatus = function($tipo, estatus){
            
            //tipos de preorden
            var $preorden_tipo_pedido = $('#forma-proordenproduccion-window').find('.tipo_pedido');
            var tipo_stock_laboratorio = $('#forma-proordenproduccion-window').find('.tipo_stock_laboratorio'); 

            //href para buscar producto
            var $buscar_producto = $('#forma-proordenproduccion-window').find('a[href*=busca_producto]');
            var $agregar_producto = $('#forma-proordenproduccion-window').find('a[href*=agregar_producto]');
            //href para agregar producto al grid

            var $cancelar_proceso = $('#forma-proordenproduccion-window').find('#cancela_entrada');

            var $cerrar_plugin = $('#forma-proordenproduccion-window').find('#close');
            var $cancelar_plugin = $('#forma-proordenproduccion-window').find('#boton_cancelar');
            var $submit_actualizar = $('#forma-proordenproduccion-window').find('#submit');

            var $botones_confirmacion = $('#forma-proordenproduccion-window').find('.botones_confirmacion');
            var $confirmar_programacion = $('#forma-proordenproduccion-window').find('#confirmar_programacion');
            var $confirmar_enviar_produccion = $('#forma-proordenproduccion-window').find('#confirmar_enviar_produccion');
            var $confirmar_terminada = $('#forma-proordenproduccion-window').find('#confirmar_terminada');
            var $cancelar_orden = $('#forma-proordenproduccion-window').find('#cancelar_orden');
            var $pdf_orden = $('#forma-proordenproduccion-window').find('#pdf_orden');
            var $pdf_requisicion = $('#forma-proordenproduccion-window').find('#pdf_requisicion');
            
            $botones_confirmacion.show();
            $confirmar_programacion.hide();
            $confirmar_enviar_produccion.hide();
            $confirmar_terminada.hide();
            $cancelar_orden.hide();
            $pdf_orden.hide();
            $pdf_requisicion.hide();
            
            $('#forma-proordenproduccion-window').find('.proordenproduccion_div_one').css({'height':'445px'});
            if(estatus == "1"){
                $submit_actualizar.show();
                $confirmar_programacion.show();
                $confirmar_enviar_produccion.hide();
                $confirmar_terminada.hide();
                $cancelar_orden.show();
                $pdf_requisicion.hide();
                
                if($tipo == 1){
                    $preorden_tipo_pedido.hide();
                    tipo_stock_laboratorio.hide();
                    $buscar_producto.hide();
                    $cancelar_proceso.hide();
                    
                    $('#forma-proordenproduccion-window').find('.proordenproduccion_div_one').css({'height':'445px'});
                }
                
                if($tipo == 2){
                    $preorden_tipo_pedido.hide();
                    tipo_stock_laboratorio.show();
                    $buscar_producto.show();
                    $agregar_producto.show();
                    $('#forma-proordenproduccion-window').find('.proordenproduccion_div_one').css({'height':'480px'});
                }
                
                if($tipo == 3){
                    $preorden_tipo_pedido.hide();
                    tipo_stock_laboratorio.show();
                    $buscar_producto.show();
                    $agregar_producto.show();
                    $('#forma-proordenproduccion-window').find('.proordenproduccion_div_one').css({'height':'480px'});
                }
            }
            
            if(estatus == "2"){
                $submit_actualizar.hide();
                $confirmar_programacion.show();
                $confirmar_enviar_produccion.show();
                $confirmar_terminada.hide();
                $cancelar_orden.show();
                $pdf_orden.hide();
                
                $preorden_tipo_pedido.hide();
                tipo_stock_laboratorio.hide();
                $buscar_producto.hide();
                $cancelar_proceso.hide();
                $pdf_requisicion.hide();
            }
            
            if(estatus == "3"){
                $submit_actualizar.hide();
                $confirmar_programacion.hide();
                $confirmar_enviar_produccion.show();
                $confirmar_terminada.show();
                $cancelar_orden.hide();
                $pdf_orden.show();
                $pdf_requisicion.show();
                
                $preorden_tipo_pedido.hide();
                tipo_stock_laboratorio.hide();
                $buscar_producto.hide();
                $cancelar_proceso.hide();
                
                $repaint_header_minigrid(estatus);
            }
            
            if(estatus == "4"){
                $submit_actualizar.hide();
                $confirmar_programacion.hide();
                $confirmar_enviar_produccion.hide();
                $confirmar_terminada.hide();
                $cancelar_orden.hide();
                $pdf_orden.show();
                $pdf_requisicion.hide();
                
                $preorden_tipo_pedido.hide();
                tipo_stock_laboratorio.hide();
                $buscar_producto.hide();
                $cancelar_proceso.hide();
            }
            
            if(estatus == "5"){
                $submit_actualizar.hide();
                $confirmar_programacion.hide();
                $confirmar_enviar_produccion.hide();
                $confirmar_terminada.hide();
                $cancelar_orden.hide();
                $pdf_orden.hide();
                $pdf_requisicion.hide();
                
                $preorden_tipo_pedido.hide();
                tipo_stock_laboratorio.hide();
                $buscar_producto.hide();
                $cancelar_proceso.hide();
            }
            
        }
        
	//nueva entrada
	$new_orden.click(function(event){
            
            event.preventDefault();
            var id_to_show = 0;
            
            $(this).modalPanel_ProOrdenProduccion();
            
            var form_to_show = 'formaProOrdenProduccion00';
            $('#' + form_to_show).each (function(){this.reset();});
            var $forma_selected = $('#' + form_to_show).clone();
            $forma_selected.attr({id : form_to_show + id_to_show});
            
            $('#forma-proordenproduccion-window').css({"margin-left": -375, "margin-top": -230});
            
            $forma_selected.prependTo('#forma-proordenproduccion-window');
            $forma_selected.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
            
            $tabs_li_funxionalidad();
            
            var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_datos_orden.json';
            $arreglo = {'id_orden':id_to_show,
                            'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                        };
                        
            var $command_selected = $('#forma-proordenproduccion-window').find('input[name=command_selected]');
            var $id_orden = $('#forma-proordenproduccion-window').find('input[name=id_orden]');
            var $proceso_flujo_id = $('#forma-proordenproduccion-window').find('input[name=proceso_flujo_id]');
            var $select_tipoorden = $('#forma-proordenproduccion-window').find('select[name=tipoorden]');
            var $fecha_elavorar = $('#forma-proordenproduccion-window').find('input[name=fecha_elavorar]');
            var $observaciones = $('#forma-proordenproduccion-window').find('textarea[name=observaciones]');
            
            
            //
            var $titprod_tmp = $('#forma-proordenproduccion-window').find('input[name=titprod_tmp]');
            var $sku_tmp = $('#forma-proordenproduccion-window').find('input[name=sku_tmp]');
            var $id_producto_tmp = $('#forma-proordenproduccion-window').find('input[name=id_producto_tmp]');
            var $descripcion_tmp = $('#forma-proordenproduccion-window').find('input[name=descripcion_tmp]');
            
            //grids detalle pedido
            var $tabla_productos_preorden = $('#forma-proordenproduccion-window').find('#grid_productos_seleccionados');
            
            //tipos de preorden
            var $preorden_tipo_pedido = $('#forma-proordenproduccion-window').find('.tipo_pedido');
            var tipo_stock_laboratorio = $('#forma-proordenproduccion-window').find('.tipo_stock_laboratorio'); 
            
            //href para buscar producto
            var $buscar_producto = $('#forma-proordenproduccion-window').find('a[href*=busca_producto]');
            var $agregar_producto = $('#forma-proordenproduccion-window').find('a[href*=agregar_producto]');
            //href para agregar producto al grid
            
            var $cancelar_proceso = $('#forma-proordenproduccion-window').find('#cancela_entrada');
            
            var $cerrar_plugin = $('#forma-proordenproduccion-window').find('#close');
            var $cancelar_plugin = $('#forma-proordenproduccion-window').find('#boton_cancelar');
            var $submit_actualizar = $('#forma-proordenproduccion-window').find('#submit');
            
            var $botones_confirmacion = $('#forma-proordenproduccion-window').find('.botones_confirmacion');
            var $confirmar_programacion = $('#forma-proordenproduccion-window').find('#confirmar_programacion');
            var $confirmar_enviar_produccion = $('#forma-proordenproduccion-window').find('#confirmar_enviar_produccion');
            var $confirmar_terminada = $('#forma-proordenproduccion-window').find('#confirmar_terminada');
            var $cancelar_orden = $('#forma-proordenproduccion-window').find('#cancelar_orden');
            
            var $pdf_orden = $('#forma-proordenproduccion-window').find('#pdf_orden');
            var $pdf_requisicion = $('#forma-proordenproduccion-window').find('#pdf_requisicion');
            
            $command_selected.val("new");
            $id_orden.val(0);
                
                $botones_confirmacion.hide();
                $confirmar_programacion.hide();
                $confirmar_enviar_produccion.hide();
                $confirmar_terminada.hide();
                $cancelar_orden.hide();
                $pdf_orden.hide();
                $pdf_requisicion.hide();
                $proceso_flujo_id.val("1");
                //mostrarFecha() // por si se quiere agregar la fecha actual
                $add_calendar($fecha_elavorar, " ", ">=");
		
		var respuestaProcesada = function(data){
                    if ( data['success'] == "true" ){
                        jAlert("Los cambios se guardaron con exito", 'Atencion!');
                        var remove = function() {$(this).remove();};
                        $('#forma-proordenproduccion-overlay').fadeOut(remove);
                        $get_datos_grid();
                    }else{
                        
                        // Desaparece todas las interrogaciones si es que existen
                        $('#forma-proordenproduccion-window').find('div.interrogacion').css({'display':'none'});
                        $tabla_productos_preorden.find('input[name=persona]').css({'background' : '#ffffff'});
                        $tabla_productos_preorden.find('input[name=equipo]').css({'background' : '#ffffff'});
                        $tabla_productos_preorden.find('input[name=eq_adicional]').css({'background' : '#ffffff'});
                        $tabla_productos_preorden.find('input[name=cantidad]').css({'background' : '#ffffff'});
                        
                        $('#forma-proordenproduccion-window').find('.proordenproduccion_div_one').css({'height':'548px'});//con errores
                        $('#forma-proordenproduccion-window').find('#div_warning_grid').css({'display':'none'});
                        $('#forma-proordenproduccion-window').find('#div_warning_grid').find('#grid_warning').children().remove();
                        
                        
                        var valor = data['success'].split('___');
                        //muestra las interrogaciones
                        for (var element in valor){
                            tmp = data['success'].split('___')[element];
                            longitud = tmp.split(':');
                            
                            if( longitud.length > 1 ){
                                
                                $('#forma-proordenproduccion-window').find('img[rel=warning_' + tmp.split(':')[0] + ']')
                                .parent()
                                .css({'display':'block'})
                                .easyTooltip({tooltipId: "easyTooltip2",content: tmp.split(':')[1]});

                                //alert(tmp.split(':')[0]);

                                if(parseInt($("tr", $tabla_productos_preorden).size())>0){
                                    for (var i=1;i<=parseInt($("tr", $tabla_productos_preorden).size());i++){
                                        if((tmp.split(':')[0]=='cantidad'+i) || (tmp.split(':')[0]=='apoerario'+i) || (tmp.split(':')[0]=='equipo'+i) || (tmp.split(':')[0]=='equipo_adicional'+i)){
                                            
                                            $('#forma-proordenproduccion-window').find('#div_warning_grid').css({'display':'block'});
                                            //$grid_productos.find('input[name=' + tmp.split(':')[0] + ']').css({'background' : '#d41000'});
                                            
                                            if(tmp.split(':')[0].substring(0, 8) == 'cantidad'){
                                                    $tabla_productos_preorden.find('input[name=cantidad]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
                                            }
                                            
                                            if(tmp.split(':')[0].substring(0, 5) == 'apoerario'){
                                                    $tabla_productos_preorden.find('input[name=costo]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
                                            }
                                            
                                            if(tmp.split(':')[0].substring(0, 9) == 'equipo'){
                                                    $tabla_productos_preorden.find('input[name=caducidad]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
                                            }
                                            
                                            if(tmp.split(':')[0].substring(0, 9) == 'equipo_adicional'){
                                                    $tabla_productos_preorden.find('input[name=caducidad]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
                                            }
                                            
                                            
                                            var tr_warning = '<tr>';
                                                tr_warning += '<td width="20"><div><IMG SRC="../../img/icono_advertencia.png" ALIGN="top" rel="warning_sku"></td>';
                                                tr_warning += '<td width="120"><INPUT TYPE="text" value="' + $tabla_productos_preorden.find('input[name=sku' + i + ']').val() + '" class="borde_oculto" readOnly="true" style="width:95px; color:red"></td>';
                                                tr_warning += '<td width="200"><INPUT TYPE="text" value="' + $tabla_productos_preorden.find('input[name=descripcion' + i + ']').val() + '" class="borde_oculto" readOnly="true" style="width:205px; color:red"></td>';
                                                tr_warning += '<td width="235"><INPUT TYPE="text" value="'+  tmp.split(':')[1] +'" class="borde_oculto" readOnly="true" style="width:285px; color:red"></td>';
                                                tr_warning += '</tr>';
                                            
                                            $('#forma-proordenproduccion-window').find('#div_warning_grid').find('#grid_warning').append(tr_warning);
                                        }
                                        
                                    }
                                }
                            }
                        }
                        $('#forma-proconfigproduccion-window').find('#div_warning_grid').find('#grid_warning').find('tr:odd').find('td').css({'background-color' : '#FFFFFF'});
                        $('#forma-proconfigproduccion-window').find('#div_warning_grid').find('#grid_warning').find('tr:even').find('td').css({'background-color' : '#e7e8ea'});

                    }
                }
		
		var options = {dataType :  'json', success : respuestaProcesada};
		$forma_selected.ajaxForm(options);
		
                
		//$.getJSON(json_string,function(entry){
                $.post(input_json,$arreglo,function(entry){
                    
                    
                    $select_tipoorden.children().remove();
                    var orden_tipos_html = '<option value="0" selected="yes">[-- --]</option>';
                    $.each(entry['ordenTipos'],function(entryIndex,pt){
                        pt['titulo']=pt['titulo'].toUpperCase();
                        if(!/^[PEDIDO]*$/.test(pt['titulo'])){
                            orden_tipos_html += '<option value="' + pt['id'] + '"  >' + pt['titulo'] + '</option>';
                        }
                    });
                    $select_tipoorden.append(orden_tipos_html);
                    
                    
                    $select_tipoorden.change(function(){
                        tipo_preorden = $select_tipoorden.val();
                        
                        if(tipo_preorden == 0){
                            $preorden_tipo_pedido.hide();
                            tipo_stock_laboratorio.hide();
                            $('#forma-proordenproduccion-window').find('.proordenproduccion_div_one').css({'height':'420px'});
                        }
                        
                        if(tipo_preorden == 1){
                            $preorden_tipo_pedido.hide();
                            tipo_stock_laboratorio.hide();
                            $('#forma-proordenproduccion-window').find('.proordenproduccion_div_one').css({'height':'535px'});
                        }
                        
                        if(tipo_preorden == 2){
                            $preorden_tipo_pedido.hide();
                            tipo_stock_laboratorio.show();
                            $('#forma-proordenproduccion-window').find('.proordenproduccion_div_one').css({'height':'450px'});
                        }
                        
                        if(tipo_preorden == 3){
                            $preorden_tipo_pedido.hide();
                            tipo_stock_laboratorio.show();
                            $('#forma-proordenproduccion-window').find('.proordenproduccion_div_one').css({'height':'450px'});
                        }
                        
                        
                    });
                    
                },"json");//termina llamada json
		
                $buscar_producto.click(function(event){
                    event.preventDefault();
                    tipo_preorden = $select_tipoorden.val();
                    
                    //para  Stock
                    if(tipo_preorden == 2){
                        $busca_productos(2);
                    }
                    
                    //para tipo labnoratorio
                    if(tipo_preorden == 3){
                        $busca_productos(3);
                    }
                    
                });
                
                $agregar_producto.click(function(event){
                    event.preventDefault();
                    if(/^[A-Za-z0-9]*$/.test($sku_tmp.val())){
                        $opbtiene_datos_producto_por_sku($sku_tmp.val());
                    }else{
                        jAlert("Agregue un c&oacute;digo", 'Atencion!');
                    }
                });
                
                //desencadena clic del href Agregar producto al pulsar enter en el campo sku del producto
		$sku_tmp.keypress(function(e){
                    if(e.which == 13){
                        $agregar_producto.trigger('click');
                        return false;
                    }
		});
		
                
		//cerrar plugin
		$cerrar_plugin.bind('click',function(){
                    var remove = function() {$(this).remove();};
                    $('#forma-proordenproduccion-overlay').fadeOut(remove);
		});
		
		//boton cancelar y cerrar plugin
		$cancelar_plugin.click(function(event){
                    var remove = function() {$(this).remove();};
                    $('#forma-proordenproduccion-overlay').fadeOut(remove);
		});
                
                $submit_actualizar.bind('click',function(){
                    $command_selected.val("1");
                    $agrega_esp_en_blanco_grid();
                    var trCount = $("tr", $tabla_productos_preorden).size();
                    if(trCount > 0){
                        jConfirm('Desea guardar los cambios ?', 'Dialogo de Confirmacion', function(r) {
                            // If they confirmed, manually trigger a form submission
                            if (r) $submit_actualizar.parents("FORM").submit();
                        });
                    }else{
                        jAlert("Es necesario agregar productos.", 'Atencion!');
                    }
                    // Always return false here since we don't know what jConfirm is going to do
                    return false;
                });
                
	});
	
	
	
	var carga_formaProConfigproduccion0000_for_datagrid00 = function(id_to_show, accion_mode){
		//aqui entra para eliminar una entrada
            if(accion_mode == 'cancel'){
			var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/' + 'logicDelete.json';
			$arreglo = {'no_entrada':id_to_show,
                            'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                            };
                    jConfirm('Realmente desea eliminar el proceso seleccionado?', 'Dialogo de confirmacion', function(r) {
                        if (r){
                            $.post(input_json,$arreglo,function(entry){
                                if ( entry['success'] == '1' ){
                                    jAlert("El proceso fue eliminado exitosamente", 'Atencion!');
                                    $get_datos_grid();
                                }
                                else{
                                    jAlert("El proceso no pudo ser eliminado", 'Atencion!');
                                }
                            },"json");
                        }
                    });
                }else{
                        //aqui  entra para editar un registro
                        $(this).modalPanel_ProOrdenProduccion();
                        
                        var form_to_show = 'formaProOrdenProduccion00';
                        $('#' + form_to_show).each (function(){this.reset();});
                        var $forma_selected = $('#' + form_to_show).clone();
                        $forma_selected.attr({id : form_to_show + id_to_show});
                        
                        $('#forma-proordenproduccion-window').css({"margin-left": -375, "margin-top": -230});
                        
                        $forma_selected.prependTo('#forma-proordenproduccion-window');
                        $forma_selected.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
                        
                        $tabs_li_funxionalidad();
                        
			//alert(id_to_show);
			
			if(accion_mode == 'edit'){
                                
                                var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_datos_orden.json';
                                $arreglo = {'id_orden':id_to_show,
                                                'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                                            };
                                            
                                var $command_selected = $('#forma-proordenproduccion-window').find('input[name=command_selected]');
                                var $id_orden = $('#forma-proordenproduccion-window').find('input[name=id_orden]');
                                var $proceso_flujo_id = $('#forma-proordenproduccion-window').find('input[name=proceso_flujo_id]');
                                var $select_tipoorden = $('#forma-proordenproduccion-window').find('select[name=tipoorden]');
                                var $fecha_elavorar = $('#forma-proordenproduccion-window').find('input[name=fecha_elavorar]');
                                var $observaciones = $('#forma-proordenproduccion-window').find('textarea[name=observaciones]');
                                
                                
                                //
                                var $titprod_tmp = $('#forma-proordenproduccion-window').find('input[name=titprod_tmp]');
                                var $sku_tmp = $('#forma-proordenproduccion-window').find('input[name=sku_tmp]');
                                var $id_producto_tmp = $('#forma-proordenproduccion-window').find('input[name=id_producto_tmp]');
                                var $descripcion_tmp = $('#forma-proordenproduccion-window').find('input[name=descripcion_tmp]');
                                var $especificaicones_lista = $('#forma-proordenproduccion-window').find('input[name=especificaicones_lista]');
                                
                                //grids detalle pedido
                                var $tabla_productos_header = $('#forma-proordenproduccion-window').find('#subprocesos_seleccionados');
                                var $tabla_productos_preorden = $('#forma-proordenproduccion-window').find('#grid_productos_seleccionados');
                                
                                //tipos de preorden
                                var $preorden_tipo_pedido = $('#forma-proordenproduccion-window').find('.tipo_pedido');
                                var tipo_stock_laboratorio = $('#forma-proordenproduccion-window').find('.tipo_stock_laboratorio'); 
                                
                                //href para buscar producto
                                var $buscar_producto = $('#forma-proordenproduccion-window').find('a[href*=busca_producto]');
                                var $agregar_producto = $('#forma-proordenproduccion-window').find('a[href*=agregar_producto]');
                                //href para agregar producto al grid
                                
                                var $cancelar_proceso = $('#forma-proordenproduccion-window').find('#cancela_entrada');
                                
                                var $cerrar_plugin = $('#forma-proordenproduccion-window').find('#close');
                                var $cancelar_plugin = $('#forma-proordenproduccion-window').find('#boton_cancelar');
                                var $submit_actualizar = $('#forma-proordenproduccion-window').find('#submit');
                                
                                
                                var $botones_confirmacion = $('#forma-proordenproduccion-window').find('.botones_confirmacion');
                                var $confirmar_programacion = $('#forma-proordenproduccion-window').find('#confirmar_programacion');
                                var $confirmar_enviar_produccion = $('#forma-proordenproduccion-window').find('#confirmar_enviar_produccion');
                                var $confirmar_terminada = $('#forma-proordenproduccion-window').find('#confirmar_terminada');
                                var $cancelar_orden = $('#forma-proordenproduccion-window').find('#cancelar_orden');
                                
                                var $pdf_orden = $('#forma-proordenproduccion-window').find('#pdf_orden');
                                var $pdf_requisicion = $('#forma-proordenproduccion-window').find('#pdf_requisicion');
                                
                                $command_selected.val("new");
                                $id_orden.val(0);
                                
                                $submit_actualizar.show();
                                $botones_confirmacion.show();
                                $confirmar_programacion.show();
                                $confirmar_enviar_produccion.show();
                                $confirmar_terminada.show();
                                $cancelar_orden.show();
                                $pdf_orden.show();
                                
				//$sku.attr("readonly", true);
				//$titulo.attr("readonly", true);
				//$descripcion.attr("readonly", true);
                                
                                $buscar_producto.hide();
                                $id_orden.val(id_to_show);
                                
                                $add_calendar($fecha_elavorar, " ", ">=");
                                
				var respuestaProcesada = function(data){
					if ( data['success'] == "true" ){
						jAlert("Los cambios se guardaron con exito", 'Atencion!');
						var remove = function() {$(this).remove();};
						$('#forma-proordenproduccion-overlay').fadeOut(remove);
						$get_datos_grid();
					}else{
                                            
						// Desaparece todas las interrogaciones si es que existen
						$('#forma-proordenproduccion-window').find('div.interrogacion').css({'display':'none'});
						$tabla_productos_preorden.find('input[name=persona]').css({'background' : '#ffffff'});
						$tabla_productos_preorden.find('input[name=equipo]').css({'background' : '#ffffff'});
						$tabla_productos_preorden.find('input[name=eq_adicional]').css({'background' : '#ffffff'});
                                                $tabla_productos_preorden.find('input[name=cantidad]').css({'background' : '#ffffff'});
                                                
                                                $('#forma-proordenproduccion-window').find('.proordenproduccion_div_one').css({'height':'548px'});//con errores
						$('#forma-proordenproduccion-window').find('#div_warning_grid').css({'display':'none'});
						$('#forma-proordenproduccion-window').find('#div_warning_grid').find('#grid_warning').children().remove();
						
						
						var valor = data['success'].split('___');
						//muestra las interrogaciones
						for (var element in valor){
							tmp = data['success'].split('___')[element];
							longitud = tmp.split(':');
							
							if( longitud.length > 1 ){
								$('#forma-proordenproduccion-window').find('img[rel=warning_' + tmp.split(':')[0] + ']')
								.parent()
								.css({'display':'block'})
								.easyTooltip({tooltipId: "easyTooltip2",content: tmp.split(':')[1]});
								
								//alert(tmp.split(':')[0]);
								
								if(parseInt($("tr", $tabla_productos_preorden).size())>0){
									for (var i=1;i<=parseInt($("tr", $tabla_productos_preorden).size());i++){
										if((tmp.split(':')[0]=='cantidad'+i) || (tmp.split(':')[0]=='apoerario'+i) || (tmp.split(':')[0]=='equipo'+i) || (tmp.split(':')[0]=='equipo_adicional'+i)){

											$('#forma-proordenproduccion-window').find('#div_warning_grid').css({'display':'block'});
											//$grid_productos.find('input[name=' + tmp.split(':')[0] + ']').css({'background' : '#d41000'});
											
											if(tmp.split(':')[0].substring(0, 8) == 'cantidad'){
												$tabla_productos_preorden.find('input[name=cantidad]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
											}
											
											if(tmp.split(':')[0].substring(0, 5) == 'apoerario'){
												$tabla_productos_preorden.find('input[name=costo]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
											}
											
											if(tmp.split(':')[0].substring(0, 9) == 'equipo'){
												$tabla_productos_preorden.find('input[name=caducidad]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
											}
                                                                                        
                                                                                        if(tmp.split(':')[0].substring(0, 9) == 'equipo_adicional'){
												$tabla_productos_preorden.find('input[name=caducidad]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
											}
											
											
											var tr_warning = '<tr>';
													tr_warning += '<td width="20"><div><IMG SRC="../../img/icono_advertencia.png" ALIGN="top" rel="warning_sku"></td>';
													tr_warning += '<td width="120"><INPUT TYPE="text" value="' + $tabla_productos_preorden.find('input[name=sku' + i + ']').val() + '" class="borde_oculto" readOnly="true" style="width:95px; color:red"></td>';
													tr_warning += '<td width="200"><INPUT TYPE="text" value="' + $tabla_productos_preorden.find('input[name=descripcion' + i + ']').val() + '" class="borde_oculto" readOnly="true" style="width:205px; color:red"></td>';
													tr_warning += '<td width="235"><INPUT TYPE="text" value="'+  tmp.split(':')[1] +'" class="borde_oculto" readOnly="true" style="width:485px; color:red"></td>';
											tr_warning += '</tr>';
											
											$('#forma-proordenproduccion-window').find('#div_warning_grid').find('#grid_warning').append(tr_warning);
										}
										
									}
								}
							}
						}
						$('#forma-proconfigproduccion-window').find('#div_warning_grid').find('#grid_warning').find('tr:odd').find('td').css({'background-color' : '#FFFFFF'});
						$('#forma-proconfigproduccion-window').find('#div_warning_grid').find('#grid_warning').find('tr:even').find('td').css({'background-color' : '#e7e8ea'});
                                                
					}
				}
				
				var options = {dataType :  'json', success : respuestaProcesada};
				$forma_selected.ajaxForm(options);
				
				//aqui se cargan los campos al editar
				$.post(input_json,$arreglo,function(entry){
                                    
                                    $id_orden.attr({'value': entry['Orden']['0']['id']});
                                    $observaciones.val( entry['Orden']['0']['observaciones']);
                                    $fecha_elavorar.attr({'value': entry['Orden']['0']['fecha_elavorar']});
                                    $proceso_flujo_id.attr({'value': entry['Orden']['0']['pro_proceso_flujo_id']});
                                    
                                    $select_tipoorden.children().remove();
                                    var orden_tipos_html = '';
                                    $.each(entry['ordenTipos'],function(entryIndex,pt){
                                        pt['titulo']=pt['titulo'].toUpperCase();
                                        
                                        if(entry['Orden']['0']['pro_orden_tipos_id'] == pt['id']){
                                            orden_tipos_html += '<option value="' + pt['id'] + '" selected="yes" >' + pt['titulo'] + '</option>';
                                        }
                                    });
                                    $select_tipoorden.append(orden_tipos_html);
                                    
                                    if(entry['OrdenDet'] != null){
                                        $.each(entry['OrdenDet'],function(entryIndex,prod){
                                            //$add_grid_componente_orden(0,prod['Sku'][0]['id'],prod['Sku'][0]['sku'],prod['Sku'][0]['descripcion'],""       ,""    ,""          , 0);
                                            if(prod['eq_adicional'] == ""){
                                                prod['eq_adicional'] = " ";
                                            }
                                            if(prod['empleado'] == ""){
                                                prod['empleado'] = " ";
                                            }
                                            
                                            if(prod['equipo'] == ""){
                                                prod['equipo'] = " ";
                                            }
                                            
                                            
                                            if(entry['Orden']['0']['pro_proceso_flujo_id'] == "3"){
                                                
                                                $cadena_especificaciones = prod['fineza_inicial']+"&&&"+prod['viscosidads_inicial']+"&&&"+prod['viscosidadku_inicial']+"&&&";
                                                $cadena_especificaciones += prod['viscosidadcps_inicial']+"&&&"+prod['densidad_inicial']+"&&&"+prod['volatiles_inicial']+"&&&"+prod['cubriente_inicial']+"&&&"+prod['tono_inicial']+"&&&";
                                                $cadena_especificaciones += prod['brillo_inicial']+"&&&"+prod['dureza_inicial']+"&&&"+prod['adherencia_inicial']+"&&&"+prod['hidrogeno_inicial']+"&&&";
                                                
                                                $cadena_especificaciones += prod['fineza_final']+"&&&"+prod['viscosidads_final']+"&&&"+prod['viscosidadku_final']+"&&&";
                                                $cadena_especificaciones += prod['viscosidadcps_final']+"&&&"+prod['densidad_final']+"&&&"+prod['volatiles_final']+"&&&"+prod['cubriente_final']+"&&&"+prod['tono_final']+"&&&";
                                                $cadena_especificaciones += prod['brillo_final']+"&&&"+prod['dureza_final']+"&&&"+prod['adherencia_final']+"&&&"+prod['hidrogeno_final']+"&&&";
                                                
                                                if(prod['id_esp'] == "" || prod['id_esp'] == null){
                                                    prod['id_esp'] = "0";
                                                }
                                                
                                                if(prod['num_lote'] == "" || prod['num_lote'] == null){
                                                    prod['num_lote'] = " ";
                                                }
                                                
                                                //                                                                                                                                                                                                                      lote, especificaciones
                                                $add_grid_componente_orden_en_produccion(prod['id'],prod['inv_prod_id'],prod['sku'],prod['descripcion'],prod['cantidad'], entry['Orden']['0']['pro_proceso_flujo_id'] , prod['subproceso'],prod['pro_subprocesos_id'], prod['num_lote'], $cadena_especificaciones,prod['id_esp'],prod['unidad'], prod['unidad_id'], prod['densidad']);
                                                
                                            }else{
                                                if(entry['Orden']['0']['pro_proceso_flujo_id'] == "1" || entry['Orden']['0']['pro_proceso_flujo_id'] == "2"){
                                                    
                                                    pro_proceso_flujo_id = entry['Orden']['0']['pro_proceso_flujo_id'];
                                                    if(entry['Orden']['0']['pro_proceso_flujo_id'] == "1"){
                                                        pro_proceso_flujo_id = "2";
                                                    }
                                                    $add_grid_componente_orden(prod['id'],prod['inv_prod_id'],prod['sku'],prod['descripcion'],prod['empleado'],prod['equipo'],prod['eq_adicional'],prod['cantidad'], prod, pro_proceso_flujo_id,prod['unidad'], prod['unidad_id'], prod['densidad']);
                                                    
                                                }else{
                                                    if(entry['Orden']['0']['pro_proceso_flujo_id'] == "4" || entry['Orden']['0']['pro_proceso_flujo_id'] == "5"){
                                                        $add_grid_componente_orden_finalizada_o_cancelada(prod['id'],prod['inv_prod_id'],prod['sku'],prod['descripcion'],prod['empleado'],prod['equipo'],prod['eq_adicional'],prod['cantidad'], prod, entry['Orden']['0']['pro_proceso_flujo_id'],prod['unidad'], prod['unidad_id'], prod['densidad']);
                                                    }
                                                }
                                            }
                                        });
                                    };
                                    
                                    
                                    $ocullta_de_acuerdo_a_el_tipo_y_estatus($select_tipoorden.val(), entry['Orden']['0']['pro_proceso_flujo_id']);
                                    
                                    
				},"json");//termina llamada json
				
                                
				$buscar_producto.click(function(event){
                                    event.preventDefault();
                                    tipo_preorden = $select_tipoorden.val();

                                    //para  Stock
                                    if(tipo_preorden == 2){
                                        $busca_productos(2);
                                    }

                                    //para tipo labnoratorio
                                    if(tipo_preorden == 3){
                                        $busca_productos(3);
                                    }
                                    
                                });
                                
                                $agregar_producto.click(function(event){
                                    event.preventDefault();
                                    if(/^[A-Za-z0-9]*$/.test($sku_tmp.val())){
                                        $opbtiene_datos_producto_por_sku($sku_tmp.val());
                                    }else{
                                        jAlert("Agregue un c&oacute;digo", 'Atencion!');
                                    }
                                });

                                //desencadena clic del href Agregar producto al pulsar enter en el campo sku del producto
                                $sku_tmp.keypress(function(e){
                                    if(e.which == 13){
                                        $agregar_producto.trigger('click');
                                        return false;
                                    }
                                });
                                
                                
				$submit_actualizar.bind('click',function(){
                                    $command_selected.val("1");
                                    $agrega_esp_en_blanco_grid();
                                    var trCount = $("tr", $tabla_productos_preorden).size();
                                    if(trCount > 0){
                                        jConfirm('Desea guardar los cambios ?', 'Dialogo de Confirmacion', function(r) {
                                            // If they confirmed, manually trigger a form submission
                                            if (r) $submit_actualizar.parents("FORM").submit();
                                        });
                                    }else{
                                        jAlert("Es necesario agregar productos.", 'Atencion!');
                                    }
                                    // Always return false here since we don't know what jConfirm is going to do
                                    return false;
                                });
                                
                                
                                $confirmar_programacion.bind('click',function(){
                                    $command_selected.val("2");
                                    $agrega_esp_en_blanco_grid();
                                    var trCount = $("tr", $tabla_productos_preorden).size();
                                    if(trCount > 0){
                                        jConfirm('Desea guardar los cambios ?', 'Dialogo de Confirmacion', function(r) {
                                            // If they confirmed, manually trigger a form submission
                                            if (r) $submit_actualizar.parents("FORM").submit();
                                        });
                                    }else{
                                        jAlert("Es necesario agregar productos.", 'Atencion!');
                                    }
                                    // Always return false here since we don't know what jConfirm is going to do
                                    return false;
                                });
                                
                                
                                $confirmar_enviar_produccion.bind('click',function(){
                                    $command_selected.val("3");
                                    $agrega_esp_en_blanco_grid();
                                    var trCount = $("tr", $tabla_productos_preorden).size();
                                    if(trCount > 0){
                                        
                                        jConfirm('Desea guardar los cambios ?', 'Dialogo de Confirmacion', function(r) {
                                            
                                            cadena_pos = "";
                                            $tabla_productos_preorden.find('tr').each(function(){
                                                
                                                eliminar_tmp = $(this).find('input[name=eliminar]').val();
                                                id_reg_tmp = $(this).find('input[name=id_reg]').val();
                                                inv_prod_id = $(this).find('input[name=inv_prod_id]').val();
                                                subproceso_id = $(this).find('input[name=subproceso_id]').val();
                                                especificaciones = $(this).find('input[name=especificaciones]').val();
                                                id_reg_esp = $(this).find('input[name=id_reg_esp]').val();
                                                
                                                if(eliminar_tmp != null && id_reg_tmp != null && subproceso_id != null && especificaciones != null){
                                                    //                  1               2                   3           
                                                    cadena_pos += eliminar_tmp+"___"+id_reg_tmp+"___"+inv_prod_id+"___"+
                                                        //      4                   5 
                                                        subproceso_id+"___"+especificaciones+"___"+id_reg_esp+"$$$$";
                                                }
                                            });
                                            
                                            $especificaicones_lista.val(cadena_pos);
                                            
                                            if (r) $submit_actualizar.parents("FORM").submit();
                                        });
                                    }else{
                                        jAlert("Es necesario agregar productos.", 'Atencion!');
                                    }
                                    // Always return false here since we don't know what jConfirm is going to do
                                    return false;
                                });
                                
                                
                                
                                $cancelar_orden.bind('click',function(){
                                    $command_selected.val("5");
                                    $agrega_esp_en_blanco_grid();
                                    var trCount = $("tr", $tabla_productos_preorden).size();
                                    if(trCount > 0){
                                        jConfirm('Desea cancelar la orden de prudcci&oacute;n?', 'Dialogo de Confirmacion', function(r) {
                                            // If they confirmed, manually trigger a form submission
                                            if (r) $submit_actualizar.parents("FORM").submit();
                                        });
                                    }else{
                                        jAlert("No se puede cancelar la orden.", 'Atencion!');
                                    }
                                    // Always return false here since we don't know what jConfirm is going to do
                                    return false;
                                });
                                
                                $confirmar_terminada.bind('click',function(){
                                    $command_selected.val("4");
                                    $agrega_esp_en_blanco_grid();
                                    var trCount = $("tr", $tabla_productos_preorden).size();
                                    jConfirm('Desea Terminar la orden?', 'Dialogo de Confirmacion', function(r) {
                                        // If they confirmed, manually trigger a form submission
                                        if(trCount > 0){
                                            if (r) $submit_actualizar.parents("FORM").submit();
                                        }
                                    });
                                    // Always return false here since we don't know what jConfirm is going to do
                                    return false;
                                });
                                
                                $pdf_orden.bind('click',function(event){
                                    event.preventDefault();
                                    jConfirm('Descargar PDF?', 'Dialogo de Confirmacion', function(r) {
                                        // If they confirmed, manually trigger a form submission
                                        if (r) {
                                            
                                            var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
                                            
                                            var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/getPdfProduccion/'+id_to_show+'/'+iu+'/out.json';
                                            window.location.href=input_json;
                                        }
                                    });
                                    
                                    // Always return false here since we don't know what jConfirm is going to do
                                    return false;
                                });
                                
                                $pdf_requisicion.bind('click',function(event){
                                    event.preventDefault();
                                    jConfirm('Descargar PDF?', 'Dialogo de Confirmacion', function(r) {
                                        // If they confirmed, manually trigger a form submission
                                        if (r) {
                                            
                                            var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
                                            
                                            var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/getPdfRequisicion/'+id_to_show+'/'+iu+'/out.json';
                                            window.location.href=input_json;
                                        }
                                    });
                                    
                                    // Always return false here since we don't know what jConfirm is going to do
                                    return false;
                                });
                                
                                //cerrar plugin
                                $cerrar_plugin.bind('click',function(){
                                    var remove = function() {$(this).remove();};
                                    $('#forma-proordenproduccion-overlay').fadeOut(remove);
                                });
                                
                                //boton cancelar y cerrar plugin
                                $cancelar_plugin.click(function(event){
                                    var remove = function() {$(this).remove();};
                                    $('#forma-proordenproduccion-overlay').fadeOut(remove);
                                });
                                
			}
		}
	}
        
        
	$get_datos_grid = function(){
            var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_all_ordenesproduccion.json';
            
            var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
            
            $arreglo = {'orderby':'id','desc':'DESC','items_por_pag':10,'pag_start':1,'display_pag':10,'input_json':'/'+controller+'/get_all_ordenesproduccion.json', 'cadena_busqueda':$cadena_busqueda, 'iu':iu}
            
            $.post(input_json,$arreglo,function(data){
                //pinta_grid
                //$.fn.tablaOrdenable(data,$('#lienzo_recalculable').find('.tablesorter'),carga_formaEntradamercancias00_for_datagrid00);
                
                //aqui se utiliza el mismo datagrid que prefacturas. Solo muesta icono de detalles, el de eliminar No
                $.fn.tablaOrdenablePrefacturas(data,$('#lienzo_recalculable').find('.tablesorter'),carga_formaProConfigproduccion0000_for_datagrid00);
                
                //resetea elastic, despues de pintar el grid y el slider
                Elastic.reset(document.getElementById('lienzo_recalculable'));
            },"json");
	}
	
    $get_datos_grid();
});


