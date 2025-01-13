const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class TiposNovedadModel extends Model {}

TiposNovedadModel.init(
  {
    Id: { type: DataTypes.INTEGER, primaryKey: true },
    Descripcion: { type: DataTypes.STRING(255), allowNull: false },
    Estado: { type: DataTypes.STRING(3), allowNull: false },
  },
  {
    sequelize,
    tableName: "SEGPAC_Tipos_Novedad",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = TiposNovedadModel;
