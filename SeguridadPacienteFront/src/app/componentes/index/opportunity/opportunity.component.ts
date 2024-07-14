import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MainService } from 'src/app/servicios/main.service';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import { BaseFormComponent } from '../../baseComponent';
import { TablaDataSource, TablaItem } from '../demos/tabla/tabla-datasource';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { EditOportunidadComponent } from '../edit-oportunidad/edit-oportunidad.component';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent extends BaseFormComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TablaItem>;

  displayedColumns = ['externo', 'responsable', 'oportunidad', 'porcentaje', 'accion'];

  //responsables: any;
  datos: any = [];
  private masterId: string;


  // form = new FormGroup({
  //   Id: new FormControl(null),
  //   Id_Master: new FormControl(null),
  //   Codigo_Externo: new FormControl(null, [Validators.maxLength(30)]),
  //   Start_Date: new FormControl(null),
  //   End_Date: new FormControl(null),
  //   Responsable: new FormControl(null),
  // });


  constructor(
    private OpportunityService: OpportunityService,
    public mainService: MainService,
    public UsersService: ResponsableService,
    @Inject(MAT_DIALOG_DATA) public guid: string,
    public dialog: MatDialog) {
    super();
    this.masterId = guid;
    this.submit(this.masterId)
  }

  ngAfterViewInit(): void {
    //this.getResponsables();
  }

  ngOnInit(): void {
  }

  submit(masterId: any): void {
    this.loadingMain = true;
    this.OpportunityService.getAll({ Id_Master: masterId }).subscribe({
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

  edit(guid: any) {
    const dialogRef = this.dialog.open(EditOportunidadComponent, {
      width: '600px',
      height: '250px',
      data: guid,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.submit(this.masterId);
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
