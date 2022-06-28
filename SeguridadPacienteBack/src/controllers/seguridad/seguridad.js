const moment = require("moment");
const UsuarioModel = require("../../models/seguridad/usuarios");

exports.registrarUsuario = async (req, res) => {
  try {
    if (req.Usuario.user.Perfil === "admin" || req.Usuario.user.Perfil === "enfermera") {
      const {
        NombreCompleto, Usuario, Clave, Perfil, ipsId,
      } = req.body;
      // console.log(req.body);
      const date = moment()
        .tz("America/New_York")
        .format("MM/DD/YYYY HH:mm:ss");
      // console.log(date);
      const usrBD = await UsuarioModel.create({
        NombreCompleto,
        Usuario,
        Clave,
        Perfil,
        ipsId,
        Estado: "ACT",
        FechaCreacion: date,
      });

      const tokenData = {
        NombreCompleto,
        Perfil,
        Usuario,
      };

      const token = usrBD.crearJsonWebToken(tokenData);

      return res.status(200).json({
        id: usrBD.id,
        NombreCompleto,
        Perfil,
        Usuario,
        token,
      });
    }
    return res.status(401).send("Ingrese como un usuario Administrador");
  } catch (err) {
    return res.status(503).send(`Error Registrando usuario: ${err.message}`);
  }
};

exports.login = async (req, res) => {
  try {
    const { Usuario, Clave } = req.body;

    if (!Usuario || !Clave) {
      res.status(503).send("Ingrese un Usuario y una Clave");
    }
    const usuarioBD = await UsuarioModel.findOne({
      where: { Usuario, Estado: "ACT" },
    });
    // console.log("USUARIO BD: ", usuarioBD);
    if (!usuarioBD) {
      return res.status(503).send("El usuario no existe en la base de datos o se encuentra inactivo");
    }

    const valorBool = await usuarioBD.validarPassword(Clave);

    if (!valorBool) {
      res.status(503).send("Las credenciales son incorrectas");
      return null;
    }

    const tokenData = {
      NombreCompleto: usuarioBD.NombreCompleto,
      Id: usuarioBD.id,
      Perfil: usuarioBD.Perfil,
      Usuario: usuarioBD.Usuario,
      IpsId: usuarioBD.ipsId,
    };

    const token = usuarioBD.crearJsonWebToken(tokenData);

    // ojo cambio
    return res.json(token);
  } catch (err) {
    return res.status(503).send("Error en el Login");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    if (req.Usuario.user.Perfil === "admin" || req.Usuario.user.Perfil === "enfermera") {
      const data = await UsuarioModel.findAll({
        where: { Estado: "ACT" },
        order: [
          ["NombreCompleto", "ASC"],
        ],
        attributes: ["id", "NombreCompleto", "Usuario", "Perfil"],
      });
      return res.status(200).json(data);
    }
    return res.status(401).send("Ingrese como un usuario Administrador");
  } catch (err) {
    return res.status(503).send("Error Procesando la Consulta");
  }
};

exports.inactiveUser = async (req, res) => {
  try {
    if (req.Usuario.user.Perfil === "admin" || req.Usuario.user.Perfil === "enfermera") {
      const { id } = req.body;
      const data = await UsuarioModel.update({
        Estado: "INA",
      }, {
        where: { id, Estado: "ACT" },
      });

      return res.status(200).json(data);
    }
    return res.status(401).send("Ingrese como un usuario Administrador");
  } catch (err) {
    return res.status(503).send("Error Procesando la desactivacion del usuario");
  }
};
