import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Query } from 'src/app/modelos/query/query';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormMasterService extends BaseService {

  private apiUrl: string = '/api/master/';

  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  create(data: any): Observable<Form> {
    return this.http
      .post<Form>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('Insertar nuevo registro al formulario principal');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
