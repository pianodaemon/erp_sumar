/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agnux.kemikal.springdaos;

import com.agnux.common.helpers.StringHelper;
import com.agnux.kemikal.interfacedaos.GralInterfaceDao;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
/**
 *
 * @author Noe Martinez
 * gpmarsan@gmail.com
 * 16/03/2012
 */
public class GralSpringDao implements GralInterfaceDao{
    private JdbcTemplate jdbcTemplate;
    
    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
    
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    
    @Override
    public String getCfdEmitidosDir() {
        String cfdemitidosdir = System.getenv("HOME") + "/" + "resources" + "/"+"cfd" + "/"+"emitidos" + "/";
        return cfdemitidosdir;
    }
    
    @Override
    public String getCfdiSolicitudesDir() {
        String cfdemitidosdir = System.getenv("HOME") + "/" + "resources" + "/"+"cfdi" + "/"+"solicitudes" + "/";
        return cfdemitidosdir;
    }
    
    @Override
    public String getImagesDir() {
        String imagesdir = System.getenv("HOME") + "/" + "resources" + "/"+"images" + "/";
        return imagesdir;
    }
    
    @Override
    public String getSslDir() {
        String ssldir = System.getenv("HOME") + "/" + "resources" + "/"+"ssl" + "/";
        //System.out.println(ssldir);
        return ssldir;
    }
    
    
    @Override
    public String getXslDir() {
        String xsldir = System.getenv("HOME") + "/" + "resources" + "/"+"schemas" + "/";
        //System.out.println(xsldir);
        return xsldir;
    }
    
    @Override
    public String getTmpDir() {
        String xsldir = System.getenv("HOME") + "/" + "resources" + "/"+"tmp" + "/";
        return xsldir;
    }
    
    @Override
    public String getZebraDir() {
        String zebradir = System.getenv("HOME") + "/" + "resources" + "/"+"zebra";
        return zebradir;
    }
    
    @Override
    public String getZebraInDir() {
        String zebradir = this.getZebraDir()+ "/"+"in";
        return zebradir;
    }


    @Override
    public String getZebraOutDir() {
        String zebradir = this.getZebraDir()+ "/"+"out";
        return zebradir;
    }

    @Override
    public String getZebraProcessingDir() {
        String zebradir = this.getZebraDir()+ "/"+"processing";
        return zebradir;
    }
    
    
    
    
    @Override
    public String getEmpresa_IncluyeModContable(Integer id_empresa){
        String sql_to_query = "SELECT incluye_contabilidad FROM gral_emp WHERE id="+id_empresa;
        //System.out.println("sql_to_query:"+sql_to_query);
        
        Map<String, Object> mapConta = this.getJdbcTemplate().queryForMap(sql_to_query);
        String incluye_contabilidad = String.valueOf(mapConta.get("incluye_contabilidad"));
        
        System.out.println("incluye_contabilidad: "+incluye_contabilidad);
        
        return incluye_contabilidad;
    }
    
    
    
    
    @Override
    public String getEmpresa_NivelCta(Integer id_empresa){
        String sql_to_query = "SELECT nivel_cta FROM gral_emp WHERE id="+id_empresa;
        //System.out.println("sql_to_query:"+sql_to_query);
        
        Map<String, Object> mapNivel = this.getJdbcTemplate().queryForMap(sql_to_query);
        String nivel_cta = mapNivel.get("nivel_cta").toString();
        
        System.out.println("nivel_cta: "+nivel_cta);
        
        return nivel_cta;
    }
    
    
    
    
    
    @Override
    public String getRazonSocialEmpresaEmisora(Integer id_empresa){
        String sql_to_query = "SELECT titulo FROM gral_emp WHERE id ="+id_empresa;
        //System.out.println("sql_to_query:"+sql_to_query);
        
        Map<String, Object> map_razon_social = this.getJdbcTemplate().queryForMap(sql_to_query);
        String razon_social_emisora = map_razon_social.get("titulo").toString();
        return razon_social_emisora;
    }
    
    
    
    @Override
    public String getRfcEmpresaEmisora(Integer id_empresa){
        String sql_to_query = "SELECT rfc FROM gral_emp WHERE id ="+id_empresa;
        Map<String, Object> map_rfc = this.getJdbcTemplate().queryForMap(sql_to_query);
        String rfc_emisora = map_rfc.get("rfc").toString();
        return rfc_emisora;
    }
    
    @Override
    public String getRegimenFiscalEmpresaEmisora(Integer id_empresa){
        String sql_to_query = "SELECT regimen_fiscal FROM gral_emp WHERE id ="+id_empresa;
        Map<String, Object> map_regimen = this.getJdbcTemplate().queryForMap(sql_to_query);
        String regimen_fiscal_emisora = map_regimen.get("regimen_fiscal").toString();
        return regimen_fiscal_emisora;
    }
    
    @Override
    public String getCertificadoEmpresaEmisora(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf.archivo_certificado FROM gral_emp JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id WHERE gral_emp.id ="+id_empresa;
        Map<String, Object> map_certificado = this.getJdbcTemplate().queryForMap(sql_to_query);
        String certificado_emisora = map_certificado.get("archivo_certificado").toString();
        return certificado_emisora;
    }
    
    
    
    @Override
    public String getNoCertificadoEmpresaEmisora(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf.numero_certificado FROM gral_emp JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id WHERE gral_emp.id ="+id_empresa;
        Map<String, Object> map_no_cert = this.getJdbcTemplate().queryForMap(sql_to_query);
        String no_cert_emisora = map_no_cert.get("numero_certificado").toString();
        return no_cert_emisora;
    }
    
    
    @Override
    public String getFicheroLlavePrivada(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf.archivo_llave FROM gral_emp JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id WHERE gral_emp.id ="+id_empresa;
        Map<String, Object> map_archivo_llave = this.getJdbcTemplate().queryForMap(sql_to_query);
        String archivo_llave_emisora = map_archivo_llave.get("archivo_llave").toString();
        return archivo_llave_emisora;
    }
    
    
    
    @Override
    public String getPasswordLlavePrivada(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf.password_llave FROM gral_emp JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id WHERE gral_emp.id ="+id_empresa;
        Map<String, Object> map_password_llave = this.getJdbcTemplate().queryForMap(sql_to_query);
        String password_llave_emisora = map_password_llave.get("password_llave").toString();
        return password_llave_emisora;
    }
    
    
    
    @Override
    public String getFolioFactura(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.folio_actual "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'FAC' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_folio_factura = this.getJdbcTemplate().queryForMap(sql_to_query);
        String folio_factura_emisora = map_folio_factura.get("folio_actual").toString();
        return folio_factura_emisora;
    }
    
    
    
    @Override
    public String getSerieFactura(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.serie "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'FAC' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_serie_factura = this.getJdbcTemplate().queryForMap(sql_to_query);
        String serie_factura_emisora = map_serie_factura.get("serie").toString();
        return serie_factura_emisora;
    }
    
    
    
    @Override
    public String getAnoAprobacionFactura(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.ano_aprobacion "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'FAC' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_ano_aprobacion_factura = this.getJdbcTemplate().queryForMap(sql_to_query);
        String ano_aprobacion_factura_emisora = map_ano_aprobacion_factura.get("ano_aprobacion").toString();
        return ano_aprobacion_factura_emisora;
    }
    
    
    
    @Override
    public String getNoAprobacionFactura(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.no_aprobacion "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'FAC' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_num_aprobacion_factura = this.getJdbcTemplate().queryForMap(sql_to_query);
        String num_aprobacion_factura_emisora = map_num_aprobacion_factura.get("no_aprobacion").toString();
        return num_aprobacion_factura_emisora;
    }
    
    
    @Override
    public String getSerieNotaCredito(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.serie "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'NCR' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_serie_nota_credito = this.getJdbcTemplate().queryForMap(sql_to_query);
        String serie_nota_credito_emisora = map_serie_nota_credito.get("serie").toString();
        return serie_nota_credito_emisora;
    }
    
    
    
