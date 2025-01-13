/* eslint-disable no-console */
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.enviarMail = async (operacion, infoCorreo, destination) => {
  let mensaje = "";
  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: 465,
    auth: {
      user: "noresponder@previsalud.com.co",
      pass: process.env.MAILPASS,
    },
  });
  if (operacion === "D") {
    mensaje = `
    <html>
        <head>
          <img src="https://www.previsalud.com.co/wp-content/uploads/2022/01/Previsalud-Logo-PNG.png" width="200" height="50">
        </head>
        <body FACE=arial> 
        <br><br><br>
        <table>
            <font size=2 face=Arial Black>
            <tr>
                    Ha sido asignado como responsable a un proceso de investigacion de seguridad paciente con codigo: ${infoCorreo}
            </tr>
            <tr></tr>
            <br><br><br><br>
            <tr> Atentamente,</tr>
            <br><br><br>
            <tr><B>SEG_PAC. PREVISALUD</B></tr>
            </font>
            <br><br><br><br><br>
        </table>
        <br><br><br>
        </body>
    </html>`;
  } else {
    mensaje = `
    <html>
        <head>
        <img src="https://www.previsalud.com.co/wp-content/uploads/2022/01/Previsalud-Logo-PNG.png" width="200" height="50">
        </head>
        <body FACE=arial> 
        <br><br><br>
        <table>
            <font size=2 face=Arial Black>
            <tr>
                    Ha sido asignado como responsable a una oportunidad de mejora relacionada a un proceso de investigacion con codigo: ${infoCorreo}
            </tr>
            <tr></tr>
            <br><br><br><br>
            <tr> Atentamente,</tr>
            <br><br><br>
            <tr><B>SEG_PAC. PREVISALUD</B></tr>
            </font>
            <br><br><br><br><br>
        </table>
        <br><br><br>
        </body>
    </html>`;
  }

  const mailOptions = {
    from: "noresponder@previsalud.com.co",
    to: destination,
    subject: "Notificacion Responsable SEG_PAC",
    html: mensaje,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Email ERROR: ${error}`);
    } else {
      console.log(`Email enviado: ${info.response}`);
    }
  });
};
