import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Combo } from 'src/app/modelos/combos/combo';
import { Query } from 'src/app/modelos/query/query';
import { ComboService } from 'src/app/servicios/combo/combo.service';
import { MainService } from 'src/app/servicios/main.service';
import { QueryService } from 'src/app/servicios/query/search.service';
import { BaseFormComponent } from '../../baseComponent';
import { MatDialog } from '@angular/material/dialog';
import { DetallesComponent } from '../detalles/detalles.component';
import { OpportunityComponent } from '../opportunity/opportunity.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent extends BaseFormComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('empTbSort') sort!: MatSort;

  displayedColumns = ['Codigo', 'Fecha_Creacion', 'Fecha_Incidente', 'Nombre_Paciente', 'Numero_Id', 'Sede', 'Novedad', 'Oportunidades', 'accion'];

  novedades: Combo[] = [];
  empresas: Combo[] = [];
  sedes: Combo[] = [];
  dataSource = new MatTableDataSource();

  maxDate: Date;

  myForm = new FormGroup({
    Codigo: new FormControl(null, [Validators.maxLength(50), Validators.pattern(this.number)]),
    Numero_Id: new FormControl(null, [Validators.maxLength(15), Validators.pattern(this.number)]),
    Start_Date: new FormControl(null, [Validators.required]),
    End_Date: new FormControl(null, [Validators.required]),
    Empresa: new FormControl(null, [Validators.required]),
    Sede: new FormControl(null),
    Tipo_Novedad: new FormControl(null),
  });

  constructor(
    private QueryService: QueryService,
    public mainService: MainService,
    private comboService: ComboService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    super();

    this.maxDate = new Date();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cargaNovedades();
    this.cargaEmpresas();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {

  }

  cargaEmpresas() {
    this.comboService.getEmpresas().subscribe({
      next: (req) => {
        this.empresas = req;
      },
      error: (err: string) => {
        this.loadingMain = false;
        this.mainService.showToast(err, 'error');
      },
      complete: () => (this.loadingMain = false),
    })
  }

  cargaSedes(empresa: any) {
    this.comboService.getSedes(empresa).subscribe({
      next: (req) => {
        this.sedes = req;
        this.myForm.patchValue({ Sede: null });
      },
      error: (err: string) => {
        this.loadingMain = false;
        this.mainService.showToast(err, 'error');
      },
      complete: () => (this.loadingMain = false),
    })
  }

  cargaNovedades() {
    this.comboService.getNovedades().subscribe({
      next: (req) => {
        this.novedades = req;
      },
      error: (err: string) => {
        this.loadingMain = false;
        this.mainService.showToast(err, 'error');
      },
      complete: () => (this.loadingMain = false),
    })
  }

  submit(): void {
    if (this.myForm.valid) {
      this.myForm.disable();
      this.loadingMain = true;
      this.QueryService.getAll(this.myForm.value).subscribe({
        next: (req) => {
          let data = req.map(
            (c: any) => {
              return {
                Id: c.Id,
                Codigo: c.Codigo,
                Fecha_Creacion: c.Fecha_Creacion,
                Fecha_Incidente: c.Fecha_Incidente + " " + c.Hora_Incidente,
                Nombre_Paciente: c.Nombre_Paciente,
                Numero_Id: c.Numero_Id,
                Sede: c.Sede,
                Novedad: c.Novedad,
                Oportunidades: c.Oportunidades,
                //Resuelto: 0//this.calcularPorcentaje(c.Op_Mejora_Join)
              }
            });
          console.log('esta es la data', data)

          this.dataSource.data = data;
          setTimeout(() => {
            this.sort.disableClear = true;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
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

  detalles(guid: any) {
    const dialogRef = this.dialog.open(DetallesComponent, {
      width: '100%',
      height: '100%',
      data: guid,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  Oportunidades(guid: any) {
    const dialogRef = this.dialog.open(OpportunityComponent, {
      width: '100%',
      height: '100%',
      data: guid,
      disableClose: true

    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  cancelar() {
    this.myForm.reset();
  }

  cambioFecha() {
    this.myForm.patchValue({
      codigo: null,
      documento: null,
    });
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.myForm, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.myForm, nameInput);
  }

  calcularPorcentaje(datos: any[]) {
    if (datos.length == 0) {
      return 0;
    }
    else {
      let res = datos.map(c => c.Porcentaje_Mejora);
      let por = res.reduce((partialSum, a) => partialSum + a, 0);
      return por / (datos.length * 100);
    }


    //return  res + " de " +  datos.length;
  }

  calcularProcesadas(datos: any[]) {
    return datos.filter(c => c.Porcentaje_Mejora == 100).length
  }
}
