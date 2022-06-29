/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../../../config/db");
require("dotenv").config();

class UsuarioModel extends Model {
  crearJsonWebToken(data) {
    return jwt.sign({ user: data }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  }

  validarPassword(passwordUsuario) {
    return bcrypt.compareSync(passwordUsuario, this.Clave);
  }
}

UsuarioModel.init(
  {
    Id: { type: DataTypes.UUID, defaultValue: sequelize.literal("newid()"), primaryKey: true },
    Usuario: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    NombreCompleto: { type: DataTypes.STRING(50), allowNull: false },
    Clave: { type: DataTypes.STRING(500), allowNull: false },
    Correo: { type: DataTypes.STRING(100), validate: { isEmail: true } },
    Estado: {
      type: DataTypes.STRING(3), defaultValue: "ACT", allowNull: false, validate: { isIn: [["ACT", "INA"]] },
    },
    Fecha_Creacion: { type: DataTypes.DATE, defaultValue: sequelize.literal("getdate()"), allowNull: false },
    Fecha_Modificacion: { type: DataTypes.DATE },
    Id_Perfil: { type: DataTypes.UUID, allowNull: false },
  },
  {
    sequelize,
    tableName: "SEG_Usuarios",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    hooks: {
      beforeCreate: async (usr) => {
        const salt = await bcrypt.genSaltSync(10);
        usr.Clave = bcrypt.hashSync(usr.Clave, salt);
      },
      beforeUpdate: async (usr) => {
        const salt = await bcrypt.genSaltSync(10);
        usr.Clave = bcrypt.hashSync(usr.Clave, salt);
      },
    },
  },
);

module.exports = UsuarioModel;
