const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class SedesModel extends Model {}

SedesModel.init(
  {
    Id: { type: DataTypes.INTEGER, primaryKey: true },
    Id_Empresa: { type: DataTypes.INTEGER, allowNull: false },
    Nombre: { type: DataTypes.STRING(255), allowNull: false },
    Estado: { type: DataTypes.STRING(3), allowNull: false },
  },
  {
    sequelize,
    tableName: "SEGPAC_Sedes",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = SedesModel;
