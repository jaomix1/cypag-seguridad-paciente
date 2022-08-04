import { Injectable, Inject } from '@angular/core';
import { BaseService } from '../baseService';
import { ComboText } from 'src/app/modelos/combos/combo';

@Injectable({
  providedIn: 'root'
})
export class CombosLondresService {

  constructor() { }

  arrayOptions = [
    { type: 1,
      option: 'No se realiza cuando este indicado'
    },
    { type: 1,
      option: 'Incompleta o insuficiente'
    },
    { type: 1,
      option: 'No disponible'
    },
    { type: 1,
      option: 'Paciente equivocado'
    },
    { type: 1,
      option: 'Proceso o servicio equivocado'
    },
    { type: 2,
      option: 'No se realiza cuando este indicado'
    },
    { type: 2,
      option: 'Incompleta o insuficiente'
    },
    { type: 2,
      option: 'No disponible'
    },
    { type: 2,
      option: 'Paciente equivocado'
    },
    { type: 2,
      option: 'Proceso equivocado/tratamiento/procedimiento'
    },
    { type: 2,
      option: 'Parte del cuerpo equivocada/cara/sitio'
    },
    { type: 3,
      option: 'Documentos que faltan o no disponibles'
    },
    { type: 3,
      option: 'Retraso en el acceso a documentos'
    },
    { type: 3,
      option: 'Documentos para el paciente equivocado o documento equivocado'
    },
    { type: 3,
      option: 'Informacion en el documento confusa o ambigua/ilegible/incompleta'
    },
    { type: 4,
      option: 'Torrente sanguineo'
    },
    { type: 4,
      option: 'Zona quirurjica'
    },
    { type: 4,
      option: 'Absceso'
    },
    { type: 4,
      option: 'Neumonia'
    },
    { type: 4,
      option: 'Canulas intravasculares (cateteres)'
    },
    { type: 4,
      option: 'Protesis infectadas'
    },
    { type: 4,
      option: 'Urinaria dren/tubo (sondas vesicales)'
    },
    { type: 4,
      option: 'Tejidos blandos'
    },
    { type: 5,
      option: 'Paciente equivocado'
    },
    { type: 5,
      option: 'Medicamento equivocado'
    },
    { type: 5,
      option: 'Dosis/frecuencia incorrecta'
    },
    { type: 5,
      option: 'Formulacion incorrecta o presentacion'
    },
    { type: 5,
      option: 'Ruta equivocada'
    },
    { type: 5,
      option: 'Cantidad incorrecta'
    },
    { type: 5,
      option: 'Etiquetado/instrucción incorrectos'
    },
    { type: 5,
      option: 'Omision de medicamento o dosis'
    },
    { type: 5,
      option: 'Medicamento vencido'
    },
    { type: 5,
      option: 'Reaccion adversa al medicamento'
    },
    { type: 5,
      option: 'Contraindicacion'
    },
    { type: 5,
      option: 'Almacenamiento incorrecto'
    },
    { type: 6,
      option: 'Paciente equivocado'
    },
    { type: 6,
      option: 'Sangre equivocada/producto sanguineo equivocado'
    },
    { type: 6,
      option: 'Dosis o frecuencia incorrecta'
    },
    { type: 6,
      option: 'Cantidad incorrecta'
    },
    { type: 6,
      option: 'Etiquetado/instrucción incorrecto'
    },
    { type: 6,
      option: 'Contraindicado'
    },
    { type: 6,
      option: 'Almacenamiento incorrecto'
    },
    { type: 6,
      option: 'Omision de medicacion o la dosis'
    },
    { type: 6,
      option: 'Sangre/derivado sanguineo caduco efecto adversos'
    },
    { type: 7,
      option: 'Paciente equivocado'
    },
    { type: 7,
      option: 'Dieta incorrecta'
    },
    { type: 7,
      option: 'Cantidad incorrecta'
    },
    { type: 7,
      option: 'Frecuencia incorrecta'
    },
    { type: 7,
      option: 'Consistencia incorrecta'
    },
    { type: 7,
      option: 'Almacenamiento incorrecto'
    },
    { type: 8,
      option: 'Paciente equivocado'
    },
    { type: 8,
      option: 'Gas/vapor incorrecto'
    },
    { type: 8,
      option: 'Flujo y concentracion equivocados'
    },
    { type: 8,
      option: 'Modo de entrega equivocado'
    },
    { type: 8,
      option: 'Contraindicacion'
    },
    { type: 8,
      option: 'Almacenamiento incorrecto'
    },
    { type: 8,
      option: 'Fallas de administracion'
    },
    { type: 8,
      option: 'Contaminacion'
    },
    { type: 9,
      option: 'Presentacion y embalaje deficientes'
    },
    { type: 9,
      option: 'Falta de disponibilidad'
    },
    { type: 9,
      option: 'Inapropiado para la tarea'
    },
    { type: 9,
      option: 'Sucio/No esteril'
    },
    { type: 9,
      option: 'Fallas/Mal funcionamiento'
    },
    { type: 9,
      option: 'Desalojado/desconectado/eliminado'
    },
    { type: 9,
      option: 'Error de uso'
    },
    { type: 10,
      option: 'Incumplimiento de normas o falta de cooperacion/Obstruccion'
    },
    { type: 10,
      option: 'Desconsiderado/Rudo/Hostil/Inapropiado'
    },
    { type: 10,
      option: 'Arriesgado/temerario/peligroso'
    },
    { type: 10,
      option: 'Problema con el uso de sustancias /Abuso'
    },
    { type: 10,
      option: 'Acoso'
    },
    { type: 10,
      option: 'Discriminacion y Perjuicios'
    },
    { type: 11,
      option: 'Catre'
    },
    { type: 11,
      option: 'Cama'
    },
    { type: 11,
      option: 'Silla'
    },
    { type: 11,
      option: 'Camilla'
    },
    { type: 11,
      option: 'Baño'
    },
    { type: 11,
      option: 'Equipo terapeutico'
    },
    { type: 11,
      option: 'Escaleras/Escalones'
    },
    { type: 11,
      option: 'Siendo llevado/apoyado por otra persona'
    },
    { type: 12,
      option: 'Mecanismo (fuerza) contundente'
    },
    { type: 12,
      option: 'Mecanismo (fuerza) cortante penetrante'
    },
    { type: 12,
      option: 'Otras fuerzas mecanicas'
    },
    { type: 12,
      option: 'Temperaturas'
    },
    { type: 12,
      option: 'Amenazas por la respiracion'
    },
    { type: 12,
      option: 'Exposicion a sustancias quimicas u otras sustancias'
    },
    { type: 12,
      option: 'Otros mecanismos especificos de lesion'
    },
    { type: 12,
      option: 'Exposicion a efectos de el tiempo, desastres naturales, u otra fuerza de la naturaleza'
    },
    { type: 13,
      option: 'Inexistente/Inadecuado'
    },
    { type: 13,
      option: 'Dañado/defectuoso/desgastado'
    },
    { type: 14,
      option: 'Relacionados con la gestion de la carga de trabajo'
    },
    { type: 14,
      option: 'Camas/disponibilidad de los servicios/adecuacion'
    },
    { type: 14,
      option: 'Recursos humanos/disponibilidad de personal/adecuacion'
    },
    { type: 14,
      option: 'Organizacionde equipos/personal'
    },
    { type: 14,
      option: 'Recoleccion'
    },
    { type: 15,
      option: 'Transporte'
    },
    { type: 15,
      option: 'Clasificiacion'
    },
    { type: 15,
      option: 'Registro de datos'
    },
    { type: 15,
      option: 'Procesamiento'
    },
    { type: 15,
      option: 'Verificacion /validacion'
    },
    { type: 15,
      option: 'Resultado'
    }
  ]

