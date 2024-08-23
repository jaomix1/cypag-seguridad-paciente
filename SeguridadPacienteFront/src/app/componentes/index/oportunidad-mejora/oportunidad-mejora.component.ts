import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MainService } from 'src/app/servicios/main.service';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { BaseFormComponent } from '../../baseComponent';
import { EditOportunidadComponent } from '../edit-oportunidad/edit-oportunidad.component';
import { TablaItem, TablaDataSource } from '../demos/tabla/tabla-datasource';
import { EditOportunidadMejoraComponent } from '../crud-oportunidad-mejora/edit-oportunidad-mejora/edit-oportunidad-mejora.component';
import { OportunidadesFormComponent } from '../oportunidades-form/oportunidades-form.component';
import { AccionFormComponent } from '../accion-form/accion-form.component';

@Component({
    selector: 'app-oportunidad-mejora',
    templateUrl: './oportunidad-mejora.html',
    styleUrls: ['./oportunidad-mejora.css']
})
export class OportunidaMejoraComponent extends BaseFormComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<TablaItem>;

    displayedColumns = ['Descripcion', 'Responsable', 'Porcentaje_Mejora', 'accion'];

    datos: any = [];
    responsables: any = [];
    private masterId: string = "9620C3D4-8420-47EE-B6DC-70923A9ED0B6";
    totalObjects: number = 0;
    pageIndex: number = 0;
    pageSize: number = 5;
    maxDate: Date;


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
        this.OpportunityService.getAll(this.form.value).subscribe({
            next: (req: any) => {
                this.datos = req.data;
                this.totalObjects = req.count
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
        this.form.get('Page')?.setValue(event.pageIndex)
        this.form.get('RowsByPag')?.setValue(event.pageSize)
        this.submit();
    }

    openDetail(guid: any) {
        const dialogRef = this.dialog.open(EditOportunidadMejoraComponent, {
            width: '70%',
            height: '100%',
            data: guid,
            disableClose: false
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
            disableClose: false
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            this.submit();

        });
    }

    newMejora() {
        const dialogRef = this.dialog.open(OportunidadesFormComponent, {
            width: '100%',
            height: '100%',
            disableClose: false,
            data: this.masterId
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            this.submit();

        });
    }

    validate(nameInput: string) {
        return this.mainService.validateInput(this.form, nameInput);
    }

    check(nameInput: string) {
        return this.mainService.checkInput(this.form, nameInput);
    }


}
