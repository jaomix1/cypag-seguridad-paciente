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
  private apiUrl: string = '/api/oportunidadesMejora/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getAll(data: any): Observable<any[]> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "getAll", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de Oportunidades');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  get(id: any): Observable<any> {
    return this.http
      .get<any>(this._baseUrl + this.apiUrl + "getOne/" + id)
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
      .post<any>(this._baseUrl + this.apiUrl + "create", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('crear Opportunity');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  // edit(data: any): Observable<any> {
  //   return this.http
  //     .post<any>(this._baseUrl + this.apiUrl + "actualizar", data)
  //     .pipe(
  //       map((response) => response),
  //       tap((a) => {
  //         this.logs('Actualizar Oportunidad');
  //         this.logs(a);
  //       }),
  //       catchError(this.errorMgmt)
  //     );
  // }

  addOportunitiesById(id: string, data: any) {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "AsignarAMaster/" + id, data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('Oportunidades agregadas correctamente');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  getOpportunitiesCurrent(id: any): Observable<any> {
    return this.http
      .get<any>(this._baseUrl + this.apiUrl + "byMaster/" + id)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de Opportunities');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

}
