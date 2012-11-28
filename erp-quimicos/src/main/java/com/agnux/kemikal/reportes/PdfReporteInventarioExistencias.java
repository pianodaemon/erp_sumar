/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agnux.kemikal.reportes;


import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.ExceptionConverter;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.ColumnText;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import com.agnux.common.helpers.StringHelper;
import com.itextpdf.text.DocumentException;
import java.io.FileNotFoundException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author pianodaemon
 */
public final class PdfReporteInventarioExistencias {
    

    
    public PdfReporteInventarioExistencias(String fileout, ArrayList<HashMap<String, String>> lista_existencias, String razon_social_empresa, String fecha_actual, Integer tipo) throws DocumentException {	
        int tmp=0;                         
        int primer_registro=0;
        //String simbolo_moneda="";
        String familia = "";
        String grupo = "";
        String linea = "";
        String titulo_reporte = "";//esto es para el titulo del reporte
        //metodo para convertir tipo a nombre de titulo del pdf
       
            switch (tipo){
                case 1:
                    titulo_reporte = "Reporte General de Existencias";
                break;
                    case 2:  titulo_reporte="Reporte de Productos con Existencia";
                break;
                    case 3:  titulo_reporte="Reporte de Productos sin Existencia";
                break;
                    case 4:  titulo_reporte="Reporte de Productos en el Mínimo o abajo del mínimo ";
                break;
                    case 5:  titulo_reporte="Reporte de Productos en el Máximo o Arriba del Máximo";
                break;
                    case 6:  titulo_reporte="Reporte de Productos en el punto de Reorden o abajo del mismo";
                break;
            }
                    
//                default:mesSalida="";
//                    break;
                
                
        //String denominacion ="SD";
        Double sumatotalCU=0.0;
        Double sumatotalCT=0.0;
        
        //String[] fi = fecha_inicial.split("-");
        String[] ff = fecha_actual.split("-");
        String fecha_reporte = "Generado el dia  "+ff[2]+"/"+ff[1]+"/"+ff[0];
        
        
        
        try {
           
            Font fontCols = new Font(Font.FontFamily.HELVETICA, 9,Font.NORMAL);
            Font smallFont = new Font(Font.FontFamily.HELVETICA,8,Font.NORMAL,BaseColor.BLACK);
            Font smallBoldFont = new Font(Font.getFamily("ARIAL"),8,Font.BOLD,BaseColor.WHITE);

            // aqui ba header foother
            HeaderFooter event = new HeaderFooter(razon_social_empresa,fecha_reporte,titulo_reporte);

            Document doc = new Document(PageSize.LETTER.rotate(),-50,-50,60,30);
            doc.addCreator("valentin.vale8490@gmail.com");
            PdfWriter writer = PdfWriter.getInstance(doc, new FileOutputStream(fileout));
            //PdfWriter writer = PdfWriter.getInstance(doc, new FileOutputStream(fileout));
            writer.setPageEvent(event);
            
            
            doc.open();
            //String[] columnas = {"No.Control","Nombre","No.Factura","Cliente","","Valor","% Comision","","Total Comision"};
            float [] widths = {1f,1f, 1f,1f, 2.5f, 1f, 1f,0.1f, 1f,0.1f ,1f};//Tamaño de las Columnas.
            PdfPTable tabla = new PdfPTable(widths);
            PdfPCell cell;
            tabla.setKeepTogether(false);
            tabla.setHeaderRows(1);


            cell = new PdfPCell(new Paragraph("FAMILIA",smallBoldFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            tabla.addCell(cell);

            cell = new PdfPCell(new Paragraph("GRUPO",smallBoldFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            tabla.addCell(cell);

            cell = new PdfPCell(new Paragraph("LINEA",smallBoldFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            tabla.addCell(cell);

            cell = new PdfPCell(new Paragraph("CODIGO PRODUCTO",smallBoldFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            tabla.addCell(cell);
            
            
            cell = new PdfPCell(new Paragraph("DESCRIPCION",smallBoldFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            //cell.setColspan(2);
            tabla.addCell(cell);
            
            cell = new PdfPCell(new Paragraph("UNIDAD MEDIDA",smallBoldFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            //cell.setColspan(2);
            tabla.addCell(cell);
            
            cell = new PdfPCell(new Paragraph("EXISTENCIA",smallBoldFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            //cell.setColspan(2);
            tabla.addCell(cell);
            
            cell = new PdfPCell(new Paragraph("",smallFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            cell.setBorder(0);
            //cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            //cell.setColspan(2);
            tabla.addCell(cell);
            
            
            cell = new PdfPCell(new Paragraph("COSTO UNITARIO",smallBoldFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            //cell.setColspan(2);
            tabla.addCell(cell);
            
            cell = new PdfPCell(new Paragraph("",smallFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            cell.setBorder(0);
            //cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            //cell.setColspan(2);
            tabla.addCell(cell);
            
            cell = new PdfPCell(new Paragraph("COSTO TOTAL",smallBoldFont));
            cell.setUseAscender(true);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell.setUseDescender(true);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBackgroundColor(BaseColor.BLACK);
            //cell.setFixedHeight(13);
            //cell.setColspan(2);
            tabla.addCell(cell);
            
            for (int x=0; x<=(lista_existencias.size())-1; x++){
                HashMap<String, String> registro= lista_existencias.get(x);
                
                if(primer_registro==0){
                        familia =registro.get("familia").toString();
                        grupo =registro.get("grupo").toString();
                        linea =registro.get("linea").toString();
                        //denominacion = registro.get("moneda_factura").toString();

                        //if(registro.get("denominacion").equals("M.N.")){
                        //simbolo_moneda = "$";
                        //}
                        //if(registro.get("denominacion").equals("USD")){
                        //simbolo_moneda = "USD";
                        //}
                        primer_registro=1;
                }
                
                //if(familia.equals(registro.get("familia").toString()) &&  grupo.equals(registro.get("grupo").toString()) &&  linea.equals(registro.get("linea").toString())){
                if(familia.equals(registro.get("familia").toString()) &&  grupo.equals(registro.get("grupo").toString()) ){
                    
                    if(tmp == 0){
                        cell = new PdfPCell(new Paragraph(registro.get("familia").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph(registro.get("grupo").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph(registro.get("linea").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph(registro.get("codigo_producto").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        tabla.addCell(cell);
                        
                        
                        cell = new PdfPCell(new Paragraph(registro.get("descripcion").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph(registro.get("unidad_medida").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph(registro.get("existencias").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph("$",smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);
                        
                        
                        cell = new PdfPCell(new Paragraph(registro.get("costo_unitario").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph("$",smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph(registro.get("costo_total").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);
                    }
                    
                    if(tmp != 0){
                        cell = new PdfPCell(new Paragraph("",smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph("",smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph("",smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        tabla.addCell(cell);
                        
                        cell = new PdfPCell(new Paragraph(registro.get("codigo_producto").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        tabla.addCell(cell);
                        
                        
                        cell = new PdfPCell(new Paragraph(registro.get("descripcion").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);

                        cell = new PdfPCell(new Paragraph(registro.get("unidad_medida").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);

                        cell = new PdfPCell(new Paragraph(registro.get("existencias").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);

                        cell = new PdfPCell(new Paragraph("$",smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);


                        cell = new PdfPCell(new Paragraph(registro.get("costo_unitario").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);

                        cell = new PdfPCell(new Paragraph("$",smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);

                        cell = new PdfPCell(new Paragraph(registro.get("costo_total").toString(),smallFont));
                        cell.setUseAscender(true);
                        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        cell.setUseDescender(true);
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setBorder(0);
                        //cell.setBackgroundColor(BaseColor.BLACK);
                        //cell.setFixedHeight(13);
                        //cell.setColspan(2);
                        tabla.addCell(cell);

                    }
                    tmp = 1;

                    familia =registro.get("familia").toString();
                    grupo =registro.get("grupo").toString();
                    linea =registro.get("linea").toString();

                    sumatotalCU = sumatotalCU + Double.parseDouble(registro.get("costo_unitario").toString());
                    sumatotalCT = sumatotalCT + Double.parseDouble(registro.get("costo_total").toString());

                }else{
                    cell = new PdfPCell(new Paragraph("",smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.SILVER );
                    cell.setFixedHeight(11);
                    cell.setColspan(11);
                    tabla.addCell(cell);

                    cell = new PdfPCell(new Paragraph(registro.get("familia").toString(),smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    tabla.addCell(cell);

                    cell = new PdfPCell(new Paragraph(registro.get("grupo").toString(),smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    tabla.addCell(cell);

                    cell = new PdfPCell(new Paragraph(registro.get("linea").toString(),smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    tabla.addCell(cell);

                    cell = new PdfPCell(new Paragraph(registro.get("codigo_producto").toString(),smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    tabla.addCell(cell);


                    cell = new PdfPCell(new Paragraph(registro.get("descripcion").toString(),smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    //cell.setColspan(2);
                    tabla.addCell(cell);

                    cell = new PdfPCell(new Paragraph(registro.get("unidad_medida").toString(),smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    //cell.setColspan(2);
                    tabla.addCell(cell);

                    cell = new PdfPCell(new Paragraph(registro.get("existencias").toString(),smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    //cell.setColspan(2);
                    tabla.addCell(cell);

                    cell = new PdfPCell(new Paragraph("$",smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    //cell.setColspan(2);
                    tabla.addCell(cell);

                    cell = new PdfPCell(new Paragraph(registro.get("costo_unitario").toString(),smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    //cell.setColspan(2);
                    tabla.addCell(cell);

                    cell = new PdfPCell(new Paragraph("$",smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    //cell.setColspan(2);
                    tabla.addCell(cell);

                    cell = new PdfPCell(new Paragraph(registro.get("costo_total").toString(),smallFont));
                    cell.setUseAscender(true);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setUseDescender(true);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setBorder(0);
                    //cell.setBackgroundColor(BaseColor.BLACK);
                    //cell.setFixedHeight(13);
                    //cell.setColspan(2);
                    tabla.addCell(cell);
                    
                    
                    familia =registro.get("familia").toString();
                    grupo =registro.get("grupo").toString();
                    linea =registro.get("linea").toString();

                    sumatotalCU = sumatotalCU + Double.parseDouble(registro.get("costo_unitario").toString());
                    sumatotalCT = sumatotalCT + Double.parseDouble(registro.get("costo_total").toString());
                }
            }

            cell= new PdfPCell(new Paragraph("",smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_CENTER);
            cell.setBorder(0);
            tabla.addCell(cell);

            cell= new PdfPCell(new Paragraph("",smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_LEFT);
            cell.setBorder(0);
            tabla.addCell(cell);

            cell= new PdfPCell(new Paragraph("",smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_LEFT);
            cell.setBorder(0);
            tabla.addCell(cell);

            cell= new PdfPCell(new Paragraph("",smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_LEFT);
            cell.setBorder(0);
            tabla.addCell(cell);

            cell= new PdfPCell(new Paragraph("",smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_CENTER);
            cell.setBorder(0);
            tabla.addCell(cell);

            cell= new PdfPCell(new Paragraph("TOTAL :",smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_RIGHT);
            cell.setBorder(0);
            tabla.addCell(cell);

            cell= new PdfPCell(new Paragraph("",smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_RIGHT);
            cell.setBorder(1);
            tabla.addCell(cell);

            cell= new PdfPCell(new Paragraph("$",smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_RIGHT);
            cell.setBorder(1);
            tabla.addCell(cell);

            cell= new PdfPCell(new Paragraph(StringHelper.AgregaComas(StringHelper.roundDouble(sumatotalCU,2)),smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_RIGHT);
            cell.setBorder(1);
            tabla.addCell(cell);

            cell= new PdfPCell(new Paragraph("$",smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_RIGHT);
            cell.setBorder(1);
            tabla.addCell(cell);

            cell= new PdfPCell(new Paragraph(StringHelper.AgregaComas(StringHelper.roundDouble(sumatotalCT,2)),smallFont));
            cell.setHorizontalAlignment (Element.ALIGN_RIGHT);
            cell.setBorder(1);
            tabla.addCell(cell);

            doc.add(tabla);
            doc.close();
	} catch (FileNotFoundException ex) {
            Logger.getLogger(com.agnux.kemikal.reportes.PdfReporteCobrazaAgente.class.getName()).log(Level.SEVERE, null, ex);
	}
}


    
    static class HeaderFooter extends PdfPageEventHelper {
        //public Image headerImage;
        protected PdfTemplate total;       
        protected BaseFont helv;  
        protected PdfContentByte cb;  
        Font largeBoldFont = new Font(Font.FontFamily.HELVETICA,10,Font.BOLD,BaseColor.BLACK);
        Font largeFont = new Font(Font.FontFamily.HELVETICA,10,Font.NORMAL,BaseColor.BLACK);
        Font smallFont = new Font(Font.FontFamily.HELVETICA,7,Font.NORMAL,BaseColor.BLACK);
        
        private String empresa;
        private String periodo;
        private String titulo_reporte;

        public String getTitulo_reporte() {
            return titulo_reporte;
        }

        public void setTitulo_reporte(String titulo_reporte) {
            this.titulo_reporte = titulo_reporte;
        }
        
        public String getEmpresa() {
            return empresa;
        }
        
        public void setEmpresa(String empresa) {
            this.empresa = empresa;
        }
        
        public String getPeriodo() {
            return periodo;
        }
        
        public void setPeriodo(String periodo) {
            this.periodo = periodo;
        }
        
        
        
        HeaderFooter(String razon_soc_empresa, String periodo, String titulo_reporte){
            this.setEmpresa(razon_soc_empresa);
            this.setPeriodo(periodo);
            this.setTitulo_reporte(titulo_reporte);
            
        }
        
        
        
        /*Añadimos una tabla con  una imagen del logo de megestiono y creamos la fuente para el documento, la imagen esta escalada para que no se muestre pixelada*/   
        @Override
        public void onOpenDocument(PdfWriter writer, Document document) {
            try {
                //headerImage = Image.getInstance(PdfDepositos.ruta_imagen);
                //headerImage.scalePercent(50);

                total = writer.getDirectContent().createTemplate(100, 100);  
                //public Rectangle(int x, int y, int width, int height)
                total.setBoundingBox(new Rectangle(-20, -20, 100, 100));
                total.fill();
                helv = BaseFont.createFont("Helvetica", BaseFont.WINANSI, false); 
            }
            catch(Exception e) {
                throw new ExceptionConverter(e);
            }
        }
        
        /*añadimos pie de página, borde y más propiedades*/
        @Override
        public void onEndPage(PdfWriter writer, Document document) {
            //PdfContentByte cb = writer.getDirectContent();
            ColumnText.showTextAligned(writer.getDirectContent(),Element.ALIGN_CENTER, new Phrase(this.getEmpresa(),largeBoldFont),document.getPageSize().getWidth()/2, document.getPageSize().getTop() -25, 0);
            ColumnText.showTextAligned(writer.getDirectContent(),Element.ALIGN_CENTER, new Phrase(this.getTitulo_reporte(),largeBoldFont),document.getPageSize().getWidth()/2, document.getPageSize().getTop()-38, 0);
            
            SimpleDateFormat formato = new SimpleDateFormat("'a las' HH:mm:ss 'hrs.'");
            String hora_generacion = formato.format(new Date());
            
            ColumnText.showTextAligned(writer.getDirectContent(),Element.ALIGN_CENTER, new Phrase(this.getPeriodo()+" "+hora_generacion),document.getPageSize().getWidth()/2, document.getPageSize().getTop()-50, 0);
            
            cb = writer.getDirectContent();  
            //cb.saveState();  
            String text = "Página " + writer.getPageNumber() + " de ";  
            float textBase = document.bottom() - 20;
            float textSize = helv.getWidthPoint(text, 7);  
            float adjust = helv.getWidthPoint("0", 150);  
            cb.beginText();  
            cb.setFontAndSize(helv, 7);  

            //cb.setTextMatrix(document.right() - 120 - adjust, textBase);
            cb.setTextMatrix(document.right() - 128, textBase);  //definir la posicion de text
            cb.showText(text);  

            cb.endText();  
            cb.addTemplate(total, document.right() - adjust , textBase);  //definir la posicion del total de paginas
            //cb.restoreState();
        }
        
        
        /*aqui escrimos ls paginas totales, para que nos salga de pie de pagina Pagina x de y*/
        @Override
        public void onCloseDocument(PdfWriter writer, Document document) {
          total.beginText();  
          total.setFontAndSize(helv, 7);  
          total.setTextMatrix(0,0);                                           
          total.showText(String.valueOf(writer.getPageNumber() -1));  
          total.endText();  
        }    
    }
}