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
  private apiUrl: string = '/api/master/registros';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getAll(data:any): Observable<any> {
    return this.http
    .post<ResponseContract<any>>(this._baseUrl + this.apiUrl, data)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Buscar todos registros');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  get(dato: string): Observable<Query> {
    return this.http
      .get<ResponseContract<Query>>(this._baseUrl + this.apiUrl + dato)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de Query');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
