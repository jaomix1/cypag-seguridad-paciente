const { Sequelize, DataTypes, Model } = require("sequelize");
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

class EmpresasModel extends Model {}

EmpresasModel.init(
  {
    Id: { type: DataTypes.INTEGER, primaryKey: true },
    Nombre: { type: DataTypes.STRING(255), allowNull: false },
    Estado: { type: DataTypes.STRING(3), allowNull: false },
  },
  {
    sequelize,
    tableName: "SEGPAC_Empresas",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = EmpresasModel;
