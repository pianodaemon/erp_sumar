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
	var controller = $contextpath.val()+"/controllers/repinvexis";
    
	$('#barra_acciones').hide();
	
	//aqui va el titulo del catalogo
	$('#barra_titulo').find('#td_titulo').append('Existencias en Inventario');
	
	//barra para el buscador 
	$('#barra_buscador').hide();
    
	
	
	var $tabla_existencias = $('#lienzo_recalculable').find('#table_exis');
	var $select_opciones = $('#lienzo_recalculable').find('select[name=opciones]');
	var $select_almacen = $('#lienzo_recalculable').find('select[name=select_almacen]');
	var $codigo_producto = $('#lienzo_recalculable').find('input[name=codigo]');
	var $descripcion = $('#lienzo_recalculable').find('input[name=descripcion]');
	var $genera_reporte_exis = $('#lienzo_recalculable').find('#genera_reporte_exis');
	var $buscar = $('#lienzo_recalculable').find('#boton_buscador');

	$select_opciones.children().remove();
	var almacen_hmtl = '<option value="1" selected="yes">General</option>';
		almacen_hmtl += '<option value="2">Con Existencia</option>';
		almacen_hmtl += '<option value="3">Sin Existencia</option>'
		almacen_hmtl += '<option value="4">Valor M&iacute;nimo</option>';
		almacen_hmtl += '<option value="5">Valor M&aacute;ximo</option>';
		almacen_hmtl += '<option value="6">Punto de Reorden</option>';
	$select_opciones.append(almacen_hmtl);


	
	$genera_reporte_exis.click(function(event){
		event.preventDefault();
		var codigo_producto;
		var descripcion;
		var id_almacen = $select_almacen.val();
		if($codigo_producto.val()==''){
			codigo_producto = 0;
		}else{
			codigo_producto = $codigo_producto.val();
		}
		if($descripcion.val()==''){
			descripcion = 0;
		}else{
			descripcion = $descripcion.val();
		}
		
		var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
		var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/getReporteExistencias/'+$select_opciones.val()+'/'+id_almacen+'/'+codigo_producto+'/'+descripcion+'/'+ iu +'/out.json';
		if(parseInt($select_almacen.val()) > 0){
			window.location.href=input_json;
		}else{
			alert("Selecciona un Almacen.");
		}
	});
	
	
	
	
	//obtiene los almacenes para el reporte
	var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getAlmacenes.json';
	$arreglo = {'iu':iu = $('#lienzo_recalculable').find('input[name=iu]').val()};
	$.post(input_json,$arreglo,function(entry){
		$select_almacen.children().remove();
		var almacen_hmtl = '<option value="0" selected="yes">[--Seleccionar Almacen--]</option>';
		$.each(entry['Almacenes'],function(entryIndex,alm){
			almacen_hmtl += '<option value="' + alm['id'] + '"  >' + alm['titulo'] + '</option>';
		});
		$select_almacen.append(almacen_hmtl);
	});//termina llamada json
	
	
	var height2 = $('#cuerpo').css('height');
	var alto = parseInt(height2)-240;
	var pix_alto=alto+'px';
	
	
	$('#table_exis').tableScroll({height:parseInt(pix_alto)});
	
	
	$buscar.click(function(event){
		var id_almacen = $select_almacen.val();
		var primero=0;
		$tabla_existencias.find('tbody').children().remove();
		var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getExistencias.json';
		$arreglo = {'tipo':$select_opciones.val(), 
					'almacen':id_almacen, 
					'codigo':$codigo_producto.val(), 
					'descripcion':$descripcion.val(),
					'iu': $('#lienzo_recalculable').find('input[name=iu]').val()
					};
		if(parseInt($select_almacen.val()) > 0){
			$.post(input_json,$arreglo,function(entry){
				$.each(entry['Existencias'],function(entryIndex,exi){
					if(primero==0){
						$tabla_existencias.find('tbody').append('<tr class="first"><td width="110">'+exi['codigo_producto']+'</td><td width="350">'+exi['descripcion']+'</td><td width="100">'+exi['unidad_medida']+'</td><td width="90" align="right">'+$(this).agregar_comas(parseFloat(exi['existencias']).toFixed(2))+'</td><td width="120" align="right">'+exi['costo_unitario']+'</td><td width="120" align="right">'+exi['costo_total']+'</td></tr>');
						primero=1;
					}else{
						$tabla_existencias.find('tbody').append('<tr><td width="110">'+exi['codigo_producto']+'</td><td width="350">'+exi['descripcion']+'</td><td width="100">'+exi['unidad_medida']+'</td><td width="90" align="right">'+$(this).agregar_comas(parseFloat(exi['existencias']).toFixed(2))+'</td><td width="120" align="right">'+exi['costo_unitario']+'</td><td width="120" align="right">'+exi['costo_total']+'</td></tr>');
					}
				});
				
				var height2 = $('#cuerpo').css('height');
				var alto = parseInt(height2)-240;
				var pix_alto=alto+'px';
				
				$('#table_exis').tableScroll({height:parseInt(pix_alto)});
			});//termina llamada json
		}else{
			jAlert("Selecciona un Almacen.",'! Atencion');
		}
	});
	
	
    
});


