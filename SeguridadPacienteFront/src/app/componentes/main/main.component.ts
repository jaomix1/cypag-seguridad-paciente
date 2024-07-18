import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, map, Observable, of, ReplaySubject } from 'rxjs';
import { MainService } from 'src/app/servicios/main.service';
import { BaseFormComponent } from 'src/app/componentes/baseComponent';
import { Demo } from 'src/app/modelos/demo/demo';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ComboService } from 'src/app/servicios/combo/combo.service';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Combo } from 'src/app/modelos/combos/combo';
import { FormMasterService } from 'src/app/servicios/Formulario master/form-master.service';
import { EvidenciasService } from 'src/app/servicios/imagen/evidencias.service';
import * as moment from 'moment';
import { InfoComponent } from '../info/info.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogMainComponent } from '../dialog-main/dialog-main.component';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseFormComponent implements OnInit {
  @ViewChild("fileUpload", { static: false })
  fileUpload!: ElementRef; files: any = [];

  datos: Demo = new Demo();
  imagen: any = null;

  //combos
  novedades!: Combo[];
  causas!: Combo[];
  sedes!: Combo[];
  empresas!: Combo[];
  identificaciones!: Combo[];
  servicios!: Combo[];

  //cargar daños o testigos
  hayDanos = false;
  hayTestigos = false;

  masterId: string = "";


  //autocompletar
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  testigos: any = [];

  form = new FormGroup({
    Fecha_Incidente: new FormControl('', [
      Validators.required,
    ]),
    Hora_Incidente: new FormControl('', [
      Validators.required,
    ]),
    Nombre_Quien_Reporta: new FormControl('', [
      Validators.maxLength(80),
      Validators.pattern(this.latin),
    ]),
    Cargo_Quien_Reporta: new FormControl('', [
      Validators.maxLength(40),
      Validators.pattern(this.latin),
    ]),
    Empresa: new FormControl('', [
      Validators.required
    ]),
    Sede: new FormControl('', [
      Validators.required
    ]),
    Servicio_Id: new FormControl('', [
      Validators.required
    ]),
    Otro_Servicio: new FormControl('', [
      Validators.maxLength(200),
      Validators.pattern(this.latin),
    ]),
    Nombre_Paciente: new FormControl('', [
      Validators.required,
      Validators.maxLength(80),
      Validators.pattern(this.latin),
    ]),
    Tipo_Id: new FormControl('', [
      Validators.required,
    ]),
    Numero_Id: new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.pattern(this.number),
    ]),
    Sexo: new FormControl('', [
      Validators.required
    ]),
    Edad: new FormControl('', [
      Validators.required,
      Validators.max(105),
      Validators.min(0),
    ]),
    EdadMeses: new FormControl(false, []),
    Tipo_Novedad: new FormControl('', [
      Validators.required
    ]),
    Novedad_Id: new FormControl('', [
      Validators.required
    ]),
    Preg_Que: new FormControl('', [
      Validators.required,
      Validators.maxLength(300),
      Validators.pattern(this.latinExt),
    ]),
    Preg_Como: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
      Validators.pattern(this.latinExt),
    ]),
    Preg_Hay_Testigos: new FormControl(Boolean, [
      Validators.required
    ]),
    Preg_Quien: new FormControl('', []),
    Preg_En_Atencion: new FormControl('', [
      Validators.required
    ]),
    Preg_Involuntario: new FormControl(false, [
      Validators.required
    ]),
    Preg_Genero_Dano: new FormControl(false, [
      Validators.required
    ]),
    Preg_Dano_Generado: new FormControl('', [
      Validators.maxLength(300),
      Validators.pattern(this.latin),
    ]),
    Preg_Dano_Severidad: new FormControl('', []),
    Accion_Tomada: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
      Validators.pattern(this.latin),
    ]),
    Imagen_Evidencia: new FormControl(null, []),
    Imagen_Archivo: new FormControl(null, []),
  });

  maxDate: Date;

  constructor(
    private uploadService: EvidenciasService,
    private FormularioService: FormMasterService,
    public comboService: ComboService,
    public mainService: MainService,
    public dialog: MatDialog
  ) {
    super();
    this.maxDate = new Date();
  }

  ngAfterViewInit(): void {
    this.cargaEmpresas();
    this.cargaIdentificaciones();
    this.cargaNovedades();
  }

  ngOnInit(): void { }

  submit(): void {
    this.loadingMain = true;


    if (this.form.valid) {
      this.form.disable()
      this.loadingMain = true;

      //testigos
      let string;
      string = new String(this.testigos)
      string = string.replace(/,/g, ';');
      this.form.value.Preg_Quien = string;

      //fecha
      let date = moment(this.form.value.Fecha_Incidente);
      date.locale('es')
      this.form.value.Fecha_Incidente = date.format('YYYY-MM-DD')

      this.FormularioService.create(this.form.value).subscribe({
        next: (req) => {

          this.masterId = req.Id;
          this.loadingMain = false;
          this.uploadFiles();
          this.mainService.showToast('Creado Correctamente');
          this.dialog.open(DialogMainComponent, {
            disableClose: false,
            width: '300px',
            data: {
              response: req,
              message: 'Formualario registrado exitosamente'
            }
          })
            .afterClosed()
            .subscribe((confirmado: Boolean) => {
              if (confirmado) {
              }
            });
        },
        error: (err: string) => {

          this.loadingMain = false;
          this.testigos = [];
          this.form.enable();
          this.mainService.showToast(err, 'error');
        },
        complete: () => {
          this.loadingMain = false;
          this.testigos = [];
          this.form.reset();
          this.form.enable();
        },
      });

    }
  }

  info_Novedad() {
    let data: any = {
      title: 'Información',
      message: 'Falta informacion'
    }
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '500px',
      data: data,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  info_Severidad() {
    let data: any = {
      title: 'Información',
      message: 'daño'
    }
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '500px',
      data: data,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.testigos.push(value);
    }
    event.chipInput!.clear();
  }

  remove(t: any): void {
    const index = this.testigos.indexOf(t);
    if (index >= 0) {
      this.testigos.splice(index, 1);
    }
  }

  cargaIdentificaciones() {
    this.comboService.getIdentificacion().subscribe((data: any) => {
      this.identificaciones = data;
    });
  }



  cargaNovedades() {
    this.comboService.getNovedades().subscribe((data: any) => {
      this.novedades = data;
      console.log('estas son las novedades: ', this.novedades)
      this.novedades.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion))
    });
  }

  cargaCausas(id: number) {
    console.log('el id es: ', id)
    this.comboService.getCausas(id).subscribe((data: any) => {
      console.log('el id es: ', id, 'y la resp es: ', data)
      this.causas = data;
      this.causas.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion))
    });
  }

  cargaEmpresas() {
    this.comboService.getEmpresas().subscribe((data: any) => {
      this.empresas = data;
      this.empresas.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion))
    });
  }

  loandingCargaSedes: boolean = false;
  loandingCargaServicios: boolean = false;
  cargarDatosEmpresa(empresa: any) {
    this.sede(empresa);
    this.cargaServicios(empresa);
  }

  sede(empresa: any) {
    this.loandingCargaSedes = true;
    this.comboService.getSedes(empresa).subscribe((data: any) => {
      this.sedes = data;
      this.sedes.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion))
      this.loandingCargaSedes = false;
    });
  }
  cargaServicios(empresa: any) {
    this.loandingCargaServicios = true;
    this.comboService.getServicios(empresa).subscribe((data: any) => {
      data.push({ Id: 1, Descripcion: " OTRO" })
      this.servicios = data;
      this.servicios.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion));
      this.loandingCargaServicios = false;
    });
  }

  cancelar() {
    this.form.reset();
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.form, nameInput);
  }

  viewOtroServicio(id: any) {
    if (id == 1) {
      this.form.controls['Otro_Servicio'].setValue("");
      this.form.controls['Otro_Servicio'].setValidators(Validators.required);
    } else {
      this.form.controls['Otro_Servicio'].setValue("");
      this.form.controls['Otro_Servicio'].clearValidators();
    }
  }


  validarEdad(dato: any) {
    if (dato.checked == true) {
      this.form.controls['Edad'].setValue("");
      this.form.controls['Edad'].setValidators([Validators.required, Validators.min(0), Validators.max(12)]);
    } else {
      this.form.controls['Edad'].setValue("");
      this.form.controls['Edad'].setValidators([Validators.required, Validators.min(1), Validators.max(105)]);
    }
  }

  viewTestigos(id: any) {
    if (id == true) {
      this.hayTestigos = true;
    } else {
      this.form.controls['Preg_Quien'].setValue("");
      this.testigos = [];
      this.hayTestigos = false;
    }
  }
  viewDano(id: any) {
    if (id == true) {
      this.hayDanos = true;
    } else {
      this.hayDanos = false;
      this.form.controls['Preg_Dano_Generado'].setValue("");
      this.form.controls['Preg_Dano_Severidad'].setValue("");

    }
  }

  seleccionarImagen(event: any): void {
    this.imagen = event.target.files[0] ?? null;
    if (this.imagen.type.split("/")[0] == "image") {
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.form.value.Imagen_Archivo = base64;
      });
    } else {
      this.imagen = null;
      alert("Por favor subir solo archivos: jpg, png, jpeg, svg")
    }
  }


  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event!.target!.result!.toString()));
    return result;
  }

  goLogin() {
    window.open('http://localhost:4200/login');
  }

  borrararchivos() {
    this.fileUpload.nativeElement.value = '';
    this.files = [];
  }

  cargar() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file });
      }
    };
    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.uploadFile(this.files);
  }

  uploadFile(file: any) {
    const formData = new FormData();

    for (let index = 0; index < file.length; index++) {
      formData.append('file', file[index].data);
    }

    this.uploadService.upload(formData, this.masterId).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error);
        return of(`${file} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });

    this.files = [];
  }
}


