import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Query } from 'src/app/modelos/query/query';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryService extends BaseService {
  private apiUrl: string = '/api/master/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getAll(data: any): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "registrosV2", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('Buscar todos registros');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }



  getAllRequierePlan(data: any): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "registros", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('Buscar todos registros que requieren plan');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  get(id: string): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "det-inv", { Id_Master: id })
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de detalle');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
