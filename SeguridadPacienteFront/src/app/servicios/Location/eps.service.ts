import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Eps } from 'src/app/modelos/Location/eps';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpsService extends BaseService {
  private apiUrl: string = '/api/Eps/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getAll(): Observable<Eps[]> {
    return this.http
      .get<ResponseContract<Eps[]>>(this._baseUrl + this.apiUrl)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de epses');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  get(dato: string): Observable<Eps> {
    return this.http
      .get<ResponseContract<Eps>>(this._baseUrl + this.apiUrl + dato)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de eps');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  create(data: any): Observable<Eps> {
    return this.http
      .post<ResponseContract<Eps>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('crear eps');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  edit(data: any): Observable<Eps> {
    return this.http
      .put<ResponseContract<Eps>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('editar eps');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  delete(data: string): Observable<Eps> {
    return this.http
      .delete<ResponseContract<Eps>>(this._baseUrl + this.apiUrl + data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('eliminar eps');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
