import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MainService } from 'src/app/servicios/main.service';
import { PlanDeAccionService } from 'src/app/servicios/planDeAccion/planDeAccion.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { BaseFormComponent } from '../../../baseComponent';
import { TablaItem } from '../../demos/tabla/tabla-datasource';
import { QueryService } from 'src/app/servicios/query/search.service';
import { Combo } from 'src/app/modelos/combos/combo';
import { ComboService } from 'src/app/servicios/combo/combo.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
    selector: 'app-agg-oportunity',
    templateUrl: './agg-oportunity.component.html',
    styleUrls: ['./agg-oportunity.component.css']
})
export class AggOportunityComponent extends BaseFormComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('empTbSort') sort!: MatSort;

    sedes: Combo[] = [];
    empresas: Combo[] = [];

    displayedColumns = ['Codigo', 'Servicio', 'Fecha Incidente', 'Tipo_Novedad_2', 'Causa_2', 'accion'];
    datos = new MatTableDataSource();;
    datos2: any = [];
    totalObjects: number = 0;
    pageIndex: number = 0;
    pageSize: number = 5;
    maxDate: Date;
    planId: string = '';
    porcentajeMejora: number = 0;

    getStartDate(): Date {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 30);
        return currentDate;
    }

    form = new FormGroup({
        Start_Date: new FormControl(this.getStartDate(), [Validators.required]),
        End_Date: new FormControl(new Date(), [Validators.required]),
        Empresa: new FormControl(null, [Validators.required]),
        Sede: new FormControl(null, [Validators.required]),
        //Descripcion: new FormControl(null),
        //Responsable: new FormControl(null),
    });

    constructor(
        private query: QueryService,
        private PlanDeAccionService: PlanDeAccionService,
        public mainService: MainService,
        public UsersService: ResponsableService,
        private comboService: ComboService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private _liveAnnouncer: LiveAnnouncer) {
        super();
        this.maxDate = new Date();
        this.planId = data.guid;
        this.porcentajeMejora = data.porcentajeMejora;
    }

    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    ngOnInit(): void {
        this.cargaEmpresas();
        this.getOpportunitiesById();
    }

    getAllQuejas(): void {
        if (this.form.valid) {
            this.loadingMain = true;
            this.query.getAllRequierePlanAccion(this.form.value).subscribe({
                next: (req: any) => {
                    this.totalObjects = req.count
                    this.datos.data = req.data;
                    this.loadingMain = false;
                    setTimeout(() => {
                        this.sort.disableClear = true;
                        this.datos.paginator = this.paginator;
                        this.datos.sort = this.sort;
                    })
                    if (this.datos.data.length === 0) {
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

    cargaEmpresas() {
        this.comboService.getEmpresas().subscribe({
            next: (req) => {
                this.empresas = req;
            },
            error: (err: string) => {
                this.loadingMain = false;
                this.mainService.showToast(err, 'error');
            },
            complete: () => (this.loadingMain = false),
        })
    }

    cargaSedes(empresa: any) {
        this.comboService.getSedes(empresa).subscribe({
            next: (req) => {
                this.sedes = req;
                this.form.patchValue({ Sede: null });
            },
            error: (err: string) => {
                this.loadingMain = false;
                this.mainService.showToast(err, 'error');
            },
            complete: () => (this.loadingMain = false),
        })
    }

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

    pageEvent(event: any) {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.form.get('Page')?.setValue(this.pageIndex)
        this.form.get('RowsByPag')?.setValue(this.pageSize)
        this.getAllQuejas();
    }

    cancelar() {
        this.form.get('Page')?.setValue(0);
        this.form.get('RowsByPag')?.setValue(5);
        this.form.get('Start_Date')?.setValue(this.getStartDate());
        this.form.get('End_Date')?.setValue(new Date());
        this.form.get('Empresa')?.setValue(null);
        this.form.get('Sede')?.setValue(null);
    }

    validate(nameInput: string) {
        return this.mainService.validateInput(this.form, nameInput);
    }

    check(nameInput: string) {
        return this.mainService.checkInput(this.form, nameInput);
    }


}
