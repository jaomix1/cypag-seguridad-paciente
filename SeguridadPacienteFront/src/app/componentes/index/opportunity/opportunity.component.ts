import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ComboD } from 'src/app/modelos/combos/combo';
import { Query } from 'src/app/modelos/query/query';
import { ComboService } from 'src/app/servicios/combo/combo.service';
import { MainService } from 'src/app/servicios/main.service';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import { BaseFormComponent } from '../../baseComponent';
import { TablaDataSource, TablaItem } from '../demos/tabla/tabla-datasource';
import { MatDialog } from '@angular/material/dialog';
import { DetallesComponent } from '../detalles/detalles.component';
import { UsersService } from 'src/app/servicios/usuarios/users.service';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent extends BaseFormComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TablaItem>;

  displayedColumns = ['id', 'externo', 'responsable', 'oportunidad', 'porcentaje', 'accion'];

  responsables: any;
  datos: any = [];

  form = new FormGroup({
    Id: new FormControl(null),
    Id_Master: new FormControl(null),
    Codigo_Externo: new FormControl(null, [Validators.maxLength(5), Validators.pattern(this.number)]),
    Start_Date: new FormControl(null),
    End_Date: new FormControl(null),
    Responsable: new FormControl(null),
  });

  constructor(
    private OpportunityService: OpportunityService,
    public mainService: MainService,
    public UsersService: UsersService,
    public dialog: MatDialog) {
    super();
  }

  ngAfterViewInit(): void {
    this.getResponsables();
  }

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.form.value)
    if (this.form.valid) {
      this.form.disable();
      this.loadingMain = true;
      this.OpportunityService.getAll(this.form.value).subscribe({
        next: (req:any) => {
          this.datos = req;
          this.loadingMain = false;
          this.form.enable();
          //this.cancelar();
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
          this.loadingMain = false;
          this.form.enable();
        },
        complete: () => {
          this.loadingMain = false;
          this.form.enable();
        }
      });
    }
  }

  getResponsables() {
    this.UsersService.get().subscribe({
      next: (req) => {
        console.log("data users", req)
        this.responsables = req;
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
      }
    });
  }

  detalles(guid : any){
    const dialogRef = this.dialog.open(DetallesComponent, {
      width: '100%',
      height: '100%',
      data: guid,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  cancelar() {
    this.form.reset();
  }

  cambioFecha() {
    this.form.patchValue({
      codigo: null,
      documento: null,
    });
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.form, nameInput);
  }
}
