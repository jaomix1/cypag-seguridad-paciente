const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class InvestigacionesLondresModel extends Model {}

InvestigacionesLondresModel.init(
  {
    Id: { type: DataTypes.UUID, defaultValue: sequelize.literal("newid()"), primaryKey: true },
    Id_Detalle: { type: DataTypes.UUID, allowNull: false },
    Tipo_Adverso: { type: DataTypes.STRING(255), allowNull: true },
    Select_Depende_Tipo: { type: DataTypes.STRING(255), allowNull: true },
    Fase1_Analisis: { type: DataTypes.STRING(255), allowNull: true },
    Fase1_Entrevista: { type: DataTypes.STRING(255), allowNull: true },
    Fase1_Otros_Mecanismos: { type: DataTypes.STRING(255), allowNull: true },
    Fase1_Cronologia: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Acciones_Inseguras: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Equipo: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Individuo: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Administrativos: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Tareas: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Paciente: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Equipo_Observaciones: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Individuo_Observaciones: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Administrativos_Observaciones: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Tareas_Observaciones: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Paciente_Observaciones: { type: DataTypes.STRING(255), allowNull: true },
    Fase2_Analisis_Problema: { type: DataTypes.STRING(255), allowNull: true },
    Fase3_Complicacion: { type: DataTypes.STRING(255), allowNull: true },
    Fase3_Preg_Segunda: { type: DataTypes.STRING(255), allowNull: true },
    Fase3_Acciones_Segunda: { type: DataTypes.STRING(255), allowNull: true },
    Fase3_Preg_Tercera: { type: DataTypes.STRING(255), allowNull: true },
    Fase3_Acciones_Tercera: { type: DataTypes.STRING(255), allowNull: true },
    Evento_Adverso_Tipo: { type: DataTypes.STRING(20), allowNull: true },
    Evento_Adverso_Estado: { type: DataTypes.STRING(20), allowNull: true },
    Estado: {
      type: DataTypes.STRING(3), defaultValue: "ACT", allowNull: false, validate: { isIn: [["ACT", "INA"]] },
    },
    Fecha_Creacion: { type: DataTypes.DATE, defaultValue: sequelize.literal("getdate()"), allowNull: false },
    Fecha_Modificacion: { type: DataTypes.DATE, defaultValue: null, allowNull: true },
  },
  {
    sequelize,
    tableName: "SEGPAC_Investigaciones_Londres",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = InvestigacionesLondresModel;
