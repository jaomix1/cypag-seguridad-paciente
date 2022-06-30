import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';
import { Combo, ComboBoolean, ComboD } from 'src/app/modelos/combos/combo';
import { ComboText } from 'src/app/modelos/combos/combo';

@Injectable({
  providedIn: 'root',
})
export class ComboService extends BaseService {
  private apiUrl: string = '/api/combos/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  //combos
  public comboSiNo: ComboBoolean[] = [
    {
      Id: true,
      Descripcion: "Sí"
    },
    {
      Id: false,
      Descripcion: "No"
    }
  ];
  public comboSexo : ComboText[] = [
    {
      Id: "Masculino",
      Descripcion: "Masculino"
    },
    {
      Id: "Femenino",
      Descripcion: "Femenino"
    }
  ];
  public comboSeveridad : ComboText[] = [
    {
      Id: "leve",
      Descripcion: "Leve"
    },
    {
      Id: "Moderado",
      Descripcion: "Moderado"
    },
    {
      Id: "Grave",
      Descripcion: "Grave"
    }
  ];

  getNovedades(): Observable<ComboD[]> {
    return this.http
      .get<ComboD[]>(this._baseUrl + this.apiUrl + "tipos-novedad")
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de novedades');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  getIdentificacion(): Observable<ComboD[]>  {
    return this.http
      .get<ComboD[]>(this._baseUrl + this.apiUrl + "tipos-id")
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de tipos de documento');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  getEmpresas(): Observable<Combo[]> {
    return this.http
      .get<Combo[]>(this._baseUrl + this.apiUrl + "empresas")
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de empresas');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  getSedes(empresa:number): Observable<Combo[]> {
    return this.http
      .get<Combo[]>(this._baseUrl + this.apiUrl + "sedes?empresa=" +empresa)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de sedes por empresa');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
