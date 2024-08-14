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

@Component({
    selector: 'app-oportunidad-mejora',
    templateUrl: './oportunidad-mejora.html',
    styleUrls: ['./oportunidad-mejora.css']
})
export class OportunidaMejoraComponent extends BaseFormComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<TablaItem>;

    displayedColumns = ['responsable', 'oportunidad', 'porcentaje', 'accion'];

    datos: any = [];
    private masterId: string = "9620C3D4-8420-47EE-B6DC-70923A9ED0B6";


    constructor(
        private OpportunityService: OpportunityService,
        public mainService: MainService,
        public UsersService: ResponsableService,
        // @Inject(MAT_DIALOG_DATA) public guid: string,
        public dialog: MatDialog) {
        super();
        this.submit(this.masterId)
    }

    ngOnInit(): void {

    }

    submit(masterId: any): void {
        this.loadingMain = true;
        this.OpportunityService.getAll({ Id_Master: masterId }).subscribe({
            next: (req: any) => {
                this.datos = req;
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

    edit(guid: any) {
        const dialogRef = this.dialog.open(EditOportunidadMejoraComponent, {
            width: '600px',
            height: '250px',
            data: guid,
            disableClose: false
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            this.submit(this.masterId);
        });
    }


}
