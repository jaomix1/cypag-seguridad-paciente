import { ActionService } from '../../../../servicios/actions/action.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MainService } from 'src/app/servicios/main.service';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { CreateFollowFormComponent } from '../create-follow-form/create-follow-form.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-list-follows',
    templateUrl: './list-follows.component.html',
    styleUrls: ['./list-follows.component.css']
})
export class ListFollowsComponent implements OnInit {

    datos: any = [];
    percent: number = 0;
    descripcion: string = '';
    responsable: string = '';
    responsables: any = [];
    loading: boolean = false;
    porcentajeMejora: number = 0;
    columns = ['Id', 'Descripcion_Seguimiento', 'Usuario', 'Fecha', 'Evidencia', 'Descargar'];


    constructor(
        private ActionService: ActionService,
        public mainService: MainService,
        @Inject(MAT_DIALOG_DATA) public idAccion: string,
        public UsersService: ResponsableService,
        public dialogRef: MatDialogRef<ListFollowsComponent>, // Inyección de MatDialogRef
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getFollows();
    }

    getFollows() {
        this.porcentajeMejora = 0;
        this.loading = true;
        this.ActionService.getOne(this.idAccion).subscribe({
            next: (req: any) => {
                this.porcentajeMejora = req.PorcentajeMejora;
                this.datos = req.Seguimientos;
                console.log('esto son los seguiminetos: ', this.datos);
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


    newFollow() {
        const dialogRef = this.dialog.open(CreateFollowFormComponent, {
            width: '100%',
            height: '80%',
            data: this.idAccion,
            disableClose: true

        });
        dialogRef.afterClosed().subscribe((result: any) => {
            this.getFollows();
            //   this.getResponsables();
            //   this.getDetailOportunity();
        });
    }

    cancel() {
        this.mainService.showToast("Operacion Cancelada")
        this.dialogRef.close(false); // Cierra el modal
    }

    downloadImage(seguimientoId: number) {
        window.open(environment.apiUrl + "/v1/api/master/filedownloadSeguimiento/" + seguimientoId, '_blank');
    }
}
