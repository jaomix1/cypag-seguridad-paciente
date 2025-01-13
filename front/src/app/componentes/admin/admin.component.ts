import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BaseFormComponent } from '../baseComponent';
import { CrearComponent } from '../admin/crear-usuario/crear.component';
import { EditarComponent } from '../admin/editar-usuario/editar.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from 'src/app/servicios/main.service';
import { Usuario } from 'src/app/modelos/user';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { MenuService } from 'src/app/servicios/usuarios/menu.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseFormComponent implements OnInit {

  usuarios: Usuario[] = [];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private us: UsuarioService,
    private m: MenuService,
    public dialog: MatDialog,
    public mainService: MainService,
  ) {
    super();
    this.m.titulo = "Administrar Usuarios"

  }

  ngOnInit(): void {
    this.consultarUsuarios();
  }

  consultarUsuarios() {
    this.loanding = true;
    this.us.consultarUsuarios()
      .subscribe((req: any) => {
        this.usuarios = req;
        this.loanding = false;

        this.dataSource = new MatTableDataSource(req);
        this.dataSource.paginator = this.paginator;

      }, (error: string) => {
        this.loanding = false;
        this.mainService.showToast(error, 'error');
      }
      )

  }

  applyFilter(filterValue: any | null) {
    let data = filterValue.value;
    data = data.trim();
    data = data.toLowerCase();
    this.dataSource.filter = data;
  }

  editar(guid: string) {
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '400px',
      data: guid
    });

    dialogRef.afterClosed().subscribe((result: Usuario) => {
      if (result != null) {
        this.consultarUsuarios();
        //const i = this.usuarios.findIndex(_item => _item.guid === guid);
        //this.usuarios[i] = result;
        this.table.renderRows();
      }
    });
  }

  bloquear(guid: string) {
    this.us.bloquearUsuario(guid)
      .subscribe((req: any) => {
        this.loanding = false;
        this.consultarUsuarios();
        this.table.renderRows();
      }, (error: string) => {
        this.loanding = false;
        this.mainService.showToast(error, 'error');
      }
      )

  }

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearComponent, {
      width: '400px',
      data: { correo: '', guid: '', usuario: '', bloquedo: '', }
    });

    dialogRef.afterClosed().subscribe((result: Usuario) => {
      if (result != null) {
        this.consultarUsuarios();
        //this.usuarios.push(result);
        this.table.renderRows();
      }
    });
  }
}
