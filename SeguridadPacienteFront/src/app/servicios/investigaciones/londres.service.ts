import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Query } from 'src/app/modelos/query/query';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LondresService extends BaseService {
  private apiUrl: string = '/api/investigaciones/londres';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  send(data: any): Observable<any> {
    return this.http
      .post<ResponseContract<any>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('crear registro de Londres');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  borrar(id: string): Observable<any> {
    return this.http
      .post<ResponseContract<any>>(this._baseUrl + this.apiUrl + "/borrar", {Id_Detalle: id})
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('borrar registro de Londres');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
