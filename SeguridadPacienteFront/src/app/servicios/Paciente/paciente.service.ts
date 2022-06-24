import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Paciente } from 'src/app/modelos/Paciente/paciente';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacienteService extends BaseService {
  private apiUrl: string = '/api/Patient/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getAll(): Observable<Paciente[]> {
    return this.http
      .get<ResponseContract<Paciente[]>>(this._baseUrl + this.apiUrl)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de pacientees');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  get(dato: string): Observable<Paciente> {
    return this.http
      .get<ResponseContract<Paciente>>(this._baseUrl + this.apiUrl + dato)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de paciente');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  create(data: any): Observable<Paciente> {
    return this.http
      .post<ResponseContract<Paciente>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('crear paciente');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  edit(data: any): Observable<Paciente> {
    return this.http
      .put<ResponseContract<Paciente>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('editar paciente');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  delete(data: string): Observable<Paciente> {
    return this.http
      .delete<ResponseContract<Paciente>>(this._baseUrl + this.apiUrl + data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('eliminar paciente');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
