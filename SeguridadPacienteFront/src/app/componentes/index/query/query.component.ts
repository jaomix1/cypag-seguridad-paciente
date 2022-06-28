import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Combo } from 'src/app/modelos/combo';
import { Query } from 'src/app/modelos/query/query';
import { ComboService } from 'src/app/servicios/combo/combo.service';
import { MainService } from 'src/app/servicios/main.service';
import { QueryService } from 'src/app/servicios/query/opportunity.service';
import { BaseFormComponent } from '../../baseComponent';
import { TablaDataSource, TablaItem } from '../demos/tabla/tabla-datasource';
import { MatDialog } from '@angular/material/dialog';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent extends BaseFormComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TablaItem>;
  dataSource: TablaDataSource;

  displayedColumns = ['id', 'name', 'accion'];

  novedades: Combo[] = [];
  datos: Query = new Query();

  myForm = new FormGroup({
    codigo: new FormControl(null, [Validators.maxLength(5), Validators.pattern(this.number)]),
    documento: new FormControl(null, [Validators.maxLength(15), Validators.pattern(this.number)]),
    fechaInicio: new FormControl(null),
    fechaFin: new FormControl(null),
    novedad: new FormControl(null),
  });

  constructor(
    private myService: QueryService,
    public mainService: MainService,
    private comboService: ComboService,
    public dialog: MatDialog) {
    super();
    this.dataSource = new TablaDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {

    this.novedades = [
      {id: 1, descripcion: 'Hydrogen'},
      {id: 2, descripcion: 'Helium'},
      {id: 3, descripcion: 'Lithium'},
    ]

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
      this.myService.create(this.myForm.value).subscribe({
        next: (req) => {
          this.mainService.showToast('Creado Correctamente');
          this.datos = req;
          this.loadingMain = false;
          this.myForm.enable();
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

  detalles(guid : any){
    const dialogRef = this.dialog.open(DetallesComponent, {
      width: '100%',
      data: guid,
      disableClose: false
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
}
