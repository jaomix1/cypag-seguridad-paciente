import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MainService } from 'src/app/servicios/main.service';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { BaseFormComponent } from '../../../baseComponent';
import { TablaItem } from '../../demos/tabla/tabla-datasource';

@Component({
    selector: 'app-agg-oportunity',
    templateUrl: './agg-oportunity.component.html',
    styleUrls: ['./agg-oportunity.component.css']
})
export class AggOportunityComponent extends BaseFormComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<TablaItem>;

    displayedColumns = ['Descripcion', 'Responsable', 'Fecha', 'Porcentaje_Mejora', 'accion'];
    displayedColumns2 = ['index', 'Descripcion', 'Responsable', 'Porcentaje_Mejora', 'accion'];
    datos: any = [];
    datos2: any = [];
    responsables: any = [];
    totalObjects: number = 0;
    pageIndex: number = 0;
    pageSize: number = 5;
    maxDate: Date;
    oportunidad: any = [];

    form = new FormGroup({
        Page: new FormControl(0),
        RowsByPag: new FormControl(5),
        Start_Date: new FormControl(null),
        End_Date: new FormControl(null),
        Descripcion: new FormControl(null),
        Responsable: new FormControl(null),
    });

    constructor(
        private OpportunityService: OpportunityService,
        public mainService: MainService,
        public UsersService: ResponsableService,
        @Inject(MAT_DIALOG_DATA) public id: string,
        public dialog: MatDialog) {
        super();
        this.maxDate = new Date();
    }

    ngOnInit(): void {
        this.getAllOportunity();
        this.getOpportunitiesById();
        this.getResponsables();

    }

    getAllOportunity(): void {
        this.loadingMain = true;
        this.OpportunityService.getAll(this.form.value).subscribe({
            next: (req: any) => {
                this.totalObjects = req.count
                this.datos = req.data;
                console.log(this.datos);
                this.loadingMain = false;
                if (this.datos.length < 1) {
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


    getOpportunitiesById() {
        this.loading = true;
        this.OpportunityService.getOpportunitiesCurrent(this.id).subscribe({
            next: (res: any) => {
                console.log(res);
                this.datos2 = res.news;
                this.loading = false;
            },
            error: (err: string) => {
                this.mainService.showToast(err, 'error');
                this.loading = false;
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

    submit() {
        this.OpportunityService.addOportunitiesById(this.id, this.datos2).subscribe((res: any) => {
            this.getAllOportunity();
            this.mainService.showToast('Agregadas correctamente');
        }, error => console.log(error))
    }

    addOportunityToTable(object: any) {
        this.loanding2 = true;
        console.log(object);
        if (this.datos2.filter((oportunity: any) => oportunity.Id === object.Id).length === 0) {
            this.datos2.push(object);
        } else {
            this.mainService.showToast('Esta oportunidad ya habia sido agregada', 'error');
        }
        this.loanding2 = false;
    }

    elimiarFromTable(id: number) {
        this.loanding2 = true;
        this.datos2.splice(id, 1)
        this.loanding2 = false;
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
        this.getAllOportunity();
    }

    validate(nameInput: string) {
        return this.mainService.validateInput(this.form, nameInput);
    }

    check(nameInput: string) {
        return this.mainService.checkInput(this.form, nameInput);
    }


}
