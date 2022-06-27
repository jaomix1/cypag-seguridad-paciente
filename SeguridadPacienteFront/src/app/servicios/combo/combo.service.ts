import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';
import { Combo } from 'src/app/modelos/combo';

@Injectable({
  providedIn: 'root',
})
export class ComboService extends BaseService {
  private apiUrl: string = '/api/combos/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getNovedades(): Observable<Combo[]> {
    return this.http
      .get<ResponseContract<Combo[]>>(this._baseUrl + this.apiUrl + "novedades")
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('consulta de novedades');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