    @Override
    public String getFolioNotaCredito(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.folio_actual "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'NCR' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_folio_nota_credito = this.getJdbcTemplate().queryForMap(sql_to_query);
        String folio_nota_credito_emisora = map_folio_nota_credito.get("folio_actual").toString();
        return folio_nota_credito_emisora;
    }
    
    
    @Override
    public String getNoAprobacionNotaCredito(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.no_aprobacion "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'NCR' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_num_aprobacion_nota_credito = this.getJdbcTemplate().queryForMap(sql_to_query);
        String num_aprobacion_nota_credito_emisora = map_num_aprobacion_nota_credito.get("no_aprobacion").toString();
        return num_aprobacion_nota_credito_emisora;
    }
    
    
    @Override
    public String getAnoAprobacionNotaCredito(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.ano_aprobacion "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'NCR' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_ano_aprobacion_nota_credito = this.getJdbcTemplate().queryForMap(sql_to_query);
        String ano_aprobacion_nota_credito_emisora = map_ano_aprobacion_nota_credito.get("ano_aprobacion").toString();
        return ano_aprobacion_nota_credito_emisora;
    }
    
    
    
    @Override
    public String getSerieNotaCargo(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.serie "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'NCA' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_serie_nota_cargo = this.getJdbcTemplate().queryForMap(sql_to_query);
        String serie_nota_cargo_emisora = map_serie_nota_cargo.get("serie").toString();
        return serie_nota_cargo_emisora;
    }
    
    
    
    @Override
    public String getFolioNotaCargo(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.folio_actual "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'NCA' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_folio_nota_cargo = this.getJdbcTemplate().queryForMap(sql_to_query);
        String folio_nota_cargo_emisora = map_folio_nota_cargo.get("folio_actual").toString();
        return folio_nota_cargo_emisora;
    }
    
    
    @Override
    public String getAnoAprobacionNotaCargo(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.ano_aprobacion "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'NCA' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_ano_aprobacion_nota_cargo = this.getJdbcTemplate().queryForMap(sql_to_query);
        String ano_aprobacion_nota_cargo_emisora = map_ano_aprobacion_nota_cargo.get("ano_aprobacion").toString();
        return ano_aprobacion_nota_cargo_emisora;
    }
    
    
    
    @Override
    public String getNoAprobacionNotaCargo(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.no_aprobacion "
                + "FROM gral_emp "
                + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id "
                + "WHERE fac_cfds_conf_folios.proposito = 'NCA' AND gral_emp.id ="+id_empresa;
        Map<String, Object> map_num_aprobacion_nota_cargo = this.getJdbcTemplate().queryForMap(sql_to_query);
        String num_aprobacion_nota_cargo_emisora = map_num_aprobacion_nota_cargo.get("no_aprobacion").toString();
        return num_aprobacion_nota_cargo_emisora;
    }
    
    
    
    @Override
    public void actualizarFolioFactura(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.id "
                            + "FROM gral_emp  "
                            + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                            + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id  "
                            + "WHERE fac_cfds_conf_folios.proposito = 'FAC' AND gral_emp.id ="+id_empresa;
        int id_fac_cfds_conf_folios = this.getJdbcTemplate().queryForInt(sql_to_query);
        
        String sql_to_query_update = "UPDATE fac_cfds_conf_folios SET folio_actual = folio_actual+1 WHERE id = "+id_fac_cfds_conf_folios;
        this.getJdbcTemplate().execute(sql_to_query_update);
    }
    
    
    
    @Override
    public void actualizarFolioNotaCredito(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.id "
                            + "FROM gral_emp  "
                            + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                            + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id  "
                            + "WHERE fac_cfds_conf_folios.proposito = 'NCR' AND gral_emp.id ="+id_empresa;
        int id_fac_cfds_conf_folios = this.getJdbcTemplate().queryForInt(sql_to_query);
        
        String sql_to_query_update = "UPDATE fac_cfds_conf_folios SET folio_actual = folio_actual+1 WHERE id = "+id_fac_cfds_conf_folios;
        this.getJdbcTemplate().execute(sql_to_query_update);
    }
    
    
    
    
    @Override
    public void actualizarFolioNotaCargo(Integer id_empresa) {
        String sql_to_query = "SELECT fac_cfds_conf_folios.id "
                            + "FROM gral_emp  "
                            + "JOIN fac_cfds_conf ON fac_cfds_conf.empresa_id = gral_emp.id "
                            + "JOIN fac_cfds_conf_folios ON fac_cfds_conf_folios.fac_cfds_conf_id=fac_cfds_conf.id  "
                            + "WHERE fac_cfds_conf_folios.proposito = 'NCA' AND gral_emp.id ="+id_empresa;
        int id_fac_cfds_conf_folios = this.getJdbcTemplate().queryForInt(sql_to_query);
        
        String sql_to_query_update = "UPDATE fac_cfds_conf_folios SET folio_actual = folio_actual+1 WHERE id = "+id_fac_cfds_conf_folios;
        this.getJdbcTemplate().execute(sql_to_query_update);
    }
    
    
    
    
    
    @Override
    public String getCalleDomicilioFiscalEmpresaEmisora(Integer id_empresa) {
        String sql_to_query = "SELECT calle FROM gral_emp WHERE gral_emp.id ="+id_empresa;
        Map<String, Object> map_calle = this.getJdbcTemplate().queryForMap(sql_to_query);
        String calle_emisora = map_calle.get("calle").toString();
        return calle_emisora;
    }
    
    
    @Override
    public String getCpDomicilioFiscalEmpresaEmisora(Integer id_empresa) {
        String sql_to_query = "SELECT cp FROM gral_emp WHERE gral_emp.id ="+id_empresa;
        Map<String, Object> map_cp = this.getJdbcTemplate().queryForMap(sql_to_query);
        String cp_emisora = map_cp.get("cp").toString();
        return cp_emisora;
    }
    
    
    @Override
    public String getColoniaDomicilioFiscalEmpresaEmisora(Integer id_empresa) {
        String sql_to_query = "SELECT colonia FROM gral_emp WHERE gral_emp.id ="+id_empresa;
        Map<String, Object> map_colonia = this.getJdbcTemplate().queryForMap(sql_to_query);
        String colonia_emisora = map_colonia.get("colonia").toString();
        return colonia_emisora;
    }
    
    @Override
    public String getLocalidadDomicilioFiscalEmpresaEmisora(Integer id_empresa) {
        String localidad_emisora = "";
        return localidad_emisora;
    }
    
    
    
    
    @Override
    public String getMunicipioDomicilioFiscalEmpresaEmisora(Integer id_empresa) {
        //obtener nombre del municipio
        String sql_to_query_mun = "SELECT gral_mun.titulo FROM gral_emp JOIN gral_mun ON gral_mun.id = gral_emp.municipio_id WHERE gral_emp.id ="+id_empresa;
        Map<String, Object> map_municipio = this.getJdbcTemplate().queryForMap(sql_to_query_mun);
        String municipio_emisora = map_municipio.get("titulo").toString();
        
        return municipio_emisora;
    }
    
    
    @Override
    public String getEstadoDomicilioFiscalEmpresaEmisora(Integer id_empresa) {
        //obtener nombre del estado
        String sql_query_estado = "SELECT gral_edo.titulo FROM gral_emp JOIN gral_edo ON gral_edo.id = gral_emp.estado_id WHERE gral_emp.id ="+id_empresa;
        Map<String, Object> map_estado = this.getJdbcTemplate().queryForMap(sql_query_estado);
        String estado_emisora = map_estado.get("titulo").toString();
        
        return estado_emisora;
    }
    
    
    
    @Override
    public String getPaisDomicilioFiscalEmpresaEmisora(Integer id_empresa) {
        //obtener nombre del pais
        String sql_query_pais = "SELECT gral_pais.titulo FROM gral_emp JOIN gral_pais ON gral_pais.id = gral_emp.pais_id WHERE gral_emp.id ="+id_empresa;
        Map<String, Object> map_pais = this.getJdbcTemplate().queryForMap(sql_query_pais);
        String pais_emisora = map_pais.get("titulo").toString();
        return pais_emisora;
    }
    
    
    
