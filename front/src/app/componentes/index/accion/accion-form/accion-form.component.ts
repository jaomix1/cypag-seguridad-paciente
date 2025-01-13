import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { PlanDeAccionService } from 'src/app/servicios/planDeAccion/planDeAccion.service';
import { MatPaginator } from '@angular/material/paginator';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActionService } from 'src/app/servicios/actions/action.service';

@Component({
    selector: 'app-accion-form',
    templateUrl: './accion-form.component.html',
    styleUrls: ['./accion-form.component.css']
})
export class AccionFormComponent implements OnInit {
    @ViewChild(MatTable) table!: MatTable<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource: any;
    public idOportunity: string;
    actions: any = [];
    responsables: any = [];
    minDate: Date = new Date();
    loading: boolean = false;

    //url: string = oportunidadesMejora/create/plan/2F79A711-3BC5-4935-A9AA-D3B6324839E5;

    displayedColumns = ['Descripcion', 'Accion'];

    constructor(
        public mainService: MainService,
        public PlanDeAccionService: PlanDeAccionService,
        public ActionService: ActionService,
        public UsersService: ResponsableService,
        @Inject(MAT_DIALOG_DATA) public data: string,
        public dialogRef: MatDialogRef<AccionFormComponent>,) {
        this.idOportunity = data;
        this.minDate = new Date();
    }

    form = new FormGroup({
        Descripcion: new FormControl(null, [Validators.maxLength(500), Validators.required]),
        Responsable: new FormControl(null, [Validators.required]),
        FechaVencimiento: new FormControl(null, [Validators.required]),
        // FechaFin: new FormControl(null, [Validators.required]),
        //EvidenciaCierre: new FormControl(null, [Validators.required]),
        //PorcentajeMejora: new FormControl(0),
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
            this.loading = true;
            this.ActionService.create(this.idOportunity, this.form.value).subscribe({
                next: (req: any) => {
                    this.mainService.showToast('Accion creada con exito', 'success');
                    this.loading = false;
                    this.dialogRef.close()
                },
                error: (err: string) => {
                    this.mainService.showToast(err, 'error');
                    this.loading = false;
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

    eliminar(codigo: any) {
        this.actions = this.actions.filter((item: any) => item.Codigo_Externo !== codigo)

    }
}
