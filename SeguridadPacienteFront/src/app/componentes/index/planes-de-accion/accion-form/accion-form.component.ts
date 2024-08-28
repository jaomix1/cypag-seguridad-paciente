import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
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
    maxDate: Date = new Date();

    //url: string = oportunidadesMejora/create/plan/2F79A711-3BC5-4935-A9AA-D3B6324839E5;

    displayedColumns = ['Descripcion', 'Accion'];

    constructor(
        public mainService: MainService,
        public OpportunityService: OpportunityService,
        public ActionService: ActionService,
        public UsersService: ResponsableService,
        @Inject(MAT_DIALOG_DATA) public data: string,
        public dialogRef: MatDialogRef<AccionFormComponent>,) {
        this.idOportunity = data;
    }

    form = new FormGroup({
        Accion: new FormControl(null, [Validators.maxLength(500), Validators.required]),
        Responsable: new FormControl(null, [Validators.required]),
        FechaInicio: new FormControl(null, [Validators.required]),
        FechaFin: new FormControl(null, [Validators.required]),
        EvidenciaCierre: new FormControl(null, [Validators.required]),
        PorcentajeMejora: new FormControl(0),
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
            this.ActionService.create(this.idOportunity, this.form.value).subscribe({
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


    // sending: boolean = false;
    // agregar() {
    //     this.sending = true;
    //     if (this.actions.length >= 1) {
    //         if (this.actions.find((mejora: any) => mejora.Codigo_Externo == this.form.value.Code)) {
    //             this.mainService.showToast("El codigo externo debe ser un valor unico", 'error')
    //             this.form.reset();
    //         }
    //     }
    //     if (this.form.valid) {
    //         let object = {
    //             // Id_Master: this.masterId,
    //             Codigo_Externo: this.form.value.Code,
    //             Descripcion: this.form.value.Cual,
    //             Responsable: this.form.value.Responsables
    //         }

    //         this.actions.push(object);
    //         if (this.actions.length > 1) {
    //             this.table.renderRows();
    //         }
    //         this.form.reset();
    //     }
    //     this.sending = false;
    // }

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
