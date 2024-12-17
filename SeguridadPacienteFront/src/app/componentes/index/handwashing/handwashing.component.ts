import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-handwashing',
  templateUrl: './handwashing.component.html',
  styleUrls: ['./handwashing.component.css']
})
export class HandwashingComponent implements OnInit {


  form = new FormGroup({
    empresa: new FormControl(),
    sede: new FormControl(),
    proceso: new FormControl(),
    observador: new FormControl(),
    profesionales: new FormControl(),
    observacion: new FormControl(),

  })



  constructor() { }

  ngOnInit(): void {
  }

  sedes: any = [
    { id: 1, descripcion: 'El parque' },
    { id: 2, descripcion: 'Lleras' },
    { id: 3, descripcion: 'Barrio blanco' },
    { id: 4, descripcion: 'Atalaya' },
    { id: 5, descripcion: 'Villa del rosario' },
  ];

  procesos: any = [
    { id: 1, descripcion: "RCV y Nefroprotección" },
    { id: 2, descripcion: "Gestantes" },
    { id: 3, descripcion: "Odontología" },
    { id: 4, descripcion: "Terapia y Rehabilitación" },
    { id: 5, descripcion: "Laboratorio Clínico" },
    { id: 6, descripcion: "Imágenes Diagnósticas" },
    { id: 7, descripcion: "PYMS" },
    { id: 8, descripcion: "Vacunación" },
    { id: 9, descripcion: "EPOCAS" },
    { id: 10, descripcion: "Artritis" },
    { id: 11, descripcion: "Consulta Externa" }
  ]

  categorias: any = [
    { id: 1, descripcion: "Médicos generales" },
    { id: 2, descripcion: "Médicos especialistas" },
    { id: 3, descripcion: "Enfermeras" },
    { id: 4, descripcion: "Auxiliares de enfermería" },
    { id: 5, descripcion: "Psicólogos" },
    { id: 6, descripcion: "Nutricionistas" },
    { id: 7, descripcion: "Fisioterapeutas" },
    { id: 8, descripcion: "Terapéutas ocupacionales" },
    { id: 9, descripcion: "Fonoaudiólogos" },
    { id: 10, descripcion: "Auxiliares de laboratorio" },
    { id: 11, descripcion: "Practicantes" },
    { id: 12, descripcion: "Bacteriólogos" },
    { id: 13, descripcion: "Técnicos de radiología" },
    { id: 14, descripcion: "Odontólogos" },
    { id: 15, descripcion: "Auxiliares de odontología" }
  ];

  opciones: any = [
    { id: 1, descripcion: "Alcohol" },
    { id: 2, descripcion: "Agua y jabón" },
    { id: 3, descripcion: "Omisión" },
    { id: 4, descripcion: "No aplica" }
  ];

}
