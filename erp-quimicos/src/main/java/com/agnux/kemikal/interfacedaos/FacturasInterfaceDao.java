/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agnux.kemikal.interfacedaos;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

/**
 *
 * @author agnux
 */
public interface FacturasInterfaceDao {
    public int countAll(String data_string);
    public String selectFunctionForFacAdmProcesos(String campos_data, String extra_data_array);
    public HashMap<String, String> selectFunctionValidateAaplicativo(String data, Integer idApp, String extra_data_array);
    
    public ArrayList<HashMap<String, Object>> getFacturas_PaginaGrid(String data_string,int offset, int pageSize, String orderBy , String asc);
    public ArrayList<HashMap<String, Object>> getFactura_Datos(Integer id_factura);
    public ArrayList<HashMap<String, Object>> getFactura_DatosGrid(Integer id_factura);
    public ArrayList<HashMap<String, Object>> getFactura_Monedas();
    public ArrayList<HashMap<String, Object>> getFactura_Agentes(Integer id_empresa, Integer id_sucursal);
    public ArrayList<HashMap<String, Object>> getFactura_DiasDeCredito();
    public ArrayList<HashMap<String, Object>> getMetodosPago();
    public ArrayList<HashMap<String, Integer>> getFactura_AnioInforme();
    
    public String getSerieFolioFactura(Integer id_factura);
    public String getSerieFolioFacturaByIdPrefactura(Integer id_prefactura);
    
    public Double getTipoCambioActual();
    public ArrayList<HashMap<String, Object>> getValoriva(Integer id_sucursal);
    
    public String getTipoFacturacion();
    
    //para bean facturador
    public HashMap<String,String> getDataFacturaXml(Integer id_prefactura);
    public String getFechaComprobante();
    public ArrayList<LinkedHashMap<String, String>> getListaConceptosFacturaXml(Integer id_prefactura);
    public ArrayList<LinkedHashMap<String, String>> getImpuestosRetenidosFacturaXml();
    public ArrayList<LinkedHashMap<String, String>> getImpuestosTrasladadosFacturaXml(Integer id_sucursal);
    public LinkedHashMap<String, String> getDatosExtrasFacturaXml(String id_prefactura, String tipo_cambio_vista, String id_usuario, String id_moneda, Integer id_empresa, String refacturar, Integer app_selected, String command_selected, String extra_data_array);
    
    public LinkedHashMap<String, String> getDatosExtrasCfdi(Integer id_factura);
    public ArrayList<LinkedHashMap<String, String>> getListaConceptosCfdi(Integer id_factura, String rfcEmisor);
    public ArrayList<LinkedHashMap<String, String>> getImpuestosTrasladadosCfdi(Integer id_factura, Integer id_sucursal);
    public ArrayList<LinkedHashMap<String, String>> getImpuestosRetenidosCfdi(Integer id_factura);
    public ArrayList<String> getLeyendasEspecialesCfdi(Integer id_empresa);
    
    //Actualizar campo de salidas de archivos en fac_docs
    //public Boolean update_fac_docs_salidas(String serieFolio, String nombre_archivo);
    //public String verifica_fac_docs_salidas(Integer id_factura);
    
    public ArrayList<HashMap<String, String>> getListaConceptosPdfCfd(String serieFolio);
    public HashMap<String, String> getDatosExtrasPdfCfd(String serieFolio, String proposito, String cadena_original, String sello_digital, Integer id_sucursal);
    
    
    
    
    
    //public String FnCancelarFactura(Integer id_prefactura, Integer tipo_cancelacion, String motivo,Integer id_usuario);
    public ArrayList<HashMap<String, String>> getTiposCancelacion();
    
    public void fnSalvaDatosFacturas(String rfc_receptor,
                        String serie_factura,
                        String folio_factura,
                        String no_probacion,
                        String total,
                        String tot_imp_trasladados,
                        String edo_comprobante,
                        String xml_file_name,
                        String fecha,
                        String razon_social_receptor,
                        String tipo_comprobante,
                        String proposito,
                        String ano_probacion ,
                        String cadena_conceptos,
                        String cadena_imp_trasladados,
                        String cadena_imp_retenidos,
                        Integer prefactura_id,
                        Integer id_usuario,
                        Integer id_moneda,
                        String tipo_cambio,
                        String refacturar,
                        String regimen_fiscal,
                        String metodo_pago,
                        String num_cuenta,
                        String lugar_de_expedicion);
    //public void modificaFlujoPrefactura(String sql_update);
    
