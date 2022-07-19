import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  private apiUrl: string = '/api/usuarios';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  get(): Observable<any> {
    return this.http
      .get<any>(this._baseUrl + this.apiUrl)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de usuarios para responsables y testigos');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