    @Override
    public String getNoExteriorDomicilioFiscalEmpresaEmisora(Integer id_empresa) {
        String sql_to_query = "SELECT numero_exterior FROM gral_emp  WHERE id ="+id_empresa;
        Map<String, Object> map_numero = this.getJdbcTemplate().queryForMap(sql_to_query);
        String numero_emisora = map_numero.get("numero_exterior").toString();
        return numero_emisora;
    }
    
    
    @Override
    public String getNoInteriorDomicilioFiscalEmpresaEmisora(Integer id_empresa) {
        /*
        String sql_to_query = "SELECT CASE WHEN numero_interior IS NULL THEN numero_interior ELSE '' END AS numero_interior FROM gral_emp  WHERE id ="+id_empresa;
        Map<String, Object> map_numero_int = this.getJdbcTemplate().queryForMap(sql_to_query);
        String numero_emisora = map_numero_int.get("numero_interior").toString();
        */
        String numero_emisora = "";
        return numero_emisora;
    }
    
    
    @Override
    public String getReferenciaDomicilioFiscalEmpresaEmisora(Integer id_empresa) {
        String referencia_emisora = "";
        return referencia_emisora;
    }
    
    
    @Override
    public String getTelefonoEmpresaEmisora(Integer id_empresa) {
        String sql_to_query = "SELECT telefono FROM gral_emp WHERE id ="+id_empresa;
        Map<String, Object> map_regimen = this.getJdbcTemplate().queryForMap(sql_to_query);
        String tel_emisora = map_regimen.get("telefono").toString();
        return tel_emisora;
    }
    
    @Override
    public String getPaginaWebEmpresaEmisora(Integer id_empresa) {
        String sql_to_query = "SELECT pagina_web FROM gral_emp WHERE id ="+id_empresa;
        Map<String, Object> map_pagina_web = this.getJdbcTemplate().queryForMap(sql_to_query);
        String pagina_web = map_pagina_web.get("pagina_web").toString();
        return pagina_web;
    }

    
    
    
    @Override
    public String getPaisSucursalEmisora(Integer id_sucursal) {
        //obtener nombre del pais
        String sql_query_pais = "SELECT gral_pais.titulo FROM gral_suc JOIN gral_pais ON gral_pais.id = gral_suc.gral_pais_id WHERE gral_suc.id="+id_sucursal;
        Map<String, Object> map_pais = this.getJdbcTemplate().queryForMap(sql_query_pais);
        String pais_suc = map_pais.get("titulo").toString();
        return pais_suc;
    }

    @Override
    public String getEstadoSucursalEmisora(Integer id_sucursal) {
        //obtener nombre del estado
        String sql_query_estado = "SELECT gral_edo.titulo FROM gral_suc JOIN gral_edo ON gral_edo.id = gral_suc.gral_edo_id WHERE gral_suc.id="+id_sucursal;
        Map<String, Object> map_estado = this.getJdbcTemplate().queryForMap(sql_query_estado);
        String estado_suc = map_estado.get("titulo").toString();
        
        return estado_suc;
    }
    
    
    @Override
    public String getMunicipioSucursalEmisora(Integer id_sucursal) {
        //obtener nombre del municipio
        String sql_to_query_mun = "SELECT gral_mun.titulo FROM gral_suc JOIN gral_mun ON gral_mun.id = gral_suc.gral_mun_id WHERE gral_suc.id="+id_sucursal;
        Map<String, Object> map_municipio = this.getJdbcTemplate().queryForMap(sql_to_query_mun);
        String municipio_suc = map_municipio.get("titulo").toString();
        
        return municipio_suc;
    }
    
    //obtiene codigo1 del iso para reporte
    @Override
    public String getCodigo1Iso(Integer id_empresa, Integer id_app) {
        String valor_retorno="";
        String sql_busqueda = "SELECT count(gral_docs_conf.valor)  "
                + "FROM gral_docs "
                + "JOIN gral_docs_conf ON gral_docs_conf.gral_doc_id=gral_docs.id "
                + "WHERE gral_docs.gral_emp_id="+id_empresa +" "
                + "AND gral_docs.gral_app_id="+id_app +" "
                + "AND gral_docs_conf.campo='CODIGO1'";
        //esto es para revisar que exista el registro
        int rowCount = this.getJdbcTemplate().queryForInt(sql_busqueda);
        
        //si rowCount es mayor que cero si se encontro registro y extraemos el valor
        if (rowCount>0){
            String sql_to_query = "SELECT gral_docs_conf.valor "
                + "FROM gral_docs "
                + "JOIN gral_docs_conf ON gral_docs_conf.gral_doc_id=gral_docs.id "
                + "WHERE gral_docs.gral_emp_id="+id_empresa +" "
                + "AND gral_docs.gral_app_id="+id_app +" "
                + "AND gral_docs_conf.campo='CODIGO1'";
            Map<String, Object> map = this.getJdbcTemplate().queryForMap(sql_to_query);
            valor_retorno = map.get("valor").toString();
        }
        
        return valor_retorno;
    }
    
    
    @Override
    public String getCodigo2Iso(Integer id_empresa, Integer id_app) {
        String valor_retorno="";
        String sql_busqueda = "";
        String sql_to_query="";
        
        sql_busqueda = "SELECT count(gral_docs_conf.valor)  "
                + "FROM gral_docs "
                + "JOIN gral_docs_conf ON gral_docs_conf.gral_doc_id=gral_docs.id "
                + "WHERE gral_docs.gral_emp_id="+id_empresa +" "
                + "AND gral_docs.gral_app_id="+id_app +" "
                + "AND gral_docs_conf.campo='CODIGO2'";
        //esto es para revisar que exista el registro
        int rowCount = this.getJdbcTemplate().queryForInt(sql_busqueda);
        
        //si rowCount es mayor que cero si se encontro registro y extraemos el valor
        if (rowCount>0){
            sql_to_query = "SELECT gral_docs_conf.valor "
                + "FROM gral_docs "
                + "JOIN gral_docs_conf ON gral_docs_conf.gral_doc_id=gral_docs.id "
                + "WHERE gral_docs.gral_emp_id="+id_empresa +" "
                + "AND gral_docs.gral_app_id="+id_app +" "
                + "AND gral_docs_conf.campo='CODIGO2'";
            Map<String, Object> map = this.getJdbcTemplate().queryForMap(sql_to_query);
            valor_retorno = map.get("valor").toString();
        }
        
        
        return valor_retorno;
    }
    
    @Override
    public String getTituloReporte(Integer id_empresa, Integer id_app) {
        String sql_to_query = "SELECT gral_docs.titulo FROM gral_docs WHERE gral_docs.gral_emp_id="+id_empresa +" AND gral_docs.gral_app_id="+id_app+";";
        Map<String, Object> map = this.getJdbcTemplate().queryForMap(sql_to_query);
        String valor_retorno = map.get("titulo").toString();
        
        return valor_retorno;
    }



    
    
    
    
