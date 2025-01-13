/* eslint-disable padded-blocks */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable camelcase */
const jwt = require("jsonwebtoken");

const sql = require("mssql");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();
const config = {
  user: process.env.USER,
  password: process.env.PASS,
  server: process.env.SERVER_SQL,
  database: process.env.BDLogin,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

function generateAccessToken(username) {
  return jwt.sign({ user: username }, process.env.TOKEN_SECRET, { expiresIn: "28800s" }); // 28800s = VENCE EN 8 HORAS
}

exports.login = async (req, res) => {
    try {
      const pool = await sql.connect(config);
      // Stored procedure
      const result2 = await pool.request()
        .input("Usuario", sql.VarChar, req.body.Usuario)
        .input("App", sql.VarChar, "SEG")
        .output("Clave", sql.VarChar)
        .output("Id", sql.VarChar)
        .output("Nombre", sql.VarChar)
        .output("PerfilId", sql.VarChar)
        .output("Perfil", sql.VarChar)
        .output("Mail", sql.VarChar)
        .execute("PQR.dbo.SP_LoginCifrado");

      if (result2.output.Id == null){
        res.status(400).send("Login no valido");
      } else {
        const user = result2.output;

        if (bcrypt.compareSync(req.body.Clave, user.Clave)) {
          user.Clave = "NULL";
          const token = generateAccessToken(user);
          res.json(token);
        } else {
          res.status(401).json({ message: "Usuario o contraseña incorrecta" });
        }
      }
    } catch (err) {
      res.status(400).send(`${err} ${req.body}`);
    }
};

exports.getAllUsers = async (req, res) => {
  try {
    if (req.Usuario.user.Perfil === "admin") {
      const pool = await sql.connect(config);
      const result2 = await pool.request()
        .input("App", sql.VarChar, "SEG")
        .execute("[dbo].[SP_Usuarios]");
        res.status(200).send(result2.recordsets[0]);
    } else {
      res.status(401).send("Ingrese como un usuario Administrador");
    }
  } catch (err) {
      res.status(400).send(`${err} ${req.body}`);
  }
};

exports.getUser = async (req, res) => {
  let Guid = req.params.IdUser;

  if (Guid === ""){
    Guid = 0;
  }

  try {
    if (req.Usuario.user.Perfil === "admin") {
      const pool = await sql.connect(config);
      const result2 = await pool.request()
        .input("Guid", sql.VarChar(60), Guid)
        .input("App", sql.VarChar, "SEG")
        .execute("[dbo].[SP_Usuario]");
        res.status(200).send(result2.recordsets[0][0]);
    } else {
      res.status(401).send("Ingrese como un usuario Administrador");
    }
  } catch (err) {
      res.status(400).send(`${err} ${req.body}`);
  }
};

exports.registrarUsuario = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  try {
    const pool = await sql.connect(config);
    const result2 = await pool.request()
        .input("clave", sql.VarChar(60), req.body.clave)
        .input("correo", sql.VarChar(60), req.body.correo)
        .input("nombreCompleto", sql.VarChar(60), req.body.nombreCompleto)
        .input("perfilId", sql.VarChar(60), req.body.perfilId)
        .input("usuario", sql.VarChar(60), req.body.usuario)
        .input("App", sql.VarChar, "SEG")
        .input("claveCifrada", sql.VarChar(60), bcrypt.hashSync(req.body.clave, salt))
        .execute("[dbo].[SP_Usuario_Crear]");
    res.status(200).send(result2.recordsets[0][0]);
} catch (err) {
  res.status(400).send(`${err} ${req.body}`);
}
};

exports.editarUsuario = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  try {
    const pool = await sql.connect(config);
    const result2 = await pool.request()
        .input("guid", sql.VarChar(60), req.body.guid)
        .input("clave", sql.VarChar(60), req.body.clave)
        .input("correo", sql.VarChar(60), req.body.correo)
        .input("nombreCompleto", sql.VarChar(60), req.body.nombreCompleto)
        .input("perfilId", sql.VarChar(60), req.body.perfilId)
        .input("usuario", sql.VarChar(60), req.body.usuario)
        .input("App", sql.VarChar, "SEG")
        .input("claveCifrada", sql.VarChar(60), bcrypt.hashSync(req.body.clave, salt))
        .execute("PQR.[dbo].[SP_Usuario_Actualizar]");
    res.status(200).send(result2.recordsets[0][0]);
  } catch (err) {
    res.status(400).send(`${err} ${req.body}`);
  }
};

exports.inactiveUser = async (req, res) => {
  let Guid = req.params.IdUser;

  if (Guid === ""){
    Guid = 0;
  }

  try {
    const pool = await sql.connect(config);
    const result2 = await pool.request()
        .input("Guid", sql.VarChar(60), Guid)
        .query("UPDATE TOP(1) [PQR].[dbo].[SEG_Usuario] SET [Bloqueo ]='1', [FechaModificacion]=GETDATE() WHERE [Id]=@Guid");
      res.status(200).send(result2);
  } catch (err) {
    res.status(400).send(`${err} ${req.body}`);
  }
};
