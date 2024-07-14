import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NaranjoComponent } from '../investigaciones/naranjo/naranjo.component';
import { LondresComponent } from '../investigaciones/londres/londres.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectInvestigacionComponent } from '../investigaciones/select-investigacion/select-investigacion.component';
import { DialogConfirmacionComponent } from '../../dialog-confirmacion/dialog-confirmacion.component';
import { QueryService } from 'src/app/servicios/query/search.service';
import { MainService } from 'src/app/servicios/main.service';
import { DetallesService } from 'src/app/servicios/Detalles/detalles.service';
import { OportunidadesFormComponent } from '../oportunidades-form/oportunidades-form.component';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { M5Component } from '../investigaciones/m5/m5.component';
import { P5Component } from '../investigaciones/p5/p5.component';
import { BaseFormComponent } from '../../baseComponent';
import { ComboService } from 'src/app/servicios/combo/combo.service';
import { Combo } from 'src/app/modelos/combos/combo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})


export class DetallesComponent extends BaseFormComponent implements OnInit {
  Id_Detalle: any;
  private masterId: string;
  realizado: boolean = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public responsables: any[] = [];
  users: any[] = [];

  data: any;
  type: any;
  detalle: any;
  Alldata: any;
  UserCtrl = new FormControl('');
  novedades: Combo[] = [];
  @ViewChild('UserInput')
  UserInput!: ElementRef<HTMLInputElement>;

  form = new FormGroup({
    Id_Master: new FormControl("", [Validators.required]),
    Triada_Involuntario: new FormControl(null, [Validators.required]),
    Triada_Genero_Dano: new FormControl(null, [Validators.required]),
    Triada_Atencion_Salud: new FormControl(null, [Validators.required]),
    Tipo_Detalle: new FormControl(null, [Validators.required]),
    Tipo_Novedad: new FormControl(null, [Validators.required]),
    Responsables: new FormControl(null, [Validators.required]),
  });

  constructor(
    private comboService: ComboService,
    public mainService: MainService,
    public UsersService: ResponsableService,
    public DetallesService: DetallesService,
    private QueryService: QueryService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public guid: string,
    public dialogRef: MatDialogRef<DetallesComponent>,) {
    super()
    this.masterId = guid;
    this.obtenerMaster(this.masterId)
    this.loadingMain = true;
  }

  ngOnInit(): void {
    this.form.controls['Id_Master'].setValue(this.masterId);
  }

  ngAfterViewInit(): void {
    this.getResponsables();
    this.cargaNovedades();
  }

  obtenerMaster(id: string) {
    this.QueryService.get(id).subscribe({
      next: (req) => {
        this.Alldata = req;
        this.data = req.Master;
        console.log(this.data)
        if (this.Alldata.Detalle)
          this.form.controls['Tipo_Novedad'].setValue(this.Alldata.Detalle.Tipo_Novedad);
        if (req.Detalle) {
          this.realizado = true;
          this.form.disable()
          this.getDetalle();
        }
        this.loadingMain = false;
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
      }
    });
  }

  getDetalle() {
    this.DetallesService.get(this.masterId).subscribe({
      next: (req) => {
        this.form.controls['Triada_Involuntario'].setValue(req.Triada_Involuntario);
        this.form.controls['Triada_Genero_Dano'].setValue(req.Triada_Genero_Dano);
        this.form.controls['Triada_Atencion_Salud'].setValue(req.Triada_Atencion_Salud);
        this.type = req.Tipo_Detalle;
        this.form.controls['Tipo_Detalle'].setValue(req.Tipo_Detalle);
        let arr = req.Responsables.split(';');
        this.responsables = arr;
        this.Id_Detalle = req.id;
        this.detalle = req;
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
      }
    });
  }

  getResponsables() {
    this.UsersService.get().subscribe({
      next: (req: any) => {
        this.users = req;
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
      }
    });
  }

  //cerrar modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.form.controls['Id_Master'].setValue(this.masterId);
    this.form.controls['Tipo_Detalle'].setValue(this.type);

    //responsables
    let string;
    string = new String(this.responsables)
    string = string.replace(/,/g, ';');
    this.form.controls['Responsables'].setValue(string);