    //metodos  de uso general
    @Override
    public HashMap<String, String> selectFunctionValidateAaplicativo(String data, Integer idApp, String extra_data_array) {
        String sql_to_query = "select erp_fn_validaciones_por_aplicativo from erp_fn_validaciones_por_aplicativo('"+data+"',"+idApp+",array["+extra_data_array+"]);";
        //System.out.println("Validacion:"+sql_to_query);
        //log.log(Level.INFO, "Ejecutando query de {0}", sql_to_query);
        
        HashMap<String, String> hm = (HashMap<String, String>) this.jdbcTemplate.queryForObject(
            sql_to_query, 
            new Object[]{}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, String> row = new HashMap<String, String>();
                    row.put("success",rs.getString("erp_fn_validaciones_por_aplicativo"));
                    return row;
                }
            }
        );
        return hm;
    }
    
    
    @Override
    public String selectFunctionForThisApp(String campos_data, String extra_data_array) {
        String sql_to_query = "select * from gral_adm_catalogos('"+campos_data+"',array["+extra_data_array+"]);";
        
        String valor_retorno="";
        Map<String, Object> update = this.getJdbcTemplate().queryForMap(sql_to_query);
        valor_retorno = update.get("gral_adm_catalogos").toString();
        return valor_retorno;
    }
    
    
    @Override
    public int countAll(String data_string) {
        String sql_busqueda = "select id from gral_bus_catalogos('"+data_string+"') as foo (id integer)";
        String sql_to_query = "select count(id)::int as total from ("+sql_busqueda+") as subt";
        
        int rowCount = this.getJdbcTemplate().queryForInt(sql_to_query);
        return rowCount;
    }
    
    
    
    
    //metodos para el Catalogo de Puestos
     ///guarda los datos de los puestos
    @Override
    public ArrayList<HashMap<String, String>> getPuesto_Datos(Integer id) {
        
        String sql_to_query = "SELECT id,titulo as puesto FROM gral_puestos WHERE id="+id;
        
        ArrayList<HashMap<String, String>> dato_puesto = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, String> row = new HashMap<String, String>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("puesto",rs.getString("puesto"));                
                    return row;
                }
            }
        );
        return dato_puesto;
    }
    
    
    
    @Override                                                      
    public ArrayList<HashMap<String, Object>> getPuestos_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc) {
        String sql_busqueda = "select id from gral_bus_catalogos(?) as foo (id integer)";
        
	String sql_to_query = "SELECT gral_puestos.id, gral_puestos.titulo as puesto "                              
                                +"FROM gral_puestos "                        
                                +"JOIN ("+sql_busqueda+") AS sbt ON sbt.id = gral_puestos.id "
                                +"WHERE gral_puestos.borrado_logico=false "
                                +"order by "+orderBy+" "+asc+" limit ? OFFSET ?";
        
        System.out.println("Busqueda GetPage: "+sql_to_query+" "+data_string+" "+ offset +" "+ pageSize);
        System.out.println("esto es el query  :  "+sql_to_query);
        ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query, 
            new Object[]{new String(data_string), new Integer(pageSize),new Integer(offset)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("titulo",rs.getString("puesto"));                    
                    return row;
                }
            }
        );
        return hm; 
    }
    
    
    
    //METODOS DEL CATALOGO DE EMPLEADOS
    @Override
    public ArrayList<HashMap<String, Object>> getEmpleados_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc) {
        String sql_busqueda = "select id from gral_bus_catalogos(?) as foo (id integer)";
        
	String sql_to_query = "SELECT "
				+"gral_empleados.id, "
				+"gral_empleados.clave, "
				+"gral_empleados.nombre_pila ||' '||gral_empleados.apellido_paterno||' '||gral_empleados.apellido_materno as nombre_empleado, "
				+"gral_empleados.curp, "
                                +"gral_puestos.titulo "
				
                                +"FROM gral_empleados "
                                +"JOIN gral_puestos on gral_puestos.id=gral_empleados.gral_puesto_id "
                                +"JOIN ("+sql_busqueda+") as subt on subt.id=gral_empleados.id "
                                +"order by "+orderBy+" "+asc+" limit ? OFFSET ? ";
        
        System.out.println("Busqueda GetPage: "+sql_to_query);
        
        //log.log(Level.INFO, "Ejecutando query de {0}", sql_to_query);
        ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query, 
            new Object[]{new String(data_string), new Integer(pageSize),new Integer(offset)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getInt("id"));
                    row.put("clave",rs.getString("clave"));
                    row.put("nombre_empleado",rs.getString("nombre_empleado"));
                    row.put("curp",rs.getString("curp"));
                    row.put("titulo",rs.getString("titulo"));
                    return row;
                }
            }
        );
        return hm; 
    }
    
    
   //muestra los datos al momento de editar
    @Override
    public ArrayList<HashMap<String, Object>> getEmpleados_Datos(Integer id) {
        
        String sql_query = "SELECT gral_empleados.id as empleado_id, "
                            +"gral_empleados.clave, " 
                            +"gral_empleados.nombre_pila, " 
                            +"gral_empleados.apellido_paterno, " 
                            +"gral_empleados.apellido_materno, " 
                            +"gral_empleados.imss, "
                            +"gral_empleados.infonavit, "
                            +"gral_empleados.curp, "
                            +"gral_empleados.rfc, "
                            +"to_char(gral_empleados.fecha_nacimiento,'yyyy-mm-dd')as fecha_nacimiento, " 
                            +"to_char(gral_empleados.fecha_ingreso,'yyyy-mm-dd') as fecha_ingreso, "
                            +"gral_empleados.gral_escolaridad_id, "
                            +"gral_empleados.gral_sexo_id, "
                            +"gral_empleados.gral_civil_id, "
                            +"gral_empleados.gral_religion_id, "
                            +"gral_empleados.gral_sangretipo_id, "
                            +"gral_empleados.gral_puesto_id, "
                            +"gral_empleados.gral_suc_id_empleado, "
                            +"gral_empleados.gral_categ_id, "
                            +"gral_empleados.telefono, " 
                            +"gral_empleados.telefono_movil, " 
                            +"gral_empleados.correo_personal, " 
                            +"gral_empleados.gral_pais_id, "
                            +"gral_empleados.gral_edo_id, "
                            +"gral_empleados.gral_mun_id, "
                            +"gral_empleados.calle, "
                            +"gral_empleados.numero, " 
                            +"gral_empleados.colonia, " 
                            +"gral_empleados.cp, "
                            +"gral_empleados.contacto_emergencia, " 
                            +"gral_empleados.telefono_emergencia, " 
                            +"gral_empleados.enfermedades, " 
                            +"gral_empleados.alergias, "
                            +"gral_empleados.comentarios, "
                            +"(CASE WHEN gral_usr.username IS NULL THEN '' ELSE gral_usr.username END) AS username,"
                            +"(CASE WHEN gral_usr.password IS NULL THEN '' ELSE gral_usr.password END) AS password,"
                            +"gral_usr.enabled, "
                            +"gral_usr.id as id_usuario, "
                            +"gral_empleados.comision_agen, "
                            +"gral_empleados.region_id_agen, "
                            +"gral_empleados.comision2_agen, "
                            +"gral_empleados.comision3_agen, "
                            +"gral_empleados.comision4_agen, "
                            +"gral_empleados.dias_tope_comision, "
                            +"gral_empleados.dias_tope_comision2, "
                            +"gral_empleados.dias_tope_comision3 "
                            +"FROM gral_empleados "
                            +"LEFT JOIN  gral_usr on gral_usr.gral_empleados_id=gral_empleados.id "
                            +"WHERE gral_empleados.borrado_logico=false AND gral_empleados.id=?;";
        
        System.out.println("Ejecutando query getEmpleado:"+ sql_query);
        System.out.println("Obteniendo datos del empleado: "+id);
        
        ArrayList<HashMap<String, Object>> empleado = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_query,  
            new Object[]{new Integer(id)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("empleado_id",rs.getInt("empleado_id"));
                    row.put("clave",rs.getString("clave"));
                    row.put("nombre_pila",rs.getString("nombre_pila"));
                    row.put("apellido_paterno",rs.getString("apellido_paterno"));
                    row.put("apellido_materno",rs.getString("apellido_materno"));
                    row.put("imss",rs.getString("imss"));
                    row.put("infonavit",rs.getString("infonavit"));
                    row.put("curp",rs.getString("curp"));
                    row.put("rfc",rs.getString("rfc"));
                    row.put("fecha_nacimiento",rs.getString("fecha_nacimiento"));
                    row.put("fecha_ingreso",rs.getString("fecha_ingreso"));
                    row.put("gral_escolaridad_id",rs.getString("gral_escolaridad_id"));
                    row.put("gral_sexo_id",rs.getString("gral_sexo_id"));
                    row.put("gral_civil_id",rs.getString("gral_civil_id"));
                    row.put("gral_religion_id",rs.getString("gral_religion_id"));
                    row.put("gral_sangretipo_id",rs.getString("gral_sangretipo_id"));
                    row.put("gral_puesto_id",rs.getString("gral_puesto_id"));
                    row.put("gral_suc_id_empleado",rs.getString("gral_suc_id_empleado"));
                    row.put("gral_categ_id",rs.getString("gral_categ_id"));
                    row.put("telefono",rs.getString("telefono"));
                    row.put("telefono_movil",rs.getString("telefono_movil"));
                    row.put("correo_personal",rs.getString("correo_personal"));
                    row.put("gral_pais_id",rs.getString("gral_pais_id"));
                    row.put("gral_edo_id",rs.getString("gral_edo_id"));
                    row.put("gral_mun_id",rs.getString("gral_mun_id"));
                    row.put("calle",rs.getString("calle"));
                    row.put("numero",rs.getString("numero"));
                    row.put("colonia",rs.getString("colonia"));
                    row.put("cp",rs.getString("cp"));
                    row.put("contacto_emergencia",rs.getString("contacto_emergencia"));
                    row.put("telefono_emergencia",rs.getString("telefono_emergencia"));
                    row.put("enfermedades",rs.getString("enfermedades"));
                    row.put("alergias",rs.getString("alergias"));
                    row.put("comentarios",rs.getString("comentarios"));
                    row.put("username",rs.getString("username"));
                    row.put("password",rs.getString("password"));
                    row.put("enabled",String.valueOf(rs.getBoolean("enabled")));
                    row.put("id_usuario",rs.getInt("id_usuario"));
                    row.put("comision_agen",rs.getDouble("comision_agen"));
                    row.put("region_id_agen",rs.getInt("region_id_agen"));
                    row.put("comision2_agen",rs.getDouble("comision2_agen"));
                    row.put("comision3_agen",rs.getDouble("comision3_agen"));
                    row.put("comision4_agen",rs.getDouble("comision4_agen"));
                    row.put("dias_tope_comision",rs.getDouble("dias_tope_comision"));
                    row.put("dias_tope_comision2",rs.getDouble("dias_tope_comision2"));
                    row.put("dias_tope_comision3",rs.getDouble("dias_tope_comision3"));
                    return row;
                }
            }
        );
        return empleado;
    }
    
    
    
    
    @Override
    public ArrayList<HashMap<String, Object>> getPaises() {
        //String sql_to_query = "SELECT DISTINCT cve_pais ,pais_ent FROM municipios;";
        String sql_to_query = "SELECT DISTINCT id as cve_pais, titulo as pais_ent FROM gral_pais;";
        
        ArrayList<HashMap<String, Object>> pais = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("cve_pais",rs.getString("cve_pais"));
                    row.put("pais_ent",rs.getString("pais_ent"));
                    return row;
                }
            }
        );
        return pais;
    }
    
    
    
    @Override
    public ArrayList<HashMap<String, Object>> getEntidadesForThisPais(String id_pais) {
        //String sql_to_query = "SELECT DISTINCT cve_ent ,nom_ent FROM municipios where cve_pais='"+id_pais+"' order by nom_ent;";
        String sql_to_query = "SELECT id as cve_ent, titulo as nom_ent FROM gral_edo WHERE pais_id="+id_pais+" order by nom_ent;";
        //log.log(Level.INFO, "Ejecutando query de {0}", sql_to_query);
        ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("cve_ent",rs.getString("cve_ent"));
                    row.put("nom_ent",rs.getString("nom_ent"));
                    return row;
                }
            }
        );
        return hm;
    }
    
    

    @Override
    public ArrayList<HashMap<String, Object>> getLocalidadesForThisEntidad(String id_pais, String id_entidad) {
        //String sql_to_query = "SELECT DISTINCT cve_mun ,nom_mun FROM municipios where cve_ent='"+id_entidad+"' and cve_pais='"+id_pais+"' order by nom_mun;";
        String sql_to_query = "SELECT id as cve_mun, titulo as nom_mun FROM gral_mun WHERE estado_id="+id_entidad+" and pais_id="+id_pais+" order by nom_mun;";
        
        //System.out.println("Ejecutando query loc_for_this_entidad: "+sql_to_query);
        
        ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("cve_mun",rs.getString("cve_mun"));
                    row.put("nom_mun",rs.getString("nom_mun"));
                    return row;
                }
            }
        );
        return hm;
    }
    
    
    
    
    

    
    //alimenta select de tipo de escolaridad
    
    @Override
    public ArrayList<HashMap<String, Object>> getEscolaridad(Integer id_empresa) {
        
        String sql_to_query = "select id,titulo from gral_escolaridads where gral_emp_id="+id_empresa+" order by titulo";
        
        ArrayList<HashMap<String, Object>> escolaridad = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getString("id"));
                    row.put("titulo",rs.getString("titulo"));
                    return row;
                }
            }
        );
        return escolaridad;
    }

    @Override
    public ArrayList<HashMap<String, Object>> getGeneroSexual() {
        //String sql_to_query = "SELECT DISTINCT cve_pais ,pais_ent FROM municipios;";
        String sql_to_query = "select id,titulo from gral_sexos order by titulo";
        
        ArrayList<HashMap<String, Object>> generosexual = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getString("id"));
                    row.put("titulo",rs.getString("titulo"));
                    return row;
                }
            }
        );
        return generosexual;
    }

    @Override
    public ArrayList<HashMap<String, Object>> getEdoCivil() {
        String sql_to_query = "select id,titulo from gral_civils order by titulo";
        
        ArrayList<HashMap<String, Object>> edocivil = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getString("id"));
                    row.put("titulo",rs.getString("titulo"));
                    return row;
                }
            }
        );
        return edocivil;
    }

    @Override
    public ArrayList<HashMap<String, Object>> getReligion(Integer id_religion) {
        String sql_to_query = "select id,titulo from gral_religions order by titulo";
        
        ArrayList<HashMap<String, Object>> religion = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getString("id"));
                    row.put("titulo",rs.getString("titulo"));
                    return row;
                }
            }
        );
        return religion;
    }
    
    @Override
    public ArrayList<HashMap<String, Object>> getTiposangre(Integer id_empresa) {
        String sql_to_query = "select id,titulo from gral_sangretipos where gral_emp_id="+id_empresa+" order by titulo";
        
        ArrayList<HashMap<String, Object>> religion = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getString("id"));
                    row.put("titulo",rs.getString("titulo"));
                    return row;
                }
            }
        );
        return religion;
    }
    
    @Override
    public ArrayList<HashMap<String, Object>> getPuesto(Integer id_empresa) {
        String sql_to_query = "select id,titulo from gral_puestos  where gral_emp_id="+id_empresa+" order by titulo";
        
        ArrayList<HashMap<String, Object>> religion = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getString("id"));
                    row.put("titulo",rs.getString("titulo"));
                    return row;
                }
            }
        );
        return religion;
    }
    
    @Override
    public ArrayList<HashMap<String, Object>> getSucursal(Integer id_empresa) {
        String sql_to_query = "select id,titulo from gral_suc  where empresa_id="+id_empresa+" order by titulo";
        
        ArrayList<HashMap<String, Object>> religion = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getString("id"));
                    row.put("titulo",rs.getString("titulo"));
                    return row;
                }
            }
        );
        return religion;
    }
    @Override
    public ArrayList<HashMap<String, Object>> getPuestoForCategoria(String id_puesto) {
        String sql_to_query = "SELECT "
                                +"gral_categ.titulo, "
                                + "gral_categ.id "
                                + "FROM "
                                + "gral_categ "
                                + "join gral_puestos on gral_puestos.id=gral_categ.gral_puesto_id "
                                + "WHERE gral_categ.gral_puesto_id ="+id_puesto+" "
                                + "ORDER BY titulo";

        ArrayList<HashMap<String, Object>> categoria = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getString("id"));
                    row.put("titulo",rs.getString("titulo"));
                    return row;
                }
            }
        );
        return categoria;
    }
    
    //obtiene los roles de los empleados
    @Override
    public ArrayList<HashMap<String, Object>> getRoles() {
        String sql_to_query = "select distinct "
                + "gral_rol.id, "
                + "gral_rol.titulo, "
                + "gral_usr_rol.gral_rol_id "
                + "from gral_rol "
                + "left join gral_usr_rol on gral_usr_rol.gral_rol_id = gral_rol.id "
                + "order by titulo ";
        
        ArrayList<HashMap<String, Object>> roles = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getString("id"));
                    row.put("titulo",rs.getString("titulo"));
                    return row;
                }
            }
        );
        return roles;
    }
     //obtiene los roles de los empleados
    @Override
    public ArrayList<HashMap<String, Object>> getRolsEdit(Integer id_usuario) {
        String sql_to_query = "SELECT gral_rol.id, "
                                        +"gral_rol.titulo, "
                                        +"(CASE WHEN sbt.gral_rol_id IS NOT NULL THEN 'checked' ELSE '' END) AS checkeado, "
                                        +"(CASE WHEN sbt.gral_rol_id IS NOT NULL THEN '1' ELSE '0' END) AS seleccionado "
                                +"FROM gral_rol "
                                +"LEFT JOIN (SELECT  DISTINCT gral_rol_id FROM gral_usr_rol WHERE gral_usr_id="+id_usuario+") AS sbt ON sbt.gral_rol_id=gral_rol.id "
                                +"ORDER BY gral_rol.titulo ";


        
        ArrayList<HashMap<String, Object>> roles = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",rs.getString("id"));
                    row.put("titulo",rs.getString("titulo"));
                    row.put("checkeado",rs.getString("checkeado"));
                    row.put("seleccionado",rs.getString("seleccionado"));
                    return row;
                }
            }
        );
        return roles;
    }
    
    //Cambio de Password en el aplicativo
    @Override
    public ArrayList<HashMap<String,Object>>getUsuario(Integer id_usuario){
        String sql_to_query=" SELECT "
                            + "gral_usr.id,  "
                            + "gral_usr.username, "
                            + "gral_usr.password "
                            + "FROM gral_usr "
                            + "WHERE gral_usr.id="+id_usuario+" "
                            + "ORDER BY username ";
        
        ArrayList<HashMap<String,Object>>cambio_pass=(ArrayList<HashMap<String,Object>>)this.jdbcTemplate.query(
                sql_to_query,
                new Object[]{},new RowMapper(){
                    @Override
                    public Object mapRow(ResultSet rs,int rowNum)throws SQLException{
                     HashMap<String,Object>row=new HashMap<String,Object>();
                     row.put("id",rs.getString("id"));
                     row.put("username",rs.getString("username"));
                     row.put("password",rs.getString("password"));
                     return row;
                    }
                }
            );
        return cambio_pass;
    }
    
    //edicion de contraseñas de los usuarios

    @Override
    public ArrayList<HashMap<String, Object>> getRegion() {
        String sql_to_query=" SELECT "
                            + "gral_reg.id,  "
                            + "gral_reg.titulo "
                            + "FROM gral_reg "
                            + "ORDER BY titulo ";
        
        ArrayList<HashMap<String,Object>>cambio_pass=(ArrayList<HashMap<String,Object>>)this.jdbcTemplate.query(
                sql_to_query,
                new Object[]{},new RowMapper(){
                    @Override
                    public Object mapRow(ResultSet rs,int rowNum)throws SQLException{
                     HashMap<String,Object>row=new HashMap<String,Object>();
                     row.put("id",rs.getString("id"));
                     row.put("titulo",rs.getString("titulo"));
                     
                     return row;
                    }
                }
            );
        return cambio_pass;
    }

    
    
    //TERMINA METODOS DE CATALOGO DE EMPLEADOS
    
    
    
    
    
    
    
    
    //metodos para el catalogo de escolaridades
    ///guarda los datos de los escolaridad
    @Override
    public ArrayList<HashMap<String, String>> getEscolaridad_Datos(Integer id) {
        
        String sql_to_query = "SELECT gral_escolaridads.id,gral_escolaridads.titulo FROM gral_escolaridads WHERE id="+id;
        
        ArrayList<HashMap<String, String>> dato_escolaridad = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, String> row = new HashMap<String, String>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("escolaridad",rs.getString("titulo"));                
                    return row;
                }
            }
        );
        return dato_escolaridad;
    }
    
    
    
    @Override                                                      
    public ArrayList<HashMap<String, Object>> getEscolaridad_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc) {
        String sql_busqueda = "select id from gral_bus_catalogos(?) as foo (id integer)";
        
	String sql_to_query = "SELECT gral_escolaridads.id, gral_escolaridads.titulo "                              
                                +"FROM gral_escolaridads "                        
                                +"JOIN ("+sql_busqueda+") AS sbt ON sbt.id = gral_escolaridads.id "
                                +"WHERE gral_escolaridads.borrado_logico=false "
                                +"order by "+orderBy+" "+asc+" limit ? OFFSET ?";
        
        System.out.println("Busqueda GetPage: "+sql_to_query+" "+data_string+" "+ offset +" "+ pageSize);
        System.out.println("esto es el query  :  "+sql_to_query);
        ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query, 
            new Object[]{new String(data_string), new Integer(pageSize),new Integer(offset)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("titulo",rs.getString("titulo"));                    
                    return row;
                }
            }
        );
        return hm; 
    }
    
    //termina metodos para catalogo de escolarfidades
    
    
    //INICIA metodos para catalogo de Religiones
    //Esto es para lo de religiones
    @Override
    public ArrayList<HashMap<String, String>> getReligion_Datos(Integer id) {
        
        String sql_to_query = "SELECT gral_religions.id,gral_religions.titulo FROM gral_religions WHERE id="+id;
        
        ArrayList<HashMap<String, String>> dato_religion = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, String> row = new HashMap<String, String>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("religion",rs.getString("titulo"));                
                    return row;
                }
            }
        );
        return dato_religion;
    }
    
    
    
    @Override                                                      
    public ArrayList<HashMap<String, Object>> getReligion_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc) {
        String sql_busqueda = "select id from gral_bus_catalogos(?) as foo (id integer)";
        
	String sql_to_query = "SELECT gral_religions.id , gral_religions.titulo "                              
                                +"FROM gral_religions "                        
                                +"JOIN ("+sql_busqueda+") AS sbt ON sbt.id = gral_religions.id "
                                +"WHERE gral_religions.borrado_logico=false "
                                +"order by "+orderBy+" "+asc+" limit ? OFFSET ?";
        
        System.out.println("Busqueda GetPage: "+sql_to_query+" "+data_string+" "+ offset +" "+ pageSize);
        System.out.println("esto es el query  :  "+sql_to_query);
        ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query, 
            new Object[]{new String(data_string), new Integer(pageSize),new Integer(offset)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("religion",rs.getString("titulo"));                    
                    return row;
                }
            }
        );
        return hm; 
    }
    
    //termina metodos para catalogo de Religiones
    
    
    
    //inicia metodos para Tipos de Sangre
    //Esto es para lo de tipo de sangre
    @Override
    public ArrayList<HashMap<String, String>> getTipoSangre_Datos(Integer id) {
        
        String sql_to_query = "SELECT gral_sangretipos.id,gral_sangretipos.titulo FROM gral_sangretipos WHERE id="+id;
        
        ArrayList<HashMap<String, String>> dato_tiposangre = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, String> row = new HashMap<String, String>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("tiposangre",rs.getString("titulo"));                
                    return row;
                }
            }
        );
        return dato_tiposangre;
    }
    
    
    
    @Override                                                      
    public ArrayList<HashMap<String, Object>> getTipoSangre_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc) {
        String sql_busqueda = "select id from gral_bus_catalogos(?) as foo (id integer)";
        
	String sql_to_query = "SELECT gral_sangretipos.id , gral_sangretipos.titulo "                              
                                +"FROM gral_sangretipos "                        
                                +"JOIN ("+sql_busqueda+") AS sbt ON sbt.id = gral_sangretipos.id "
                                +"WHERE gral_sangretipos.borrado_logico=false "
                                +"order by "+orderBy+" "+asc+" limit ? OFFSET ?";
        
        System.out.println("Busqueda GetPage: "+sql_to_query+" "+data_string+" "+ offset +" "+ pageSize);
        System.out.println("esto es el query  :  "+sql_to_query);
        ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query, 
            new Object[]{new String(data_string), new Integer(pageSize),new Integer(offset)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("tiposangre",rs.getString("titulo"));                     
                    return row;
                }
            }
        );
        return hm; 
    }
 
    
    //termina metodos para catalogo de tipos de Sangre
    
    
    
    
    
    
    
   
    //Esto es para lo de catalogo de categorias

    @Override

    public ArrayList<HashMap<String, String>> getCateg_Datos(Integer id) {
        String sql_to_query = "SELECT gral_categ.id, gral_categ.titulo as categoria, gral_categ.sueldo_por_hora, gral_categ.sueldo_por_horas_ext, gral_categ.gral_puesto_id as idpuesto FROM gral_categ WHERE id="+id;
        ArrayList<HashMap<String, String>> dato_categ = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
        sql_to_query,
        new Object[]{}, new RowMapper(){
        @Override
        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            HashMap<String, String> row = new HashMap<String, String>();
            row.put("id",String.valueOf(rs.getInt("id")));
            row.put("categoria",rs.getString("categoria"));
            row.put("puesto",rs.getString("idpuesto"));
            row.put("sueldo_por_hora",StringHelper.roundDouble(rs.getString("sueldo_por_hora"),2));
            row.put("sueldo_por_horas_ext",StringHelper.roundDouble(rs.getString("sueldo_por_horas_ext"),2));
            return row;
        }
        }
        );
        return dato_categ;
    } 


    @Override
    public ArrayList<HashMap<String, Object>> getCateg_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc) {

        String sql_busqueda = "select id from gral_bus_catalogos(?) as foo (id integer)";
        String sql_to_query = "SELECT gral_categ.id ,"
                            + " gral_categ.titulo as categoria, "
                            + " gral_categ.sueldo_por_hora, "
                            + " gral_categ.sueldo_por_horas_ext, " 
                            + " gral_categ.gral_puesto_id as idpuesto, "
                            + " gral_puestos.titulo as puesto "
                            + " FROM gral_categ "
                            + " JOIN gral_puestos ON  gral_puestos.id = gral_categ.gral_puesto_id "
                            +"JOIN ("+sql_busqueda+") AS sbt ON sbt.id = gral_categ.id "
                            +"WHERE gral_categ.borrado_logico=false "
                            +"order by gral_categ.id "+asc+" limit ? OFFSET ?";
            System.out.println("Busqueda GetPage: "+sql_to_query+" "+data_string+" "+ offset +" "+ pageSize);
            System.out.println("esto es el query : "+sql_to_query);
            ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{new String(data_string), new Integer(pageSize),new Integer(offset)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("categoria",rs.getString("categoria"));
                    row.put("sueldo_por_hora",StringHelper.roundDouble(rs.getString("sueldo_por_hora"),2));
                    row.put("sueldo_por_horas_ext",StringHelper.roundDouble(rs.getString("sueldo_por_horas_ext"),2));
                    row.put("id_puesto",rs.getString("idpuesto"));
                    row.put("nombre_puesto",rs.getString("puesto"));
                    return row;
                }
            }
        );
        return hm;
        } //termina CATEGORIAS





