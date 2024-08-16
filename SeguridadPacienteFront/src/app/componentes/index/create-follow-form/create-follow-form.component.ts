import { ActionService } from './../../../servicios/actions/action.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import { MatPaginator } from '@angular/material/paginator';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
    selector: 'app-create-follow-form',
    templateUrl: './create-follow-form.component.html',
    styleUrls: ['./create-follow-form.component.css']
})
export class CreateFollowFormComponent implements OnInit {
    @ViewChild(MatTable) table!: MatTable<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource: any;
    // actions: any = [];
    responsables: any = [];
    maxDate: Date = new Date();


    constructor(
        public mainService: MainService,
        public ActionService: ActionService,
        public UsersService: ResponsableService,
        @Inject(MAT_DIALOG_DATA) public data: string,
        public dialogRef: MatDialogRef<CreateFollowFormComponent>,) {
    }

    form = new FormGroup({
        Seguimiento: new FormControl(null, [Validators.maxLength(500), Validators.required]),
        UsuarioCreacionId: new FormControl(null, [Validators.required]),
        FechaCreacion: new FormControl(this.maxDate),
    });


    ngOnInit(): void {
        this.getResponsables();
        // this.getDetailOportunity();
    }

    getResponsables() {
        this.UsersService.get().subscribe({
            next: (req) => {
                this.responsables = req;
            },
            error: (err: string) => {
                this.mainService.showToast(err, 'error');
            }
        });
    }

    submit() {
        if (this.form.valid) {
            this.ActionService.create(this.data, this.form.value).subscribe({
                next: (req: any) => {
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

    // eliminar(codigo: any) {
    //     this.actions = this.actions.filter((item: any) => item.Codigo_Externo !== codigo)

    // }
}
