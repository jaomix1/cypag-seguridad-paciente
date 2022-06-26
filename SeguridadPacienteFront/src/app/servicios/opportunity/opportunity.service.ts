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
  private apiUrl: string = '/api/opportunity/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getAll(): Observable<Opportunity[]> {
    return this.http
      .get<ResponseContract<Opportunity[]>>(this._baseUrl + this.apiUrl)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de Opportunity');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  get(dato: string): Observable<Opportunity> {
    return this.http
      .get<ResponseContract<Opportunity>>(this._baseUrl + this.apiUrl + dato)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de Opportunity');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  create(data: any): Observable<Opportunity> {
    return this.http
      .post<ResponseContract<Opportunity>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
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
