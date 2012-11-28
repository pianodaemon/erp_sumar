/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agnux.kemikal.interfacedaos;

import java.util.ArrayList;
import java.util.HashMap;

/**
 *
 * @author Noe Martinez
 * gpmarsan@gmail.com
 * 16/03/2012
 */
public interface GralInterfaceDao {
    
    public String getImagesDir();
    public String getSslDir();
    public String getCfdEmitidosDir();
    public String getCfdiSolicitudesDir();
    public String getXslDir();
    public String getTmpDir();
    public String getZebraDir();
    public String getZebraInDir();
    public String getZebraOutDir();
    public String getZebraProcessingDir();
    
    public String getEmpresa_IncluyeModContable(Integer id_empresa);
    public String getEmpresa_NivelCta(Integer id_empresa);
    
    public String getRazonSocialEmpresaEmisora(Integer id_empresa);
    public String getRfcEmpresaEmisora(Integer id_empresa);
    public String getRegimenFiscalEmpresaEmisora(Integer id_empresa);
    
    public String getCertificadoEmpresaEmisora(Integer id_empresa);
    public String getNoCertificadoEmpresaEmisora(Integer id_empresa);
    public String getFicheroLlavePrivada(Integer id_empresa);
    public String getPasswordLlavePrivada(Integer id_empresa);
    public String getFolioFactura(Integer id_empresa);
    public String getFolioNotaCredito(Integer id_empresa);
    public String getFolioNotaCargo(Integer id_empresa);
    public String getSerieNotaCargo(Integer id_empresa);
    public String getAnoAprobacionNotaCargo(Integer id_empresa);
    public String getNoAprobacionNotaCargo(Integer id_empresa);
    public String getNoAprobacionNotaCredito(Integer id_empresa);
    public String getSerieNotaCredito(Integer id_empresa);
    public String getAnoAprobacionNotaCredito(Integer id_empresa);
    public String getSerieFactura(Integer id_empresa);
    public String getAnoAprobacionFactura(Integer id_empresa);
    public String getNoAprobacionFactura(Integer id_empresa);
    
    public void actualizarFolioFactura(Integer id_empresa);
    public void actualizarFolioNotaCredito(Integer id_empresa);
    public void actualizarFolioNotaCargo(Integer id_empresa);
    
    public String getCalleDomicilioFiscalEmpresaEmisora(Integer id_empresa);
    public String getCpDomicilioFiscalEmpresaEmisora(Integer id_empresa);
    public String getColoniaDomicilioFiscalEmpresaEmisora(Integer id_empresa);
    public String getPaisDomicilioFiscalEmpresaEmisora(Integer id_empresa);
    public String getEstadoDomicilioFiscalEmpresaEmisora(Integer id_empresa);
    public String getMunicipioDomicilioFiscalEmpresaEmisora(Integer id_empresa);
    public String getLocalidadDomicilioFiscalEmpresaEmisora(Integer id_empresa);
    public String getNoExteriorDomicilioFiscalEmpresaEmisora(Integer id_empresa);
    public String getNoInteriorDomicilioFiscalEmpresaEmisora(Integer id_empresa);
    public String getReferenciaDomicilioFiscalEmpresaEmisora(Integer id_empresa);
    public String getTelefonoEmpresaEmisora(Integer id_empresa);
    public String getPaginaWebEmpresaEmisora(Integer id_empresa);
    
    public String getPaisSucursalEmisora(Integer id_sucursal);
    public String getEstadoSucursalEmisora(Integer id_sucursal);
    public String getMunicipioSucursalEmisora(Integer id_sucursal);
    
    //obtiene codigo1 para formato controlado por iso
    public String getCodigo1Iso(Integer id_empresa, Integer id_app);
    
    //obtiene codigo2 para formato controlado por iso
    public String getCodigo2Iso(Integer id_empresa, Integer id_app);
    
    //obtiene titulo del reporte
    public String getTituloReporte(Integer id_empresa, Integer id_app);
    
    
    
    //metodos  de uso general
    public int countAll(String data_string);
    public HashMap<String, String> selectFunctionValidateAaplicativo(String data, Integer idApp, String extra_data_array);
    public String selectFunctionForThisApp(String campos_data, String extra_data_array);
    
