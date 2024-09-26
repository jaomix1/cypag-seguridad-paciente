import { ActionService } from '../../../../servicios/actions/action.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { PlanDeAccionService } from 'src/app/servicios/planDeAccion/planDeAccion.service';
import { MatPaginator } from '@angular/material/paginator';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { EvidenciasService } from 'src/app/servicios/imagen/evidencias.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map, Observable, of, ReplaySubject } from 'rxjs';

@Component({
    selector: 'app-create-follow-form',
    templateUrl: './create-follow-form.component.html',
    styleUrls: ['./create-follow-form.component.css']
})
export class CreateFollowFormComponent implements OnInit {
    @ViewChild("fileUpload", { static: false })
    fileUpload!: ElementRef; files: any = [];
    @ViewChild(MatTable) table!: MatTable<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource: any;
    // actions: any = [];
    responsables: any = [];
    maxDate: Date = new Date();
    imagen: any = null;
    seguimientoId: number = 0;

    constructor(
        public mainService: MainService,
        private uploadService: EvidenciasService,
        public ActionService: ActionService,
        public UsersService: ResponsableService,
        @Inject(MAT_DIALOG_DATA) public data: string,
        public dialogRef: MatDialogRef<CreateFollowFormComponent>,) {
    }

    form = new FormGroup({
        Seguimiento: new FormControl(null, [Validators.maxLength(500), Validators.required]),
        EsCierre: new FormControl(false, [Validators.required]),
        TieneEvidencia: new FormControl(false, [Validators.required]),
    });


    ngOnInit(): void {
        // this.getResponsables();
        // this.getDetailOportunity();
    }

    submit() {
        this.seguimientoId = 0;
        if (this.form.value.EsCierre && this.files.length == 0) {
            this.mainService.showToast("Es necesario adjuntar evidencia", 'error');
            return;
        }

        if (this.form.valid) {
            this.form.value.TieneEvidencia = this.files.length > 0;
            this.ActionService.createFollow(this.data, this.form.value).subscribe({
                next: (req: any) => {
                    this.seguimientoId = req.seguimientoId;
                    if (this.files.length > 0) {
                        this.uploadFiles();
                    }
                    this.mainService.showToast('Accion creada con exito', 'success');
                    this.dialogRef.close()
                },
                error: (err: string) => {
                    this.mainService.showToast(err, 'error');
                },
            });
        }
    }

    validate(nameInput: string) {
        return this.mainService.validateInput(this.form, nameInput);
    }

    check(nameInput: string) {
        return this.mainService.checkInput(this.form, nameInput);
    }


    borrararchivos() {
        this.fileUpload.nativeElement.value = '';
        this.files = [];
    }

    cargar() {
        const fileUpload = this.fileUpload.nativeElement;
        fileUpload.onchange = () => {
            for (let index = 0; index < fileUpload.files.length; index++) {
                const file = fileUpload.files[index];
                this.files.push({ data: file });
            }
        };
        fileUpload.click();
    }


    private uploadFiles() {
        this.fileUpload.nativeElement.value = '';
        this.uploadFile(this.files);
    }

    uploadFile(file: any) {
        const formData = new FormData();

        for (let index = 0; index < file.length; index++) {
            formData.append('file', file[index].data);
        }

        this.uploadService.uploadEvidenciaSeguimiento(formData, this.seguimientoId).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        break;
                    case HttpEventType.Response:
                        return event;
                }
            }),
            catchError((error: HttpErrorResponse) => {
                console.log("error", error);
                return of(`${file} upload failed.`);
            })).subscribe((event: any) => {
                if (typeof (event) === 'object') {
                    console.log(event.body);
                }
            });

        this.files = [];
    }
}
