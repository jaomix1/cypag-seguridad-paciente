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
export class DetallesService extends BaseService{

  private apiUrl: string = '/api/detalle';

  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this._baseUrl + this.apiUrl, data)
  }

  get(id: string): Observable<any> {
    console.log(id)
    return this.http.post<any>(this._baseUrl + this.apiUrl + "/registros", {Id_Master: id})
  }

  delete(id: string): Observable<any> {
    return this.http.post<any>(this._baseUrl + this.apiUrl + "/borrar", {Id_Master: id})
  }
}
