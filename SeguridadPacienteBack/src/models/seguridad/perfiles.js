const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class PerfilesModel extends Model {}

PerfilesModel.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    Descripcion: { type: DataTypes.STRING(50), allowNull: false },
    Estado: { type: DataTypes.STRING(3), allowNull: false },
    FechaCreacion: { type: DataTypes.DATE, allowNull: false },
    FechaModificacion: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: "SEG_Perfiles",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = PerfilesModel;
