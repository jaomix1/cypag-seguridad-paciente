const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");
const TiposNovedadModel = require("../combos/tiposNovedad");
const ClasificacionReporteModel = require("../combos/clasificacionReporte");
const NovedadCausaModel = require("../combos/novedadCausa");

class DetallesModel extends Model { }

DetallesModel.init(
  {
    id: { type: DataTypes.UUID, defaultValue: sequelize.literal("newid()"), primaryKey: true },
    Id_Master: { type: DataTypes.UUID, allowNull: false },
    Tipo_Investigacion: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
      validate: {
        isIn: [["Investigaciones_M5", "Investigaciones_P5", "Investigaciones_Naranjo", "Investigaciones_Londres"]],
      },
    },
    Triada_Involuntario: { type: DataTypes.BOOLEAN, allowNull: true },
    Triada_Genero_Dano: { type: DataTypes.BOOLEAN, allowNull: true },
    Triada_Atencion_Salud: { type: DataTypes.BOOLEAN, allowNull: true },
    Tipo_Novedad: { type: DataTypes.INTEGER, allowNull: false },
    Tipo_Detalle: { type: DataTypes.STRING(40), allowNull: true },
    Responsables: { type: DataTypes.STRING(500), allowNull: true },
    Novedad_Causa: { type: DataTypes.INTEGER, allowNull: true },
    Oportunidad_Mejora: { type: DataTypes.BOOLEAN, allowNull: true },
    Estado: {
      type: DataTypes.STRING(3), defaultValue: "ACT", allowNull: false, validate: { isIn: [["ACT", "INA"]] },
    },
    Fecha_Creacion: { type: DataTypes.DATE, defaultValue: sequelize.literal("getdate()"), allowNull: false },
    Fecha_Modificacion: { type: DataTypes.DATE, defaultValue: null, allowNull: true },
    Agente: { type: DataTypes.STRING(50), allowNull: true },
    Clasificacion_Reporte_Id: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize,
    tableName: "SEGPAC_Detalles",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

DetallesModel.belongsTo(TiposNovedadModel, { foreignKey: "Tipo_Novedad", as: "Tipo_Novedad_Join", onDelete: "NO ACTION" });
DetallesModel.belongsTo(ClasificacionReporteModel, { foreignKey: "Clasificacion_Reporte_Id", as: "Clasificacion_Reporte_Id_Join", onDelete: "NO ACTION" });
DetallesModel.belongsTo(NovedadCausaModel, { foreignKey: "Novedad_Causa", as: "Novedad_Causa_Join", onDelete: "NO ACTION" });

module.exports = DetallesModel;