//ESTO VA PARA EL MISMO DE CATEGORIAS YA QUE SE EXTRAEN LOS PUESTOS PARA UN SELECT
    @Override
    public ArrayList<HashMap<String, String>> getPuestos() {
        //String sql_to_query = "SELECT DISTINCT cve_pais ,pais_ent FROM municipios;";
        String sql_to_query = "SELECT id, "
        + " titulo as puesto "
        + " from gral_puestos ;";
        ArrayList<HashMap<String, String>> puesto = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
        sql_to_query,
            new Object[]{}, new RowMapper(){
            @Override
            public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            HashMap<String, Object> row = new HashMap<String, Object>();
            row.put("id",String.valueOf(rs.getInt("id")));
            row.put("puesto",rs.getString("puesto"));
            return row;
            }
            }
        );
        return puesto;
    } 







    
        //Catalogo de Departamentos
    @Override
    public ArrayList<HashMap<String, Object>> getGralDeptos_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc) {
        String sql_busqueda = "select id from gral_bus_catalogos(?) as foo (id integer)";
        
	String sql_to_query = "SELECT gral_deptos.id , gral_deptos.titulo, gral_deptos.costo_prorrateo "                              
                                +"FROM gral_deptos "                        
                                +"JOIN ("+sql_busqueda+") AS sbt ON sbt.id = gral_deptos.id "
                                +"WHERE gral_deptos.vigente=true AND gral_deptos.borrado_logico =false "
                                +"order by "+orderBy+" "+asc+" limit ? OFFSET ?";
        
//        System.out.println("Busqueda GetPage: "+sql_to_query+" "+data_string+" "+ offset +" "+ pageSize);
//        System.out.println("esto es el query  :  "+sql_to_query);
        ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query, 
            new Object[]{new String(data_string), new Integer(pageSize),new Integer(offset)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("depto",rs.getString("titulo")); 
                    //row.put("costo",rs.getString("costo_prorrateo")); 
                    row.put("costo",StringHelper.roundDouble(rs.getString("costo_prorrateo"),2));
                    return row;
                }
            }
        );
        return hm; 
    }
    
    
     @Override
    public ArrayList<HashMap<String, String>> getGralDeptos_Datos(Integer id) {
        String sql_to_query = "SELECT gral_deptos.id,gral_deptos.titulo, gral_deptos.costo_prorrateo  FROM gral_deptos WHERE id="+id;
        
        ArrayList<HashMap<String, String>> datos_unidades = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, String> row = new HashMap<String, String>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("depto",rs.getString("titulo"));  
                    row.put("costo",StringHelper.roundDouble(rs.getString("costo_prorrateo"),2));
                    return row;
                }
            }
        );
        return datos_unidades;
    }
     
     
     
     
     
     
     
     
    //Esto es para lo de catalogo de Turnos
    @Override
    public ArrayList<HashMap<String, String>> getTurnos(Integer id) {
        String sql_to_query = " SELECT gral_deptos_turnos.id, "
                            + " gral_deptos_turnos.turno, "
                            + " gral_deptos_turnos.hora_ini, "
                            + " gral_deptos_turnos.hora_fin, "
                            + " gral_deptos_turnos.gral_deptos_id as iddepto"
                            + " FROM gral_deptos_turnos WHERE id="+id;
        ArrayList<HashMap<String, String>> dato_depto = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
        sql_to_query,
        new Object[]{}, new RowMapper(){
        @Override
        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            HashMap<String, String> row = new HashMap<String, String>();
            row.put("id",String.valueOf(rs.getInt("id")));
            row.put("turno",rs.getString("turno"));
            row.put("hora_inicial",rs.getString("hora_ini"));
            row.put("hora_final",rs.getString("hora_fin"));
            row.put("depto",rs.getString("iddepto"));
            return row;
        }
        }
        );
        return dato_depto;
    } 
    
    
    
    
    @Override
    public ArrayList<HashMap<String, Object>> getTurnos_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc) {
        String sql_busqueda = "select id from gral_bus_catalogos(?) as foo (id integer)";
        String sql_to_query = "SELECT gral_deptos_turnos.id ,"
                            + " gral_deptos_turnos.turno, "
                            + " gral_deptos_turnos.hora_ini, "
                            + " gral_deptos_turnos.hora_fin, " 
                            + " gral_deptos_turnos.gral_deptos_id as iddepto, "
                            + " gral_deptos.titulo as depto "
                            + " FROM gral_deptos_turnos "
                            + " JOIN gral_deptos ON  gral_deptos.id = gral_deptos_turnos.gral_deptos_id "
                            +"JOIN ("+sql_busqueda+") AS sbt ON sbt.id = gral_deptos_turnos.id "
                            +"WHERE gral_deptos_turnos.borrado_logico=false "
                            +"order by gral_deptos_turnos.id "+asc+" limit ? OFFSET ?";
            System.out.println("Busqueda GetPage: "+sql_to_query+" "+data_string+" "+ offset +" "+ pageSize);
            System.out.println("esto es el query : "+sql_to_query);
            ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{new String(data_string), new Integer(pageSize),new Integer(offset)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("turno",rs.getString("turno"));
                    row.put("hora_inicial",rs.getString("hora_ini"));
                    row.put("hora_final",rs.getString("hora_fin"));
                    row.put("depto",rs.getString("iddepto"));
                    row.put("nombre_depto",rs.getString("depto"));
                    return row;
                }
            }
        );
        return hm;
        } 




    //ESTO VA JUNTO CON TURNOS YA QUE NECESITA CARGAR LOS DEPARTAMENTOS EN UN SELECT
    @Override
    public ArrayList<HashMap<String, String>> getDeptos() {
        //String sql_to_query = "SELECT DISTINCT cve_pais ,pais_ent FROM municipios;";
        String sql_to_query = "SELECT id, "
        + " titulo as depto "
        + " from gral_deptos ;";
        ArrayList<HashMap<String, String>> depto = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
        sql_to_query,
            new Object[]{}, new RowMapper(){
            @Override
            public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            HashMap<String, Object> row = new HashMap<String, Object>();
            row.put("id",String.valueOf(rs.getInt("id")));
            row.put("depto",rs.getString("depto"));
            return row;
            }
            }
        );
        return depto;
    } 
    
    
    
    
    
    
    
    
    //Esto es para lo de catalogo de Dias no Laborables

    @Override
    public ArrayList<HashMap<String, String>> getDiasNoLaborables(Integer id) {
        String sql_to_query = " SELECT gral_dias_no_laborables.id, "
                            + " gral_dias_no_laborables.fecha_no_laborable, "
                            + " gral_dias_no_laborables.descripcion "
                            + " FROM gral_dias_no_laborables WHERE id="+id;
        ArrayList<HashMap<String, String>> dianolab = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
        sql_to_query,
        new Object[]{}, new RowMapper(){
        @Override
        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            HashMap<String, String> row = new HashMap<String, String>();
            row.put("id",String.valueOf(rs.getInt("id")));
            row.put("fecha_no_laborable",rs.getString("fecha_no_laborable"));
            row.put("descripcion",rs.getString("descripcion"));
            return row;
        }
        }
        );
        return dianolab;
    } 
    
    
    
    @Override
    public ArrayList<HashMap<String, Object>> getDiasNoLaborables_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc) {

        String sql_busqueda = " select id from gral_bus_catalogos(?) as foo (id integer) ";
        String sql_to_query = " SELECT gral_dias_no_laborables.id , "
                            + " gral_dias_no_laborables.fecha_no_laborable, "
                            + " gral_dias_no_laborables.descripcion  "
                            + " FROM gral_dias_no_laborables "
                            +" JOIN ("+sql_busqueda+") AS sbt ON sbt.id = gral_dias_no_laborables.id "
                            +" WHERE gral_dias_no_laborables.borrado_logico=false "
                            +" order by gral_dias_no_laborables.id "+asc+" limit ? OFFSET ?";
            System.out.println("Busqueda GetPage: "+sql_to_query+" "+data_string+" "+ offset +" "+ pageSize);
            System.out.println("esto es el query : "+sql_to_query);
            ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{new String(data_string), new Integer(pageSize),new Integer(offset)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",String.valueOf(rs.getInt("id")));//estos se almacenan en el controller en la construccion de la tabla
                    row.put("fecha_no_laborable",rs.getString("fecha_no_laborable"));//para el grid que esta en el controller
                    row.put("descripcion",rs.getString("descripcion"));
                    return row;
                }
            }
        );
        return hm;
        } 


    
   //Estos son para email y password de compras. 
    @Override
    public String geteMailPurchasingEmpresaEmisora(Integer id_empresa) {
        String sql_to_query = "SELECT CASE WHEN email_compras IS NULL THEN '' ELSE email_compras END  FROM gral_emp WHERE id ="+id_empresa;
        Map<String, Object> map_email_compras = this.getJdbcTemplate().queryForMap(sql_to_query);
        String email_compras = map_email_compras.get("email_compras").toString();
        System.out.println("geteMailPurchasingEmpresaEmisora: "+sql_to_query);
        return email_compras;
    }
    
    @Override
    public String getPasswordeMailPurchasingEmpresaEmisora(Integer id_empresa) {
        String sql_to_query = "SELECT CASE WHEN pass_email_compras IS NULL THEN '' ELSE pass_email_compras END  FROM gral_emp WHERE id ="+id_empresa;
        Map<String, Object> map_pass_email_compras = this.getJdbcTemplate().queryForMap(sql_to_query);
        String pass_email_compras = map_pass_email_compras.get("pass_email_compras").toString();
        System.out.println("getPasswordeMailPurchasingEmpresaEmisora: "+sql_to_query);
        return pass_email_compras;
    }
    //end
    
    
    
    //ACTUALIZADOR CODIGOS ISO
    //------------------------------------------Aplicativo de Edicion de Codigo ISO----------------------------------------
    @Override
    public ArrayList<HashMap<String, Object>> getCodigos_PaginaGrid(String data_string, int offset, int pageSize, String orderBy, String asc,Integer id_empresa) {
        String sql_busqueda = "select id from gral_bus_catalogos(?) as foo (id integer)";
        
	String sql_to_query = "SELECT gral_docs.id, gral_docs.titulo "                              
                                +"FROM gral_docs "                        
                                +"JOIN ("+sql_busqueda+") AS sbt ON sbt.id = gral_docs.id "
                                +"WHERE gral_docs.gral_emp_id="+id_empresa
                                +"order by "+orderBy+" "+asc+" limit ? OFFSET ?";
        
        //System.out.println("Busqueda GetPage: "+sql_to_query+" "+data_string+" "+ offset +" "+ pageSize);
        //System.out.println("esto es el query  :  "+sql_to_query);
        ArrayList<HashMap<String, Object>> hm = (ArrayList<HashMap<String, Object>>) this.jdbcTemplate.query(
            sql_to_query, 
            new Object[]{new String(data_string), new Integer(pageSize),new Integer(offset)}, new RowMapper() {
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, Object> row = new HashMap<String, Object>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("titulo",rs.getString("titulo"));                    
                    return row;
                }
            }
        );
        return hm; 
    }
    
    
    @Override
    public ArrayList<HashMap<String, String>> getCodigos_Datos(Integer id) {
        String sql_to_query = "SELECT id,valor as codigo FROM gral_docs_conf WHERE gral_doc_id="+id;
        ArrayList<HashMap<String, String>> dato_datos = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, String> row = new HashMap<String, String>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("codigo",rs.getString("codigo")); 
                    
                    return row;
                }
            }
        );
        return dato_datos;
    }



    @Override
    public ArrayList<HashMap<String, String>> getTitulo_Datos(Integer id) {
        String sql_to_query = "SELECT gral_docs.id,gral_docs.titulo  FROM gral_docs WHERE gral_docs.id="+id;
        ArrayList<HashMap<String, String>> dato_titulo = (ArrayList<HashMap<String, String>>) this.jdbcTemplate.query(
            sql_to_query,
            new Object[]{}, new RowMapper(){
                @Override
                public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HashMap<String, String> row = new HashMap<String, String>();
                    row.put("id",String.valueOf(rs.getInt("id")));
                    row.put("titulo",rs.getString("titulo")); 
                    
                    return row;
                }
            }
        );
        return dato_titulo;
    }
    //TERMINA ACTUALIZADOR CODIGOS ISO
    
    
    
    
    
    
    
    
    
    
}