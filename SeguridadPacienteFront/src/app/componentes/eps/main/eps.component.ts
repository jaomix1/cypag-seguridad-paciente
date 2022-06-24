import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NbSortDirection,
  NbSortRequest,
  NbToastrService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
  NbWindowService,
} from '@nebular/theme';
import { Eps } from 'src/app/modelos/Location/eps';
import { BaseService } from 'src/app/servicios/baseService';
import { EpsService } from 'src/app/servicios/Location/eps.service';
import { MainService } from 'src/app/servicios/main.service';
import { BaseFormComponent } from '../../baseComponent';
import { EliminarComponent } from '../../comunes/eliminar/eliminar.component';
import { EpsCrearComponent } from '../crear/epsCrear.component';
import { EpsEditarComponent } from '../editar/epsEditar.component';
@Component({
  selector: 'app-eps',
  templateUrl: './eps.component.html',
  styleUrls: ['./eps.component.scss'],
})
export class EpsComponent extends BaseFormComponent implements OnInit {
  allColumns = ['id', 'descripcion', 'acciones'];
  dataSource: NbTreeGridDataSource<any>;
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private myService: EpsService,
    private dialogService: NbWindowService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,
    private mainService: MainService
  ) {
    super();
    this.dataSource = this.dataSourceBuilder.create([]);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 10;
    const nextColumnStep = 10;
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loadingMain = true;
    this.dataSource = this.dataSourceBuilder.create([]);

    this.myService.getAll().subscribe({
      next: (req) => {
        this.loadingMain = false;

        let table: any[] = [];

        req.map((resp) => {
          table.push({
            data: resp,
          });
        });

        this.dataSource = this.dataSourceBuilder.create(table);
      },
      error: (err: string) => {
        this.loadingMain = false;
        this.mainService.showToast(err, 'error');
      },
      complete: () => (this.loadingMain = false),
    });
  }

  create() {
    const windowRef = this.dialogService.open(EpsCrearComponent, {
      title: 'Crear',
    });
    windowRef.onClose.subscribe((result) => {
      if (result.status) {
        this.load();
      }
    });
  }

  edit(dato: string) {
    const windowRef = this.dialogService.open(EpsEditarComponent, {
      title: 'Editar',
      context: { dato },
    });
    windowRef.onClose.subscribe((result) => {
      if (result.status) {
        this.load();
      }
    });
  }

  delete(data: string) {
    const windowRef = this.dialogService.open(EliminarComponent, {
      title: 'Eliminar',
      closeOnEsc: true,
    });
    windowRef.onClose.subscribe((result) => {
      if (result) {
        this.loadingMain = true;
        this.myService.delete(data).subscribe({
          next: (req) => {
            this.loadingMain = false;
            this.mainService.showToast('Eliminado Correctamente');
            this.load();
          },
          error: (err: string) => {
            this.loadingMain = false;
            this.mainService.showToast(err, 'error');
          },
          complete: () => (this.loadingMain = false),
        });
      }
    });
  }
}