    if (this.form.valid) {
      this.loadingMain = true;
      this.DetallesService.create(this.form.value).subscribe({
        next: (req: any) => {

          this.mainService.showToast('Guardado Correctamente');
          this.realizado = true;
          this.form.disable();
          this.loadingMain = false;
          this.obtenerMaster(this.masterId)
        },
        error: (err: any) => {

          this.mainService.showToast(err.error, 'error');
          this.loadingMain = false;
        },
        complete: () => {
          this.loadingMain = false;
        }
      });
    } else {
      this.mainService.showToast("Por favor llenar todos los campos", 'error');
    }

  }

  delet() {
    this.dialog.open(DialogConfirmacionComponent, {
      disableClose: true,
      width: '300px',
      data: { message: '¿Estas seguro de borrar el detalle guardado previamente?' }
    })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.loadingMain = true;
          this.DetallesService.delete(this.masterId).subscribe({
            next: (req: any) => {

              this.form.reset();
              this.responsables = []
              this.type = "";
              this.mainService.showToast('Eliminado Correctamente');
              this.realizado = false;
              this.form.enable();
              this.form.controls['Tipo_Novedad'].setValue("");
              this.loadingMain = false;
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
      });
  }

  obtenerTipo(id: string) {
    if (!this.realizado) {
      this.dialog.open(DialogConfirmacionComponent, {
        disableClose: true,
        width: '300px',
        data: { message: '¿Estas seguro de escoger el tipo: ' + id + '?' }
      })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            switch (id) {
              case "Farmacovigilancia":
                this.type = "Farmacovigilancia"
                break;
              case "Gestion Clinica":
                this.type = "Gestion_Clinica"
                break;
              case "Reactivovigilancia":
                this.type = "Reactivovigilancia"
                break;
              case "Tecnovigilancia":
                this.type = "Tecnovigilancia"
                break;
              default:
                console.log('default');
            }
            this.form.controls['Tipo_Detalle'].setValue(this.type);
          }
        });
    }
  }


  pqms() {
    const data = {
      id_detalle: this.Id_Detalle,
      all_data: this.Alldata
    }
    const dialogRef = this.dialog.open(SelectInvestigacionComponent, {
      width: '80%',
      height: '50%',
      disableClose: false,
      data: data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  naranjo() {
    const data = {
      id_detalle: this.Id_Detalle,
      all_data: this.Alldata
    }
    const dialogRef = this.dialog.open(NaranjoComponent, {
      width: '100%',
      height: '100%',
      disableClose: false,
      data: data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.obtenerMaster(this.masterId)
    });
  }

  londres() {
    const data = {
      id_detalle: this.Id_Detalle,
      all_data: this.Alldata
    }
    const dialogRef = this.dialog.open(LondresComponent, {
      width: '100%',
      height: '100%',
      disableClose: false,
      data: data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.obtenerMaster(this.masterId)
    });
  }

  mejoras() {
    const dialogRef = this.dialog.open(OportunidadesFormComponent, {
      width: '100%',
      height: '100%',
      disableClose: false,
      data: this.Id_Detalle
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  m5() {
    const data = {
      id_detalle: this.Id_Detalle,
      all_data: this.Alldata
    }
    const dialogRef = this.dialog.open(M5Component, {
      width: '100%',
      height: '100%',
      disableClose: false,
      data: data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.obtenerMaster(this.masterId)
    });
  }

  p5() {
    const data = {
      id_detalle: this.Id_Detalle,
      all_data: this.Alldata
    }
    const dialogRef = this.dialog.open(P5Component, {
      width: '100%',
      height: '100%',
      disableClose: false,
      data: data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.obtenerMaster(this.masterId)
    });
  }

  cargaNovedades() {
    this.comboService.getNovedades().subscribe({
      next: (req) => {
        this.novedades = req;
      },
      error: (err: string) => {
        this.loadingMain = false;
        this.mainService.showToast(err, 'error');
      },
      complete: () => (this.loadingMain = false),
    })
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.form, nameInput);
  }

  pdf() {
    window.open("/pdf/" + this.masterId, '_blank');
  }

  downloadImage() {
    window.open(environment.apiUrl + "/v1/api/master/filedownload/" + this.masterId, '_blank');
  }
}
