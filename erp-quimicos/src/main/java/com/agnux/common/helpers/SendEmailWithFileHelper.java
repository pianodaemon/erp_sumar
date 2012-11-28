package com.agnux.common.helpers;

import java.util.*;
import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;


public class SendEmailWithFileHelper {

    public SendEmailWithFileHelper(HashMap<String, String> conecta){
        this.setIpServidor(conecta.get("hostname"));
        this.setContrasenia(conecta.get("password"));
        this.setNombreUsuario(conecta.get("username"));
    }

    private String ipServidor;
    private String nombreUsuario;
    private String contrasenia;
    private String mensaje;
    private String archivoAdjunto;
    private String nombreArchivoAdjunto;
    private String destinatario;
    private String asunto;
    private String puerto;

    public String getPuerto() {
        return puerto;
    }

    public void setPuerto(String puerto) {
        this.puerto = puerto;
    }

    public String getArchivoAdjunto() {
        return archivoAdjunto;
    }

    public void setArchivoAdjunto(String archivoAdjunto) {
        this.archivoAdjunto = archivoAdjunto;
    }

    public String getAsunto() {
        return asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }

    public String getIpServidor() {
        return ipServidor;
    }

    public void setIpServidor(String ipServidor) {
        this.ipServidor = ipServidor;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getNombreArchivoAdjunto() {
        return nombreArchivoAdjunto;
    }

    public void setNombreArchivoAdjunto(String nombreArchivoAdjunto) {
        this.nombreArchivoAdjunto = nombreArchivoAdjunto;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }
    
    
    
    public void enviarEmail() {
        try {
            //ESTABLECER LA SESION JAVAMAIL
            Properties props = new Properties();

            // Nombre del host de correo, es smtp.gmail.com
            props.setProperty("mail.smtp.host", this.getIpServidor());

            // TLS si est� disponible
            props.setProperty("mail.smtp.starttls.enable", "true");

//	            // Puerto de gmail para envio de correos
            props.setProperty("mail.smtp.port",this.getPuerto());

            // Nombre del usuario
            props.setProperty("mail.smtp.user", this.getNombreUsuario());

            // Si requiere o no usuario y password para conectarse.
            props.setProperty("mail.smtp.auth", "true");

            Session session = Session.getDefaultInstance(props);

            // Para obtener un log de salida m�s extenso
            session.setDebug(true);

            //CONSTRUIR UN MENSAJE COMPLEJO CON ADJUNTOS
            BodyPart texto = new MimeBodyPart();

            // Texto del mensaje
            texto.setContent(this.getMensaje(), "text/html");
            texto.setText(this.getMensaje());

            //PARTE DEL ADJUNTO DE LA IMAGEN
            BodyPart adjunto = new MimeBodyPart();

            // Cargamos la imagen
            adjunto.setDataHandler(new DataHandler(new FileDataSource(this.getArchivoAdjunto())));

            // Opcional. De esta forma transmitimos al receptor el nombre original del
            // fichero de imagen.
            adjunto.setFileName(this.getNombreArchivoAdjunto());

            //JUNTAMOS AMBAS PARTES EN UNA SOLA
            MimeMultipart multiParte = new MimeMultipart();
            multiParte.addBodyPart(texto);
            multiParte.addBodyPart(adjunto);

            //CONSTRUIR EL MENSAJE
            MimeMessage message = new MimeMessage(session);

            // Se rellena el From
            message.setFrom(new InternetAddress(this.getNombreUsuario()));

            // Se rellenan los destinatarios
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(this.getDestinatario()));

            // Se rellena el subject
            message.setSubject(this.getAsunto());

            // Se mete el texto y la foto adjunta.
            message.setContent(multiParte);

            //ENVIAR EL MENSAJE
            Transport t = session.getTransport("smtp");

            // Aqui usuario y password
            t.connect(this.getNombreUsuario(), this.getContrasenia());
            t.sendMessage(message,message.getAllRecipients());
            t.close();

        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
    }



}