import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ComboService } from 'src/app/servicios/combo/combo.service';
import { MainService } from 'src/app/servicios/main.service';
import { BaseFormComponent } from '../../baseComponent';
import { MatDialog } from '@angular/material/dialog';
import { DetallesComponent } from '../detalles/detalles.component';
import { OpportunityComponent } from '../opportunity/opportunity.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ExportarService } from 'src/app/servicios/exportar/search.service';
import { ExcelService } from 'src/app/servicios/ExcelService';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.css']
})
export class ExportarComponent extends BaseFormComponent implements OnInit, AfterViewInit {

  // novedades: Combo[] = [];
  // empresas: Combo[] = [];
  // sedes: Combo[] = [];
  // dataSource = new MatTableDataSource();

  maxDate: Date;

  myForm = new FormGroup({
    Start_Date: new FormControl(null, [Validators.required]),
    End_Date: new FormControl(null, [Validators.required])
  });

  constructor(
    private ExportarService: ExportarService,
    public mainService: MainService,
    private comboService: ComboService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private excelService: ExcelService
  ) {
    super();

    this.maxDate = new Date();
  }

  ngAfterViewInit(): void {
    // this.cargaNovedades();
    // this.cargaEmpresas();
  }

  ngOnInit(): void {

  }

  submit(): void {

    if (this.myForm.valid) {
      this.myForm.disable();
      this.loadingMain = true;
      this.ExportarService.getAll(this.myForm.value).subscribe({
        next: (req) => {

          let data = req.map(
            (c: any) => {
              return {
                Codigo: c.Codigo,
                Fecha_Creacion: c.Fecha_Creacion,
                Fecha_Incidente: c.Fecha_Incidente + " " + c.Hora_Incidente,
                Quien_Reporta: c.Nombre_Quien_Reporta,
                Cargo_Quien_Reporta: c.Cargo_Quien_Reporta,
                Empresa: c.Empresa_Join.Descripcion,
                Sede: c.Sede_Join.Descripcion,
                Servicio: c.Servicio_Id_Join.Descripcion,
                Otro_Servicio: c.Otro_Servicio,
                Nombre_Paciente: c.Nombre_Paciente,
                Tipo_Documento: c.Tipo_Id_Join,
                Numero: c.Numero_Id,
                Sexo: c.Sexo,
                Edad: c.Edad,
                Tipo_Novedad: c.Tipo_Novedad_Join.Descripcion,
                Preg_Que_Paso: c.Preg_Que,
                Preg_Como_Paso: c.Preg_Como,
                Preg_Hay_Testigos: c.Preg_Hay_Testigos,
                Preg_Testigos: c.Preg_Quien ? "SI" : "NO",
                Preg_En_Atencion: c.Preg_En_Atencion ? "SI" : "NO",
                Preg_Involuntario: c.Preg_Involuntario,
                Preg_Genero_Dano: c.Preg_Genero_Dano ? "SI" : "NO",
                Preg_Dano_Generado: c.Preg_Dano_Generado,
                Preg_Dano_Severidad: c.Preg_Dano_Severidad,
                Accion_Tomada: c.Accion_Tomada

              }
            });

          this.excelService.exportAsExcelFile(data, "datos_desde_" + this.myForm.value.Start_Date.toISOString().substring(0, 9) + "_al_" + this.myForm.value.End_Date.toISOString().substring(0, 9));

          this.loadingMain = false;
          this.myForm.enable();
          if (req.length < 1) {
            this.mainService.showToast("No se han encontrado registros, verifique los filtros", 'error');
          }
          //this.cancelar();
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
          this.loadingMain = false;
          this.myForm.enable();
        },
        complete: () => {
          this.loadingMain = false;
          this.myForm.enable();
        }
      });
    }
  }


  cancelar() {
    this.myForm.reset();
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.myForm, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.myForm, nameInput);
  }


}