  public fase2_equipo : ComboText[] = [
    {
      Id: "Comunicación escrita y oral ",
      Descripcion: "Comunicación escrita y oral "
    },
    {
      Id: "Supervision",
      Descripcion: "Supervision"
    },
    {
      Id: "Disponibilidad de soporte",
      Descripcion: "Disponibilidad de soporte"
    },
    {
      Id: "Equipo en gerencia y estructura",
      Descripcion: "Equipo en gerencia y estructura"
    }
  ];

  public fase2_individuo : ComboText[] = [
    {
      Id: "Conocimiento y Habilidades",
      Descripcion: "Conocimiento y Habilidades"
    },
    {
      Id: "Salud Mental y Psicologica",
      Descripcion: "Salud Mental y Psicologica"
    },
    {
      Id: "Competencias",
      Descripcion: "Competencias"
    },
    {
      Id: "Dotacion equipos",
      Descripcion: "Dotacion equipos"
    },
    {
      Id: "Cansancio laboral",
      Descripcion: "Cansancio laboral"
    },
    {
      Id: "Apoyo Administrativo",
      Descripcion: "Apoyo Administrativo"
    },
    {
      Id: "Exceso de personal temporal",
      Descripcion: "Exceso de personal temporal"
    }

  ];

  public fase2_administrativo : ComboText[] = [
    {
      Id: "Limitaciones financieras",
      Descripcion: "Limitaciones financieras"
    },
    {
      Id: "Estructura organizacional",
      Descripcion: "Estructura organizacional"
    },
    {
      Id: "Obejtivos Estrategico",
      Descripcion: "Obejtivos Estrategico"
    },
    {
      Id: "Induccion y Reinduccion",
      Descripcion: "Induccion y Reinduccion"
    },
    {
      Id: "No disponibilidad de equipos y medicamentos",
      Descripcion: "No disponibilidad de equipos y medicamentos"
    }
  ];

