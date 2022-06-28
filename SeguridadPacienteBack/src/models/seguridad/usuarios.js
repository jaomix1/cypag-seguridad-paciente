/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const IpsModel = require("../combos/ips");
require("dotenv").config();

const user = process.env.USER;
const password = process.env.PASS;
const host = process.env.SERVER_SQL;
const database = process.env.BD;
const dialect = process.env.DIALECT;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
});

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
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1, primaryKey: true },
    NombreCompleto: { type: DataTypes.STRING(60), allowNull: false },
    Usuario: { type: DataTypes.STRING(60), allowNull: false, unique: true },
    Clave: { type: DataTypes.STRING, allowNull: false },
    Perfil: { type: DataTypes.STRING(60), allowNull: false, validate: { isIn: [["admin", "digitador", "enfermera", "facturacion"]] } },
    ipsId: { type: DataTypes.INTEGER, allowNull: false },
    Estado: { type: DataTypes.STRING(3), allowNull: false, validate: { isIn: [["ACT", "INA"]] } },
    FechaCreacion: { type: DataTypes.DATE, allowNull: false },
    // FechaModificacion: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: "SEG_Usuario",
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

// IpsModel.hasMany(UsuarioModel, { foreignKey: "ipsId", as: "ipsId", onDelete: "NO ACTION" });
// sequelize.sync();
module.exports = UsuarioModel;
