import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Opportunity } from 'src/app/modelos/opportunity/opportunity';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService extends BaseService {
  private apiUrl: string = '/api/master/mejoras/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getAll(data:any): Observable<any[]> {
    return this.http
      .post<any[]>(this._baseUrl + this.apiUrl + "registros", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de Oportunidades');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  get(dato: string): Observable<any> {
    return this.http
      .get<any>(this._baseUrl + this.apiUrl + dato)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de Opportunity');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  create(data: any): Observable<any> {
    return this.http
      .post<ResponseContract<any>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('crear Opportunity');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  edit(data: any): Observable<Opportunity> {
    return this.http
      .put<ResponseContract<Opportunity>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('editar Opportunity');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  delete(data: string): Observable<Opportunity> {
    return this.http
      .delete<ResponseContract<Opportunity>>(this._baseUrl + this.apiUrl + data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('eliminar Opportunity');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
