import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlanDeAccionService } from 'src/app/servicios/planDeAccion/planDeAccion.service';
import { MainService } from 'src/app/servicios/main.service';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { ListFollowsComponent } from '../../follow/list_follows/list-follows.component';
import { AccionFormComponent } from '../accion-form/accion-form.component';

@Component({
  selector: 'app-list-plan-accion',
  templateUrl: './list-plan-accion.component.html',
  styleUrls: ['./list-plan-accion.component.css']
})
export class ListPlanAccionComponent implements OnInit {

  datos: any = [];
  percent: number = 0;
  descripcion: string = '';
  responsable: string = '';
  responsables: any = [];
  loading: boolean = false;
  columns = ['Descripcion', 'Estado', 'Porcentaje', 'Responsable', 'acciones'];


  constructor(
    private PlanDeAccionService: PlanDeAccionService,
    public mainService: MainService,
    @Inject(MAT_DIALOG_DATA) public guid: string,
    public UsersService: ResponsableService,
    public dialogRef: MatDialogRef<ListPlanAccionComponent>, // Inyección de MatDialogRef
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDetailOportunity();
  }

  getDetailOportunity() {
    this.loading = true;
    this.PlanDeAccionService.get(this.guid).subscribe({
      next: (req: any) => {
        this.datos = req.Planes;
        console.log('esta es la es: ', this.datos);
        this.loading = false;
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
        this.loading = false;
      },
      complete: () => {
      }
    });
  }

  newAccion() {
    const dialogRef = this.dialog.open(AccionFormComponent, {
      width: '100%',
      height: '80%',
      data: this.guid,
      disableClose: true

    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getDetailOportunity();
    });
  }

  listSeguimientos(id: number) {
    const dialogRef = this.dialog.open(ListFollowsComponent, {
      width: '100%',
      height: '90%',
      data: id,
      disableClose: true

    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getDetailOportunity();
    });
  }

  cancel() {
    this.mainService.showToast("Operacion Cancelada")
    this.dialogRef.close(false); // Cierra el modal
  }

}
