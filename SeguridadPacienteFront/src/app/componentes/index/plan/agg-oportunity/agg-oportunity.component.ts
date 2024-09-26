import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MainService } from 'src/app/servicios/main.service';
import { PlanDeAccionService } from 'src/app/servicios/planDeAccion/planDeAccion.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { BaseFormComponent } from '../../../baseComponent';
import { TablaItem } from '../../demos/tabla/tabla-datasource';
import { QueryService } from 'src/app/servicios/query/search.service';

@Component({
    selector: 'app-agg-oportunity',
    templateUrl: './agg-oportunity.component.html',
    styleUrls: ['./agg-oportunity.component.css']
})
export class AggOportunityComponent extends BaseFormComponent implements OnInit {

    // @ViewChild(MatPaginator) paginator!: MatPaginator;
    // @ViewChild(MatSort) sort!: MatSort;
    // @ViewChild(MatTable) table!: MatTable<TablaItem>;

    displayedColumns = ['Codigo', 'Servicio', 'Fecha Incidente', 'Tipo_Novedad_2', 'Causa_2', 'accion'];
    // displayedColumns2 = ['index', 'Descripcion', 'Responsable', 'Porcentaje_Mejora', 'accion'];
    datos: any = [];
    datos2: any = [];
    // responsables: any = [];
    totalObjects: number = 0;
    pageIndex: number = 0;
    pageSize: number = 5;
    maxDate: Date;
    // oportunidad: any = [];
    planId: string = '';
    porcentajeMejora: number = 0;

    getStartDate(): Date {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 30);
        return currentDate;
    }

    form = new FormGroup({
        Page: new FormControl(0),
        RowsByPag: new FormControl(5),
        Start_Date: new FormControl(this.getStartDate()),
        End_Date: new FormControl(new Date()),
        //Descripcion: new FormControl(null),
        //Responsable: new FormControl(null),
    });

    constructor(
        private query: QueryService,
        private PlanDeAccionService: PlanDeAccionService,
        public mainService: MainService,
        public UsersService: ResponsableService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog) {
        super();
        this.maxDate = new Date();
        this.planId = data.guid;
        this.porcentajeMejora = data.porcentajeMejora;
    }

    ngOnInit(): void {
        this.getOpportunitiesById();
        this.getAllQuejas();
        //     this.getResponsables();

    }

    getAllQuejas(): void {
        this.loadingMain = true;
        this.query.getAllRequierePlanAccion(this.form.value).subscribe({
            next: (req: any) => {
                this.totalObjects = req.count
                this.datos = req.data;
                this.loadingMain = false;
                if (this.datos.length === 0) {
                    this.mainService.showToast("No se han encontrado reportes con plan de accion requerido", 'error');
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


    getOpportunitiesById() {
        this.loading = true;
        this.PlanDeAccionService.getQuejasAsociadasByOportunidadId(this.planId).subscribe({
            next: (res: any) => {
                console.log(res);
                this.datos2 = res;
                this.loading = false;
            },
            error: (err: string) => {
                this.mainService.showToast(err, 'error');
                this.loading = false;
            }
        });
    }

    // getResponsables() {
    //     this.loading = true;
    //     this.UsersService.get().subscribe({
    //         next: (req) => {
    //             this.responsables = req;
    //             console.log(this.responsables);
    //             this.loading = false;
    //         },
    //         error: (err: string) => {
    //             this.mainService.showToast(err, 'error');
    //             this.loading = false;
    //         }
    //     });
    // }

    submit() {

        this.PlanDeAccionService.addQuejasByOportunidadId(this.planId, this.datos2).subscribe((res: any) => {
            this.getAllQuejas();
            this.mainService.showToast('Agregadas correctamente');
        }, error => console.log(error))
    }

    addQuejaToTable(object: any) {
        this.loanding2 = true;
        if (this.datos2.filter((oportunity: any) => oportunity.Id === object.Id).length === 0) {
            this.datos2.push(object);
        } else {
            this.mainService.showToast('Esta queja ya habia sido agregada', 'error');
        }
        this.loanding2 = false;
    }

    elimiarFromTable(id: number) {
        //     this.loanding2 = true;
        //     this.datos2.splice(id, 1)
        //     this.loanding2 = false;
    }


    pageEvent(event: any) {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.form.get('Page')?.setValue(this.pageIndex)
        this.form.get('RowsByPag')?.setValue(this.pageSize)
        this.getAllQuejas();
    }

    cancelar() {
        //     this.pageIndex = 0
        //     this.form.get('Descripcion')?.setValue(null)
        //     this.form.get('Responsable')?.setValue(null)
        //     this.form.get('Start_Date')?.setValue(null)
        //     this.form.get('End_Date')?.setValue(null)
        //     this.form.get('Page')?.setValue(this.pageIndex)
        //     this.form.get('RowsByPag')?.setValue(this.pageSize)
        //     this.getAllQuejas();
    }

    validate(nameInput: string) {
        return this.mainService.validateInput(this.form, nameInput);
    }

    check(nameInput: string) {
        return this.mainService.checkInput(this.form, nameInput);
    }


}
