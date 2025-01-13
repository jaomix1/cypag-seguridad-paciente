import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormMasterService extends BaseService {

  private apiUrl: string = '/api/master';

  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  create(data: any): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('crear registro de form Principal');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
