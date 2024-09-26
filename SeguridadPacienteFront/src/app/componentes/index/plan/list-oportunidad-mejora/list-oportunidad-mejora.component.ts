import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MainService } from 'src/app/servicios/main.service';
import { PlanDeAccionService } from 'src/app/servicios/planDeAccion/planDeAccion.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { BaseFormComponent } from '../../../baseComponent';
import { TablaItem, TablaDataSource } from '../../demos/tabla/tabla-datasource';
import { ListPlanAccionComponent } from '../../accion/list-plan-accion/list-plan-accion.component';
import { CreateOportunidadesFormComponent } from '../create-oportunidades-form/create-oportunidades-form.component';
import { AccionFormComponent } from '../../accion/accion-form/accion-form.component';
import { AggOportunityComponent } from '../agg-oportunity/agg-oportunity.component';

@Component({
    selector: 'app-list-oportunidad-mejora',
    templateUrl: './list-oportunidad-mejora.html',
    styleUrls: ['./list-oportunidad-mejora.css']
})
export class ListOportunidaMejoraComponent extends BaseFormComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<TablaItem>;

    displayedColumns = ['Codigo', 'Descripcion', 'Responsable', 'Fecha', 'Porcentaje_Mejora', 'Fecha_Vencimiento', 'accion'];

    datos: any = [];
    responsables: any = [];
    private masterId: string = "9620C3D4-8420-47EE-B6DC-70923A9ED0B6";
    totalObjects: number = 0;
    pageIndex: number = 0;
    pageSize: number = 5;
    maxDate: Date;


    form = new FormGroup({
        Page: new FormControl(this.pageIndex),
        RowsByPag: new FormControl(this.pageSize),
        Start_Date: new FormControl(null),
        End_Date: new FormControl(null),
        Descripcion: new FormControl(null),
        Responsable: new FormControl(null),
    });



    constructor(
        private PlanDeAccionService: PlanDeAccionService,
        public mainService: MainService,
        public UsersService: ResponsableService,
        // @Inject(MAT_DIALOG_DATA) public guid: string,
        public dialog: MatDialog) {
        super();
        this.submit();
        this.maxDate = new Date();
    }

    ngOnInit(): void {
        this.getResponsables();

    }

    submit(): void {
        this.loadingMain = true;
        this.PlanDeAccionService.getAll(this.form.value).subscribe({
            next: (req: any) => {
                this.datos = req.data;
                this.totalObjects = req.count
                this.loadingMain = false;
                if (this.datos.length === 0) {
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

    getResponsables() {
        this.loading = true;
        this.UsersService.get().subscribe({
            next: (req) => {
                this.responsables = req;
                console.log(this.responsables);
                this.loading = false;
            },
            error: (err: string) => {
                this.mainService.showToast(err, 'error');
                this.loading = false;
            }
        });
    }

    pageEvent(event: any) {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.form.get('Page')?.setValue(this.pageIndex)
        this.form.get('RowsByPag')?.setValue(this.pageSize)
        this.submit();
    }

    cancelar() {
        this.pageIndex = 0
        this.form.get('Descripcion')?.setValue(null)
        this.form.get('Responsable')?.setValue(null)
        this.form.get('Start_Date')?.setValue(null)
        this.form.get('End_Date')?.setValue(null)
        this.form.get('Page')?.setValue(this.pageIndex)
        this.form.get('RowsByPag')?.setValue(this.pageSize)
        this.submit();
    }

    openDetail(guid: any) {
        const dialogRef = this.dialog.open(ListPlanAccionComponent, {
            width: '70%',
            height: '100%',
            data: guid,
            disableClose: true

        });
        dialogRef.afterClosed().subscribe((result: any) => {
            this.submit();

        });
    }

    aggAccion(guid: any) {
        const dialogRef = this.dialog.open(AccionFormComponent, {
            width: '100%',
            height: '100%',
            data: guid,
            disableClose: true

        });
        dialogRef.afterClosed().subscribe((result: any) => {
            this.submit();

        });
    }

    newMejora() {
        const dialogRef = this.dialog.open(CreateOportunidadesFormComponent, {
            width: '100%',
            height: '100%',
            disableClose: true
            ,
            data: this.masterId
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            this.submit();

        });
    }

    asociar(guid: any, porcentajeMejora: number) {
        const dialogRef = this.dialog.open(AggOportunityComponent, {
            width: '100%',
            height: '100%',
            disableClose: true
            ,
            data: { guid, porcentajeMejora }
        });
        dialogRef.afterClosed().subscribe((result: any) => {
        });
    }

    validate(nameInput: string) {
        return this.mainService.validateInput(this.form, nameInput);
    }

    check(nameInput: string) {
        return this.mainService.checkInput(this.form, nameInput);
    }


}
