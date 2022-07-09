/* eslint-disable camelcase */
const PerfilesModel = require("../../models/seguridad/perfiles");
const UsuarioModel = require("../../models/seguridad/usuarios");

exports.obtenerPerfiles = async (req, res) => {
  try {
    if (req.Usuario.user.Perfil === "admin" || true) {
      const data = await PerfilesModel.findAll({
        where: { Estado: "ACT" },
        attributes: ["Id", "Descripcion"],
      });
      return res.status(200).json(data);
    }
    return res.status(401).send("Ingrese como un usuario Administrador");
  } catch (err) {
    return res.status(503).send("Error Procesando la Consulta");
  }
};

exports.registrarUsuario = async (req, res) => {
  try {
    if (req.Usuario.user.Perfil === "admin") {
      const {
        Usuario, NombreCompleto, Clave, Correo, Id_Perfil,
      } = req.body;
      const usrBD = await UsuarioModel.create({
        Usuario,
        NombreCompleto,
        Clave,
        Correo,
        Id_Perfil,
      });
      const Perfil = await PerfilesModel.findOne({ where: { Id: Id_Perfil }, attributes: ["Descripcion"] });
      const tokenData = {
        NombreCompleto,
        Perfil: Perfil.Descripcion,
        Usuario,
      };

      const token = usrBD.crearJsonWebToken(tokenData);

      return res.status(200).json({
        message: "Usuario Creado",
        id: usrBD.id,
        NombreCompleto,
        Perfil: Perfil.Descripcion,
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
    const Perfil = await PerfilesModel.findOne({ where: { Id: usuarioBD.Id_Perfil }, attributes: ["Descripcion"] });
    const tokenData = {
      NombreCompleto: usuarioBD.NombreCompleto,
      Id: usuarioBD.id,
      Perfil: Perfil.Descripcion,
      Usuario: usuarioBD.Usuario,
    };

    const token = usuarioBD.crearJsonWebToken(tokenData);
    return res.json(token);
  } catch (err) {
    return res.status(503).send("Error en el Login");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    if (req.Usuario.user.Perfil === "admin" || true) {
      const data = await UsuarioModel.findAll({
        where: { Estado: "ACT" },
        order: [
          ["NombreCompleto", "ASC"],
        ],
        attributes: ["id", "NombreCompleto", "Usuario", "Correo", "Id_Perfil"],
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
    if (req.Usuario.user.Perfil === "admin") {
      const { id } = req.body;
      const [data] = await UsuarioModel.update({
        Estado: "INA",
      }, {
        where: { id, Estado: "ACT" },
      });
      if (data > 0) {
        return res.status(200).send("Usuario inhabilitado exitosamente");
      }
      return res.status(200).send("Usuario no encontrado");
    }
    return res.status(401).send("Ingrese como un usuario Administrador");
  } catch (err) {
    return res.status(503).send("Error Procesando la desactivacion del usuario");
  }
};