    public String formar_cadena_conceptos(ArrayList<LinkedHashMap<String,String>> concepts);
    public String formar_cadena_traslados(String cantidad_lana_iva,String tasa_iva);
    public String formar_cadena_retenidos(String cantidad_lana_iva,String tasa_iva);
    
    
    //reporte de comprobantes por mes para hacienda(reporte txt)
    public ArrayList<HashMap<String, Object>> getComprobantesActividadPorMes(String year,String month,Integer id_empresa);
    
    //metodo para el Reporte de Facturacion
    public ArrayList<HashMap<String, String>> getDatosReporteFacturacion(Integer opcion, String factura, String cliente, String fecha_inicial, String fecha_final, Integer id_empresa);
    
    
    //Reporte de Remisiones creado el 28/06/2012 //variable estatus agregado por paco
    public ArrayList<HashMap<String, String>> getDatosReporteRemision(Integer opcion, String remision, String cliente, String fecha_inicial, String fecha_final, Integer id_empresa, Integer estatus);
    public ArrayList<HashMap<String, String>> getBuscadorClientes(String cadena, Integer filtro,Integer id_empresa, Integer id_sucursal);
    
    
    //Reporte de Remisiones facturadas creado el 21/07/2012  por vale8490
    public ArrayList<HashMap<String, String>> getDatosReporteRemision_facturada(Integer opcion, String remision, String cliente, String fecha_inicial, String fecha_final, Integer id_empresa);
    
    
    //metodos para notas de Credito
    public ArrayList<HashMap<String, Object>> getNotasCredito_PaginaGrid(String data_string,int offset, int pageSize, String orderBy , String asc);
    public ArrayList<HashMap<String, Object>> getNotasCredito_Datos(Integer id_cliente);
    public ArrayList<HashMap<String, String>> getNotasCredito_FacturasCliente(Integer id_cliente);
    
    //metodos para xml nota de credito
    public HashMap<String,String> getNotaCreditoCfd_Cfdi_Datos(Integer id_nota_credito);//este metodo se utiliza para Nota de Credito CFD y CFDI
    public ArrayList<LinkedHashMap<String,String>> getNotaCreditoCfd_ListaConceptosXml(Integer id_nota_credito);
    public ArrayList<LinkedHashMap<String,String>> getNotaCreditoCfd_ImpuestosRetenidosXml();
    public ArrayList<LinkedHashMap<String,String>> getNotaCreditoCfd_ImpuestosTrasladadosXml(Integer id_sucursal);
    public LinkedHashMap<String,String> getNotaCreditoCfd_DatosExtrasXml(Integer id_nota_credito, String tipo_cambio,String id_usuario,String moneda_id, Integer id_empresa, Integer app_selected, String command_selected, String extra_data_array, String fac_saldado);
    public String getSerieFolioNotaCredito(Integer id_nota_credito);
    public ArrayList<HashMap<String, String>> getNotaCreditoCfd_ListaConceptosPdf(String serieFolio);
    public HashMap<String, String> getNotaCreditoCfd_DatosExtrasPdf(String serieFolio, String proposito, String cadena_original, String sello_digital, Integer id_sucursal);
    
    
    //para txt de Nota de Credito cfdi
    public ArrayList<LinkedHashMap<String, String>> getNotaCreditoCfdi_ListaConceptos(Integer id_nota_credito);
    public LinkedHashMap<String, String> getNotaCreditoCfdi_DatosExtras(Integer id_nota_credito, String serie, String folio);
    public ArrayList<LinkedHashMap<String,String>> getNotaCreditoCfdi_ImpuestosTrasladados(Integer id_nota_credito);
    public ArrayList<LinkedHashMap<String,String>> getNotaCreditoCfdi_ImpuestosRetenidos(Integer id_nota_credito);
    
    //este metodo es para buscar si la factura seleccionada ya tiene asociada una Nota de Credito que se haya generado desde Devoluciones
    public ArrayList<HashMap<String, Object>> getFacDevoluciones_DatosNotaCredito(String factura);
    
    
    //public ArrayList<HashMap<String, String>> get_buscador_clientes(String cadena, Integer filtro, Integer id_empresa, Integer id_sucursal);
    //public ArrayList<HashMap<String, String>> getBuscadorClientes(String cadena, Integer filtro,Integer id_empresa, Integer id_sucursal);
    
    
    
    
    
    
}