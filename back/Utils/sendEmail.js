const nodemailer = require("nodemailer");

//Para enviar el correo de recuperar la contraseña
const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            auth: {
              user: "Tucorreodedondeseenvia",
              pass: "oivyqpfnbolzdxmh"
            }
          });

          const mensaje = {
            from:"Tienda de informatica <Correo@dedondeseenvia.com>",
            to: options.email,
            subject: options.subject,
            text: options.mensaje
          }

          await transport.sendMail(mensaje)
}

module.exports = sendEmail;