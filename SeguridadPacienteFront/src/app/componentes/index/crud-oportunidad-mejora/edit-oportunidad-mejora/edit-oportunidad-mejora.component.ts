import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import { MainService } from 'src/app/servicios/main.service';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { AccionFormComponent } from '../../accion-form/accion-form.component';
import { ListFollowsComponent } from '../../list_follows/list-follows.component';

@Component({
  selector: 'app-edit-oportunidad-mejora',
  templateUrl: './edit-oportunidad-mejora.component.html',
  styleUrls: ['./edit-oportunidad-mejora.component.css']
})
export class EditOportunidadMejoraComponent implements OnInit {

  datos: any = [];
  percent: number = 0;
  descripcion: string = '';
  responsable: string = '';
  responsables: any = [];
  loading: boolean = false;
  columns = ['Accion', 'Estado', 'EvidenciaCierre', 'Responsable', 'acciones'];


  constructor(
    private OpportunityService: OpportunityService,
    public mainService: MainService,
    @Inject(MAT_DIALOG_DATA) public guid: string,
    public UsersService: ResponsableService,
    public dialogRef: MatDialogRef<EditOportunidadMejoraComponent>, // Inyección de MatDialogRef
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getResponsables();
    this.getDetailOportunity();
  }

  getDetailOportunity() {
    this.loading = true;
    this.OpportunityService.get(this.guid).subscribe({
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

  getResponsables() {
    this.loading = true;
    this.UsersService.get().subscribe({
      next: (req) => {
        this.responsables = req;
        this.loading = false;
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
        this.loading = false;
      }
    });
  }

  newAccion() {
    const dialogRef = this.dialog.open(AccionFormComponent, {
      width: '100%',
      height: '80%',
      data: this.guid,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getResponsables();
      this.getDetailOportunity();
    });
  }

  listSeguimientos(id: number) {
    const dialogRef = this.dialog.open(ListFollowsComponent, {
      width: '100%',
      height: '90%',
      data: id,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {

    });
  }

  cancel() {
    this.mainService.showToast("Operacion Cancelada")
    this.dialogRef.close(false); // Cierra el modal
  }

}