    //para el catalogo de Puestos
    public ArrayList<HashMap<String, String>> getPuesto_Datos(Integer id);
    public ArrayList<HashMap<String, Object>> getPuestos_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc);
    
    
    //catalogo de empleados
    public ArrayList<HashMap<String, Object>> getEmpleados_PaginaGrid(String data_string, int offset, int pageSize, String orderBy , String asc);
    public ArrayList<HashMap<String, Object>> getEmpleados_Datos(Integer id);
    public ArrayList<HashMap<String, Object>> getPaises();
    public ArrayList<HashMap<String, Object>> getEntidadesForThisPais(String id_pais);
    public ArrayList<HashMap<String, Object>> getLocalidadesForThisEntidad(String id_pais,String id_entidad);
    public ArrayList<HashMap<String,Object>>getEscolaridad(Integer id_empresa);
    public ArrayList<HashMap<String,Object>>getGeneroSexual();
    public ArrayList<HashMap<String,Object>>getEdoCivil();
    public ArrayList<HashMap<String,Object>>getReligion(Integer id_religion);
    public ArrayList<HashMap<String,Object>>getTiposangre(Integer id_enpresa);
    public ArrayList<HashMap<String,Object>>getPuestoForCategoria(String id_puesto);
    public ArrayList<HashMap<String,Object>>getSucursal(Integer id_empresa);
    public ArrayList<HashMap<String,Object>>getPuesto(Integer id_empresa);
    public ArrayList<HashMap<String,Object>>getRoles();
    public ArrayList<HashMap<String,Object>>getRolsEdit(Integer id_usuario);
    public ArrayList<HashMap<String,Object>>getUsuario(Integer id_usuario);
    public ArrayList<HashMap<String,Object>>getRegion();
    
    
    //esto es para cat de escolaridades
    public ArrayList<HashMap<String, String>> getEscolaridad_Datos(Integer id);                                                         
    public ArrayList<HashMap<String, Object>> getEscolaridad_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc);
    
    //esto es para cat de religiones
    public ArrayList<HashMap<String, String>> getReligion_Datos(Integer id);                                                         
    public ArrayList<HashMap<String, Object>> getReligion_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc);
    
    //esto es para cat sangre Tipos
    public ArrayList<HashMap<String, String>> getTipoSangre_Datos(Integer id);                                                         
    public ArrayList<HashMap<String, Object>> getTipoSangre_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc);
    
    
    //esto es para cat categoras
    public ArrayList<HashMap<String, String>> getCateg_Datos(Integer id);
    public ArrayList<HashMap<String, Object>> getCateg_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc);
    public ArrayList<HashMap<String, String>> getPuestos(); 
    
    //catalogo de inventario gral departamentos
    public ArrayList<HashMap<String, Object>> getGralDeptos_PaginaGrid(String data_string, int offset, int pageSize, String orderBy , String asc);
    public ArrayList<HashMap<String, String>> getGralDeptos_Datos(Integer id_unidad);
    
    
    //esto es para cat de turnos por departamento
    public ArrayList<HashMap<String, String>> getTurnos(Integer id);
    public ArrayList<HashMap<String, Object>> getTurnos_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc);
    public ArrayList<HashMap<String, String>> getDeptos(); 
    
    //esto es para cat Dias no Laborables
    public ArrayList<HashMap<String, String>> getDiasNoLaborables(Integer id);
    public ArrayList<HashMap<String, Object>> getDiasNoLaborables_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc);
    
    
    //Estos son para email y password de compras
    public String geteMailPurchasingEmpresaEmisora(Integer id_empresa);
    public String getPasswordeMailPurchasingEmpresaEmisora(Integer id_empresa);
    
    
    //Actualizador de codigo ISO
    public ArrayList<HashMap<String, String>> getCodigos_Datos(Integer id);
    public ArrayList<HashMap<String, String>> getTitulo_Datos(Integer id);
    public ArrayList<HashMap<String, Object>> getCodigos_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc,Integer id_empresa);



    
}