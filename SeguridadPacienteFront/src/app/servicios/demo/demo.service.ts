import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Demo } from 'src/app/modelos/demo/demo';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemoService extends BaseService {
  private apiUrl: string = '/api/demo/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getAll(): Observable<Demo[]> {
    return this.http
      .get<Demo[]>(this._baseUrl + this.apiUrl)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de Demo');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  get(dato: string): Observable<Demo> {
    return this.http
      .get<ResponseContract<Demo>>(this._baseUrl + this.apiUrl + dato)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de Demo');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  create(data: any): Observable<Demo> {
    return this.http
      .post<ResponseContract<Demo>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('crear Demo');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  edit(data: any): Observable<Demo> {
    return this.http
      .put<ResponseContract<Demo>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('editar Demo');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  delete(data: string): Observable<Demo> {
    return this.http
      .delete<ResponseContract<Demo>>(this._baseUrl + this.apiUrl + data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('eliminar Demo');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
