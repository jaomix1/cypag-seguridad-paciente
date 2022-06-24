import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Sede } from 'src/app/modelos/Location/sede';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SedeService extends BaseService {
  private apiUrl: string = '/api/Subsidiary/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getAll(): Observable<Sede[]> {
    return this.http
      .get<ResponseContract<Sede[]>>(this._baseUrl + this.apiUrl)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de sedees');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  get(dato: string): Observable<Sede> {
    return this.http
      .get<ResponseContract<Sede>>(this._baseUrl + this.apiUrl + dato)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de sede');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  create(data: any): Observable<Sede> {
    return this.http
      .post<ResponseContract<Sede>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('crear sede');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  edit(data: any): Observable<Sede> {
    return this.http
      .put<ResponseContract<Sede>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('editar sede');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  delete(data: string): Observable<Sede> {
    return this.http
      .delete<ResponseContract<Sede>>(this._baseUrl + this.apiUrl + data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('eliminar sede');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
