const nodemailer = require("nodemailer");

//Para enviar el correo de recuperar la contraseña
const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "4f66c189325ad1",
              pass: "02d45da8ea3f51"
            }
          });

          const mensaje = {
            from:"Tienda de informatica <noreply@tiendadeinformatica.com",
            to: options.email,
            subject: options.subject,
            text: options.mensaje
          }

          await transport.sendMail(mensaje)
}

module.exports = sendEmail;