  public fase2_tecnologia : ComboText[] = [
    {
      Id: "Claridad en la estructura de la tarea",
      Descripcion: "Claridad en la estructura de la tarea"
    },
    {
      Id: "Poca adherencia a Guias",
      Descripcion: "Poca adherencia a Guias"
    },
    {
      Id: "Disponibilidad Pruebas Diagnosticas",
      Descripcion: "Poca adherencia a Guias"
    },
    {
      Id: "Confiabilidad Pruebas Diagnosticas",
      Descripcion: "Confiabilidad Pruebas Diagnosticas"
    },
    {
      Id: "Falta Mantenimientos Preventivos",
      Descripcion: "Falta Mantenimientos Preventivos"
    },
    {
      Id: "Carencia de Insumos",
      Descripcion: "Carencia de Insumos"
    }
  ];

  public fase2_paciente : ComboText[] = [
    {
      Id: "Factores sociales (Economicos, religiosos,etnicos)",
      Descripcion: "Factores sociales (Economicos, religiosos,etnicos)"
    },
    {
      Id: "Lenguaje y comunicación",
      Descripcion: "Lenguaje y comunicación"
    },
    {
      Id: "Condicion propia",
      Descripcion: "Condicion propia"
    },
    {
      Id: "Estado Psicologico",
      Descripcion: "Estado Psicologico"
    }
  ];

  public fase1_medios : ComboText[] = [
    {
      Id: "Análisis de la Historia Clínica, Protocolos, Procedimientos",
      Descripcion: "Análisis de la Historia Clínica, Protocolos, Procedimientos"
    },
    {
      Id: "Entrevista a las personas que intervienen en el proceso",
      Descripcion: "Entrevista a las personas que intervienen en el proceso"
    },
    {
      Id: "Otros mecanismos como: Declaraciones, Observaciones, etc.",
      Descripcion: "Otros mecanismos como: Declaraciones, Observaciones, etc."
    }
  ];
}




