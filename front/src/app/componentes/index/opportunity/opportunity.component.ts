import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MainService } from 'src/app/servicios/main.service';
import { PlanDeAccionService } from 'src/app/servicios/planDeAccion/planDeAccion.service';
import { BaseFormComponent } from '../../baseComponent';
import { TablaDataSource, TablaItem } from '../demos/tabla/tabla-datasource';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { ListPlanAccionComponent } from '../accion/list-plan-accion/list-plan-accion.component';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent extends BaseFormComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TablaItem>;

  displayedColumns = ['oportunidad', 'responsable', 'porcentaje', 'accion'];

  option: string = 'new';
  datos: any = [];


  constructor(
    private PlanDeAccionService: PlanDeAccionService,
    public mainService: MainService,
    public UsersService: ResponsableService,
    @Inject(MAT_DIALOG_DATA) public id: string,
    public dialog: MatDialog) {
    super();
    this.submit(this.id)
  }

  ngAfterViewInit(): void {
    //this.getResponsables();
  }

  ngOnInit(): void {
  }

  submit(id: any): void {
    this.loadingMain = true;
    this.PlanDeAccionService.getOpportunitiesCurrent(id).subscribe({
      next: (req: any) => {
        this.datos = req;
        this.loadingMain = false;
        if (this.datos.length < 1) {
          this.mainService.showToast("No se han encontrado oportunidades de mejoras para esta solicitud", 'error');
        }
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
        this.loadingMain = false;
      },
      complete: () => {
        this.loadingMain = false;
      }
    });
  }

  openDetail(guid: any) {
    const dialogRef = this.dialog.open(ListPlanAccionComponent, {
      width: '70%',
      height: '100%',
      data: guid,
      disableClose: true

    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.submit(this.id);

    });
  }


  // cancelar() {
  //   this.form.reset();
  // }

  // cambioFecha() {
  //   this.form.patchValue({
  //     codigo: null,
  //     documento: null,
  //   });
  // }

  // validate(nameInput: string) {
  //   return this.mainService.validateInput(this.form, nameInput);
  // }

  // check(nameInput: string) {
  //   return this.mainService.checkInput(this.form, nameInput);
  // }
}
