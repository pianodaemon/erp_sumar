package com.agnux.xml.labels;

import com.agnux.common.helpers.StringHelper;
import com.agnux.xml.labels.*;
import com.agnux.common.obj.AgnuxXmlObject;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Text;
/**
 *
 * @author mi_compu
 */
public final class EtiquetaCompras extends AgnuxXmlObject{
    public EtiquetaCompras(LinkedHashMap<String, Object> datos_cuerpo){
        super();
        this.construyeNodoEtiqueta();
        this.construyeNodoCuerpo(datos_cuerpo);
    }
    private void construyeNodoEtiqueta(){
    	Document tmp = this.getDb().newDocument();
        Element element = tmp.createElement("etiquetacompras");
        
        
        tmp.appendChild(element);
        this.setDoc(tmp);
    }
    
    public void construyeNodoCuerpo(LinkedHashMap<String, Object> datos_cuerpo){
        Document tmp = this.getDoc();
        Element element = tmp.createElement("cuerpo");
        element.setAttribute("titulo", datos_cuerpo.get("cuerpo_titulo").toString());
        element.setAttribute("archivo", datos_cuerpo.get("nombre_archivo").toString());
        
        Element cliente = tmp.createElement("cliente");
        cliente.setAttribute("nombre", datos_cuerpo.get("nombre_cliente").toString());
        element.appendChild(cliente);
        
        Element tamaño_etiqueta = tmp.createElement("medida_etiqueta");
        tamaño_etiqueta.setAttribute("alto", datos_cuerpo.get("etiqueta_alto").toString());
        tamaño_etiqueta.setAttribute("largo", datos_cuerpo.get("etiqueta_largo").toString());
        element.appendChild(tamaño_etiqueta);
        
        
         Element impresora = tmp.createElement("impresora");
        Text modelo_impresora = tmp.createTextNode(datos_cuerpo.get("modelo_impresora").toString());
        impresora.appendChild(modelo_impresora);
        element.appendChild(impresora);
        
        
        
        
        
        Element lote = tmp.createElement("lote");
        lote.setAttribute("proveedor", datos_cuerpo.get("lote_proveedor").toString());
        lote.setAttribute("interno", datos_cuerpo.get("lote_interno").toString());
        element.appendChild(lote);

        Element producto = tmp.createElement("producto");
        producto.setAttribute("codigo",datos_cuerpo.get("producto_codigo").toString());
        producto.setAttribute("nombre", datos_cuerpo.get("producto_nombre").toString());
        lote.appendChild(producto);

        Element caducidad = tmp.createElement("caducidad");
        Text fecha_caducidad = tmp.createTextNode(datos_cuerpo.get("caducidad_fecha").toString());
        caducidad.appendChild(fecha_caducidad);
        lote.appendChild(caducidad);

        tmp.getDocumentElement().appendChild(element);
        
        StringHelper.convertDocument2Utf8String(tmp);
    }
    
    
    public Document obtieneDoc(){
        return this.getDoc();
    }
}