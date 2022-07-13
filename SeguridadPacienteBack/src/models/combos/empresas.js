const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class EmpresasModel extends Model {}

EmpresasModel.init(
  {
    Id: { type: DataTypes.INTEGER, primaryKey: true },
    Descripcion: { type: DataTypes.STRING(255), allowNull: false },
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
