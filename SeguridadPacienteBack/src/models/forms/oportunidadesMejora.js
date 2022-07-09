const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class OportunidadesMejoraModel extends Model {}

OportunidadesMejoraModel.init(
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal("newid()"),
      primaryKey: true,
    },
    Id_Master: { type: DataTypes.UUID, allowNull: false },
    Codigo_Externo: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true,
    },
    Descripcion: { type: DataTypes.STRING(500), allowNull: true },
    Porcentaje_Mejora: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
      validate: { min: 0, max: 100 },
    },
    Responsable: { type: DataTypes.STRING(100), allowNull: true },
    Estado: {
      type: DataTypes.STRING(3),
      defaultValue: "ACT",
      allowNull: false,
      validate: { isIn: [["ACT", "INA"]] },
    },
    Fecha_Creacion: {
      type: DataTypes.STRING(50),
      defaultValue: sequelize.literal("FORMAT (getdate(), 'yyyy-MM-dd HH:mm:ss.fff')"),
      allowNull: false,
    },
    Fecha_Modificacion: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "SEGPAC_Oportunidades_Mejora",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = OportunidadesMejoraModel;
