$(function() {
	String.prototype.toCharCode = function(){
	    var str = this.split(''), len = str.length, work = new Array(len);
	    for (var i = 0; i < len; ++i){
		work[i] = this.charCodeAt(i);
	    }
	    return work.join(',');
	};
	
	$('#header').find('#header1').find('span.emp').text($('#lienzo_recalculable').find('input[name=emp]').val());
	$('#header').find('#header1').find('span.suc').text($('#lienzo_recalculable').find('input[name=suc]').val());
    var $username = $('#header').find('#header1').find('span.username');
	$username.text($('#lienzo_recalculable').find('input[name=user]').val());
	
	var $contextpath = $('#lienzo_recalculable').find('input[name=contextpath]');
	var controller = $contextpath.val()+"/controllers/entradamercancias";
	
    //Barra para las acciones
    $('#barra_acciones').append($('#lienzo_recalculable').find('.table_acciones'));
    $('#barra_acciones').find('.table_acciones').css({'display':'block'});
	var $new_entrada = $('#barra_acciones').find('.table_acciones').find('a[href*=new_item]');
	var $visualiza_buscador = $('#barra_acciones').find('.table_acciones').find('a[href*=visualiza_buscador]');
	
	//aqui va el titulo del catalogo
	$('#barra_titulo').find('#td_titulo').append('Facturas de Compras');
	
	//barra para el buscador 
	$('#barra_buscador').append($('#lienzo_recalculable').find('.tabla_buscador'));
	$('#barra_buscador').find('.tabla_buscador').css({'display':'block'});
	
	
	var $cadena_busqueda = "";
	var $campo_busqueda_folio = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_folio]');
	var $campo_busqueda_oc = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_oc]');
	var $campo_busqueda_factura = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_factura]');
	var $campo_busqueda_proveedor = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_proveedor]');
	
	var tiposIva = new Array(); //este arreglo carga los select del grid cada que se agrega un nuevo producto
	var Monedas = new Array(); 
	
	var $buscar = $('#barra_buscador').find('.tabla_buscador').find('input[value$=Buscar]');
	var $limpiar = $('#barra_buscador').find('.tabla_buscador').find('input[value$=Limpiar]');
	
	
	var to_make_one_search_string = function(){
		var valor_retorno = "";
		
		var signo_separador = "=";
		valor_retorno += "folio" + signo_separador + $campo_busqueda_folio.val() + "|";
		valor_retorno += "orden_compra" + signo_separador + $campo_busqueda_oc.val() + "|";
		valor_retorno += "factura" + signo_separador + $campo_busqueda_factura.val() + "|";
		valor_retorno += "proveedor" + signo_separador + $campo_busqueda_proveedor.val();
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
		$campo_busqueda_oc.val('');
		$campo_busqueda_factura.val('');
		$campo_busqueda_proveedor.val(''); 
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
	
	$tabs_li_funxionalidad = function(){
		var $select_prod_tipo = $('#forma-entradamercancias-window').find('select[name=prodtipo]');
		$('#forma-entradamercancias-window').find('#submit').mouseover(function(){
			$('#forma-entradamercancias-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/bt1.png");
		});
		$('#forma-entradamercancias-window').find('#submit').mouseout(function(){
			$('#forma-entradamercancias-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/btn1.png");
		});
		
		$('#forma-entradamercancias-window').find('#boton_cancelar').mouseover(function(){
			$('#forma-entradamercancias-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/bt2.png)"});
		});
		$('#forma-entradamercancias-window').find('#boton_cancelar').mouseout(function(){
			$('#forma-entradamercancias-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/btn2.png)"});
		});
		
		$('#forma-entradamercancias-window').find('#close').mouseover(function(){
			$('#forma-entradamercancias-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close_over.png)"});
		});
		$('#forma-entradamercancias-window').find('#close').mouseout(function(){
			$('#forma-entradamercancias-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close.png)"});
		});
		
		$('#forma-entradamercancias-window').find(".contenidoPes").hide(); //Hide all content
		$('#forma-entradamercancias-window').find("ul.pestanas li:first").addClass("active").show(); //Activate first tab
		$('#forma-entradamercancias-window').find(".contenidoPes:first").show(); //Show first tab content
		
		//On Click Event
		$('#forma-entradamercancias-window').find("ul.pestanas li").click(function() {
			$('#forma-entradamercancias-window').find(".contenidoPes").hide();
			$('#forma-entradamercancias-window').find("ul.pestanas li").removeClass("active");
			var activeTab = $(this).find("a").attr("href");
			$('#forma-entradamercancias-window').find( activeTab , "ul.pestanas li" ).fadeIn().show();
			$(this).addClass("active");
			return false;
		});
	}
        
        
        
	//----------------------------------------------------------------
	//valida la fecha seleccionada
	function mayor(fecha, fecha2){
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



	//buscador de proveedores
	$busca_proveedores = function(){
		$(this).modalPanel_Buscaproveedor();
		var $dialogoc =  $('#forma-buscaproveedor-window');
		$dialogoc.append($('div.buscador_proveedores').find('table.formaBusqueda_proveedores').clone());
		$('#forma-buscaproveedor-window').css({ "margin-left": -200, 	"margin-top": -200  });
		
		var $tabla_resultados = $('#forma-buscaproveedor-window').find('#tabla_resultado');
		var $campo_rfc = $('#forma-buscaproveedor-window').find('input[name=campo_rfc]');
		var $campo_email = $('#forma-buscaproveedor-window').find('input[name=campo_email]');
		var $campo_nombre = $('#forma-buscaproveedor-window').find('input[name=campo_nombre]');
		
		var $buscar_plugin_proveedor = $('#forma-buscaproveedor-window').find('#busca_proveedor_modalbox');
		var $cancelar_plugin_busca_proveedor = $('#forma-buscaproveedor-window').find('#cencela');
			
		$('#forma-entradamercancias-window').find('input[name=tipo_proveedor]').val('');
			
		//funcionalidad botones
		$buscar_plugin_proveedor.mouseover(function(){
			$(this).removeClass("onmouseOutBuscar").addClass("onmouseOverBuscar");
		});
		$buscar_plugin_proveedor.mouseout(function(){
			$(this).removeClass("onmouseOverBuscar").addClass("onmouseOutBuscar");
		});
		   
		$cancelar_plugin_busca_proveedor.mouseover(function(){
			$(this).removeClass("onmouseOutCancelar").addClass("onmouseOverCancelar");
		});
		$cancelar_plugin_busca_proveedor.mouseout(function(){
			$(this).removeClass("onmouseOverCancelar").addClass("onmouseOutCancelar");
		});
	
		
		//click buscar proveedor
		$buscar_plugin_proveedor.click(function(event){
			//event.preventDefault();
			var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_proveedores.json';
			$arreglo = {    'rfc':$campo_rfc.val(),
							'email':$campo_email.val(),
							'nombre':$campo_nombre.val(),
							'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
						}
                                    
			var trr = '';
			$tabla_resultados.children().remove();
			$.post(input_json,$arreglo,function(entry){
				$.each(entry['proveedores'],function(entryIndex,proveedor){
					
					trr = '<tr>';
						trr += '<td width="120">';
							trr += '<input type="hidden" id="id_prov" value="'+proveedor['id']+'">';
							trr += '<input type="hidden" id="tipo_prov" value="'+proveedor['proveedortipo_id']+'">';
							trr += '<span class="rfc">'+proveedor['rfc']+'</span>';
						trr += '</td>';
						trr += '<td width="250"><span id="razon_social">'+proveedor['razon_social']+'</span></td>';
						trr += '<td width="250"><span class="direccion">'+proveedor['direccion']+'</span></td>';
					trr += '</tr>';
					
					$tabla_resultados.append(trr);
				});
				$tabla_resultados.find('tr:odd').find('td').css({ 'background-color' : '#e7e8ea'});
				$tabla_resultados.find('tr:even').find('td').css({ 'background-color' : '#FFFFFF'});

				$('tr:odd' , $tabla_resultados).hover(function () {
					$(this).find('td').css({ background : '#FBD850'});
				}, function() {
					$(this).find('td').css({'background-color':'#e7e8ea'});
				});
				$('tr:even' , $tabla_resultados).hover(function () {
					$(this).find('td').css({'background-color':'#FBD850'});
				}, function() {
					$(this).find('td').css({'background-color':'#FFFFFF'});
				});
				
				//seleccionar un producto del grid de resultados
				$tabla_resultados.find('tr').click(function(){
					//asignar a los campos correspondientes el sku y y descripcion
					$('#forma-entradamercancias-window').find('input[name=id_proveedor]').val($(this).find('#id_prov').val());
					$('#forma-entradamercancias-window').find('input[name=tipo_proveedor]').val($(this).find('#tipo_prov').val());
					$('#forma-entradamercancias-window').find('input[name=rfcproveedor]').val($(this).find('span.rfc').html());
					$('#forma-entradamercancias-window').find('input[name=razon_proveedor]').val($(this).find('#razon_social').html());
					//$('#forma-entradamercancias-window').find('input[name=dir_proveedor]').val($(this).find('span.direccion').html());
					
					//elimina la ventana de busqueda
					var remove = function() { $(this).remove(); };
					$('#forma-buscaproveedor-overlay').fadeOut(remove);
				});
			});
		});
		
		$cancelar_plugin_busca_proveedor.click(function(event){
			//event.preventDefault();
			var remove = function() { $(this).remove(); };
			$('#forma-buscaproveedor-overlay').fadeOut(remove);
		});
	}//termina buscador de proveedores
	
	
	
	//buscador de productos
	$busca_productos = function(sku_buscar){
		//limpiar_campos_grids();
		$(this).modalPanel_Buscaproducto();
		var $dialogoc =  $('#forma-buscaproducto-window');
		//var $dialogoc.prependTo('#forma-buscaproduct-window');
		$dialogoc.append($('div.buscador_productos').find('table.formaBusqueda_productos').clone());
		
		$('#forma-buscaproducto-window').css({ "margin-left": -200, 	"margin-top": -200  });
		
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
			var prod_tipos_html = '<option value="0" selected="yes">[--Seleccionar Tipo--]</option>';
			$.each(data['prodTipos'],function(entryIndex,pt){
				prod_tipos_html += '<option value="' + pt['id'] + '"  >' + pt['titulo'] + '</option>';
			});
			$select_tipo_producto.append(prod_tipos_html);
		});
		
		$campo_sku.val(sku_buscar);
		
		//click buscar productos
		$buscar_plugin_producto.click(function(event){
			//event.preventDefault();
			var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_buscador_productos.json';
			$arreglo = {    'sku':$campo_sku.val(),
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
				$tabla_resultados.find('tr:odd').find('td').css({ 'background-color' : '#e7e8ea'});
				$tabla_resultados.find('tr:even').find('td').css({ 'background-color' : '#FFFFFF'});

				$('tr:odd' , $tabla_resultados).hover(function () {
					$(this).find('td').css({ background : '#FBD850'});
				}, function() {
					//$(this).find('td').css({'background-color':'#DDECFF'});
					$(this).find('td').css({'background-color':'#e7e8ea'});
				});
				$('tr:even' , $tabla_resultados).hover(function () {
					$(this).find('td').css({'background-color':'#FBD850'});
				}, function() {
					$(this).find('td').css({'background-color':'#FFFFFF'});
				});
				
				//seleccionar un producto del grid de resultados
				$tabla_resultados.find('tr').click(function(){
					//asignar a los campos correspondientes el sku y y descripcion
					$('#forma-entradamercancias-window').find('input[name=id_producto]').val($(this).find('#id_prod_buscador').val());
					$('#forma-entradamercancias-window').find('input[name=sku_producto]').val($(this).find('span.sku_prod_buscador').html());
					$('#forma-entradamercancias-window').find('input[name=titulo_producto]').val($(this).find('span.titulo_prod_buscador').html());
					//elimina la ventana de busqueda
					var remove = function() { $(this).remove(); };
					$('#forma-buscaproducto-overlay').fadeOut(remove);
					//asignar el enfoque al campo sku del producto
					$('#forma-entradamercancias-window').find('input[name=sku_producto]').focus();
				});
				
			});
		})
		
		
		//si hay algo en el campo sku al cargar el buscador, ejecuta la busqueda
		if($campo_sku.val() != ''){
			$buscar_plugin_producto.trigger('click');
		}

		$cancelar_plugin_busca_producto.click(function(event){
			//event.preventDefault();
			var remove = function() { $(this).remove(); };
			$('#forma-buscaproducto-overlay').fadeOut(remove);
		});
	}//termina buscador de productos
	
	
	
	
	
	//buscador de presentaciones disponibles para un producto
	$buscador_presentaciones_producto = function(rfc_proveedor, sku_producto){
		//verifica si el campo rfc proveedor no esta vacio
		if(rfc_proveedor != ''){
			//verifica si el campo sku no esta vacio para realizar busqueda
			if(sku_producto != ''){
				var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_presentaciones_producto.json';
				$arreglo = {'sku':sku_producto	};
				
				var trr = '';
				
				$.post(input_json,$arreglo,function(entry){
					
					//verifica si el arreglo  retorno datos
					if (entry['Presentaciones'].length > 0){
						$(this).modalPanel_Buscapresentacion();
						var $dialogoc =  $('#forma-buscapresentacion-window');
						$dialogoc.append($('div.buscador_presentaciones').find('table.formaBusqueda_presentaciones').clone());
						$('#forma-buscapresentacion-window').css({ "margin-left": -200, "margin-top": -200  });
						
						var $tabla_resultados = $('#forma-buscapresentacion-window').find('#tabla_resultado');
						var $cancelar_plugin_busca_lotes_producto = $('#forma-buscapresentacion-window').find('#cencela');
							
						$cancelar_plugin_busca_lotes_producto.mouseover(function(){
							$(this).removeClass("onmouseOutCancelar").addClass("onmouseOverCancelar");
						});
						$cancelar_plugin_busca_lotes_producto.mouseout(function(){
							$(this).removeClass("onmouseOverCancelar").addClass("onmouseOutCancelar");
						});	
						
						
						$tabla_resultados.children().remove();
						
						//crea el tr con los datos del producto seleccionado
						$.each(entry['Presentaciones'],function(entryIndex,pres){
							trr = '<tr>';
								trr += '<td width="100">';
									trr += '<span class="id_prod" style="display:none">'+pres['id']+'</span>';
									trr += '<span class="sku">'+pres['sku']+'</span>';
								trr += '</td>';
								trr += '<td width="250"><span class="titulo">'+pres['titulo']+'</span></td>';
								trr += '<td width="80">';
									trr += '<span class="unidad" style="display:none">'+pres['unidad']+'</span>';
									trr += '<span class="id_pres" style="display:none">'+pres['id_presentacion']+'</span>';
									trr += '<span class="pres">'+pres['presentacion']+'</span>';
								trr += '</td>';
							trr += '</tr>';
							$tabla_resultados.append(trr);
						});
						
						$tabla_resultados.find('tr:odd').find('td').css({ 'background-color' : '#e7e8ea'});
						$tabla_resultados.find('tr:even').find('td').css({ 'background-color' : '#FFFFFF'});
						
						$('tr:odd' , $tabla_resultados).hover(function () {
							$(this).find('td').css({ background : '#FBD850'});
						}, function() {
							//$(this).find('td').css({'background-color':'#DDECFF'});
							$(this).find('td').css({'background-color':'#e7e8ea'});
						});
						$('tr:even' , $tabla_resultados).hover(function () {
							$(this).find('td').css({'background-color':'#FBD850'});
						}, function() {
							$(this).find('td').css({'background-color':'#FFFFFF'});
						});
						
						//seleccionar un producto del grid de resultados
						$tabla_resultados.find('tr').click(function(){
							//llamada a la funcion que busca y agrega producto al grid, se le pasa como parametro el lote y el almacen
							//$agrega_producto_grid($(this).find('span.lote').html(),$(this).find('input.idalmacen').val());
							var id_prod = $(this).find('span.id_prod').html();
							var sku = $(this).find('span.sku').html();
							var titulo = $(this).find('span.titulo').html();
							var unidad = $(this).find('span.unidad').html();
							var id_pres = $(this).find('span.id_pres').html();
							var pres = $(this).find('span.pres').html();
							
							//aqui se pasan datos a la funcion que agrega el tr en el grid
							$agrega_producto_al_grid(id_prod,sku,titulo,unidad,id_pres,pres);
							
							//elimina la ventana de busqueda
							var remove = function() { $(this).remove(); };
							$('#forma-buscapresentacion-overlay').fadeOut(remove);
						});
						
						$cancelar_plugin_busca_lotes_producto.click(function(event){
							//event.preventDefault();
							var remove = function() { $(this).remove(); };
							$('#forma-buscapresentacion-overlay').fadeOut(remove);
						});
						
					}else{
						jAlert("El producto que intenta agregar no existe, pruebe ingresando otro.\nHaga clic en Buscar.",'! Atencion');
						$('#forma-entradamercancias-window').find('input[name=titulo_producto]').val('');
					}
				},"json");
				
			}else{
				jAlert("Es necesario ingresar un C&oacute;digo de producto valido", 'Atencion!');
			}
		}else{
			jAlert("Es necesario seleccionar un proveedor", 'Atencion!');
		}
		
	}//termina buscador de lotes disponibles de un producto
	
        
        
        
        
        
	
	//calcula totales(subtotal,descuento, impuesto, total)
	$calcula_totales = function(){
		//var $arreglo_grid = $('#forma-entradamercancias-window').find('input[name=arreglo]');
		var $campo_flete = $('#forma-entradamercancias-window').find('input[name=flete]');
		var $monto_iva_flete = $('#forma-entradamercancias-window').find('input[name=iva_flete]');
		
		var $tasa_fletes = $('#forma-entradamercancias-window').find('input[name=tasafletes]');
		var $campo_subtotal = $('#forma-entradamercancias-window').find('input[name=subtotal]');
		//var $campo_descuento = $('#forma-entradamercancias-window').find('input[name=descuento]');
		var $campo_impuesto = $('#forma-entradamercancias-window').find('input[name=totimpuesto]');
		var $retencion = $('#forma-entradamercancias-window').find('input[name=retencion]');
		var $campo_total = $('#forma-entradamercancias-window').find('input[name=total]');
		var sumaImporte = 0;
		//var sumaDescuento = 0;
		var sumaImpuesto = 0;
		var sumaTotal = 0;
		var impuesto = 0.00;
		var partida=0;
		var retencionfletes=0;
		
		var $grid_productos = $('#forma-entradamercancias-window').find('#grid_productos');
		$grid_productos.find('tr').each(function (index){
			if(($(this).find('#cost').val() != ' ') && ($(this).find('#cant').val() != ' ')){
				var id_ivatipo = $(this).find('#imp').val();
				var valorImpuesto = 0;
				//alert(id_ivatipo);
				//alert("Alert1: "+$(this).parent().find('#totimp').val());
				
				/*
				$.each(tiposIva,function(entryIndex,tipos){
					if(parseInt(tipos['id'])==parseInt(id_ivatipo)){
						valorImpuesto = tipos['iva_1'];
					}
				});
				*/
				
				//obtiene el valor del impuesto
				var valorImpuesto = $(this).find('#v_imp').val();
				
				if($(this).find('#import').val()!=''){
					//Calcula total impuesto del producto actual
					$(this).find('#totimp').val(parseFloat($(this).find('#import').val()) * parseFloat(valorImpuesto));
					//$(this).find('#spantotimp').text($(this).find('#totimp').val());
				}
				
				sumaImporte = parseFloat(sumaImporte) + parseFloat($(this).find('#import').val());
				sumaImpuesto = parseFloat(sumaImpuesto) + parseFloat($(this).find('#totimp').val());
			}
			
		});
		
		
		$.each(tiposIva,function(entryIndex,tipos){
			if(parseInt(tipos['id'])==1){
				//calcula iva del flete
				$monto_iva_flete.val( parseFloat($campo_flete.val()) * parseFloat(tipos['iva_1'])  );
			}
		});
		
		sumaImpuesto = parseFloat(sumaImpuesto) + parseFloat($monto_iva_flete.val());
		
		sumaImporte = parseFloat(sumaImporte) + parseFloat($campo_flete.val());
		
		//calcula la retencion de fletes, para eso convierto la tasa de retencion 4% en su valor 0.04 dividiendola entre 100
		retencionfletes = parseFloat($campo_flete.val()) * parseFloat(parseFloat($tasa_fletes.val())/100);
		
		//se resta la retencion de fletes
		//sumaImpuesto = parseFloat(sumaImpuesto) - parseFloat(retencionfletes);
		
		//calcula el total
		sumaTotal = parseFloat(sumaImporte) + parseFloat(sumaImpuesto) - parseFloat(retencionfletes);
		//alert(sumaTotal);
		
		//redondear a dos digitos las cantidades con decimales
		//$campo_subtotal.val(Math.round(parseFloat(sumaImporte)*100)/100);
		//$campo_descuento.val(Math.round(parseFloat(sumaDescuento)*100)/100);
		//$campo_impuesto.val(Math.round(parseFloat(sumaImpuesto)*100)/100);
		//$campo_total.val(Math.round(parseFloat(sumaTotal)*100)/100);
		
		$campo_flete.val(parseFloat($campo_flete.val()).toFixed(2));
		$campo_subtotal.val($(this).agregar_comas( parseFloat(sumaImporte).toFixed(2)));
		$campo_impuesto.val($(this).agregar_comas( parseFloat(sumaImpuesto).toFixed(2)));
		$retencion.val(parseFloat(retencionfletes).toFixed(2));
		$campo_total.val($(this).agregar_comas( parseFloat(sumaTotal).toFixed(2)));
		
	}//termina calculo de impuestos
	
	
        
	//agrega producto nuevo al grid
	$agrega_producto_al_grid = function(id_prod,sku,titulo,unidad,id_pres,pres){
		var $id_prod = $('#forma-entradamercancias-window').find('input[name=id_producto]');
		var $sku_prod = $('#forma-entradamercancias-window').find('input[name=sku_producto]');
		var $nombre_prod = $('#forma-entradamercancias-window').find('input[name=titulo_producto]');
		var $grid_productos = $('#forma-entradamercancias-window').find('#grid_productos');
		
		var $campo_flete = $('#forma-entradamercancias-window').find('input[name=flete]');
		var $campo_subtotal = $('#forma-entradamercancias-window').find('input[name=subtotal]');
		//var $campo_descuento = $('#forma-entradamercancias-window').find('input[name=descuento]');
		var $campo_impuesto = $('#forma-entradamercancias-window').find('input[name=totimpuesto]');
		var $campo_total = $('#forma-entradamercancias-window').find('input[name=total]');
		
		var $hidden_tipo_proveedor = $('#forma-entradamercancias-window').find('input[name=tipo_proveedor]');
		var $campo_rfc_proveedor = $('#forma-entradamercancias-window').find('input[name=rfcproveedor]');
		
		var encontrado = 0;
		$grid_productos.find('tr').each(function (index){
			if(( $(this).find('#skup').val() == sku.toUpperCase() )  && (parseInt($(this).find('#idpres').val())== parseInt(id_pres) ) && (parseInt($(this).find('#eliminado').val())!=0)){
				encontrado=1;//el producto ya esta en el grid
			}
		});
		
		//alert(encontrado);
		
		if(parseInt(encontrado)!=1){//si el producto no esta en el grid entra aqui
			var trCount = $("tr", $grid_productos).size();
			trCount++;
			var tr_prod='';
			
			$('#forma-entradamercancias-window').find('input[name=titulo_producto]').val(titulo);
			
			tr_prod += '<tr>';
				tr_prod += '<td width="65" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
					tr_prod += '<a href="elimina_producto" id="eliminaprod'+ trCount +'">Eliminar</a>';
					tr_prod += '<input type="hidden" name="eliminado" id="eliminado" value="1">';//el 1 significa que el registro no ha sido eliminado
				tr_prod += '</td>';
				tr_prod += '<td width="100" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
					tr_prod += '<input type="hidden" name="id_prod_grid" id="idprod" value="'+ id_prod +'">';
					tr_prod += '<input TYPE="text" id="skup" name="sku'+ trCount +'" value="'+ sku +'" class="borde_oculto" style="width:96px;" readOnly="true">';
				tr_prod += '</td>';
				tr_prod += '<td width="200" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
					tr_prod += '<INPUT TYPE="text" name="titulo'+ trCount +'" value="'+ titulo +'" class="borde_oculto" style="width:196px;" readOnly="true">';
				tr_prod += '</td>';
				tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
					tr_prod += '<INPUT TYPE="text" name="unidad" class="borde_oculto" value="'+ unidad +'" readOnly="true" style="width:66px;">';
				tr_prod += '</td>';
				
				tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
					tr_prod += '<input type="hidden" name="id_pres" id="idpres" value="'+ id_pres +'">';
					tr_prod += '<INPUT TYPE="text" name="presentacion" class="borde_oculto" value="' + pres + '" readOnly="true" style="width:66px;">';
				tr_prod += '</td>';
				
				tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
					tr_prod += '<INPUT TYPE="text" name="cantidad" id="cant" value="1" style="width:66px;">';
				tr_prod += '</td>';
				
				tr_prod += '<td width="75" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
					tr_prod += '<INPUT TYPE="text" name="costo" id="cost" value=" " style="width:69px;">';
				tr_prod += '</td>';
				
				tr_prod += '<td width="90" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
					tr_prod += '<INPUT TYPE="text" name="importe'+ trCount +'" id="import" style="width:86px;" readOnly="true">';
				tr_prod += '</td>';
				
				tr_prod += '<td width="82" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
				tr_prod += '<SELECT name="impuesto" id="imp" style="width:80px;">';
					
					//carga select con tipos de impuesto
					if(parseInt($hidden_tipo_proveedor.val()) == 2){
						tr_prod += '<option value="0">[--  --]</option>';
					}else{
						tr_prod += '<option value="0" selected="yes">[--  --]</option>';
					}
					//aqui se carga el select con los tipos de iva
					$.each(tiposIva,function(entryIndex,tipos){
						if(parseInt($hidden_tipo_proveedor.val()) == 2){
							if(tipos['descripcion'] == 'IVA TASA 0'){
								tr_prod += '<option value="' + tipos['id'] + '"  selected="yes">' + tipos['descripcion'] + '</option>';
							}else{
								tr_prod += '<option value="' + tipos['id'] + '"  >' + tipos['descripcion'] + '</option>';
							}
						}else{
							tr_prod += '<option value="' + tipos['id'] + '"  >' + tipos['descripcion'] + '</option>';
						}
					});
					
					tr_prod += '</SELECT>';
					tr_prod += '<input type="hidden" name="valorimp" id="v_imp" value="0">';
					tr_prod += '<input type="hidden" name="totalimpuesto'+ trCount +'" id="totimp" value="0">';
					//tr_prod += '<span id="spantotimp">0</span>';
				tr_prod += '</td>';
				//tr_prod += '<td width="90"><INPUT TYPE="text" name="pedimento" id="ped" value=" " class="pedimento'+ trCount +'"style="width:86px;"></td>';
				//tr_prod += '<td width="66"><INPUT TYPE="text" name="caducidad" id="cad" value="" class="caducidad'+ trCount +'" style="width:65px;"></td>';
			tr_prod += '</tr>';
			
			$grid_productos.append(tr_prod);
			
			
			//al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
			$grid_productos.find('input[name=costo]').focus(function(e){
				if($(this).val() == ' '){
					$(this).val('');
				}
			});
                        
			//recalcula importe al perder enfoque el campo costo
			$grid_productos.find('input[name=costo]').blur(function(){
				if ($(this).val() == ''  || $(this).val() == null){
					$(this).val(' ');
				}
                            
				if( ($(this).val() != ' ') && ($(this).parent().parent().find('#cant').val() != ' ') )
				{	//calcula el importe
					$(this).parent().parent().find('#import').val(parseFloat($(this).val()) * parseFloat($(this).parent().parent().find('#cant').val()));
					//redondea el importe en dos decimales
					$(this).parent().parent().find('#import').val(parseFloat($(this).parent().parent().find('#import').val()).toFixed(2));
				}else{
					$(this).parent().parent().find('#import').val('');
				}
				$calcula_totales();//llamada a la funcion que calcula totales
			});
			
			//al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
			$grid_productos.find('input[name=cantidad]').focus(function(e){
				if($(this).val() == ' '){
						$(this).val('');
				}
			});
                        
			//recalcula importe al perder enfoque el campo cantidad
			$grid_productos.find('input[name=cantidad]').blur(function(){
				if ($(this).val() == ''  || $(this).val() == null){
					$(this).val(' ');
				}
				if( ($(this).val() != ' ') && ($(this).parent().parent().find('#cost').val() != ' ') )
				{	//calcula el importe
					$(this).parent().parent().find('#import').val(parseFloat($(this).val()) * parseFloat($(this).parent().parent().find('#cost').val()));
					//redondea el importe en dos decimales
					$(this).parent().parent().find('#import').val(parseFloat($(this).parent().parent().find('#import').val()).toFixed(2));
				}else{
					$(this).parent().parent().find('#import').val('');
				}
				$calcula_totales();//llamada a la funcion que calcula totales
			});
			
			
			//validar campo costo, solo acepte numeros y punto
			$grid_productos.find('input[name=costo]').keypress(function(e){
				//alert(e.which);
				// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
				if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
					return true;
				}else {
					return false;
				}		
			});
			
			//validar campo cantidad, solo acepte numeros y punto
			$grid_productos.find('input[name=cantidad]').keypress(function(e){
				//alert(e.which);
				// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
				if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
					return true;
				}else {
					return false;
				}		
			});

			//elimina un producto del grid
			$grid_productos.find('#eliminaprod'+ trCount).bind('click',function(event){
				event.preventDefault();
				if(parseInt($(this).parent().find('#eliminado').val()) != 0){
					if($(this).parent().parent().find('#import').val()!=' ' && $(this).parent().parent().find('#import').val()!=''){
						//$campo_subtotal.val(parseFloat($campo_subtotal.val()) - parseFloat($(this).parent().parent().find('#import').val()));
						//calcula total
						//$campo_total.val(parseFloat($campo_subtotal.val()) + parseFloat($campo_impuesto.val()));
					}
					//asigna espacios en blanco a todos los input de la fila eliminada
					$(this).parent().parent().find('input').val(' ');
					//asigna un 0 al input eliminado como bandera para saber que esta eliminado
					$(this).parent().find('#eliminado').val(0);//cambiar valor del campo a 0 para indicar que se ha elimnado
					//oculta la fila eliminada
					$(this).parent().parent().hide();
					$calcula_totales();//llamada a la funcion que calcula totales
				}
			});
			
			//seleccionar tipo de  impuesto
			$grid_productos.find('select[name=impuesto]').change(function(){
				var valorImpuesto=0;
				var id_ivatipo = $(this).val();
				$.each(tiposIva,function(entryIndex,tipos){
					if(parseInt(tipos['id'])==parseInt(id_ivatipo)){
						valorImpuesto = tipos['iva_1'];
					}
				});
				$(this).parent().find('input[name=valorimp]').val(valorImpuesto);
				
				$calcula_totales();//llamada a la funcion que calcula totales
			});
			
		}else{
			jAlert("El producto con &eacute;sta presentaci&oacute;n ya se encuentra en el listado, seleccione otro diferente.", 'Atencion!');
			$sku_prod.focus();
		}
		
	}//termina agregar producto nuevo al grid
	
	
	
	
	//buscar tipo de cambio de la fecha seleccionada
	function buscarTipoCambio($fecha)
	{	
		var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/obtener_tipo_cambio.json';
		$arreglo = {'fecha':$fecha}
		$.post(input_json,$arreglo,function(valor){
			$('#forma-entradamercancias-window').find('input[name=tc]').val(valor['tipoCambio'][0]['valor']);
		},"json");
	}
        
        
        
	
	//nueva entrada
	$new_entrada.click(function(event){
		event.preventDefault();
		var id_to_show = 0;
		
		$(this).modalPanel_Entradamercancias();
		
		var form_to_show = 'formaEntradamercancias00';
		$('#' + form_to_show).each (function(){   this.reset(); });
		var $forma_selected = $('#' + form_to_show).clone();
		$forma_selected.attr({ id : form_to_show + id_to_show });
		
		$('#forma-entradamercancias-window').css({ "margin-left": -375, "margin-top": -230 });
		
		$forma_selected.prependTo('#forma-entradamercancias-window');
		$forma_selected.find('.panelcito_modal').attr({ id : 'panelcito_modal' + id_to_show , style:'display:table'});
		
		$tabs_li_funxionalidad();
		
		var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_datos_entrada_mercancia.json';
		$arreglo = {'id_entrada':id_to_show,
					'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
					};
                
                
		var $id_entrada = $('#forma-entradamercancias-window').find('input[name=id_entrada]');
		var $tasa_fletes = $('#forma-entradamercancias-window').find('input[name=tasafletes]');
		var $total_tr = $('#forma-entradamercancias-window').find('input[name=total_tr]');
		var $campo_factura = $('#forma-entradamercancias-window').find('input[name=factura]');
		var $campo_ordencompra = $('#forma-entradamercancias-window').find('input[name=ordencompra]');
		var $campo_numeroguia = $('#forma-entradamercancias-window').find('input[name=numeroguia]');
		var $campo_expedicion = $('#forma-entradamercancias-window').find('input[name=expedicion]');
		var $select_denominacion = $('#forma-entradamercancias-window').find('select[name=denominacion]');
		var $select_fleteras = $('#forma-entradamercancias-window').find('select[name=fletera]');
		var $campo_tc = $('#forma-entradamercancias-window').find('input[name=tc]');
		var $campo_observaciones = $('#forma-entradamercancias-window').find('textarea[name=observaciones]');
		var $select_almacen_destino = $('#forma-entradamercancias-window').find('select[name=almacen_destino]');
		var $select_tipo_doc = $('#forma-entradamercancias-window').find('select[name=tipodoc]');
		
		//campos del proveedor
		var $buscar_proveedor = $('#forma-entradamercancias-window').find('a[href*=busca_proveedor]');
		var $hidden_id_proveedor = $('#forma-entradamercancias-window').find('input[name=id_proveedor]');
		var $campo_rfc_proveedor = $('#forma-entradamercancias-window').find('input[name=rfcproveedor]');
		var $campo_razon_proveedor = $('#forma-entradamercancias-window').find('input[name=razon_proveedor]');
		var $hidden_tipo_proveedor = $('#forma-entradamercancias-window').find('input[name=tipo_proveedor]');
		
		var $campo_sku = $('#forma-entradamercancias-window').find('input[name=sku_producto]');
		
		//tabla contenedor del listado de productos
		var $grid_productos = $('#forma-entradamercancias-window').find('#grid_productos');
		//campos de totales
		var $campo_flete = $('#forma-entradamercancias-window').find('input[name=flete]');
		var $monto_iva_flete = $('#forma-entradamercancias-window').find('input[name=iva_flete]');
		var $campo_subtotal = $('#forma-entradamercancias-window').find('input[name=subtotal]');
		var $campo_descuento = $('#forma-entradamercancias-window').find('input[name=descuento]');
		var $campo_impuesto = $('#forma-entradamercancias-window').find('input[name=totimpuesto]');
		var $campo_total = $('#forma-entradamercancias-window').find('input[name=total]');
		
		//grid de errores
		
		
		//href para buscar producto
		var $buscar_producto = $('#forma-entradamercancias-window').find('a[href*=busca_producto]');
		//href para agregar producto al grid
		var $agregar_producto = $('#forma-entradamercancias-window').find('a[href*=agregar_producto]');
		
		var $cancelar_entrada = $('#forma-entradamercancias-window').find('#cancela_entrada');
		var $pdf_entrada = $('#forma-entradamercancias-window').find('#pdf_entrada');
	
		var $cerrar_plugin = $('#forma-entradamercancias-window').find('#close');
		var $cancelar_plugin = $('#forma-entradamercancias-window').find('#boton_cancelar');
		var $submit_actualizar = $('#forma-entradamercancias-window').find('#submit');
		
		$campo_flete.val(0);
		$id_entrada.val(0);
		
		//$campo_factura.css({'background' : '#ffffff'});
		$cancelar_entrada.hide();
		$pdf_entrada.hide();
		
		var respuestaProcesada = function(data){
			if ( data['success'] == "true" ){
				jAlert("La mercancia se ha dado de alta", 'Atencion!');
				var remove = function() { $(this).remove(); };
				$('#forma-entradamercancias-overlay').fadeOut(remove);
				$get_datos_grid();
			}else{
				// Desaparece todas las interrogaciones si es que existen
				$('#forma-entradamercancias-window').find('div.interrogacion').css({'display':'none'});
				$grid_productos.find('#cost').css({'background' : '#ffffff'});
				$grid_productos.find('#cant').css({'background' : '#ffffff'});
				$grid_productos.find('#cad').css({'background' : '#ffffff'});

				$('#forma-entradamercancias-window').find('#div_warning_grid').css({'display':'none'});
				$('#forma-entradamercancias-window').find('#div_warning_grid').find('#grid_warning').children().remove();


				var valor = data['success'].split('___');
				//muestra las interrogaciones
				for (var element in valor){
					tmp = data['success'].split('___')[element];
					longitud = tmp.split(':');

					if( longitud.length > 1 ){
						$('#forma-entradamercancias-window').find('img[rel=warning_' + tmp.split(':')[0] + ']')
						.parent()
						.css({'display':'block'})
						.easyTooltip({	tooltipId: "easyTooltip2",content: tmp.split(':')[1] });

						//alert(tmp.split(':')[0]);

						if(parseInt($("tr", $grid_productos).size())>0){
							for (var i=1;i<=parseInt($("tr", $grid_productos).size());i++){
								if((tmp.split(':')[0]=='costo'+i) || (tmp.split(':')[0]=='cantidad'+i) || (tmp.split(':')[0]=='caducidad'+i)){
									//alert(tmp.split(':')[0]);
									$('#forma-entradamercancias-window').find('#div_warning_grid').css({'display':'block'});
									
									if(tmp.split(':')[0].substring(0, 8) == 'cantidad'){
										$grid_productos.find('input[name=cantidad]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
									}
									if(tmp.split(':')[0].substring(0, 5) == 'costo'){
										$grid_productos.find('input[name=costo]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
									}
									
									var tr_warning = '<tr>';
											tr_warning += '<td width="20"><div><IMG SRC="../../img/icono_advertencia.png" ALIGN="top" rel="warning_sku"></td>';
											tr_warning += '<td width="120"><INPUT TYPE="text" value="' + $grid_productos.find('input[name=sku' + i + ']').val() + '" class="borde_oculto" readOnly="true" style="width:95px; color:red"></td>';
											tr_warning += '<td width="200"><INPUT TYPE="text" value="' + $grid_productos.find('input[name=titulo' + i + ']').val() + '" class="borde_oculto" readOnly="true" style="width:205px; color:red"></td>';
											tr_warning += '<td width="235"><INPUT TYPE="text" value="'+  tmp.split(':')[1] +'" class="borde_oculto" readOnly="true" style="width:285px; color:red"></td>';
									tr_warning += '</tr>';
									$('#forma-entradamercancias-window').find('#div_warning_grid').find('#grid_warning').append(tr_warning);
								}
							}
						}
					}
				}

				$('#forma-entradamercancias-window').find('#div_warning_grid').find('#grid_warning').find('tr:odd').find('td').css({ 'background-color' : '#FFFFFF'});
				$('#forma-entradamercancias-window').find('#div_warning_grid').find('#grid_warning').find('tr:even').find('td').css({ 'background-color' : '#e7e8ea'});			
			}
		}
		
		var options = {dataType :  'json', success : respuestaProcesada};
		$forma_selected.ajaxForm(options);
		
                
                
		//muestra fecha en input
		$campo_expedicion.val(mostrarFecha());
		$campo_expedicion.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
		});
		
		//seleccionar fecha
		$campo_expedicion.DatePicker({
			format:'Y-m-d',
			date: $(this).val(),
			current: $(this).val(),
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
				$campo_expedicion.val(formated);
				
				buscarTipoCambio($campo_expedicion.val());//busca tipo de cambio de la fecha seleccionada
				
				if (formated.match(patron) ){
					var valida_fecha=mayor($campo_expedicion.val(),mostrarFecha());
					
					if (valida_fecha==true){
						jAlert("Fecha no valida",'! Atencion');
						$campo_expedicion.val(mostrarFecha());
					}else{
						$campo_expedicion.DatePickerHide();	
					}
				}
			}
		});
		
		
		
		$.post(input_json,$arreglo,function(entry){
			$tasa_fletes.attr({ 'value' : entry['tasaFletes']['0']['valor'] });
			//alert(entry['tasaFletes']['0']['valor']);
			
			//carga select denominacion con todas las monedas
			$select_denominacion.children().remove();
			//var moneda_hmtl = '<option value="0" selected="yes">[--   --]</option>';
			var moneda_hmtl = '';
			$.each(entry['Monedas'],function(entryIndex,moneda){
				moneda_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion'] + '</option>';
			});
			$select_denominacion.append(moneda_hmtl);
			
			//carga select de companias fleteras
			$select_fleteras.children().remove();
			var fletera_hmtl = '<option value="0" selected="yes">[--   --]</option>';
			$.each(entry['Fleteras'],function(entryIndex,fletera){
				fletera_hmtl += '<option value="' + fletera['id'] + '"  >' + fletera['razon_social'] + '</option>';
			});
			$select_fleteras.append(fletera_hmtl);
			
			//carga select almacen destino
			$select_almacen_destino.children().remove();
			//var almacen_hmtl = '<option value="0" selected="yes">[--   --]</option>';
			var almacen_hmtl="";
			$.each(entry['Almacenes'],function(entryIndex,alm){
				almacen_hmtl += '<option value="' + alm['id'] + '"  >' + alm['titulo'] + '</option>';
			});
			$select_almacen_destino.append(almacen_hmtl);
			
			
			tiposIva = entry['Impuestos'];//asigna los tipos de impuestos al arrglo tiposIva
			Monedas = entry['Monedas'];//almacena las monedas en este arreglo
		},"json");//termina llamada json
		
		
		$('#forma-entradamercancias-window').find('input').keypress(function(e){
			if(e.which==13 ) {
				return false;
			}
		});
		
		
		//busca datos de la orden de compra al presionar Enter estando en el campo Orden Compra
		$campo_ordencompra.keypress(function(e){
			if(e.which == 13){
				
				var input_json2 = document.location.protocol + '//' + document.location.host + '/'+controller+'/getDatosOrdenCompra.json';
				$arreglo2 = {	'orden_compra':$campo_ordencompra.val(),
								'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
							};
				
				$.post(input_json2,$arreglo2,function(entry){
					
					$hidden_id_proveedor.attr({ 'value' : entry['DatosOC']['0']['proveedor_id'] });
					$campo_rfc_proveedor.attr({ 'value' : entry['DatosOC']['0']['rfc'] });
					$campo_razon_proveedor.attr({ 'value' : entry['DatosOC']['0']['razon_social'] });
					$hidden_tipo_proveedor.attr({ 'value' : entry['DatosOC']['0']['proveedortipo_id'] });
					
					//carga select denominacion con todas las monedas
					$select_denominacion.children().remove();
					var moneda_hmtl = '';
					$.each(Monedas,function(entryIndex,moneda){
						if(parseInt(moneda['id']) == parseInt(entry['DatosOC']['0']['moneda_id'])){
							moneda_hmtl += '<option value="' + moneda['id'] + '" selected="yes">' + moneda['descripcion'] + '</option>';
						}else{
							moneda_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion'] + '</option>';
						}
					});
					$select_denominacion.append(moneda_hmtl);
					
					
					
					
					if(entry['DetallesOC'] != null){
						$.each(entry['DetallesOC'],function(entryIndex,Grid){
							var trCount = $("tr", $grid_productos).size();
							trCount++;
							
							var valor_pedimento=" ";
							var tr_prod='';
							
							tr_prod += '<tr>';
								tr_prod += '<td width="65" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<a href="elimina_producto" id="eliminaprod'+ trCount +'">Eliminar</a>';
									tr_prod += '<input type="hidden" name="eliminado" id="eliminado" value="1">';//el 1 significa que el registro no ha sido eliminado
								tr_prod += '</td>';
								tr_prod += '<td width="100" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="hidden" name="id_prod_grid" id="idprod" value="'+  Grid['producto_id'] +'">';
									tr_prod += '<input type="text" id="skup" name="sku'+ trCount +'" value="' + Grid['sku'] + '" class="borde_oculto" style="width:96px;" readOnly="true">';
								tr_prod += '</td>';
								tr_prod += '<td width="200" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="titulo'+ trCount +'" value="' + Grid['titulo'] + '" class="borde_oculto" style="width:196px;" readOnly="true">';
								tr_prod += '</td>';
								tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="unidad" class="borde_oculto" value="' + Grid['unidad'] + '" readOnly="true" style="width:66px;">';
								tr_prod += '</td>';
								tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="hidden" name="id_pres" id="idpres" value="'+ Grid['id_presentacion'] +'">';
									tr_prod += '<input type="text" name="presentacion" class="borde_oculto" value="' + Grid['presentacion'] + '" readOnly="true" style="width:66px;">';
								tr_prod += '</td>';
								tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="cantidad" id="cant" value="' + Grid['cantidad'] + '" style="width:66px;">';
								tr_prod += '</td>';
								tr_prod += '<td width="75" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="costo" id="cost" value="' + Grid['costo'] + '" style="width:69px;">';
								tr_prod += '</td>';
								
								tr_prod += '<td width="90" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="importe'+ trCount +'" id="import" value="' + Grid['importe'] + '" style="width:86px; text-align:left;" readOnly="true">';
								tr_prod += '</td>';
								tr_prod += '<td width="82" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<select name="impuesto" id="imp" style="width:80px;">';
									//tr_prod += '<option value="0">[--  --]</option>';
									//aqui se carga el select con los tipos de iva
									$.each(tiposIva,function(entryIndex,tipos){
										if(tipos['id'] == Grid['tipo_impuesto']){
											tr_prod += '<option value="' + tipos['id'] + '"  selected="yes">' + tipos['descripcion'] + '</option>';
										}else{
											tr_prod += '<option value="' + tipos['id'] + '"  >' + tipos['descripcion'] + '</option>';
										}
									});
									
									tr_prod += '</select>';
									tr_prod += '<input type="hidden" name="valorimp" id="v_imp" value="' + Grid['valor_imp'] + '">';
									tr_prod += '<input type="hidden" name="totalimpuesto'+ trCount +'" id="totimp" value="0">';
								tr_prod += '</td>';
								
								
							tr_prod += '</tr>';
							$grid_productos.append(tr_prod);
							
								//al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
								$grid_productos.find('input[name=costo]').focus(function(e){
									if($(this).val() == ' '){
										$(this).val('');
									}
								});
								
								//recalcula importe al perder enfoque el campo costo
								$grid_productos.find('input[name=costo]').blur(function(){
									if ($(this).val() == ''  || $(this).val() == null){
										$(this).val(' ');
									}
									
									if( ($(this).val() != ' ') && ($(this).parent().parent().find('#cant').val() != ' ') )
									{	//calcula el importe
										$(this).parent().parent().find('#import').val(parseFloat($(this).val()) * parseFloat($(this).parent().parent().find('#cant').val()));
										//redondea el importe en dos decimales
										$(this).parent().parent().find('#import').val(parseFloat($(this).parent().parent().find('#import').val()).toFixed(2));
									}else{
										$(this).parent().parent().find('#import').val('');
									}
									$calcula_totales();//llamada a la funcion que calcula totales
								});

								//al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
								$grid_productos.find('input[name=cantidad]').focus(function(e){
									if($(this).val() == ' '){
										$(this).val('');
									}
								});

								//recalcula importe al perder enfoque el campo cantidad
								$grid_productos.find('input[name=cantidad]').blur(function(){
									if ($(this).val() == ''  || $(this).val() == null){
										$(this).val(' ');
									}
									if( ($(this).val() != ' ') && ($(this).parent().parent().find('#cost').val() != ' ') )
									{	//calcula el importe
										$(this).parent().parent().find('#import').val(parseFloat($(this).val()) * parseFloat($(this).parent().parent().find('#cost').val()));
										//redondea el importe en dos decimales
										$(this).parent().parent().find('#import').val(parseFloat($(this).parent().parent().find('#import').val()).toFixed(2));
									}else{
										$(this).parent().parent().find('#import').val('');
									}
									$calcula_totales();//llamada a la funcion que calcula totales
								});


								//validar campo costo, solo acepte numeros y punto
								$grid_productos.find('input[name=costo]').keypress(function(e){
									//alert(e.which);
									// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
									if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
										return true;
									}else {
										return false;
									}		
								});

								//validar campo cantidad, solo acepte numeros y punto
								$grid_productos.find('input[name=cantidad]').keypress(function(e){
									//alert(e.which);
									// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
									if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
										return true;
									}else {
										return false;
									}		
								});

								//elimina un producto del grid
								$grid_productos.find('#eliminaprod'+ trCount).bind('click',function(event){
									event.preventDefault();
									if(parseInt($(this).parent().find('#eliminado').val()) != 0){
										//asigna espacios en blanco a todos los input de la fila eliminada
										$(this).parent().parent().find('input').val(' ');
										//asigna un 0 al input eliminado como bandera para saber que esta eliminado
										$(this).parent().find('#eliminado').val(0);//cambiar valor del campo a 0 para indicar que se ha elimnado
										//oculta la fila eliminada
										$(this).parent().parent().hide();
										$calcula_totales();//llamada a la funcion que calcula totales
									}
								});
								
								//seleccionar tipo de  impuesto
								$grid_productos.find('select[name=impuesto]').change(function(){
									var valorImpuesto=0;
									var id_ivatipo = $(this).val();
									$.each(tiposIva,function(entryIndex,tipos){
										if(parseInt(tipos['id'])==parseInt(id_ivatipo)){
											valorImpuesto = tipos['iva_1'];
										}
									});
									$(this).parent().find('input[name=valorimp]').val(valorImpuesto);
									
									$calcula_totales();//llamada a la funcion que calcula totales
								});
													
						});
						
						
						$calcula_totales();//llamada a la funcion que calcula totales
					}
					
				});//termina llamada json
				
				//return false;
			}
		});
		
		
		
		$campo_tc.keypress(function(e){
			// Permitir solo numeros, borrar, suprimir, TAB, punto
			if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}
		});
		
		
		//buscar proveedor
		$buscar_proveedor.click(function(event){
			event.preventDefault();
			$busca_proveedores();
		});
		
		//buscar producto
		$buscar_producto.click(function(event){
			event.preventDefault();
			$busca_productos($campo_sku.val());
		});
		
		
		//agregar producto al grid
		$agregar_producto.click(function(event){
			event.preventDefault();
			//$agrega_producto_al_grid();
			$buscador_presentaciones_producto($campo_rfc_proveedor.val(),$campo_sku.val());
		});
		
		//desencadena clic del href Agregar producto al pulsar enter en el campo sku del producto
		$campo_sku.keypress(function(e){
			if(e.which == 13){
				$agregar_producto.trigger('click');
				return false;
			}
		});
		
		//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
		$campo_flete.focus(function(e){
			if(parseFloat($campo_flete.val())<1){
				$campo_flete.val('');
			}
		});
		
		//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
		$campo_flete.blur(function(e){
			if(parseFloat($campo_flete.val())==0||$campo_flete.val()==""){
				$campo_flete.val(0.0);
			}
			//var $monto_iva_flete = $('#forma-entradamercancias-window').find('input[name=iva_flete]');
			$calcula_totales();//llamada a la funcion que calcula totales
		});	

		$campo_flete.keypress(function(e){
			//alert(e.which);
			// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
			if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}
		});
		
		$submit_actualizar.bind('click',function(){
			var trCount = $("tr", $grid_productos).size();
			$total_tr.val(trCount);
			if(parseInt(trCount) > 0){
				$grid_productos.find('tr').each(function (index){
					if($(this).find('#cad').val() == '' ){
						$(this).find('#cad').val(' ');
					}
				});
				return true;
			}else{
				jAlert("No hay datos para actualizar", 'Atencion!');
				return false;
			}
		});
		
		//cerrar plugin
		$cerrar_plugin.bind('click',function(){
			var remove = function() { $(this).remove(); };
			$('#forma-entradamercancias-overlay').fadeOut(remove);
		});
		
		//boton cancelar y cerrar plugin
		$cancelar_plugin.click(function(event){
			var remove = function() { $(this).remove(); };
			$('#forma-entradamercancias-overlay').fadeOut(remove);
		});
		
	});
	
	
	
	var carga_formaEntradamercancias00_for_datagrid00 = function(id_to_show, accion_mode){
		//aqui entra para eliminar una entrada
		if(accion_mode == 'cancel'){
			var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/' + 'logicDelete.json';
			$arreglo = {'no_entrada':id_to_show,
						'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
						};
			jConfirm('Realmente desea eliminar la entrada seleccionada?', 'Dialogo de confirmacion', function(r) {
				if (r){
					$.post(input_json,$arreglo,function(entry){
						if ( entry['success'] == '1' ){
							jAlert("La entrada fue eliminada exitosamente", 'Atencion!');
							$get_datos_grid();
						}
						else{
							jAlert("La entrada no pudo ser eliminada", 'Atencion!');
						}
					},"json");
				}
			});
                        
		}else{
			//aqui  entra para editar un registro
			var form_to_show = 'formaEntradamercancias00';
			$('#' + form_to_show).each (function(){   this.reset(); });
			var $forma_selected = $('#' + form_to_show).clone();
			$forma_selected.attr({ id : form_to_show + id_to_show });
			//var accion = "get_datos_entrada_mercancia";
			
			$(this).modalPanel_Entradamercancias();
			
			$('#forma-entradamercancias-window').css({ "margin-left": -375, 	"margin-top": -230 });
			
			$forma_selected.prependTo('#forma-entradamercancias-window');
			$forma_selected.find('.panelcito_modal').attr({ id : 'panelcito_modal' + id_to_show , style:'display:table'});
			
			$tabs_li_funxionalidad();
			
			
			//alert(id_to_show);
			
			if(accion_mode == 'edit'){
                                
				var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_datos_entrada_mercancia.json';
				$arreglo = {'id_entrada':id_to_show,
							'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
							};
				
				var $id_entrada = $('#forma-entradamercancias-window').find('input[name=id_entrada]');
				var $tasa_fletes = $('#forma-entradamercancias-window').find('input[name=tasafletes]');
				
				var $total_tr = $('#forma-entradamercancias-window').find('input[name=total_tr]');
				var $campo_factura = $('#forma-entradamercancias-window').find('input[name=factura]');
				var $campo_ordencompra = $('#forma-entradamercancias-window').find('input[name=ordencompra]');
				var $campo_numeroguia = $('#forma-entradamercancias-window').find('input[name=numeroguia]');
				var $campo_expedicion = $('#forma-entradamercancias-window').find('input[name=expedicion]');
				var $select_denominacion = $('#forma-entradamercancias-window').find('select[name=denominacion]');
				var $select_fleteras = $('#forma-entradamercancias-window').find('select[name=fletera]');
				var $select_almacen_destino = $('#forma-entradamercancias-window').find('select[name=almacen_destino]');
				var $campo_tc = $('#forma-entradamercancias-window').find('input[name=tc]');
				var $campo_observaciones = $('#forma-entradamercancias-window').find('textarea[name=observaciones]');
				var $select_tipo_doc = $('#forma-entradamercancias-window').find('select[name=tipodoc]');
				
				//campos del proveedor
				var $buscar_proveedor = $('#forma-entradamercancias-window').find('a[href*=busca_proveedor]');
				var $hidden_id_proveedor = $('#forma-entradamercancias-window').find('input[name=id_proveedor]');
				var $campo_rfc_proveedor = $('#forma-entradamercancias-window').find('input[name=rfcproveedor]');
				var $campo_razon_proveedor = $('#forma-entradamercancias-window').find('input[name=razon_proveedor]');
				//var $campo_dir_proveedor = $('#forma-entradamercancias-window').find('input[name=dir_proveedor]');
				var $campo_tipo_proveedor = $('#forma-entradamercancias-window').find('input[name=tipo_proveedor]');
				
				var $campo_sku = $('#forma-entradamercancias-window').find('input[name=sku_producto]');
				
				//tabla contenedor del listado de productos
				var $grid_productos = $('#forma-entradamercancias-window').find('#grid_productos');
				//campos de totales
				var $campo_flete = $('#forma-entradamercancias-window').find('input[name=flete]');
				var $campo_subtotal = $('#forma-entradamercancias-window').find('input[name=subtotal]');
				var $campo_descuento = $('#forma-entradamercancias-window').find('input[name=descuento]');
				var $campo_impuesto = $('#forma-entradamercancias-window').find('input[name=totimpuesto]');
				var $campo_total = $('#forma-entradamercancias-window').find('input[name=total]');
				
				
				//href para buscar producto
				var $buscar_producto = $('#forma-entradamercancias-window').find('a[href*=busca_producto]');
				//href para agregar producto al grid
				var $agregar_producto = $('#forma-entradamercancias-window').find('a[href*=agregar_producto]');
				
				var $cancelar_entrada = $('#forma-entradamercancias-window').find('#cancela_entrada');
				var $pdf_entrada = $('#forma-entradamercancias-window').find('#pdf_entrada');
				
				
				var $cerrar_plugin = $('#forma-entradamercancias-window').find('#close');
				var $cancelar_plugin = $('#forma-entradamercancias-window').find('#boton_cancelar');
				var $submit_actualizar = $('#forma-entradamercancias-window').find('#submit');
				$submit_actualizar.hide();//ocultar boton para que no permita actualizar
				
				$campo_flete.val(0);
				$campo_factura.attr("readonly", true);
				$campo_ordencompra.attr("readonly", true);
				$campo_numeroguia.attr("readonly", true);
				$campo_expedicion.attr("readonly", true);
				$campo_tc.attr("readonly", true);
				$campo_observaciones.attr("readonly", true);
				$campo_flete.attr("readonly", true);
				
				
				var respuestaProcesada = function(data){
					if ( data['success'] == "true" ){
						jAlert("La mercancia se guardo con exito", 'Atencion!');
						var remove = function() { $(this).remove(); };
						$('#forma-entradamercancias-overlay').fadeOut(remove);
						$get_datos_grid();
					}else{
						// Desaparece todas las interrogaciones si es que existen
						$('#forma-entradamercancias-window').find('div.interrogacion').css({'display':'none'});
						$grid_productos.find('#cost').css({'background' : '#ffffff'});
						$grid_productos.find('#cant').css({'background' : '#ffffff'});
						$grid_productos.find('#cad').css({'background' : '#ffffff'});

						$('#forma-entradamercancias-window').find('#div_warning_grid').css({'display':'none'});
						$('#forma-entradamercancias-window').find('#div_warning_grid').find('#grid_warning').children().remove();
								
						
						var valor = data['success'].split('___');
						//muestra las interrogaciones
						for (var element in valor){
							tmp = data['success'].split('___')[element];
							longitud = tmp.split(':');
							
							if( longitud.length > 1 ){
								$('#forma-entradamercancias-window').find('img[rel=warning_' + tmp.split(':')[0] + ']')
								.parent()
								.css({'display':'block'})
								.easyTooltip({tooltipId: "easyTooltip2",content: tmp.split(':')[1]});
								
								//alert(tmp.split(':')[0]);
								
								if(parseInt($("tr", $grid_productos).size())>0){
									for (var i=1;i<=parseInt($("tr", $grid_productos).size());i++){
										if((tmp.split(':')[0]=='costo'+i) || (tmp.split(':')[0]=='cantidad'+i) || (tmp.split(':')[0]=='caducidad'+i)){
											
											$('#forma-entradamercancias-window').find('#div_warning_grid').css({'display':'block'});
											//$grid_productos.find('input[name=' + tmp.split(':')[0] + ']').css({'background' : '#d41000'});
											
											if(tmp.split(':')[0].substring(0, 8) == 'cantidad'){
												$grid_productos.find('input[name=cantidad]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
											}
											
											if(tmp.split(':')[0].substring(0, 5) == 'costo'){
												$grid_productos.find('input[name=costo]').eq(parseInt(i) - 1) .css({'background' : '#d41000'});
											}
											
											
											var tr_warning = '<tr>';
													tr_warning += '<td width="20"><div><IMG SRC="../../img/icono_advertencia.png" ALIGN="top" rel="warning_sku"></td>';
													tr_warning += '<td width="120"><INPUT TYPE="text" value="' + $grid_productos.find('input[name=sku' + i + ']').val() + '" class="borde_oculto" readOnly="true" style="width:95px; color:red"></td>';
													tr_warning += '<td width="200"><INPUT TYPE="text" value="' + $grid_productos.find('input[name=titulo' + i + ']').val() + '" class="borde_oculto" readOnly="true" style="width:205px; color:red"></td>';
													tr_warning += '<td width="235"><INPUT TYPE="text" value="'+  tmp.split(':')[1] +'" class="borde_oculto" readOnly="true" style="width:285px; color:red"></td>';
											tr_warning += '</tr>';
											
											$('#forma-entradamercancias-window').find('#div_warning_grid').find('#grid_warning').append(tr_warning);
										}
										
									}
								}
							}
						}
						$('#forma-entradamercancias-window').find('#div_warning_grid').find('#grid_warning').find('tr:odd').find('td').css({ 'background-color' : '#FFFFFF'});
						$('#forma-entradamercancias-window').find('#div_warning_grid').find('#grid_warning').find('tr:even').find('td').css({ 'background-color' : '#e7e8ea'});
					}
				}
				
				var options = {dataType :  'json', success : respuestaProcesada};
				$forma_selected.ajaxForm(options);
				
				//aqui se cargan los campos al editar
				$.post(input_json,$arreglo,function(entry){
					$tasa_fletes.attr({ 'value' : entry['tasaFletes']['0']['valor'] });
					$id_entrada.attr({ 'value' : entry['datosEntrada']['0']['id'] });
					$campo_factura.attr({ 'value' : entry['datosEntrada']['0']['factura'] });
					$campo_ordencompra.attr({ 'value' : entry['datosEntrada']['0']['orden_compra'] });
					$campo_numeroguia.attr({ 'value' : entry['datosEntrada']['0']['numero_guia'] });
					$campo_expedicion.attr({ 'value' : entry['datosEntrada']['0']['expedicion'] });
					$campo_tc.attr({ 'value' : entry['datosEntrada']['0']['tipo_cambio'] });
					$campo_observaciones.text(entry['datosEntrada']['0']['observaciones']);
					
					
					//carga select denominacion con todas las monedas
					$select_denominacion.children().remove();
					//var moneda_hmtl = '<option value="0">[--   --]</option>';
					var moneda_hmtl = '';
					$.each(entry['Monedas'],function(entryIndex,moneda){
						if(parseInt(moneda['id']) == parseInt(entry['datosEntrada']['0']['moneda_id'])){
							moneda_hmtl += '<option value="' + moneda['id'] + '" selected="yes">' + moneda['descripcion'] + '</option>';
						}else{
							//moneda_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion'] + '</option>';
						}
					});
					$select_denominacion.append(moneda_hmtl);
					
					
					//carga select denominacion con todas las monedas
					$select_tipo_doc.children().remove();
					var tipo_doc_hmtl = '';
					if(parseInt(entry['datosEntrada']['0']['tipo_documento'])==1){
						tipo_doc_hmtl += '<option value="1" selected="yes">Factura</option>';
					}else{
						tipo_doc_hmtl += '<option value="2" selected="yes">Remision</option>';
					}
					$select_tipo_doc.append(tipo_doc_hmtl);
					
					
					$.each(entry['datosProveedor'],function(entryIndex,proveedor){
						$hidden_id_proveedor.attr({ 'value' : proveedor['id'] });
						$campo_rfc_proveedor.attr({ 'value' : proveedor['rfc'] });
						$campo_razon_proveedor.attr({ 'value' : proveedor['razon_social'] });
						//$campo_dir_proveedor.attr({ 'value' : proveedor['direccion'] });
						$campo_tipo_proveedor.attr({ 'value' : proveedor['proveedortipo_id'] });
					});
					
					
					//carga select de companias fleteras
					$select_fleteras.children().remove();
					//var fletera_hmtl = '<option value="0">[--   --]</option>';
					var fletera_hmtl = '';
					$.each(entry['Fleteras'],function(entryIndex,fletera){
						if(parseInt(fletera['id']) == parseInt(entry['datosEntrada'][0]['fletera_id'])){
							fletera_hmtl += '<option value="' + fletera['id'] + '" selected="yes">' + fletera['razon_social'] + '</option>';
						}else{
							//fletera_hmtl += '<option value="' + fletera['id'] + '">' + fletera['razon_social'] + '</option>';
						}
					});
					$select_fleteras.append(fletera_hmtl);
					
					//carga select almacen destino
					$select_almacen_destino.children().remove();
					//var almacen_hmtl = '<option value="0" selected="yes">[--   --]</option>';
					var almacen_hmtl="";
					$.each(entry['Almacenes'],function(entryIndex,alm){
						if(parseInt(alm['id']) == parseInt(entry['datosEntrada'][0]['almacen_destino'])){
							almacen_hmtl += '<option value="' + alm['id'] + '"  selected="yes">' + alm['titulo'] + '</option>';
						}else{
							//almacen_hmtl += '<option value="' + alm['id'] + '"  >' + alm['titulo'] + '</option>';
						}
					});
					$select_almacen_destino.append(almacen_hmtl);
					
					
					tiposIva = entry['Impuestos'];//asigna los tipos de impuestos al arreglo tiposIva
					
					
					if(entry['datosGrid'] != null){
						$.each(entry['datosGrid'],function(entryIndex,prodGrid){
							var trCount = $("tr", $grid_productos).size();
							trCount++;
							
							var valor_pedimento=" ";
							var tr_prod='';
							
							tr_prod += '<tr>';
								tr_prod += '<td width="65" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<a href="elimina_producto" id="eliminaprod'+ trCount +'">Eliminar</a>';
									tr_prod += '<input type="hidden" name="eliminado" id="eliminado" value="1">';//el 1 significa que el registro no ha sido eliminado
								tr_prod += '</td>';
								tr_prod += '<td width="100" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="hidden" name="id_prod_grid" id="idprod" value="'+  prodGrid['producto_id'] +'">';
									tr_prod += '<input type="text" id="skup" name="sku'+ trCount +'" value="' + prodGrid['sku'] + '" class="borde_oculto" style="width:96px;" readOnly="true">';
								tr_prod += '</td>';
								tr_prod += '<td width="200" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="titulo'+ trCount +'" value="' + prodGrid['titulo'] + '" class="borde_oculto" style="width:196px;" readOnly="true">';
								tr_prod += '</td>';
								tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="unidad" class="borde_oculto" value="' + prodGrid['unidad'] + '" readOnly="true" style="width:66px;">';
								tr_prod += '</td>';
								tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="hidden" name="id_pres" id="idpres" value="'+ prodGrid['id_presentacion'] +'">';
									tr_prod += '<input type="text" name="presentacion" class="borde_oculto" value="' + prodGrid['presentacion'] + '" readOnly="true" style="width:66px;">';
								tr_prod += '</td>';
								tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="cantidad" id="cant" value="' + prodGrid['cantidad'] + '" style="width:66px;">';
								tr_prod += '</td>';
								tr_prod += '<td width="75" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="costo" id="cost" value="' + prodGrid['costo'] + '" style="width:69px;">';
								tr_prod += '</td>';
								
								tr_prod += '<td width="90" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="importe'+ trCount +'" id="import" value="' + prodGrid['importe'] + '" style="width:86px; text-align:right;" readOnly="true">';
								tr_prod += '</td>';
								tr_prod += '<td width="82" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<select name="impuesto" id="imp" style="width:80px;">';
									//tr_prod += '<option value="0">[--  --]</option>';
									//aqui se carga el select con los tipos de iva
									$.each(tiposIva,function(entryIndex,tipos){
										if(tipos['id'] == prodGrid['tipo_impuesto']){
											tr_prod += '<option value="' + tipos['id'] + '"  selected="yes">' + tipos['descripcion'] + '</option>';
										}else{
											//tr_prod += '<option value="' + tipos['id'] + '"  >' + tipos['descripcion'] + '</option>';
										}
									});
									
									tr_prod += '</select>';
									tr_prod += '<input type="hidden" name="valorimp" id="v_imp" value="' + prodGrid['valor_imp'] + '">';
									tr_prod += '<input type="hidden" name="totalimpuesto'+ trCount +'" id="totimp" value="0">';
								tr_prod += '</td>';
								
								if(prodGrid['pedimento_aduanal']!='' && prodGrid['pedimento_aduanal']!=null){
									valor_pedimento=prodGrid['pedimento_aduanal'];
								}
								
							tr_prod += '</tr>';
							$grid_productos.append(tr_prod);
							
								
								//al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
								$grid_productos.find('input[name=costo]').focus(function(e){
									if($(this).val() == ' '){
										$(this).val('');
									}
								});
								
								//recalcula importe al perder enfoque el campo costo
								$grid_productos.find('input[name=costo]').blur(function(){
									if ($(this).val() == ''  || $(this).val() == null){
										$(this).val(' ');
									}
									
									if( ($(this).val() != ' ') && ($(this).parent().parent().find('#cant').val() != ' ') )
									{	//calcula el importe
										$(this).parent().parent().find('#import').val(parseFloat($(this).val()) * parseFloat($(this).parent().parent().find('#cant').val()));
										//redondea el importe en dos decimales
										//$(this).parent().parent().find('#import').val(Math.round(parseFloat($(this).parent().parent().find('#import').val())*100)/100);
										$(this).parent().parent().find('#import').val(parseFloat($(this).parent().parent().find('#import').val()).toFixed(2));
									}else{
										$(this).parent().parent().find('#import').val('');
									}
									$calcula_totales();//llamada a la funcion que calcula totales
								});

								//al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
								$grid_productos.find('input[name=cantidad]').focus(function(e){
									if($(this).val() == ' '){
										$(this).val('');
									}
								});

								//recalcula importe al perder enfoque el campo cantidad
								$grid_productos.find('input[name=cantidad]').blur(function(){
									if ($(this).val() == ''  || $(this).val() == null){
										$(this).val(' ');
									}
									if( ($(this).val() != ' ') && ($(this).parent().parent().find('#cost').val() != ' ') )
									{	//calcula el importe
										$(this).parent().parent().find('#import').val(parseFloat($(this).val()) * parseFloat($(this).parent().parent().find('#cost').val()));
										//redondea el importe en dos decimales
										//$(this).parent().parent().find('#import').val(Math.round(parseFloat($(this).parent().parent().find('#import').val())*100)/100);
										$(this).parent().parent().find('#import').val(parseFloat($(this).parent().parent().find('#import').val()).toFixed(2));
									}else{
										$(this).parent().parent().find('#import').val('');
									}
									$calcula_totales();//llamada a la funcion que calcula totales
								});


								//validar campo costo, solo acepte numeros y punto
								$grid_productos.find('input[name=costo]').keypress(function(e){
									//alert(e.which);
									// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
									if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
										return true;
									}else {
										return false;
									}		
								});

								//validar campo cantidad, solo acepte numeros y punto
								$grid_productos.find('input[name=cantidad]').keypress(function(e){
									//alert(e.which);
									// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
									if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
										return true;
									}else {
										return false;
									}		
								});

								//elimina un producto del grid
								$grid_productos.find('#eliminaprod'+ trCount).bind('click',function(event){
									event.preventDefault();
									if(parseInt($(this).parent().find('#eliminado').val()) != 0){
										if($(this).parent().parent().find('#import').val()!=' ' && $(this).parent().parent().find('#import').val()!=''){
											//$campo_subtotal.val(parseFloat($campo_subtotal.val()) - parseFloat($(this).parent().parent().find('#import').val()));
											//calcula total
											//$campo_total.val(parseFloat($campo_subtotal.val()) + parseFloat($campo_impuesto.val()));

										}
										//asigna espacios en blanco a todos los input de la fila eliminada
										$(this).parent().parent().find('input').val(' ');
										//asigna un 0 al input eliminado como bandera para saber que esta eliminado
										$(this).parent().find('#eliminado').val(0);//cambiar valor del campo a 0 para indicar que se ha elimnado
										//oculta la fila eliminada
										$(this).parent().parent().hide();
										$calcula_totales();//llamada a la funcion que calcula totales
									}
								});
								
								//seleccionar tipo de  impuesto
								$grid_productos.find('select[name=impuesto]').change(function(){
									var valorImpuesto=0;
									var id_ivatipo = $(this).val();
									$.each(tiposIva,function(entryIndex,tipos){
										if(parseInt(tipos['id'])==parseInt(id_ivatipo)){
											valorImpuesto = tipos['iva_1'];
										}
									});
									$(this).parent().find('input[name=valorimp]').val(valorImpuesto);
									
									$calcula_totales();//llamada a la funcion que calcula totales
								});
													
						});
						$campo_flete.val(Math.round(parseFloat( entry['datosEntrada']['0']['flete'])*100)/100);
						
						$calcula_totales();//llamada a la funcion que calcula totales
					}
					
					
					if(entry['datosEntrada']['0']['estado'] == 'CANCELADO'){
						$buscar_proveedor.hide();
						$buscar_producto.hide();
						$agregar_producto.hide();
						$cancelar_entrada.hide();
						$campo_sku.attr("readonly", true);
						$grid_productos.find('a').hide();
						$grid_productos.find('#cost').attr("readonly", true);
						$grid_productos.find('#cant').attr("readonly", true);
						//$grid_productos.find('#imp').attr('disabled','-1'); //deshabilitar
						$grid_productos.find('#ped').attr("readonly", true);
						//$grid_productos.find('#cad').attr("readonly", true);
						$grid_productos.find('#cad').attr('disabled','disabled'); 
						$submit_actualizar.hide();
					}
				},"json");//termina llamada json
				
				
				
				
				$campo_tc.keypress(function(e){
					// Permitir solo numeros, borrar, suprimir, TAB, punto
					if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
						return true;
					}else {
						return false;
					}
				});
				
				//buscar proveedor
				$buscar_proveedor.click(function(event){
					event.preventDefault();
					//$busca_proveedores();
					jAlert("El proveedor no puede ser cambiado", 'Atencion!');
				});
				
				//buscar producto
				$buscar_producto.click(function(event){
					event.preventDefault();
					$busca_productos($campo_sku.val());
				});
				
                                
				//agregar producto al grid
				$agregar_producto.click(function(event){
					event.preventDefault();
					//$agrega_producto_al_grid();
					$buscador_presentaciones_producto($campo_rfc_proveedor.val(),$campo_sku.val());
				});
				
				//desencadena clic del href Agregar producto al pulsar enter en el campo sku del producto
				$campo_sku.keypress(function(e){
					if(e.which == 13){
						$agregar_producto.trigger('click');
						return false;
					}
				});
				
				//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
				$campo_flete.focus(function(e){
					if(parseFloat($campo_flete.val())<1){
						$campo_flete.val('');
					}
				});
				//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
				$campo_flete.blur(function(e){
					if(parseFloat($campo_flete.val())==0||$campo_flete.val()==""){
						$campo_flete.val(0);
					}
				});	
                                
				$campo_flete.keypress(function(e){
					//alert(e.which);
					// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
					if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
						return true;
					}else {
						return false;
					}
				});
				
				//descargar pdf de factura
				$pdf_entrada.click(function(event){
					var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
					var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/get_genera_pdf_entrada/'+$id_entrada.val()+'/'+iu+'/out.json';
					window.location.href=input_json;
				});
				
				
				//cancelar 
				$cancelar_entrada.click(function(event){
					event.preventDefault();
					var id_to_show = 0;
					$(this).modalPanel_cancelaentrada();
					var form_to_show = 'formaCancelaEntrada';
					$('#' + form_to_show).each (function(){this.reset();});
					var $forma_selected = $('#' + form_to_show).clone();
					$forma_selected.attr({id : form_to_show + id_to_show});
					$('#forma-cancelaentrada-window').css({"margin-left": -100, 	"margin-top": -200});
					$forma_selected.prependTo('#forma-cancelaentrada-window');
					$forma_selected.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
					
					var $motivo_cancelacion = $('#forma-cancelaentrada-window').find('textarea[name=motivo_cancel]');
					
					var $cancel = $('#forma-cancelaentrada-window').find('a[href*=cancelentrada]');
					var $exit = $('#forma-cancelaentrada-window').find('a[href*=salir]');
					
					//cancela la entrada
					$cancel.click(function(event){
						event.preventDefault();
						if($motivo_cancelacion.val()!=null && $motivo_cancelacion.val()!=""){
							var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/cancelar_entrada.json';
							$arreglo = {'id_entrada':$id_entrada.val(),
										'motivo':$motivo_cancelacion.val(),
										'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
										}
							
							$.post(input_json,$arreglo,function(entry){
								//var cad = entry['success'].split(":");
								/*if(cad[1]=='false'){
									jAlert("La Entrada "+cad[0]+" tiene pagos aplicados. Es necesario cancelar primeramente los pagos y despues cancelar la factura.", 'Atencion!');
								}else{
									jAlert("La Entrada "+cad[0]+"  se ha cancelado con &eacute;xito", 'Atencion!');
									$cancelar_entrada.hide();
									$get_datos_grid();
								}*/
								
								if(entry['success']=='true'){
									jAlert("La Entrada  se ha cancelado con &eacute;xito", 'Atencion!');
									$cancelar_entrada.hide();
									$buscar_proveedor.hide();
									$buscar_producto.hide();
									$agregar_producto.hide();
									$campo_sku.attr("readonly", true);
									$grid_productos.find('a').hide();
									$grid_productos.find('#cost').attr("readonly", true);
									$grid_productos.find('#cant').attr("readonly", true);
									//$grid_productos.find('#imp').attr('disabled','-1'); //deshabilitar
									$grid_productos.find('#ped').attr("readonly", true);
									//$grid_productos.find('#cad').attr("readonly", true);
									$grid_productos.find('#cad').attr('disabled','disabled'); 
									$submit_actualizar.hide();
									$get_datos_grid();
								}else{
									jAlert("La factura No se pudo cancelar. Un proceso posterior ha afectado datos de &eacute;sta entrada.", 'Atencion!');
								}
								
								var remove = function() {$(this).remove();};
								$('#forma-cancelaentrada-overlay').fadeOut(remove);
							});//termina llamada json
						}else{
							jAlert("Es necesario ingresar el motivo de la cancelaci&oacute;n", 'Atencion!');
						}
					});
					
					
					$exit.click(function(event){
						event.preventDefault();
						$cancelar_entrada.hide();
						var remove = function() {$(this).remove();};
						$('#forma-cancelaentrada-overlay').fadeOut(remove);
					});
					
				});//termina cancelar Entrada
				
				
				
				
				
				
				$submit_actualizar.bind('click',function(){
					var trCount = $("tr", $grid_productos).size();
					$total_tr.val(trCount);
                                        
					$grid_productos.find('tr').each(function (index){
						if($(this).find('#cad').val() == '' ){
							$(this).find('#cad').val(' ');
						}
					});
                                        
					return true;
				});
                                
				//Ligamos el boton cancelar al evento click para eliminar la forma
				$cancelar_plugin.bind('click',function(){
					var remove = function() { $(this).remove(); };
					$('#forma-entradamercancias-overlay').fadeOut(remove);
				});
				
				$cerrar_plugin.bind('click',function(){
					var remove = function() { $(this).remove(); };
					$('#forma-entradamercancias-overlay').fadeOut(remove);
				});
                                
                                
                                
                                
                                
				
			}
		}
	}
        
        
        
        
	$get_datos_grid = function(){
		var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_all_entradas.json';
		
		var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
		
		$arreglo = {'orderby':'id','desc':'DESC','items_por_pag':10,'pag_start':1,'display_pag':10,'input_json':'/'+controller+'/get_all_entradas.json', 'cadena_busqueda':$cadena_busqueda, 'iu':iu}
		
		$.post(input_json,$arreglo,function(data){
			//pinta_grid
			//$.fn.tablaOrdenable(data,$('#lienzo_recalculable').find('.tablesorter'),carga_formaEntradamercancias00_for_datagrid00);
			
			//aqui se utiliza el mismo datagrid que prefacturas. Solo muesta icono de detalles, el de eliminar No
			$.fn.tablaOrdenablePrefacturas(data,$('#lienzo_recalculable').find('.tablesorter'),carga_formaEntradamercancias00_for_datagrid00);
			
			//resetea elastic, despues de pintar el grid y el slider
			Elastic.reset(document.getElementById('lienzo_recalculable'));
		},"json");
	}
	
    $get_datos_grid();
});


