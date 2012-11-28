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
	var controller = $contextpath.val()+"/controllers/productos";
    
    //Barra para las acciones
    $('#barra_acciones').append($('#lienzo_recalculable').find('.table_acciones'));
    $('#barra_acciones').find('.table_acciones').css({'display':'block'});
	var $new_producto = $('#barra_acciones').find('.table_acciones').find('a[href*=new_item]');
	var $visualiza_buscador = $('#barra_acciones').find('.table_acciones').find('a[href*=visualiza_buscador]');
	
	//aqui va el titulo del catalogo
	$('#barra_titulo').find('#td_titulo').append('Cat&aacute;logo de Productos');
	
	//barra para el buscador 
	$('#barra_buscador').append($('#lienzo_recalculable').find('.tabla_buscador'));
	$('#barra_buscador').find('.tabla_buscador').css({'display':'block'});
	
	var $cadena_busqueda = "";
	var $sku_busqueda = $('#barra_buscador').find('.tabla_buscador').find('input[name=sku_busqueda]');
	var $campo_descripcion_busqueda = $('#barra_buscador').find('.tabla_buscador').find('input[name=descripcion]');
	var $select_tipo_productos_busqueda = $('#barra_buscador').find('.tabla_buscador').find('select[name=tipo_productos]');
	
	var $buscar = $('#barra_buscador').find('.tabla_buscador').find('input[value$=Buscar]');
	var $limpiar = $('#barra_buscador').find('.tabla_buscador').find('input[value$=Limpiar]');
	
	var to_make_one_search_string = function(){
		var valor_retorno = "";
		
		var signo_separador = "=";
		valor_retorno += "sku_busqueda" + signo_separador + $sku_busqueda.val() + "|";
		valor_retorno += "descripcion_busqueda" + signo_separador + $campo_descripcion_busqueda.val() + "|";
		valor_retorno += "por_tipo" + signo_separador + $select_tipo_productos_busqueda.val() + "|";
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
		$campo_descripcion_busqueda.val('');
		$select_tipo_productos_busqueda.find('option[index=0]').attr('selected','selected');
	});
	
	
	TriggerClickVisializaBuscador = 0;
	//visualizar  la barra del buscador
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
	
	
	var input_json_lineas = document.location.protocol + '//' + document.location.host + '/'+controller+'/getProductoTipos.json';
	$arreglo = {'iu':$('#lienzo_recalculable').find('input[name=iu]').val()}
	$.post(input_json_lineas,$arreglo,function(data){
		//Llena el select tipos de productos en el buscador
		$select_tipo_productos_busqueda.children().remove();
		var prod_tipos_html = '<option value="0" selected="yes">[-- --]</option>';
		$.each(data['prodTipos'],function(entryIndex,pt){
			prod_tipos_html += '<option value="' + pt['id'] + '"  >' + pt['titulo'] + '</option>';
		});
		$select_tipo_productos_busqueda.append(prod_tipos_html);
	});
	
	
	$tabs_li_funxionalidad = function(){
		var $select_prod_tipo = $('#forma-product-window').find('select[name=select_prodtipo]');
		var $incluye_produccion = $('#forma-product-window').find('input[name=incluye_pro]');
		
		$('#forma-product-window').find('#submit').mouseover(function(){
			$('#forma-product-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/bt1.png");
		})
		$('#forma-product-window').find('#submit').mouseout(function(){
			$('#forma-product-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/btn1.png");
		})
		$('#forma-product-window').find('#boton_cancelar').mouseover(function(){
			$('#forma-product-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/bt2.png)"});
		})
		$('#forma-product-window').find('#boton_cancelar').mouseout(function(){
			$('#forma-product-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/btn2.png)"});
		})
		
		$('#forma-product-window').find('#close').mouseover(function(){
			$('#forma-product-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close_over.png)"});
		})
		$('#forma-product-window').find('#close').mouseout(function(){
			$('#forma-product-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close.png)"});
		})
		
		$('#forma-product-window').find(".contenidoPes").hide(); //Hide all content
		$('#forma-product-window').find("ul.pestanas li:first").addClass("active").show(); //Activate first tab
		$('#forma-product-window').find(".contenidoPes:first").show(); //Show first tab content
		
		//On Click Event
		$('#forma-product-window').find("ul.pestanas li").click(function() {
			$('#forma-product-window').find(".contenidoPes").hide();
			$('#forma-product-window').find("ul.pestanas li").removeClass("active");
			var activeTab = $(this).find("a").attr("href");
			$('#forma-product-window').find( activeTab , "ul.pestanas li" ).fadeIn().show();
			$(this).addClass("active");
			
			if(activeTab == '#tabx-1'){
				if( parseInt($select_prod_tipo.val())==2 || parseInt($select_prod_tipo.val())==3){
					if($incluye_produccion.val()=='false'){
						if( parseInt($select_prod_tipo.val())==2){
							$('#forma-product-window').find('.product_div_one').css({'height':'505px'});
						}
					}else{
						$('#forma-product-window').find('.product_div_one').css({'height':'350px'});
					}
					
					if( parseInt($select_prod_tipo.val())==3){
						$('#forma-product-window').find('.product_div_one').css({'height':'505px'});
					}
				}else{
					$('#forma-product-window').find('.product_div_one').css({'height':'350px'});
				}
			}
			
			if(activeTab == '#tabx-2'){
				$('#forma-product-window').find('.product_div_one').css({'height':'405px'});
			}
			
			if(activeTab == '#tabx-3'){
				$('#forma-product-window').find('.product_div_one').css({'height':'225px'});
			}
			
			//$finction_redimensiona_divs($('#forma-product-window'));
			return false;
		});
	}
	
	
	solo_numeros = function($campo_input){
		//validar campo cantidad, solo acepte numeros y punto
		$campo_input.keypress(function(e){
			// Permitir  numeros, borrar, suprimir, TAB
			if (e.which == 8 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}		
		});
	}
	
	
	
	//buscador de Cuentas Contables
	$busca_cuentas_contables = function(tipo, nivel_cta, arrayCtasMayor){
		//limpiar_campos_grids();
		$(this).modalPanel_buscactacontable();
		var $dialogoc =  $('#forma-buscactacontable-window');
		//var $dialogoc.prependTo('#forma-buscaproduct-window');
		$dialogoc.append($('div.buscador_cuentas').find('table.formaBusqueda_cuentas').clone());
		
		$('#forma-buscactacontable-window').css({"margin-left": -200, 	"margin-top": -160});
		
		var $tabla_resultados = $('#forma-buscactacontable-window').find('#tabla_resultado');
		
		var $select_cta_mayor = $('#forma-buscactacontable-window').find('select[name=select_cta_mayor]');
		var $campo_clasif = $('#forma-buscactacontable-window').find('input[name=clasif]');
		var $campo_cuenta = $('#forma-buscactacontable-window').find('input[name=cuenta]');
		var $campo_scuenta = $('#forma-buscactacontable-window').find('input[name=scuenta]');
		var $campo_sscuenta = $('#forma-buscactacontable-window').find('input[name=sscuenta]');
		var $campo_ssscuenta = $('#forma-buscactacontable-window').find('input[name=ssscuenta]');
		var $campo_sssscuenta = $('#forma-buscactacontable-window').find('input[name=sssscuenta]');
		var $campo_descripcion = $('#forma-buscactacontable-window').find('input[name=campo_descripcion]');
		
		var $boton_busca = $('#forma-buscactacontable-window').find('#boton_busca');
		var $boton_cencela = $('#forma-buscactacontable-window').find('#boton_cencela');
		var mayor_seleccionado=0;
		var detalle=0;
		var clasifica=0;
		
		$campo_cuenta.hide();
		$campo_scuenta.hide();
		$campo_sscuenta.hide();
		$campo_ssscuenta.hide();
		$campo_sssscuenta.hide();
		
		solo_numeros($campo_clasif);
		solo_numeros($campo_cuenta);
		solo_numeros($campo_scuenta);
		solo_numeros($campo_sscuenta);
		solo_numeros($campo_ssscuenta);
		solo_numeros($campo_sssscuenta);
		
		//funcionalidad botones
		$boton_busca.mouseover(function(){
			$(this).removeClass("onmouseOutBuscar").addClass("onmouseOverBuscar");
		});
		
		$boton_busca.mouseout(function(){
			$(this).removeClass("onmouseOverBuscar").addClass("onmouseOutBuscar");
		});
		
		$boton_cencela.mouseover(function(){
			$(this).removeClass("onmouseOutCancelar").addClass("onmouseOverCancelar");
		});
		
		$boton_cencela.mouseout(function(){
			$(this).removeClass("onmouseOverCancelar").addClass("onmouseOutCancelar");
		});
		
		if(parseInt(nivel_cta) >=1 ){ $campo_cuenta.show(); };
		if(parseInt(nivel_cta) >=2 ){ $campo_scuenta.show(); };
		if(parseInt(nivel_cta) >=3 ){ $campo_sscuenta.show(); };
		if(parseInt(nivel_cta) >=4 ){ $campo_ssscuenta.show(); };
		if(parseInt(nivel_cta) >=5 ){ $campo_sssscuenta.show(); };
		
		//mayor_seleccionado 1=Activo	clasifica=1(Activo Circulante)
		//mayor_seleccionado 5=Egresos	clasifica=1(Costo de Ventas)
		//mayor_seleccionado 4=Activo	clasifica=1
		if(parseInt(tipo)==1 ){mayor_seleccionado=1; detalle=1; clasifica=1; };
		if(parseInt(tipo)==2 ){mayor_seleccionado=5; detalle=1; clasifica=1; };
		if(parseInt(tipo)==3 ){mayor_seleccionado=4; detalle=1; clasifica=1; };
		
		$campo_clasif.val(clasifica);
		
		//carga select de cuentas de Mayor
		$select_cta_mayor.children().remove();
		var ctamay_hmtl = '';
		$.each(arrayCtasMayor,function(entryIndex,ctamay){
			if (parseInt(mayor_seleccionado) == parseInt( ctamay['id']) ){
				ctamay_hmtl += '<option value="' + ctamay['id'] + '">'+ ctamay['titulo'] + '</option>';
			}
		});
		$select_cta_mayor.append(ctamay_hmtl);
		
		//click buscar Cuentas Contables
		$boton_busca.click(function(event){
			//event.preventDefault();
			var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getBuscadorCuentasContables.json';
			$arreglo = {	'cta_mayor':$select_cta_mayor.val(),
							'detalle':detalle,
							'clasifica':$campo_clasif.val(),
							'cta':$campo_cuenta.val(),
							'scta':$campo_scuenta.val(),
							'sscta':$campo_sscuenta.val(),
							'ssscta':$campo_ssscuenta.val(),
							'sssscta':$campo_sssscuenta.val(),
							'descripcion':$campo_descripcion.val(),
							'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
						}
			
			var trr = '';
			$tabla_resultados.children().remove();
			$.post(input_json,$arreglo,function(entry){
				var notr=0;
				$.each(entry['CtaContables'],function(entryIndex,cuenta){
					//obtiene numero de trs
					notr = $("tr", $tabla_resultados).size();
					notr++;
					
					trr = '<tr class="tr'+notr+'">';
						trr += '<td width="30">'+cuenta['m']+'</td>';
						trr += '<td width="30">'+cuenta['c']+'</td>';
						trr += '<td width="170">';
							trr += '<input type="hidden" name="id_cta" value="'+cuenta['id']+'" >';
							trr += '<input type="text" name="cta" value="'+cuenta['cuenta']+'" class="borde_oculto" style="width:166px; readOnly="true">';
							trr += '<input type="hidden" name="campo_cta" value="'+cuenta['cta']+'" >';
							trr += '<input type="hidden" name="campo_scta" value="'+cuenta['subcta']+'" >';
							trr += '<input type="hidden" name="campo_sscta" value="'+cuenta['ssubcta']+'" >';
							trr += '<input type="hidden" name="campo_ssscta" value="'+cuenta['sssubcta']+'" >';
							trr += '<input type="hidden" name="campo_ssscta" value="'+cuenta['ssssubcta']+'" >';
						trr += '</td>';
						trr += '<td width="230"><input type="text" name="des" value="'+cuenta['descripcion']+'" class="borde_oculto" style="width:226px; readOnly="true"></td>';
						trr += '<td width="70">'+cuenta['detalle']+'</td>';
						trr += '<td width="50">'+cuenta['nivel_cta']+'</td>';
					trr += '</tr>';
					$tabla_resultados.append(trr);
				});
				$tabla_resultados.find('tr:odd').find('td').css({'background-color' : '#e7e8ea'});
				$tabla_resultados.find('tr:even').find('td').css({'background-color' : '#FFFFFF'});
				
				$('tr:odd' , $tabla_resultados).hover(function () {
					$(this).find('td').css({background : '#FBD850'});
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
					var id_cta = $(this).find('input[name=id_cta]').val();
					var cta = $(this).find('input[name=campo_cta]').val();
					var scta = $(this).find('input[name=campo_scta]').val();
					var sscta = $(this).find('input[name=campo_sscta]').val();
					var ssscta = $(this).find('input[name=campo_ssscta]').val();
					var sssscta = $(this).find('input[name=campo_ssscta]').val();
					var desc = $(this).find('input[name=des]').val();
					
					if(parseInt(tipo)==1 ){ 
						$('#forma-product-window').find('input[name=id_cta_gasto]').val(id_cta);
						$('#forma-product-window').find('input[name=gas_cuenta]').val(cta);
						$('#forma-product-window').find('input[name=gas_scuenta]').val(scta);
						$('#forma-product-window').find('input[name=gas_sscuenta]').val(sscta);
						$('#forma-product-window').find('input[name=gas_ssscuenta]').val(ssscta);
						$('#forma-product-window').find('input[name=gas_sssscuenta]').val(sssscta);
						$('#forma-product-window').find('input[name=gas_descripcion]').val(desc);
					};
					
					if(parseInt(tipo)==2 ){ 
						$('#forma-product-window').find('input[name=id_cta_costvent]').val(id_cta);
						$('#forma-product-window').find('input[name=costvent_cuenta]').val(cta);
						$('#forma-product-window').find('input[name=costvent_scuenta]').val(scta);
						$('#forma-product-window').find('input[name=costvent_sscuenta]').val(sscta);
						$('#forma-product-window').find('input[name=costvent_ssscuenta]').val(ssscta);
						$('#forma-product-window').find('input[name=costvent_sssscuenta]').val(sssscta);
						$('#forma-product-window').find('input[name=costvent_descripcion]').val(desc);
					};
					
					if(parseInt(tipo)==3 ){ 
						$('#forma-product-window').find('input[name=id_cta_vent]').val(id_cta);
						$('#forma-product-window').find('input[name=vent_cuenta]').val(cta);
						$('#forma-product-window').find('input[name=vent_scuenta]').val(scta);
						$('#forma-product-window').find('input[name=vent_sscuenta]').val(sscta);
						$('#forma-product-window').find('input[name=vent_ssscuenta]').val(ssscta);
						$('#forma-product-window').find('input[name=vent_sssscuenta]').val(sssscta);
						$('#forma-product-window').find('input[name=vent_descripcion]').val(desc);
					};
					
					//elimina la ventana de busqueda
					var remove = function() {$(this).remove();};
					$('#forma-buscactacontable-overlay').fadeOut(remove);
					//asignar el enfoque al campo sku del producto
					$('#forma-pocpedidos-window').find('input[name=sku_producto]').focus();
				});
			});//termina llamada json
		});
		
		$campo_clasif.keypress(function(e){
			if(e.which == 13){
				$boton_busca.trigger('click');
				return false;
			}
		});
		
		$campo_cuenta.keypress(function(e){
			if(e.which == 13){
				$boton_busca.trigger('click');
				return false;
			}
		});
		
		$campo_scuenta.keypress(function(e){
			if(e.which == 13){
				$boton_busca.trigger('click');
				return false;
			}
		});
		
		$campo_sscuenta.keypress(function(e){
			if(e.which == 13){
				$boton_busca.trigger('click');
				return false;
			}
		});
		
		$campo_ssscuenta.keypress(function(e){
			if(e.which == 13){
				$boton_busca.trigger('click');
				return false;
			}
		});
		
		$campo_sssscuenta.keypress(function(e){
			if(e.which == 13){
				$boton_busca.trigger('click');
				return false;
			}
		});
		
		$campo_descripcion.keypress(function(e){
			if(e.which == 13){
				$boton_busca.trigger('click');
				return false;
			}
		});
		
		$boton_cencela.click(function(event){
			//event.preventDefault();
			var remove = function() {$(this).remove();};
			$('#forma-buscactacontable-overlay').fadeOut(remove);
		});
	}//termina buscador de Cuentas Contables

	
	
	//buscador de producto ingrediente
	$buscador_producto_ingrediente = function(){
		$(this).modalPanel_Buscaproducto();
		var $dialogoc =  $('#forma-buscaproducto-window');
		//var $dialogoc.prependTo('#forma-buscaproduct-window');
		$dialogoc.append($('div.buscador_productos').find('table.formaBusqueda_productos').clone());
		
		$('#forma-buscaproducto-window').css({"margin-left": -200, 	"margin-top": -180});
		
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
		
		
		//Aqui asigno al campo sku del buscador si el usuario ingresó un sku antes de hacer clic en buscar en la ventana principal
		//$campo_sku.val(sku_buscar);
		
		//click buscar productos
		$buscar_plugin_producto.click(function(event){
			//event.preventDefault();
			var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_buscador_productos_ingredientes.json';
			$arreglo = {
					'sku':$campo_sku.val(),
					'tipo':$select_tipo_producto.val(),
					'descripcion':$campo_descripcion.val(),
					'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
				}
			var trr = '';
			$tabla_resultados.children().remove();
			$.post(input_json,$arreglo,function(entry){
				$.each(entry['Productos'],function(entryIndex,producto){
					trr = '<tr>';
						trr += '<td width="120"><span class="sku_prod_buscador">'+producto['sku']+'</span></td>';
						trr += '<td width="280"><span class="titulo_prod_buscador">'+producto['descripcion']+'</span></td>';
						trr += '<td width="90"><span class="unidad_prod_buscador">'+producto['unidad']+'</span></td>';
						trr += '<td width="90"><span class="tipo_prod_buscador">'+producto['tipo']+'</span></td>';
					trr += '</tr>';
					$tabla_resultados.append(trr);
				});
				$tabla_resultados.find('tr:odd').find('td').css({'background-color' : '#e7e8ea'});
				$tabla_resultados.find('tr:even').find('td').css({'background-color' : '#FFFFFF'});
				
				$('tr:odd' , $tabla_resultados).hover(function () {
					$(this).find('td').css({background : '#FBD850'});
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
					$('#forma-product-window').find('input[name=sku_minigrid]').val($(this).find('span.sku_prod_buscador').html());
					$('#forma-product-window').find('input[name=descr_prod_minigrid]').val($(this).find('span.titulo_prod_buscador').html());
					//elimina la ventana de busqueda
					var remove = function() {$(this).remove();};
					$('#forma-buscaproducto-overlay').fadeOut(remove);
				});
				
			});//termina llamada json
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
	}
	
	//agrega producto al grid
	$agrega_producto_ingrediente = function(){
			var $select_prodtipo = $('#forma-product-window').find('select[name=select_prodtipo]');
			var $campo_sku_minigrid = $('#forma-product-window').find('input[name=sku_minigrid]');
			var $campo_buscar_prod_minigrid = $('#forma-product-window').find('input[name=descr_prod_minigrid]');
			
			var $grid_productos_componentes = $('#forma-product-window').find('#grid_productos');
			
			var $total_porcentaje = $('#forma-product-window').find('input[name=total_porcentaje]');
			//var $total_tr = $('#forma-product-window').find('input[name=total_tr]');
			
			if($campo_sku_minigrid.val() != null && $campo_sku_minigrid.val() != ''){
				var encontrado=0;
				
				if( parseInt($select_prodtipo.val())==3 ){
					$total_porcentaje.val(0);
				}
				
				if(parseInt($total_porcentaje.val())<1){
					$grid_productos_componentes.find('tbody > tr').each(function (index){
						if(($(this).find('#sku').text()==$campo_sku_minigrid.val().toUpperCase()) && (parseInt($(this).find('#delete').val())!=0)){
							encontrado=1;
						}
					});
					
					if(encontrado==0){
						var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_busca_sku_prod.json';
						$arreglo = {'sku':$campo_sku_minigrid.val(),
										'iu': $('#lienzo_recalculable').find('input[name=iu]').val()
									}
						
						$.post(input_json,$arreglo,function(prod){
							var res=0;
							if(prod['Sku'][0] != null){
								var trCount = $("tbody > tr", $grid_productos_componentes).size();
								trCount++;
								var valor_componente=0;
								
								if( parseInt($select_prodtipo.val())==3 ){
									valor_componente=1;
								}
								
								var trr = '';
								trr = '<tr>';
									trr += '<td class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;" width="70">';
										trr += '<a href=#>Eliminar</a>';
										trr += '<input type="hidden" id="delete" name="eliminar" value="'+prod['Sku'][0]['id']+'">';
										trr += '<input type="hidden" 	name="no_tr" value="'+ trCount +'">';
									trr += '</td>';
									trr += '<td class="grid1" style="font-size: 11px;  border:1px solid #C1DAD7;" width="180">';
										trr += '<input type="text" 	value="'+ prod['Sku'][0]['sku'] +'" id="sku" class="borde_oculto" readOnly="true" style="width:176px;">';
									trr += '</td>';
									trr += '<td class="grid1" style="font-size: 11px;  border:1px solid #C1DAD7;" width="330">';
										trr += '<input type="text" 		name="nombre" 	value="'+ prod['Sku'][0]['descripcion'] +'" class="borde_oculto" readOnly="true" style="width:326px;">';
									trr += '</td>';
									trr += '<td class="grid1" style="font-size: 11px;  border:1px solid #C1DAD7;" width="120">';
										trr += '<input type="hidden" id="dec" name="decimales" value="'+ prod['Sku'][0]['decimales']+'">';
										trr += '<input type="text" id="porcentaje" class="porcentaje'+trCount+'" name="porcentaje_grid" value="'+valor_componente+'" style="width:116px;">';
									trr += '</td>';
									
								trr += '</tr>';
								
								var tabla = $grid_productos_componentes.find('tbody');
								tabla.append(trr);
								
								tabla.find('a').bind('click',function(event){
									var total_porcentaje=0;
									if(parseInt($(this).parent().find('#delete').val()) != 0){
										//alert("Alert1: "+total_porcentaje+"  Campo total:"+$total_porcentaje.val());
										total_porcentaje = parseFloat($total_porcentaje.val())-parseFloat($(this).parent().parent().find('#porcentaje').val());
										$total_porcentaje.val(total_porcentaje);
										//alert("Alert2: "+total_porcentaje+"  Campo total:"+$total_porcentaje.val());
										$(this).parent().find('#delete').val(0);
										$(this).parent().parent().hide();
									}
								});
								
								/*
								var numero_decimales = $(this).parent().parent().find('#numdec').val();
								var patron = /^-?[0-9]+([,\.][0-9]{0,0})?$/;
								if(parseInt(numero_decimales)==1){
									patron = /^-?[0-9]+([,\.][0-9]{0,1})?$/;
								}
								if(parseInt(numero_decimales)==2){
									patron = /^-?[0-9]+([,\.][0-9]{0,2})?$/;
								}
								if(parseInt(numero_decimales)==3){
									patron = /^-?[0-9]+([,\.][0-9]{0,3})?$/;
								}
								if(parseInt(numero_decimales)==4){
									patron = /^-?[0-9]+([,\.][0-9]{0,4})?$/;
								}
								
								
								if(patron.test($(this).val())){
									alert("Si valido"+$(this).val());
								}else{
									alert("El numero de decimales es incorrecto: "+$(this).val());
									$(this).val('')
								}
								*/
								
								
								if( parseInt($select_prodtipo.val())==2 ){
									var total_inicial=0
									$grid_productos_componentes.find('tbody > tr').each(function (index){
										if(parseInt($(this).find('#delete').val())!=0){
											total_inicial = parseFloat(total_inicial) + parseFloat($(this).find('#porcentaje').val());
										}
										$total_porcentaje.val(total_inicial);
									});
									
									//calcula porcentaje al perder enfoque 
									tabla.find('.porcentaje'+trCount).blur(function(){
										if(parseFloat($(this).val())==0 || $(this).val()=='') {
											$(this).val(1);
										}
										
										var total=0
										var patron=/^([0-9]){1,12}[.]?[0-9]*$/
										if(patron.test($(this).val())){
											$grid_productos_componentes.find('tbody > tr').each(function (index){
												if(parseInt($(this).find('#delete').val())!=0){
													total = parseFloat(total) + parseFloat($(this).find('#porcentaje').val());
												}
												$total_porcentaje.val(total);
											});
											if(parseFloat($total_porcentaje.val())>1){
												jAlert("Has excedido la Unidad del producto",'! Atencion');
											}
										}else{
											jAlert("La cantidad debe tener un 0, ejemplo: 0.5, 0.1, 0.9",'! Atencion');
											$(this).val(0.0)
										}
									});
								}
								
								
								
								if( parseInt($select_prodtipo.val())==3 ){
									var total_inicial=0
									$grid_productos_componentes.find('tbody > tr').each(function (index){
										if(parseInt($(this).find('#delete').val())!=0){
											total_inicial = parseFloat(total_inicial) + parseFloat($(this).find('#porcentaje').val());
										}
										$total_porcentaje.val(total_inicial);
									});
									
									//calcula porcentaje al perder enfoque 
									tabla.find('.porcentaje'+trCount).blur(function(){
										if(parseFloat($(this).val()) < 1 || $(this).val()=='') {
											$(this).val(1);
										}
										
										var total=0
										$grid_productos_componentes.find('tbody > tr').each(function (index){
											if(parseInt($(this).find('#delete').val())!=0){
												total = parseFloat(total) + parseFloat($(this).find('#porcentaje').val());
											}
											$total_porcentaje.val(total);
										});
									});
								}
								
								
							}else{
								jAlert("El producto que intenta agregar no existe, pruebe ingresando otro.\nHaga clic en Buscar.",'! Atencion');
							}
						},"json");
					}else{
						jAlert("El producto ya se encuentra en la lista.",'! Atencion');
					}
					
				}else{
					jAlert("La Cantidad de ingredientes ya acomplet&oacute; la Unidad del producto.",'! Atencion');
				}
			}else{
				jAlert("Ingrese un C&oacute;digo de producto valido", 'Atencion!');
			}
	}
	
	
	
	//habilitar y deshabilitar campos
	$deshabilitar_campos = function(estado,$proveedor,$tiempos_de_entrega,$select_prod_tipo,$select_estatus,$select_seccion,$select_grupo,$select_linea,$select_marca,$select_clase,$select_familia,$select_subfamilia,$select_unidad,$select_clasifstock,$select_iva,$select_ieps,$check_noserie,$check_nom,$check_nolote,$check_pedimento,$check_stock,$check_ventaext,$check_compraext,$select_disponibles,$select_seleccionados,$agregar_pres,$remover_pres,$densidad, $valor_maximo, $valor_minimo, $punto_reorden){
		if(estado == 'desahabilitar'){
			$agregar_pres.hide();
			$remover_pres.hide();
			if(!$select_seccion.is(':disabled')) {
				$proveedor.attr('disabled','-1');
				$tiempos_de_entrega.attr('disabled','-1');
				//$select_prod_tipo.attr('disabled','-1');
				//$select_estatus.attr('disabled','-1');
				$select_seccion.attr('disabled','-1');
				$select_grupo.attr('disabled','-1');
				$select_linea.attr('disabled','-1');
				$select_marca.attr('disabled','-1');
				$select_clase.attr('disabled','-1');
				$select_familia.attr('disabled','-1');
				$select_subfamilia.attr('disabled','-1');
				$select_unidad.attr('disabled','-1');
				$select_clasifstock.attr('disabled','-1');
				$select_iva.attr('disabled','-1');
				$select_ieps.attr('disabled','-1');
				$check_noserie.attr('disabled','-1');
				$check_nom.attr('disabled','-1');
				$check_nolote.attr('disabled','-1');
				$check_pedimento.attr('disabled','-1');
				$check_stock.attr('disabled','-1');
				$check_ventaext.attr('disabled','-1');
				$check_compraext.attr('disabled','-1');
				$select_disponibles.attr('disabled','-1');
				$select_seleccionados.attr('disabled','-1');
				$densidad.attr('disabled','-1');
				$valor_maximo.attr('disabled','-1');
				$valor_minimo.attr('disabled','-1');
				$punto_reorden.attr('disabled','-1');
			}
		}
		
		if(estado == 'habilitar'){
			$agregar_pres.show();
			$remover_pres.show();
			if($select_seccion.is(':disabled')) {
				$proveedor.removeAttr('disabled');
				$tiempos_de_entrega.removeAttr('disabled');
				//$select_prod_tipo.removeAttr('disabled');
				//$select_estatus.removeAttr('disabled');
				$select_seccion.removeAttr('disabled');
				$select_grupo.removeAttr('disabled');
				$select_linea.removeAttr('disabled');
				$select_marca.removeAttr('disabled');
				$select_clase.removeAttr('disabled');
				$select_familia.removeAttr('disabled');
				$select_subfamilia.removeAttr('disabled');
				$select_unidad.removeAttr('disabled');
				$select_clasifstock.removeAttr('disabled');
				$select_iva.removeAttr('disabled');
				$select_ieps.removeAttr('disabled');
				$check_noserie.removeAttr('disabled');
				$check_nom.removeAttr('disabled');
				$check_nolote.removeAttr('disabled');
				$check_pedimento.removeAttr('disabled');
				$check_stock.removeAttr('disabled');
				$check_ventaext.removeAttr('disabled');
				$check_compraext.removeAttr('disabled');
				$select_disponibles.removeAttr('disabled');
				$select_seleccionados.removeAttr('disabled');
				$densidad.removeAttr('disabled');
				$valor_maximo.removeAttr('disabled');
				$valor_minimo.removeAttr('disabled');
				$punto_reorden.removeAttr('disabled');
			}
		}
	}//termina  habilitar y deshabilitar campos
	
	
	
	
	$new_producto.click(function(event){
		event.preventDefault();
		var id_to_show = 0;
		
		$(this).modalPanel_Products();
		
		var form_to_show = 'formaProducto00';
		$('#' + form_to_show).each (function(){this.reset();});
		var $forma_selected = $('#' + form_to_show).clone();
		$forma_selected.attr({id : form_to_show + id_to_show});
		
		$('#forma-product-window').css({"margin-left": -260, 	"margin-top": -220});
		
		$forma_selected.prependTo('#forma-product-window');
		$forma_selected.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
		
		$tabs_li_funxionalidad();
		
		var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getProducto.json';
		$arreglo = {'id_producto':id_to_show,
						'iu': $('#lienzo_recalculable').find('input[name=iu]').val()
					};
		
		//variables del catalogo
		var $incluye_produccion = $('#forma-product-window').find('input[name=incluye_pro]');
		var $campo_id_producto = $('#forma-product-window').find('input[name=id_producto]');
		var $codigo = $('#forma-product-window').find('input[name=codigo]');
		var $descripcion = $('#forma-product-window').find('input[name=descripcion]');
		var $codigo_barras = $('#forma-product-window').find('input[name=codigo_barras]');
		var $proveedor = $('#forma-product-window').find('input[name=proveedor]');
		var $id_proveedor = $('#forma-product-window').find('input[name=id_proveedor]');
		var $tiempos_de_entrega = $('#forma-product-window').find('input[name=tentrega]');
		var $densidad = $('#forma-product-window').find('input[name=densidad]');
		var $valor_maximo = $('#forma-product-window').find('input[name=valor_maximo]');
		var $valor_minimo = $('#forma-product-window').find('input[name=valor_minimo]');
		var $punto_reorden = $('#forma-product-window').find('input[name=punto_reorden]');
		
		var $select_estatus = $('#forma-product-window').find('select[name=select_estatus]');
		var $select_seccion = $('#forma-product-window').find('select[name=select_seccion]');
		var $select_grupo = $('#forma-product-window').find('select[name=select_grupo]');
		var $select_linea = $('#forma-product-window').find('select[name=select_linea]');
		var $select_marca = $('#forma-product-window').find('select[name=select_marca]');
		var $select_clase = $('#forma-product-window').find('select[name=select_clase]');
		var $select_familia = $('#forma-product-window').find('select[name=select_familia]');
		var $select_subfamilia = $('#forma-product-window').find('select[name=select_subfamilia]');
		var $select_prod_tipo = $('#forma-product-window').find('select[name=select_prodtipo]');
		var $tipo_producto_anterior = $('#forma-product-window').find('input[name=tipo_producto_anterior]');
		
		var $select_unidad = $('#forma-product-window').find('select[name=select_unidad]');
		var $select_clasifstock = $('#forma-product-window').find('select[name=select_clasifstock]');
		var $select_iva = $('#forma-product-window').find('select[name=select_iva]');
		var $select_ieps = $('#forma-product-window').find('select[name=select_ieps]');
		
		var $check_noserie = $('#forma-product-window').find('input[name=check_noserie]');
		var $check_nom = $('#forma-product-window').find('input[name=check_nom]');
		var $check_nolote = $('#forma-product-window').find('input[name=check_nolote]');
		var $check_pedimento = $('#forma-product-window').find('input[name=check_pedimento]');
		var $check_stock = $('#forma-product-window').find('input[name=check_stock]');
		var $check_ventaext = $('#forma-product-window').find('input[name=check_ventaext]');
		var $check_compraext = $('#forma-product-window').find('input[name=check_compraext]');
		
		//presentaciones seleccionados y disponibles
		var $select_disponibles= $('#forma-product-window').find('select[name=disponibles]');
		var $select_seleccionados = $('#forma-product-window').find('select[name=seleccionados]');
		var $campo_pres_on = $('#forma-product-window').find('input[name=pres_on]');
		
		//agregar y remover presentaciones
		var $agregar_pres = $('#forma-product-window').find('a[href*=agregar_pres]');
		var $remover_pres = $('#forma-product-window').find('a[href*=remover_pres]');
		
		var $grid_productos_componentes = $('#forma-product-window').find('#grid_productos');
		var $total_porcentaje = $('#forma-product-window').find('input[name=total_porcentaje]');
		var $total_tr = $('#forma-product-window').find('input[name=total_tr]');
		
		//variables de los href
		var $agregar_prod = $('#forma-product-window').find('a[href*=agregar_produ_minigrid]');
		var $buscar_prod_ingrediente = $('#forma-product-window').find('a[href*=busca_producto_ingrediente]');
		var $busca_proveedor = $('#forma-product-window').find('a[href*=busca_proveedor]');
		
		var $pestana_contabilidad = $('#forma-product-window').find('ul.pestanas').find('a[href*=#tabx-3]');
		
		var $id_cta_gas = $('#forma-product-window').find('input[name=id_cta_gas]');
		var $gas_cuenta = $('#forma-product-window').find('input[name=gas_cuenta]');
		var $gas_scuenta = $('#forma-product-window').find('input[name=gas_scuenta]');
		var $gas_sscuenta = $('#forma-product-window').find('input[name=gas_sscuenta]');
		var $gas_ssscuenta = $('#forma-product-window').find('input[name=gas_ssscuenta]');
		var $gas_sssscuenta = $('#forma-product-window').find('input[name=gas_sssscuenta]');
		var $gas_descripcion = $('#forma-product-window').find('input[name=gas_descripcion]');
		
		var $id_cta_costvent = $('#forma-product-window').find('input[name=id_cta_costvent]');
		var $costvent_cuenta = $('#forma-product-window').find('input[name=costvent_cuenta]');
		var $costvent_scuenta = $('#forma-product-window').find('input[name=costvent_scuenta]');
		var $costvent_sscuenta = $('#forma-product-window').find('input[name=costvent_sscuenta]');
		var $costvent_ssscuenta = $('#forma-product-window').find('input[name=costvent_ssscuenta]');
		var $costvent_sssscuenta = $('#forma-product-window').find('input[name=costvent_sssscuenta]');
		var $costvent_descripcion = $('#forma-product-window').find('input[name=costvent_descripcion]');
		
		var $id_cta_vent = $('#forma-product-window').find('input[name=id_cta_vent]');
		var $vent_cuenta = $('#forma-product-window').find('input[name=vent_cuenta]');
		var $vent_scuenta = $('#forma-product-window').find('input[name=vent_scuenta]');
		var $vent_sscuenta = $('#forma-product-window').find('input[name=vent_sscuenta]');
		var $vent_ssscuenta = $('#forma-product-window').find('input[name=vent_ssscuenta]');
		var $vent_sssscuenta = $('#forma-product-window').find('input[name=vent_sssscuenta]');
		var $vent_descripcion = $('#forma-product-window').find('input[name=vent_descripcion]');
		
		var $busca_gasto = $('#forma-product-window').find('a[href=busca_gasto]');
		var $busca_costvent = $('#forma-product-window').find('a[href=busca_costvent]');
		var $busca_vent = $('#forma-product-window').find('a[href=busca_vent]');
		
		var $limpiar_gasto = $('#forma-product-window').find('a[href=limpiar_gasto]');
		var $limpiar_costvent = $('#forma-product-window').find('a[href=limpiar_costvent]');
		var $limpiar_vent = $('#forma-product-window').find('a[href=limpiar_vent]');
		
		var $cerrar_plugin = $('#forma-product-window').find('#close');
		var $cancelar_plugin = $('#forma-product-window').find('#boton_cancelar');
		var $submit_actualizar = $('#forma-product-window').find('#submit');
		
		//var $cancel_button = $('#forma-product-window').find('input[value$=Cancelar]');
		$campo_id_producto.val(0);
		$total_porcentaje.val(0);
		
		//$codigo.attr({ 'readOnly':true });
		//$codigo.css({'background' : '#DDDDDD'});
		$proveedor.attr({'readOnly':true});
		$busca_proveedor.hide();
		
		$gas_cuenta.hide();
		$gas_scuenta.hide();
		$gas_sscuenta.hide();
		$gas_ssscuenta.hide();
		$gas_sssscuenta.hide();
		
		$costvent_cuenta.hide();
		$costvent_scuenta.hide();
		$costvent_sscuenta.hide();
		$costvent_ssscuenta.hide();
		$costvent_sssscuenta.hide();
		
		$vent_cuenta.hide();
		$vent_scuenta.hide();
		$vent_sscuenta.hide();
		$vent_ssscuenta.hide();
		$vent_sssscuenta.hide();
		
		var respuestaProcesada = function(data){
			if ( data['success'] == "true" ){
				jAlert("Producto dado de alta", 'Atencion!');
				var remove = function() {$(this).remove();};
				$('#forma-product-overlay').fadeOut(remove);
				$get_datos_grid();
			}
			else{
				// Desaparece todas las interrogaciones si es que existen
				$('#forma-product-window').find('div.interrogacion').css({'display':'none'});
				
				var valor = data['success'].split('___');
				//muestra las interrogaciones
				for (var element in valor){
					tmp = data['success'].split('___')[element];
					longitud = tmp.split(':');
					if( longitud.length > 1 ){
						$('#forma-product-window').find('img[rel=warning_' + tmp.split(':')[0] + ']')
						.parent()
						.css({'display':'block'})
						.easyTooltip({tooltipId: "easyTooltip2",content: tmp.split(':')[1]});
					}
				}
			};
		}
		
		var options = {dataType :  'json', success : respuestaProcesada};
		$forma_selected.ajaxForm(options);
		
		$.post(input_json,$arreglo,function(entry){
			$incluye_produccion.val(entry['Extras']['0']['mod_produccion']);
			
			if( entry['Extras'][0]['incluye_contab']=='false' ){
				$pestana_contabilidad.parent().hide();
			}else{
				//visualizar subcuentas de acuerdo al nivel definido para la empresa
				if(parseInt(entry['Extras'][0]['nivel_cta']) >=1 ){ $gas_cuenta.show(); $costvent_cuenta.show(); $vent_cuenta.show();  };
				if(parseInt(entry['Extras'][0]['nivel_cta']) >=2 ){ $gas_scuenta.show(); $costvent_scuenta.show(); $vent_scuenta.show(); };
				if(parseInt(entry['Extras'][0]['nivel_cta']) >=3 ){ $gas_sscuenta.show(); $costvent_sscuenta.show(); $vent_sscuenta.show(); };
				if(parseInt(entry['Extras'][0]['nivel_cta']) >=4 ){ $gas_ssscuenta.show(); $costvent_ssscuenta.show(); $vent_ssscuenta.show(); };
				if(parseInt(entry['Extras'][0]['nivel_cta']) >=5 ){ $gas_sssscuenta.show(); $costvent_sssscuenta.show(); $vent_sssscuenta.show(); };
				
				//busca Cuenta Gastos
				$busca_gasto.click(function(event){
					event.preventDefault();
					$busca_cuentas_contables(1, entry['Extras'][0]['nivel_cta'], entry['CtaMay']);
				});
				
				//busca Cuenta Costo de Venta
				$busca_costvent.click(function(event){
					event.preventDefault();
					$busca_cuentas_contables(2, entry['Extras'][0]['nivel_cta'], entry['CtaMay']);
				});
				
				//busca Cuenta Venta
				$busca_vent.click(function(event){
					event.preventDefault();
					$busca_cuentas_contables(3, entry['Extras'][0]['nivel_cta'], entry['CtaMay']);
				});
				
				
				//limpiar campos Cuenta Gastos
				$limpiar_gasto.click(function(event){
					event.preventDefault();
					$id_cta_gas.val(0);
					$gas_cuenta.val('');
					$gas_scuenta.val('');
					$gas_sscuenta.val('');
					$gas_ssscuenta.val('');
					$gas_sssscuenta.val('');
					$gas_descripcion.val('');
				});
				
				//limpiar campos Cuenta Costo de Venta
				$limpiar_costvent.click(function(event){
					event.preventDefault();
					$id_cta_costvent.val(0);
					$costvent_cuenta.val('');
					$costvent_scuenta.val('');
					$costvent_sscuenta.val('');
					$costvent_ssscuenta.val('');
					$costvent_sssscuenta.val('');
					$costvent_descripcion.val('');
				});
				
				//limpiar campos Cuenta Venta
				$limpiar_vent.click(function(event){
					event.preventDefault();
					$id_cta_vent.val(0);
					$vent_cuenta.val('');
					$vent_scuenta.val('');
					$vent_sscuenta.val('');
					$vent_ssscuenta.val('');
					$vent_sssscuenta.val('');
					$vent_descripcion.val('');
				});
			}
			
			//estatus
			$select_estatus.children().remove();
			var status_html = '<option value="true" selected="yes">Activo</option>';
			status_html += '<option value="false">Inactivo</option>';
			$select_estatus.append(status_html);
			
			
			//Alimentando select de secciones
			$select_seccion.children().remove();
			var secciones_hmtl = '<option value="0">[--Seleccionar Seccion--]</option>';
			$.each(entry['Secciones'],function(entryIndex,lin){
				secciones_hmtl += '<option value="' + lin['id'] + '"  >' + lin['titulo'] + '</option>';
			});
			$select_seccion.append(secciones_hmtl);
			
			//Alimentando select de lineas
			$select_linea.children().remove();
			var lineas_hmtl = '<option value="0">[--Seleccionar Linea--]</option>';
			$.each(entry['Lineas'],function(entryIndex,lin){
				lineas_hmtl += '<option value="' + lin['id'] + '"  >' + lin['titulo'] + '</option>';
			});
			$select_linea.append(lineas_hmtl);
			
			//Alimentando select de marcas
			$select_marca.children().remove();
			var marcas_hmtl = '<option value="0">[--Seleccionar Marca--]</option>';
			$.each(entry['Marcas'],function(entryIndex,mar){
				marcas_hmtl += '<option value="' + mar['id'] + '"  >' + mar['titulo'] + '</option>';
			});
			$select_marca.append(marcas_hmtl);
			
			
			//Alimentando select de clases
			$select_clase.children().remove();
			var clase_hmtl = '<option value="0">[--Seleccionar Clase--]</option>';
			$.each(entry['Clases'],function(entryIndex,clase){
				clase_hmtl += '<option value="' + clase['id'] + '"  >' + clase['titulo'] + '</option>';
			});
			$select_clase.append(clase_hmtl);
			
			//Alimentando select de grupos
			$select_grupo.children().remove();
			var grupo_hmtl = '<option value="0">[--Seleccionar Grupo--]</option>';
			$.each(entry['Grupos'],function(entryIndex,lin){
				grupo_hmtl += '<option value="' + lin['id'] + '"  >' + lin['titulo'] + '</option>';
			});
			$select_grupo.append(grupo_hmtl);
			
			//carga select de tipos de producto
			$select_prod_tipo.children().remove();
			var prodtipos_hmtl = '<option value="0" selected="yes">[--Seleccionar Tipo--]</option>';
			$.each(entry['ProdTipos'],function(entryIndex,lin){
				prodtipos_hmtl += '<option value="' + lin['id'] + '"  >' + lin['titulo'] + '</option>';
			});
			$select_prod_tipo.append(prodtipos_hmtl);
                        
			//Alimentando select de familias
			$select_familia.children().remove();
			var familia_hmtl = '<option value="0">[--Seleccionar Familia--]</option>';
			$select_familia.append(familia_hmtl);
			
			$select_prod_tipo.change(function(){
				var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getFamiliasByTipoProd.json';
				$arreglo = {	'tipo_prod':$select_prod_tipo.val(),
								'iu': $('#lienzo_recalculable').find('input[name=iu]').val()
							};
	
				$.post(input_json,$arreglo,function(data){
					$select_familia.children().remove();
					familia_hmtl = '<option value="0">[--Seleccionar Familia--]</option>';
					$.each(data['Familias'],function(entryIndex,fam){
						familia_hmtl += '<option value="' + fam['id'] + '"  >' + fam['titulo'] + '</option>';
					});
					$select_familia.append(familia_hmtl);
				});
			});
                        
			$select_familia.change(function(){
				var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getSubFamiliasByFamProd.json';
				$arreglo = {'fam':$select_familia.val(),
								'iu': $('#lienzo_recalculable').find('input[name=iu]').val()
							}
				$.post(input_json,$arreglo,function(data){
					//Alimentando select de Subfamilias
					$select_subfamilia.children().remove();
					var subfamilia_hmtl = '<option value="0">[--Seleccionar Subfmilia--]</option>';
					$.each(data['SubFamilias'],function(dataIndex,subfam){
						subfamilia_hmtl += '<option value="' + subfam['id'] + '"  >' + subfam['titulo'] + '</option>';
					});
					$select_subfamilia.append(subfamilia_hmtl);
				});
			});

			//Alimentando select de unidades
			$select_unidad.children().remove();
			var unidads_hmtl = '<option value="0">[--Seleccionar Unidad--]</option>';
			$.each(entry['Unidades'],function(entryIndex,uni){
				unidads_hmtl += '<option value="' + uni['id'] + '"  >' + uni['titulo'] + '</option>';
			});
			$select_unidad.append(unidads_hmtl);
			
			
			//Alimentando select de clasificacion Stock
			$select_clasifstock.children().remove();
			var stock_hmtl = '<option value="0">[--Seleccionar Clasificacion--]</option>';
			$.each(entry['ClasifStock'],function(entryIndex,stock){
				stock_hmtl += '<option value="' + stock['id'] + '"  >' + stock['titulo'] + '</option>';
			});
			$select_clasifstock.append(stock_hmtl);
			
			
			//Alimentando select de ivas
			$select_iva.children().remove();
			var iva_hmtl = '<option value="0">[--Excento--]</option>';
			$.each(entry['Impuestos'],function(entryIndex,iva){
				iva_hmtl += '<option value="' + iva['id'] + '"  >' + iva['descripcion'] + '</option>';
			});
			$select_iva.append(iva_hmtl);
			
			
			//Alimentando select de ieps
			$select_ieps.children().remove();
			var ieps_hmtl = '<option value="0">[--IEPS--]</option>';
			/*
			$.each(entry['ClasifStock'],function(entryIndex,iva){
				ieps_hmtl += '<option value="' + iva['id'] + '"  >' + iva['descripcion'] + '</option>';
			});*/
			$select_ieps.append(ieps_hmtl);
			
			//carga select de presentaciones disponibles
			$select_disponibles.children().remove();
			var presentaciones_hmtl = '';
			$.each(entry['Presentaciones'],function(entryIndex,pres){
				presentaciones_hmtl += '<option value="' + pres['id'] + '"  >' + pres['titulo'] + '</option>';
			});
			$select_disponibles.append(presentaciones_hmtl);
			
			
			$('.contenedor_grid_prod').css({'display':'none'});
			//$('#forma-product-window').find('.product_div_one').css({'height':'250px'});
			$select_prod_tipo.change(function(){
				var valor_tipo = $(this).val();
				
				if(parseInt($("tbody > tr", $grid_productos_componentes).size()) > 0){
					jAlert("Actualmente hay productos en el  listado de Materias primas, no puedes cambiar de tipo de producto",'! Atencion');
					var tipo_anterior=$tipo_producto_anterior.val();
					
					//tipo=2 es SUBENSAMBLE
					if( ( parseInt(tipo_anterior)!=3) ){
						tipo_anterior=0;
					}
					
					if($incluye_produccion.val()=='false'){
						//aqui solo debe entrar cuando la empresa no incluya modulo de produccion
						//tipo=2 es SUBENSAMBLE
						if( parseInt(tipo_anterior)!=2 ){
							tipo_anterior=0;
						}
					}
					
					//recargar select tipo de producto
					$select_prod_tipo.children().remove();
					var prodtipo_hmtl = '<option value="0" >[--Seleccionar Tipo--]</option>';
					$.each(entry['ProdTipos'],function(entryIndex,tip){
						if(parseInt(tip['id'])==parseInt(tipo_anterior)){
							prodtipo_hmtl += '<option value="' + tip['id'] + '" selected="yes">' + tip['titulo'] + '</option>';
						}else{
							prodtipo_hmtl += '<option value="' + tip['id'] + '"  >' + tip['titulo'] + '</option>';
						}
					});
					$select_prod_tipo.append(prodtipo_hmtl);
					$tipo_producto_anterior.val(tipo_anterior);
				}else{
					$('div.contenedor_grid_prod').css({'display':'none'});
					$('#forma-product-window').find('.product_div_one').css({'height':'350px'});
					
					//recargar select de unidades al cambiar de tipo de producto que no es subensamble
					$select_unidad.children().remove();
					var unidads_hmtl = '<option value="0">[--Seleccionar Unidad--]</option>';
					$.each(entry['Unidades'],function(entryIndex,uni){
						unidads_hmtl += '<option value="' + uni['id'] + '"  >' + uni['titulo'] + '</option>';
					});
					$select_unidad.append(unidads_hmtl);
					
					//tipo=1 es NORMAL, 5=REFACCIONES, 6=ACCESORIOS, 7=MATERIA PRIMA
					if( parseInt(valor_tipo)==1 || parseInt(valor_tipo)==5 || parseInt(valor_tipo)==6 || parseInt(valor_tipo)==7){
						$deshabilitar_campos("habilitar",$proveedor,$tiempos_de_entrega,$select_prod_tipo,$select_estatus,$select_seccion,$select_grupo,$select_linea,$select_marca,$select_clase,$select_familia,$select_subfamilia,$select_unidad,$select_clasifstock,$select_iva,$select_ieps,$check_noserie,$check_nom,$check_nolote,$check_pedimento,$check_stock,$check_ventaext,$check_compraext,$select_disponibles,$select_seleccionados,$agregar_pres,$remover_pres,$densidad, $valor_maximo, $valor_minimo, $punto_reorden);
						$tipo_producto_anterior.val(valor_tipo);
					}
					
					if($incluye_produccion.val()=='false'){
						//aqui solo debe entrar cuando la empresa no incluya modulo de produccion
						//tipo=2 es SUBENSAMBLE
						if( parseInt(valor_tipo)==2 ){
							$deshabilitar_campos("habilitar",$proveedor,$tiempos_de_entrega,$select_prod_tipo,$select_estatus,$select_seccion,$select_grupo,$select_linea,$select_marca,$select_clase,$select_familia,$select_subfamilia,$select_unidad,$select_clasifstock,$select_iva,$select_ieps,$check_noserie,$check_nom,$check_nolote,$check_pedimento,$check_stock,$check_ventaext,$check_compraext,$select_disponibles,$select_seleccionados,$agregar_pres,$remover_pres,$densidad, $valor_maximo, $valor_minimo, $punto_reorden);
							$tipo_producto_anterior.val(valor_tipo);
							//visualizar grid para agregar productos componentes
							
							$('div.contenedor_grid_prod').css({'display':'block'});
							$('#forma-product-window').find('.product_div_one').css({'height':'505px'});
						}
					}
					
					//tipo=3 es KIT
					if( parseInt(valor_tipo)==3 ){
						$deshabilitar_campos("desahabilitar",$proveedor,$tiempos_de_entrega,$select_prod_tipo,$select_estatus,$select_seccion,$select_grupo,$select_linea,$select_marca,$select_clase,$select_familia,$select_subfamilia,$select_unidad,$select_clasifstock,$select_iva,$select_ieps,$check_noserie,$check_nom,$check_nolote,$check_pedimento,$check_stock,$check_ventaext,$check_compraext,$select_disponibles,$select_seleccionados,$agregar_pres,$remover_pres,$densidad, $valor_maximo, $valor_minimo, $punto_reorden);
						$tipo_producto_anterior.val(valor_tipo);
						//visualizar grid para agregar productos componentes
						
						$('div.contenedor_grid_prod').css({'display':'block'});
						$('#forma-product-window').find('.product_div_one').css({'height':'505px'});
					}
					
					//tipo=4 es SERVICIOS
					if( parseInt(valor_tipo)==4 ){
						$deshabilitar_campos("desahabilitar",$proveedor,$tiempos_de_entrega,$select_prod_tipo,$select_estatus,$select_seccion,$select_grupo,$select_linea,$select_marca,$select_clase,$select_familia,$select_subfamilia,$select_unidad,$select_clasifstock,$select_iva,$select_ieps,$check_noserie,$check_nom,$check_nolote,$check_pedimento,$check_stock,$check_ventaext,$check_compraext,$select_disponibles,$select_seleccionados,$agregar_pres,$remover_pres,$densidad, $valor_maximo, $valor_minimo, $punto_reorden);
						$tipo_producto_anterior.val(valor_tipo);
					}
				}//termina id que valida existencia de productos componentes en el grid
			});
			
			$select_unidad.change(function(){
				var id_unidad = $(this).val();
				if(parseInt($select_prod_tipo.val()) == 2){
					//si el tipo de producto es subensamble entra aqui
					if(parseInt(id_unidad) == 1 || parseInt(id_unidad) == 2 ){
						//si la unidad es Kilogramo y litro dejar seleccionado solo uno
						$select_unidad.children().remove();
						var unidads_hmtl = '';
						$.each(entry['Unidades'],function(entryIndex,uni){
							if(parseInt(id_unidad)==parseInt(uni['id'])){
								unidads_hmtl += '<option value="' + uni['id'] + '"  >' + uni['titulo'] + '</option>';
							}
						});
						$select_unidad.append(unidads_hmtl);
					}else{
						jAlert("La unidad "+$select_unidad.find('option:selected').html()+" no es para crear Subensambles, seleccione otra diferente",'! Atencion');
						
						//recarga select de unidades para permitir seleccionar una nueva unidad
						$select_unidad.children().remove();
						var unidads_hmtl = '<option value="0">[--Seleccionar Unidad--]</option>';
						$.each(entry['Unidades'],function(entryIndex,uni){
							unidads_hmtl += '<option value="' + uni['id'] + '"  >' + uni['titulo'] + '</option>';
						});
						$select_unidad.append(unidads_hmtl);
					}
				}
			});
			
		});//termina llamada json
		
		
		
				
				
		//agregar presentacion
		$agregar_pres.click(function(event){
			event.preventDefault();
			var logica = false;
			var primero=0;
			logica = !$select_disponibles.find('option:selected').remove().appendTo( $select_seleccionados);
			var valor_campo = "";
			var ahora_seleccionados = $select_seleccionados.find('option').get();
			$.each( ahora_seleccionados , function(indice , seleccionado){
				if(primero==0){
					valor_campo += seleccionado.value;
					primero=1;
				}else{
					valor_campo += "," + seleccionado.value;
				}
			});
			//alert(valor_campo);
			$campo_pres_on.attr({'value' : valor_campo});
			return logica; 
		});
		
		
		//remover presentacion
		$remover_pres.click(function(event){
			event.preventDefault();
			var logica = false;
			var primero=0;
			logica = !$select_seleccionados.find('option:selected').remove().appendTo($select_disponibles);
			var valor_campo = "";
			var ahora_seleccionados = $select_seleccionados.find('option').get();
			$.each( ahora_seleccionados , function(indice , seleccionado){
				if(primero==0){
					valor_campo += seleccionado.value;
					primero=1;
				}else{
					valor_campo += "," + seleccionado.value;
				}
			});
			//alert(valor_campo);
			$campo_pres_on.attr({'value' : valor_campo}); 
			return logica;
		});
		
		
		$agregar_prod.click(function(event){
			event.preventDefault();
			if( parseInt($select_prod_tipo.val())!=3 ){
				if(parseInt($select_unidad.val())==0){
					jAlert("Es necesario seleccionar la Unidad de Medida.",'! Atencion');
				}else{
					$agrega_producto_ingrediente();
				}
			}else{
				//cuando el producto es 3=kit, no se necesita validar unaidad
				$agrega_producto_ingrediente();
			}
		});
		
		$buscar_prod_ingrediente.click(function(event){
			event.preventDefault();
			if( parseInt($select_prod_tipo.val())!=3 ){
				if(parseInt($select_unidad.val())==0){
					jAlert("Es necesario seleccionar la Unidad de Medida.",'! Atencion');
				}else{
					$buscador_producto_ingrediente();
				}
			}else{
				//cuando el producto es 3=kit, no se necesita validar unaidad
				$buscador_producto_ingrediente();
			}
		});
		
		
		
		//validar campo tiempos de entrega, solo acepte numeros y punto
		$tiempos_de_entrega.keypress(function(e){
			// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
			if (e.which == 8 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}
		});
		
		//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
		$tiempos_de_entrega.focus(function(e){
			if(parseFloat($tiempos_de_entrega.val())<1){
				$tiempos_de_entrega.val('');
			}
		});
		
		//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
		$tiempos_de_entrega.blur(function(e){
			if(parseFloat($tiempos_de_entrega.val())==0||$tiempos_de_entrega.val()==""){
				$tiempos_de_entrega.val(0.0);
			}
		});	
		
		//validar campo tiempo de entrega, solo acepte numeros y punto
		$densidad.keypress(function(e){
			// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
			if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}
		});
		
		//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
		$densidad.focus(function(e){
			if(parseFloat($densidad.val())<1){
				$densidad.val('');
			}
		});
		
		//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
		$densidad.blur(function(e){
			if(parseFloat($densidad.val())==1||$densidad.val()==""){
				$densidad.val(1);
			}
		});	
		
		$valor_maximo.keypress(function(e){
			// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
			if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}
		});
		
		//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
		$valor_maximo.focus(function(e){
			if(parseFloat($valor_maximo.val())<1){
				$valor_maximo.val('');
			}
		});
		
		//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
		$valor_maximo.blur(function(e){
			if(parseFloat($valor_maximo.val())==0||$valor_maximo.val()==""){
				$valor_maximo.val(0.0);
			}
		});
                
		//validar campo tiempos de entrega, solo acepte numeros y punto
		$valor_minimo.keypress(function(e){
			// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
			if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}
		});
		
		//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
		$valor_minimo.focus(function(e){
			if(parseFloat($valor_minimo.val())<1){
				$valor_minimo.val('');
			}
		});
		
		//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
		$valor_minimo.blur(function(e){
			if(parseFloat($valor_minimo.val())==0||$valor_minimo.val()==""){
				$valor_minimo.val(0.0);
			}
		});
                
		//validar campo tiempos de entrega, solo acepte numeros y punto
		$punto_reorden.keypress(function(e){
			// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
			if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}
		});
		
		//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
		$punto_reorden.focus(function(e){
			if(parseFloat($punto_reorden.val())<1){
				$punto_reorden.val('');
			}
		});
		
		//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
		$punto_reorden.blur(function(e){
			if(parseFloat($punto_reorden.val())==0||$punto_reorden.val()==""){
				$punto_reorden.val(0.0);
			}
		});
		
		
		$submit_actualizar.bind('click',function(){
			var trCount = $("tbody > tr", $grid_productos_componentes).size();
			$total_tr.val(trCount);
			
			if($incluye_produccion.val()=='false'){
				//aqui solo debe entrar cuando la empresa no incluya modulo de produccion
				//SUBENSAMBLE O PRODUCTO INTERMEDIO
				if(parseInt($select_prod_tipo.val())==2){
					if(trCount > 0){
						//alert($total_porcentaje.val());
						if(parseFloat($total_porcentaje.val())<1){
							jAlert("La suma total de las cantidades debe ser igual a la Unidad(1).", 'Atencion!');
							//alert($total_porcentaje.val());
							return false;
						}else{
							if(parseFloat($total_porcentaje.val())>1){
								jAlert("Has excedido la Unidad(1). Verifique los datos ingresados en la lista de productos.", 'Atencion!');
								return false;
							}else{
								return true;
							}
						}
					}else{
						jAlert("Es necesario Agregar a la lista los productos Materia Prima.", 'Atencion!');
						return false;
					}
				}
			}
			
			//KIT
			if(parseInt($select_prod_tipo.val())==3){
				if(trCount > 0){
					if(parseFloat($total_porcentaje.val())<1){
						jAlert("La suma total de los componentes del KIT debe ser mayor que 0.", 'Atencion!');
						return false;
					}
				}else{
					jAlert("Es necesario Agregar los productos componentes del KIT.", 'Atencion!');
					return false;
				}
			}
		});
		
		//Ligamos el boton cancelar al evento click para eliminar la forma
		$cancelar_plugin.bind('click',function(){
			var remove = function() {$(this).remove();};
			$('#forma-product-overlay').fadeOut(remove);
		});
		
		$cerrar_plugin.bind('click',function(){
			var remove = function() {$(this).remove();};
			$('#forma-product-overlay').fadeOut(remove);
		});
	});
	
	var carga_formaProducts00_for_datagrid00 = function(id_to_show, accion_mode){
		
		if(accion_mode == 'cancel'){
			var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/' + 'logicDelete.json';
			$arreglo = {'id_producto':id_to_show,
							'iu': $('#lienzo_recalculable').find('input[name=iu]').val()
						};
			jConfirm('Realmente desea eliminar el producto seleccionado', 'Dialogo de confirmacion', function(r) {
				if (r){
					$.post(input_json,$arreglo,function(entry){
						if ( entry['success'] == '1' ){
							jAlert("El producto fue eliminado exitosamente.", 'Atencion!');
						}
						
						if ( entry['success'] == '01' ){
							jAlert("El producto no pudo ser eliminado porque tiene Formula.\nElimine la Formula y despues proceda a eliminar el producto.", 'Atencion!');
						}
						
						if ( entry['success'] == '02' ){
							jAlert("El producto no pudo ser eliminado porque forma parte de una Formula.\nElimine la Formula y despues proceda a eliminar el producto.", 'Atencion!');
						}
						
						if ( entry['success'] == '03' ){
							jAlert("El producto no pudo ser eliminado porque forma parte de un KIT.\nElimine el KIT y despues proceda a eliminar el producto.", 'Atencion!');
						}
						
						if ( entry['success'] == '04' ){
							jAlert("El producto no pudo ser eliminado porque forma parte de una Formula o un KIT.\nElimine la Formula o KIT y despues proceda a eliminar el producto.", 'Atencion!');
						}
						
						$get_datos_grid();
					});
				};
			});
		}else{
			var form_to_show = 'formaProducto00';
			$('#' + form_to_show).each (function(){this.reset();});
			var $forma_selected = $('#' + form_to_show).clone();
			$forma_selected.attr({id : form_to_show + id_to_show});
			var accion = "get_producto";
			
			$(this).modalPanel_Products();
			
			$('#forma-product-window').css({"margin-left": -260, 	"margin-top": -220});
			
			$forma_selected.prependTo('#forma-product-window');
			$forma_selected.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
			
			$tabs_li_funxionalidad();
			
			//alert(id_to_show);
			
			if(accion_mode == 'edit'){
				var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getProducto.json';
					$arreglo = {'id_producto':id_to_show,
									'iu': $('#lienzo_recalculable').find('input[name=iu]').val()
								};
				
				//variables del catalogo
				var $incluye_produccion = $('#forma-product-window').find('input[name=incluye_pro]');
				var $campo_id_producto = $('#forma-product-window').find('input[name=id_producto]');
				var $codigo = $('#forma-product-window').find('input[name=codigo]');
				var $descripcion = $('#forma-product-window').find('input[name=descripcion]');
				var $codigo_barras = $('#forma-product-window').find('input[name=codigo_barras]');
				var $proveedor = $('#forma-product-window').find('input[name=proveedor]');
				var $id_proveedor = $('#forma-product-window').find('input[name=id_proveedor]');
				var $tiempos_de_entrega = $('#forma-product-window').find('input[name=tentrega]');
				var $densidad = $('#forma-product-window').find('input[name=densidad]');
				var $valor_maximo = $('#forma-product-window').find('input[name=valor_maximo]');
				var $valor_minimo = $('#forma-product-window').find('input[name=valor_minimo]');
				var $punto_reorden = $('#forma-product-window').find('input[name=punto_reorden]');
				
				var $select_estatus = $('#forma-product-window').find('select[name=select_estatus]');
				var $select_seccion = $('#forma-product-window').find('select[name=select_seccion]');
				var $select_grupo = $('#forma-product-window').find('select[name=select_grupo]');
				var $select_linea = $('#forma-product-window').find('select[name=select_linea]');
				var $select_marca = $('#forma-product-window').find('select[name=select_marca]');
				var $select_clase = $('#forma-product-window').find('select[name=select_clase]');
				var $select_familia = $('#forma-product-window').find('select[name=select_familia]');
				var $select_subfamilia = $('#forma-product-window').find('select[name=select_subfamilia]');
				var $select_prod_tipo = $('#forma-product-window').find('select[name=select_prodtipo]');
				var $select_unidad = $('#forma-product-window').find('select[name=select_unidad]');
				var $select_clasifstock = $('#forma-product-window').find('select[name=select_clasifstock]');
				var $select_iva = $('#forma-product-window').find('select[name=select_iva]');
				var $select_ieps = $('#forma-product-window').find('select[name=select_ieps]');
				
				var $check_noserie = $('#forma-product-window').find('input[name=check_noserie]');
				var $check_nom = $('#forma-product-window').find('input[name=check_nom]');
				var $check_nolote = $('#forma-product-window').find('input[name=check_nolote]');
				var $check_pedimento = $('#forma-product-window').find('input[name=check_pedimento]');
				var $check_stock = $('#forma-product-window').find('input[name=check_stock]');
				var $check_ventaext = $('#forma-product-window').find('input[name=check_ventaext]');
				var $check_compraext = $('#forma-product-window').find('input[name=check_compraext]');
				
				//presentaciones seleccionados y disponibles
				var $select_disponibles= $('#forma-product-window').find('select[name=disponibles]');
				var $select_seleccionados = $('#forma-product-window').find('select[name=seleccionados]');
				var $campo_pres_on = $('#forma-product-window').find('input[name=pres_on]');
				
				//agregar y remover presentaciones
				var $agregar_pres = $('#forma-product-window').find('a[href*=agregar_pres]');
				var $remover_pres = $('#forma-product-window').find('a[href*=remover_pres]');
				
				var $grid_productos_componentes = $('#forma-product-window').find('#grid_productos');
				var $total_porcentaje = $('#forma-product-window').find('input[name=total_porcentaje]');
				var $total_tr = $('#forma-product-window').find('input[name=total_tr]');
				
				//variables de los href
				var $agregar_prod = $('#forma-product-window').find('a[href*=agregar_produ_minigrid]');
				var $buscar_prod_ingrediente = $('#forma-product-window').find('a[href*=busca_producto_ingrediente]');
				var $busca_proveedor = $('#forma-product-window').find('a[href*=busca_proveedor]');
				
				var $pestana_contabilidad = $('#forma-product-window').find('ul.pestanas').find('a[href*=#tabx-3]');
				
				var $id_cta_gas = $('#forma-product-window').find('input[name=id_cta_gasto]');
				var $gas_cuenta = $('#forma-product-window').find('input[name=gas_cuenta]');
				var $gas_scuenta = $('#forma-product-window').find('input[name=gas_scuenta]');
				var $gas_sscuenta = $('#forma-product-window').find('input[name=gas_sscuenta]');
				var $gas_ssscuenta = $('#forma-product-window').find('input[name=gas_ssscuenta]');
				var $gas_sssscuenta = $('#forma-product-window').find('input[name=gas_sssscuenta]');
				var $gas_descripcion = $('#forma-product-window').find('input[name=gas_descripcion]');
				
				var $id_cta_costvent = $('#forma-product-window').find('input[name=id_cta_costvent]');
				var $costvent_cuenta = $('#forma-product-window').find('input[name=costvent_cuenta]');
				var $costvent_scuenta = $('#forma-product-window').find('input[name=costvent_scuenta]');
				var $costvent_sscuenta = $('#forma-product-window').find('input[name=costvent_sscuenta]');
				var $costvent_ssscuenta = $('#forma-product-window').find('input[name=costvent_ssscuenta]');
				var $costvent_sssscuenta = $('#forma-product-window').find('input[name=costvent_sssscuenta]');
				var $costvent_descripcion = $('#forma-product-window').find('input[name=costvent_descripcion]');
				
				var $id_cta_vent = $('#forma-product-window').find('input[name=id_cta_vent]');
				var $vent_cuenta = $('#forma-product-window').find('input[name=vent_cuenta]');
				var $vent_scuenta = $('#forma-product-window').find('input[name=vent_scuenta]');
				var $vent_sscuenta = $('#forma-product-window').find('input[name=vent_sscuenta]');
				var $vent_ssscuenta = $('#forma-product-window').find('input[name=vent_ssscuenta]');
				var $vent_sssscuenta = $('#forma-product-window').find('input[name=vent_sssscuenta]');
				var $vent_descripcion = $('#forma-product-window').find('input[name=vent_descripcion]');
				
				var $busca_gasto = $('#forma-product-window').find('a[href=busca_gasto]');
				var $busca_costvent = $('#forma-product-window').find('a[href=busca_costvent]');
				var $busca_vent = $('#forma-product-window').find('a[href=busca_vent]');
				
				var $limpiar_gasto = $('#forma-product-window').find('a[href=limpiar_gasto]');
				var $limpiar_costvent = $('#forma-product-window').find('a[href=limpiar_costvent]');
				var $limpiar_vent = $('#forma-product-window').find('a[href=limpiar_vent]');
				
				var $cerrar_plugin = $('#forma-product-window').find('#close');
				var $cancelar_plugin = $('#forma-product-window').find('#boton_cancelar');
				var $submit_actualizar = $('#forma-product-window').find('#submit');
				$total_porcentaje.val(0);
				
				$codigo.attr({'readOnly':true});
				//$codigo.css({'background' : '#DDDDDD'});
				$proveedor.attr({'readOnly':true});
				$busca_proveedor.hide();
				
				$gas_cuenta.hide();
				$gas_scuenta.hide();
				$gas_sscuenta.hide();
				$gas_ssscuenta.hide();
				$gas_sssscuenta.hide();
				
				$costvent_cuenta.hide();
				$costvent_scuenta.hide();
				$costvent_sscuenta.hide();
				$costvent_ssscuenta.hide();
				$costvent_sssscuenta.hide();
				
				$vent_cuenta.hide();
				$vent_scuenta.hide();
				$vent_sscuenta.hide();
				$vent_ssscuenta.hide();
				$vent_sssscuenta.hide();
				
				var respuestaProcesada = function(data){
					if ( data['success'] == 'true' ){
						var remove = function() {$(this).remove();};
						$('#forma-product-overlay').fadeOut(remove);
						jAlert("Producto actualizado", 'Atencion!');
						$get_datos_grid();
					}else{
						// Desaparece todas las interrogaciones si es que existen
						$('#forma-product-window').find('div.interrogacion').css({'display':'none'});
						
						var valor = data['success'].split('___');
						//muestra las interrogaciones
						for (var element in valor){
							tmp = data['success'].split('___')[element];
							longitud = tmp.split(':');
							if( longitud.length > 1 ){
								$('#forma-product-window').find('img[rel=warning_' + tmp.split(':')[0] + ']')
								.parent()
								.css({'display':'block'})
								.easyTooltip({tooltipId: "easyTooltip2",content: tmp.split(':')[1]});
							}
						}
					};
				}
				
				var options = {dataType :  'json', success : respuestaProcesada};
				$forma_selected.ajaxForm(options);
				
				//aqui se cargan los campos al editar
				$.post(input_json,$arreglo,function(entry){
					$incluye_produccion.val(entry['Extras']['0']['mod_produccion']);
					if( entry['Extras'][0]['incluye_contab']=='false' ){
						$pestana_contabilidad.parent().hide();
					}else{
						//visualizar subcuentas de acuerdo al nivel definido para la empresa
						if(parseInt(entry['Extras'][0]['nivel_cta']) >=1 ){ $gas_cuenta.show(); $costvent_cuenta.show(); $vent_cuenta.show();  };
						if(parseInt(entry['Extras'][0]['nivel_cta']) >=2 ){ $gas_scuenta.show(); $costvent_scuenta.show(); $vent_scuenta.show(); };
						if(parseInt(entry['Extras'][0]['nivel_cta']) >=3 ){ $gas_sscuenta.show(); $costvent_sscuenta.show(); $vent_sscuenta.show(); };
						if(parseInt(entry['Extras'][0]['nivel_cta']) >=4 ){ $gas_ssscuenta.show(); $costvent_ssscuenta.show(); $vent_ssscuenta.show(); };
						if(parseInt(entry['Extras'][0]['nivel_cta']) >=5 ){ $gas_sssscuenta.show(); $costvent_sssscuenta.show(); $vent_sssscuenta.show(); };
						
						$id_cta_gas.attr({ 'value' : entry['Contab'][0]['gas_id_cta'] });
						$gas_cuenta.attr({ 'value' : entry['Contab'][0]['gas_cta'] });
						$gas_scuenta.attr({ 'value' : entry['Contab'][0]['gas_subcta'] });
						$gas_sscuenta.attr({ 'value' : entry['Contab'][0]['gas_ssubcta'] });
						$gas_ssscuenta.attr({ 'value' : entry['Contab'][0]['gas_sssubcta'] });
						$gas_sssscuenta.attr({ 'value' : entry['Contab'][0]['gas_ssssubcta'] });
						$gas_descripcion.attr({ 'value' : entry['Contab'][0]['gas_descripcion'] });
						
						$id_cta_costvent.attr({ 'value' : entry['Contab'][0]['costvent_id_cta'] });
						$costvent_cuenta.attr({ 'value' : entry['Contab'][0]['costvent_cta'] });
						$costvent_scuenta.attr({ 'value' : entry['Contab'][0]['costvent_subcta'] });
						$costvent_sscuenta.attr({ 'value' : entry['Contab'][0]['costvent_ssubcta'] });
						$costvent_ssscuenta.attr({ 'value' : entry['Contab'][0]['costvent_sssubcta'] });
						$costvent_sssscuenta.attr({ 'value' : entry['Contab'][0]['costvent_ssssubcta'] });
						$costvent_descripcion.attr({ 'value' : entry['Contab'][0]['costvent_descripcion'] });
						
						$id_cta_vent.attr({ 'value' : entry['Contab'][0]['vent_id_cta'] });
						$vent_cuenta.attr({ 'value' : entry['Contab'][0]['vent_cta'] });
						$vent_scuenta.attr({ 'value' : entry['Contab'][0]['vent_subcta'] });
						$vent_sscuenta.attr({ 'value' : entry['Contab'][0]['vent_ssubcta'] });
						$vent_ssscuenta.attr({ 'value' : entry['Contab'][0]['vent_sssubcta'] });
						$vent_sssscuenta.attr({ 'value' : entry['Contab'][0]['vent_ssssubcta'] });
						$vent_descripcion.attr({ 'value' : entry['Contab'][0]['vent_descripcion'] });
						
						//busca Cuenta Gastos
						$busca_gasto.click(function(event){
							event.preventDefault();
							$busca_cuentas_contables(1, entry['Extras'][0]['nivel_cta'], entry['CtaMay']);
						});
						
						//busca Cuenta Costo de Venta
						$busca_costvent.click(function(event){
							event.preventDefault();
							$busca_cuentas_contables(2, entry['Extras'][0]['nivel_cta'], entry['CtaMay']);
						});
						
						//busca Cuenta Venta
						$busca_vent.click(function(event){
							event.preventDefault();
							$busca_cuentas_contables(3, entry['Extras'][0]['nivel_cta'], entry['CtaMay']);
						});
						
						//limpiar campos Cuenta Gastos
						$limpiar_gasto.click(function(event){
							event.preventDefault();
							$id_cta_gas.val(0);
							$gas_cuenta.val('');
							$gas_scuenta.val('');
							$gas_sscuenta.val('');
							$gas_ssscuenta.val('');
							$gas_sssscuenta.val('');
							$gas_descripcion.val('');
						});
						
						//limpiar campos Cuenta Costo de Venta
						$limpiar_costvent.click(function(event){
							event.preventDefault();
							$id_cta_costvent.val(0);
							$costvent_cuenta.val('');
							$costvent_scuenta.val('');
							$costvent_sscuenta.val('');
							$costvent_ssscuenta.val('');
							$costvent_sssscuenta.val('');
							$costvent_descripcion.val('');
						});
						
						//limpiar campos Cuenta Venta
						$limpiar_vent.click(function(event){
							event.preventDefault();
							$id_cta_vent.val(0);
							$vent_cuenta.val('');
							$vent_scuenta.val('');
							$vent_sscuenta.val('');
							$vent_ssscuenta.val('');
							$vent_sssscuenta.val('');
							$vent_descripcion.val('');
						});
					}
					
					$campo_id_producto.attr({'value' : entry['Producto'][0]['id']});
					$codigo.attr({'value' : entry['Producto'][0]['sku']});
					$descripcion.attr({'value' : entry['Producto'][0]['descripcion']});
					$codigo_barras.attr({'value' : entry['Producto'][0]['codigo_barras']});
					$proveedor.text(entry['Producto'][0]['proveedor']);
					$id_proveedor.text(entry['Producto'][0]['cxp_prov_id']);
					$tiempos_de_entrega.attr({'value' : entry['Producto'][0]['tentrega']});
					$densidad.attr({'value' : entry['Producto'][0]['densidad']});
					$valor_maximo.attr({'value' : entry['Producto'][0]['valor_maximo']});
					$valor_minimo.attr({'value' : entry['Producto'][0]['valor_minimo']});
					$punto_reorden.attr({'value' : entry['Producto'][0]['punto_reorden']});
					
					$check_noserie.attr('checked', (entry['Producto'][0]['requiere_numero_serie'] == 'true')? true:false );
					$check_nom.attr('checked', (entry['Producto'][0]['requiere_nom'] == 'true')? true:false );
					$check_nolote.attr('checked', (entry['Producto'][0]['requiere_numero_lote'] == 'true')? true:false );
					$check_pedimento.attr('checked', (entry['Producto'][0]['requiere_pedimento'] == 'true')? true:false );
					$check_stock.attr('checked', (entry['Producto'][0]['permitir_stock'] == 'true')? true:false );
					$check_ventaext.attr('checked', (entry['Producto'][0]['venta_moneda_extranjera'] == 'true')? true:false );
					$check_compraext.attr('checked', (entry['Producto'][0]['compra_moneda_extranjera'] == 'true')? true:false );
					
					//estatus
					$select_estatus.children().remove();
					var status_html = '';		
					if( entry['Producto'][0]['cxp_prov_id']=='true'){
						status_html = '<option value="true" selected="yes">Activo</option>';
						status_html += '<option value="false">Inactivo</option>';
					}else{
						status_html = '<option value="true">Activo</option>';
						status_html += '<option value="false" selected="yes">Inactivo</option>';	
					}
					$select_estatus.append(status_html);
					
					
					//Alimentando select de secciones
					$select_seccion.children().remove();
					var secciones_hmtl = '<option value="0">[--Seleccionar Seccion--]</option>';
					$.each(entry['Secciones'],function(entryIndex,sec){
						if(parseInt(entry['Producto'][0]['inv_seccion_id'])==parseInt(sec['id'])){
							secciones_hmtl += '<option value="' + sec['id'] + '"  selected="yes">' + sec['titulo'] + '</option>';
						}else{
							secciones_hmtl += '<option value="' + sec['id'] + '"  >' + sec['titulo'] + '</option>';
						}
					});
					$select_seccion.append(secciones_hmtl);
					
					
					
					//Alimentando select de grupos
					$select_grupo.children().remove();
					var grupo_hmtl = '<option value="0">[--Seleccionar Grupo--]</option>';
					$.each(entry['Grupos'],function(entryIndex,gpo){
						if(parseInt(entry['Producto'][0]['inv_prod_grupo_id'])==parseInt(gpo['id'])){
							grupo_hmtl += '<option value="' + gpo['id'] + '"  selected="yes">' + gpo['titulo'] + '</option>';
						}else{
							grupo_hmtl += '<option value="' + gpo['id'] + '"  >' + gpo['titulo'] + '</option>';
						}
					});
					$select_grupo.append(grupo_hmtl);
					
					//Alimentando select de lineas
					$select_linea.children().remove();
					var lineas_hmtl = '<option value="0">[--Seleccionar Linea--]</option>';
					$.each(entry['Lineas'],function(entryIndex,lin){
						if(parseInt(entry['Producto'][0]['inv_prod_linea_id'])==parseInt(lin['id'])){
							lineas_hmtl += '<option value="' + lin['id'] + '" selected="yes">' + lin['titulo'] + '</option>';
						}else{
							lineas_hmtl += '<option value="' + lin['id'] + '">' + lin['titulo'] + '</option>';
						}
					});
					$select_linea.append(lineas_hmtl);
					
					
					//Alimentando select de marcas
					$select_marca.children().remove();
					var marcas_hmtl = '<option value="0">[--Seleccionar Marca--]</option>';
					$.each(entry['Marcas'],function(entryIndex,mar){
						if(parseInt(entry['Producto'][0]['inv_mar_id'])==parseInt(mar['id'])){
							marcas_hmtl += '<option value="' + mar['id'] + '" selected="yes">' + mar['titulo'] + '</option>';
						}else{
							marcas_hmtl += '<option value="' + mar['id'] + '"  >' + mar['titulo'] + '</option>';
						}
					});
					$select_marca.append(marcas_hmtl);
					
					
					
					//Alimentando select de clases
					$select_clase.children().remove();
					var clase_hmtl = '<option value="0">[--Seleccionar Clase--]</option>';
					$.each(entry['Clases'],function(entryIndex,clase){
						if(parseInt(entry['Producto'][0]['inv_clas_id'])==parseInt(clase['id'])){
							clase_hmtl += '<option value="' + clase['id'] + '"  selected="yes">' + clase['titulo'] + '</option>';
						}else{
							clase_hmtl += '<option value="' + clase['id'] + '"  >' + clase['titulo'] + '</option>';
						}
					});
					$select_clase.append(clase_hmtl);
					
					/*
					//Alimentando select de familias
					$select_familia.children().remove();
					var familia_hmtl = '<option value="0">[--Seleccionar Familia--]</option>';
					$.each(entry['Familias'],function(entryIndex,fam){
						if(parseInt(entry['Producto'][0]['inv_prod_familia_id'])==parseInt(fam['id'])){
							familia_hmtl += '<option value="' + fam['id'] + '" selected="yes">' + fam['titulo'] + '</option>';
						}else{
							familia_hmtl += '<option value="' + fam['id'] + '"  >' + fam['titulo'] + '</option>';
						}
					});
					$select_familia.append(familia_hmtl);
					
					
					
					//Alimentando select de Subfamilias
					$select_subfamilia.children().remove();
					var subfamilia_hmtl = '<option value="0">[--Seleccionar Subfmilia--]</option>';
					$.each(entry['Subfamilias'],function(entryIndex,subfam){
						if(parseInt(entry['Producto'][0]['subfamilia_id'])==parseInt(subfam['id'])){
							subfamilia_hmtl += '<option value="' + subfam['id'] + '" selected="yes">' + subfam['titulo'] + '</option>';
						}else{
							subfamilia_hmtl += '<option value="' + subfam['id'] + '"  >' + subfam['titulo'] + '</option>';
						}
					});
					$select_subfamilia.append(subfamilia_hmtl);
					*/
					
					//alimentando select con tipos de producto
					$select_prod_tipo.children().remove();
					//var prodtipos_hmtl = '<option value="0">[--Seleccionar Tipo--]</option>';
					var prodtipos_hmtl = '';
					$.each(entry['ProdTipos'],function(entryIndex,pt){
						if(parseInt(entry['Producto'][0]['tipo_de_producto_id'])==parseInt(pt['id'])){
							prodtipos_hmtl += '<option value="' + pt['id'] + '" selected="yes">' + pt['titulo'] + '</option>';
							
							//tipo=2 SUBENSAMBLE O PROD. INTERMEDIO
							if(parseInt(entry['Producto'][0]['tipo_de_producto_id'])==2 ){
								if($incluye_produccion.val()=='false'){
									//aqui solo debe entrar cuando la empresa no incluya modulo de produccion
									$('div.contenedor_grid_prod').css({'display':'block'});
									$('#forma-product-window').find('.product_div_one').css({'height':'505px'});
								}
							}
							
							//compentado por paco, por el cambio de productos
							if(parseInt(entry['Producto'][0]['tipo_de_producto_id'])==3 ){
								$('div.contenedor_grid_prod').css({'display':'block'});
								$('#forma-product-window').find('.product_div_one').css({'height':'505px'});
							}
							
							//tipo=3 es KIT, tipo=4 es SERVICIOS
							if(parseInt(entry['Producto'][0]['tipo_de_producto_id'])==3 || parseInt(entry['Producto'][0]['tipo_de_producto_id'])==4 ){
									$deshabilitar_campos("desahabilitar",$proveedor,$tiempos_de_entrega,$select_prod_tipo,$select_estatus,$select_seccion,$select_grupo,$select_linea,$select_marca,$select_clase,$select_familia,$select_subfamilia,$select_unidad,$select_clasifstock,$select_iva,$select_ieps,$check_noserie,$check_nom,$check_nolote,$check_pedimento,$check_stock,$check_ventaext,$check_compraext,$select_disponibles,$select_seleccionados,$agregar_pres,$remover_pres,$densidad, $valor_maximo, $valor_minimo, $punto_reorden);
							}else{
									//$deshabilitar_campos("habilitar",$proveedor,$tiempos_de_entrega,$select_prod_tipo,$select_estatus,$select_seccion,$select_grupo,$select_linea,$select_marca,$select_clase,$select_familia,$select_subfamilia,$select_unidad,$select_clasifstock,$select_iva,$select_ieps,$check_noserie,$check_nom,$check_nolote,$check_pedimento,$check_stock,$check_ventaext,$check_compraext,$select_disponibles,$select_seleccionados,$agregar_pres,$remover_pres);
							}
						}else{
							//prodtipos_hmtl += '<option value="' + pt['id'] + '"  >' + pt['titulo'] + '</option>';
						}
					});
					
					
					$select_prod_tipo.append(prodtipos_hmtl);
					
                                        
					var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getFamiliasByTipoProd.json';
					$arreglo = {'tipo_prod':entry['Producto'][0]['tipo_de_producto_id'], 'iu': $('#lienzo_recalculable').find('input[name=iu]').val() };
					$.post(input_json,$arreglo,function(data){
						$select_familia.children().remove();
						familia_hmtl = '<option value="0">[--Seleccionar Familia--]</option>';
						$.each(data['Familias'],function(entryIndex,fam){
							if(parseInt(entry['Producto'][0]['inv_prod_familia_id'])==parseInt(fam['id'])){
								familia_hmtl += '<option value="' + fam['id'] + '" selected="yes">' + fam['titulo'] + '</option>';
							}else{
								familia_hmtl += '<option value="' + fam['id'] + '"  >' + fam['titulo'] + '</option>';
							}
						});
						$select_familia.append(familia_hmtl);
					});
                                        
					var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getSubFamiliasByFamProd.json';
					$arreglo = {'fam':entry['Producto'][0]['inv_prod_familia_id'],
									'iu': $('#lienzo_recalculable').find('input[name=iu]').val()
								}
					$.post(input_json,$arreglo,function(data){
						//Alimentando select de Subfamilias
						$select_subfamilia.children().remove();
						var subfamilia_hmtl = '<option value="0">[--Seleccionar Subfmilia--]</option>';
						$.each(data['SubFamilias'],function(dataIndex,subfam){
							if(parseInt(entry['Producto'][0]['subfamilia_id'])==parseInt(subfam['id'])){
								subfamilia_hmtl += '<option value="' + subfam['id'] + '" selected="yes">' + subfam['titulo'] + '</option>';
							}else{
								subfamilia_hmtl += '<option value="' + subfam['id'] + '"  >' + subfam['titulo'] + '</option>';
							}
						});
						$select_subfamilia.append(subfamilia_hmtl);
					});

					
					//Alimentando select de unidades
					$select_unidad.children().remove();
					//var unidads_hmtl = '<option value="0">[--Seleccionar Unidad--]</option>';
					var unidads_hmtl = '';
					$.each(entry['Unidades'],function(entryIndex,uni){
						if(parseInt(entry['Producto'][0]['unidad_id'])==parseInt(uni['id'])){
							unidads_hmtl += '<option value="' + uni['id'] + '" selected="yes">' + uni['titulo'] + '</option>';
						}else{
							unidads_hmtl += '<option value="' + uni['id'] + '"  >' + uni['titulo'] + '</option>';
						}
					});
					$select_unidad.append(unidads_hmtl);
					
					
					//Alimentando select de clasificacion Stock
					$select_clasifstock.children().remove();
					var stock_hmtl = '<option value="0">[--Seleccionar Clasificacion--]</option>';
					$.each(entry['ClasifStock'],function(entryIndex,stock){
						if(parseInt(entry['Producto'][0]['inv_stock_clasif_id'])==parseInt(stock['id'])){
							stock_hmtl += '<option value="' + stock['id'] + '" selected="yes">' + stock['titulo'] + '</option>';
						}else{
							stock_hmtl += '<option value="' + stock['id'] + '"  >' + stock['titulo'] + '</option>';
						}
					});
					$select_clasifstock.append(stock_hmtl);
					
					
					//Alimentando select de ivas
					$select_iva.children().remove();
					var iva_hmtl = '<option value="0">[--Excento--]</option>';
					$.each(entry['Impuestos'],function(entryIndex,iva){
						if(parseInt(entry['Producto'][0]['id_impuesto'])==parseInt(iva['id'])){
							iva_hmtl += '<option value="' + iva['id'] + '" selected="yes">' + iva['descripcion'] + '</option>';
						}else{
							iva_hmtl += '<option value="' + iva['id'] + '"  >' + iva['descripcion'] + '</option>';
						}
					});
					$select_iva.append(iva_hmtl);
					
					
					//Alimentando select de ieps
					$select_ieps.children().remove();
					var ieps_hmtl = '<option value="0">[--IEPS--]</option>';
					/*$.each(entry['ClasifStock'],function(entryIndex,iva){
						ieps_hmtl += '<option value="' + iva['id'] + '"  >' + iva['descripcion'] + '</option>';
					});*/
					$select_ieps.append(ieps_hmtl);
					
					
					//carga select de presentaciones disponibles
					$select_disponibles.children().remove();
					var presentaciones_hmtl = '';
					$.each(entry['Presentaciones'],function(entryIndex,pres){
						presentaciones_hmtl += '<option value="' + pres['id'] + '"  >' + pres['titulo'] + '</option>';
					});
					$select_disponibles.append(presentaciones_hmtl);
					
					
					//carga select de presentaciones seleccionados
					$select_seleccionados.children().remove();
					var pres_hmtl = '';
					$.each(entry['PresOn'],function(entryIndex,preson){
						pres_hmtl += '<option value="' + preson['id'] + '"  >' + preson['titulo'] + '</option>';
					});
					$select_seleccionados.append(pres_hmtl);
					
					
					$.each(entry['Ingredientes'],function(entryIndex,ingrediente){
						//$('div.contenedor_grid_prod').css({'display':'block'});
						//$('#forma-product-window').find('.product_div_one').css({'height':'400px'});
						
						//$ingrediente_id.":".$sku.":".$descripcion_es.":".$porcentaje
						//var cadena_to_cut = ingrediente;
						//var valor = cadena_to_cut.split(':')[0];
						//var nom_valor = cadena_to_cut.split(':')[1];
						var trCount = $("tbody > tr", $grid_productos_componentes).size();
						trCount++;
						
						var trr = '';
						trr = '<tr>';
							trr += '<td class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;" width="70">';
								trr += '<a href=#>Eliminar</a>';
								trr += '<input type="hidden" id="delete" name="eliminar" value="'+ingrediente['producto_ingrediente_id']+'">';
								trr += '<input type="hidden" 	name="no_tr" value="'+ trCount +'">';
							trr += '</td>';
							trr += '<td class="grid1" style="font-size: 11px;  border:1px solid #C1DAD7;" width="180">';
								trr += '<input type="text"  value="'+ ingrediente['sku'] +'" id="sku" class="borde_oculto" readOnly="true" style="width:176px;">';
							trr += '</td>';
							trr += '<td class="grid1" style="font-size: 11px;  border:1px solid #C1DAD7;" width="330">';
								trr += '<input type="text" 		name="nombre" 	value="'+ ingrediente['titulo'] +'" class="borde_oculto" readOnly="true" style="width:326px;">';
							trr += '</td>';
							
							trr += '<td class="grid1" style="font-size: 11px;  border:1px solid #C1DAD7;" width="120">';
								trr += '<input type="hidden" id="dec" name="decimales" value="'+ ingrediente['decimales']+'">';
								trr += '<input type="text" id="porcentaje" class="porcentaje'+trCount+'" name="porcentaje_grid" value="'+ ingrediente['cantidad'] +'" style="width:116px;">';
							trr += '</td>';
							
						trr += '</tr>';
						
						var tabla = $grid_productos_componentes.find('tbody');
						tabla.append(trr);
						
						$total_porcentaje.val(parseFloat($total_porcentaje.val())+parseFloat(ingrediente['porcentaje']));
						
						//alert($total_porcentaje.val());
						
						tabla.find('a').bind('click',function(event){
							var total_porcentaje=0;
							if(parseInt($(this).parent().find('#delete').val()) != 0){
								//alert("Alert1: "+total_porcentaje+"  Campo total:"+$total_porcentaje.val());
								total_porcentaje = parseFloat($total_porcentaje.val())-parseFloat($(this).parent().parent().find('#porcentaje').val());
								$total_porcentaje.val(total_porcentaje);
								//alert("Alert2: "+total_porcentaje+"  Campo total:"+$total_porcentaje.val());
								$(this).parent().find('#delete').val(0);
								$(this).parent().parent().hide();
							}
						});
						
						
						if( parseInt($select_prod_tipo.val())==2 ){
							//calcula porcentaje al perder enfoque 
							tabla.find('.porcentaje'+trCount).blur(function(){
								if(parseFloat($(this).val()) ==0 || $(this).val()=='') {
									$(this).val(1);
								}
								
								var total=0
								var patron=/^([0-9]){1,12}[.]?[0-9]*$/
								if(patron.test($(this).val())){
									$grid_productos_componentes.find('tbody > tr').each(function (index){
										if(parseInt($(this).find('#delete').val())!=0){
											total = parseFloat(total) + parseFloat($(this).find('#porcentaje').val());
										}
										$total_porcentaje.val(total);
									});
									if(parseFloat($total_porcentaje.val())>1){
										jAlert("Has excedido la Unidad del producto",'! Atencion');
									}
								}else{
									jAlert("La cantidad debe tener un 0, ejemplo: 0.5, 0.1, 0.9",'! Atencion');
									$(this).val(0.0)
								}
							});
						}
						
						
						if( parseInt($select_prod_tipo.val())==3 ){
							//calcula porcentaje al perder enfoque 
							tabla.find('.porcentaje'+trCount).blur(function(){
								if(parseFloat($(this).val()) < 1 || $(this).val()=='') {
									$(this).val(1);
								}
								
								var total=0
								$grid_productos_componentes.find('tbody > tr').each(function (index){
									if(parseInt($(this).find('#delete').val())!=0){
										total = parseFloat(total) + parseFloat($(this).find('#porcentaje').val());
									}
									$total_porcentaje.val(total);
								});
								
								if(parseFloat($total_porcentaje.val())<1){
									jAlert("El total de articulos del kit debe ser mayor que 1.",'! Atencion');
								}
							});
						}
					});
					
				});
				
				
				
				//cambiar tipo de producto
				$select_prod_tipo.change(function(){
					var valor_tipo = $(this).val();
					if(parseInt(valor_tipo) == 2 || parseInt(valor_tipo) == 3){//COMENTADO POR PACO
						if(parseInt(valor_tipo) == 2){
							if($incluye_produccion.val()=='false'){
								//aqui solo debe entrar cuando la empresa no incluya modulo de produccion
								$('div.contenedor_grid_prod').css({'display':'block'});
								$('#forma-product-window').find('.product_div_one').css({'height':'505px'});
							}
						}else{
							//aqui cuando el tipo de producto es kit
							$('div.contenedor_grid_prod').css({'display':'block'});
							$('#forma-product-window').find('.product_div_one').css({'height':'505px'});
						}
					}else{
						$('div.contenedor_grid_prod').css({'display':'none'});
						$('#forma-product-window').find('.product_div_one').css({'height':'350px'});
					}
					
					var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getFamiliasByTipoProd.json';
					$arreglo = {'tipo_prod':$select_prod_tipo.val(),
									'iu': $('#lienzo_recalculable').find('input[name=iu]').val()
								};
					
					$.post(input_json,$arreglo,function(data){
						$select_familia.children().remove();
						familia_hmtl = '<option value="0">[--Seleccionar Familia--]</option>';
						$.each(data['Familias'],function(entryIndex,fam){
								familia_hmtl += '<option value="' + fam['id'] + '"  >' + fam['titulo'] + '</option>';
						});
						$select_familia.append(familia_hmtl);
					});
				});
                                
                                
				$select_familia.change(function(){
					var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getSubFamiliasByFamProd.json';
					$arreglo = {'fam':$select_familia.val(),
								'iu': $('#lienzo_recalculable').find('input[name=iu]').val()
								}
								
					$.post(input_json,$arreglo,function(data){
						//Alimentando select de Subfamilias
						$select_subfamilia.children().remove();
						var subfamilia_hmtl = '<option value="0">[--Seleccionar Subfmilia--]</option>';
						$.each(data['SubFamilias'],function(dataIndex,subfam){
								subfamilia_hmtl += '<option value="' + subfam['id'] + '"  >' + subfam['titulo'] + '</option>';
						});
						$select_subfamilia.append(subfamilia_hmtl);
					});
					
				});
				
				//agregar presentacion
				$agregar_pres.click(function(event){
					event.preventDefault();
					var logica = false;
					var primero=0;
					logica = !$select_disponibles.find('option:selected').remove().appendTo( $select_seleccionados);
					var valor_campo = "";
					var ahora_seleccionados = $select_seleccionados.find('option').get();
					$.each( ahora_seleccionados , function(indice , seleccionado){
						if(primero==0){
							valor_campo += seleccionado.value;
							primero=1;
						}else{
							valor_campo += "," + seleccionado.value;
						}
					});
					//alert(valor_campo);
					$campo_pres_on.attr({'value' : valor_campo});
					return logica; 
				});
				
				
				//remover presentacion
				$remover_pres.click(function(event){
					event.preventDefault();
					var logica = false;
					var primero=0;
					logica = !$select_seleccionados.find('option:selected').remove().appendTo($select_disponibles);
					var valor_campo = "";
					var ahora_seleccionados = $select_seleccionados.find('option').get();
					$.each( ahora_seleccionados , function(indice , seleccionado){
						if(primero==0){
							valor_campo += seleccionado.value;
							primero=1;
						}else{
							valor_campo += "," + seleccionado.value;
						}
					});
					$campo_pres_on.attr({'value' : valor_campo}); 
					return logica;
				});
				
				
				//validar campo tiempo de entrega, solo acepte numeros y punto
				$tiempos_de_entrega.keypress(function(e){
					// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
					if (e.which == 8 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
						return true;
					}else {
						return false;
					}
				});
                                
				//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
				$tiempos_de_entrega.focus(function(e){
					if(parseFloat($tiempos_de_entrega.val())<1){
						$tiempos_de_entrega.val('');
					}
				});
				
				//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
				$tiempos_de_entrega.blur(function(e){
					if(parseFloat($tiempos_de_entrega.val())==0||$tiempos_de_entrega.val()==""){
						$tiempos_de_entrega.val(0.0);
					}
				});	
                                
                                
				//validar campo tiempo de entrega, solo acepte numeros y punto
				$densidad.keypress(function(e){
					// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
					if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
						return true;
					}else {
						return false;
					}
				});
				
				//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
				$densidad.focus(function(e){
					if(parseFloat($densidad.val())<1){
						$densidad.val('');
					}
				});
				
				//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
				$densidad.blur(function(e){
					if(parseFloat($densidad.val())==1||$densidad.val()==""){
						$densidad.val(1);
					}
				});	
				
				
				$valor_maximo.keypress(function(e){
					// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
					if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
						return true;
					}else {
						return false;
					}
				});
				
				//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
				$valor_maximo.focus(function(e){
					if(parseFloat($valor_maximo.val())<1){
						$valor_maximo.val('');
					}
				});
				
				//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
				$valor_maximo.blur(function(e){
					if(parseFloat($valor_maximo.val())==0||$valor_maximo.val()==""){
						$valor_maximo.val(0.0);
					}
				});
						
						//validar campo tiempos de entrega, solo acepte numeros y punto
				$valor_minimo.keypress(function(e){
					// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
					if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
						return true;
					}else {
						return false;
					}
				});
				
				//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
				$valor_minimo.focus(function(e){
					if(parseFloat($valor_minimo.val())<1){
						$valor_minimo.val('');
					}
				});
				
				//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
				$valor_minimo.blur(function(e){
					if(parseFloat($valor_minimo.val())==0||$valor_minimo.val()==""){
						$valor_minimo.val(0.0);
					}
				});
						
				//validar campo tiempos de entrega, solo acepte numeros y punto
				$punto_reorden.keypress(function(e){
					// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
					if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
						return true;
					}else {
						return false;
					}
				});
				
				//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
				$punto_reorden.focus(function(e){
					if(parseFloat($punto_reorden.val())<1){
						$punto_reorden.val('');
					}
				});
				
				//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
				$punto_reorden.blur(function(e){
					if(parseFloat($punto_reorden.val())==0||$punto_reorden.val()==""){
						$punto_reorden.val(0.0);
					}
				});

				
				$agregar_prod.click(function(event){
					event.preventDefault();
					$agrega_producto_ingrediente();
				});
                                
				$buscar_prod_ingrediente.click(function(event){
					event.preventDefault();
					$buscador_producto_ingrediente();
				});
				
				$submit_actualizar.bind('click',function(){
					var trCount = $("tbody > tr", $grid_productos_componentes).size();
					$total_tr.val(trCount);
					
					//aqui se crea cadena con id de presentaciones seleccionados
					var primero=0;
					var valor_campo = "";
					var ahora_seleccionados = $select_seleccionados.find('option').get();
					$.each( ahora_seleccionados , function(indice , seleccionado){
						if(primero==0){
							valor_campo += seleccionado.value;
							primero=1;
						}else{
							valor_campo += "," + seleccionado.value;
						}
					});
					$campo_pres_on.attr({'value' : valor_campo});
					
					//COMENTADO POR PACO, MODIFICACIONES DE TIPOS DE PRODUCTOS
					if(parseInt($select_prod_tipo.val())==2){
						if($incluye_produccion.val()=='false'){
							//aqui solo debe entrar cuando la empresa no incluya modulo de produccion
							if(trCount > 0){
								//alert($total_porcentaje.val());
								if(parseFloat($total_porcentaje.val())<1){
									jAlert("La suma total de las cantidades debe ser igual a la Unidad(1).", 'Atencion!');
									//alert($total_porcentaje.val());
									return false;
								}else{
									if(parseFloat($total_porcentaje.val())>1){
											jAlert("Has excedido la Unidad(1). Verifique los datos ingresados en la lista de productos.", 'Atencion!');
											return false;
									}else{
											return true;
									}
								}
							}else{
								jAlert("Es necesario Agregar a la lista los productos Materia Prima.", 'Atencion!');
								return false;
							}
						}
					}
				});
                                
                                
				//Ligamos el boton cancelar al evento click para eliminar la forma
				$cancelar_plugin.bind('click',function(){
					var remove = function() {$(this).remove();};
					$('#forma-product-overlay').fadeOut(remove);
				});
				
				$cerrar_plugin.bind('click',function(){
					var remove = function() {$(this).remove();};
					$('#forma-product-overlay').fadeOut(remove);
				});
				
			}
		}
	}
	
	
	
	
    $get_datos_grid = function(){
        var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getProductos.json';
        
        var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
        
        $arreglo = {'orderby':'id','desc':'DESC','items_por_pag':10,'pag_start':1,'display_pag':10,'input_json':'/'+controller+'/getProductos.json', 'cadena_busqueda':$cadena_busqueda, 'iu':iu}
		
        $.post(input_json,$arreglo,function(data){
			
            //pinta_grid
            $.fn.tablaOrdenable(data,$('#lienzo_recalculable').find('.tablesorter'),carga_formaProducts00_for_datagrid00);
			
            //resetea elastic, despues de pintar el grid y el slider
            Elastic.reset(document.getElementById('lienzo_recalculable'));
        },"json");
    }
    
    $get_datos_grid();
    
});