import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ActionService extends BaseService {
    private apiUrl: string = '/api/plan/';
    constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
        super(baseUrl);
    }

    getOne(id: any): Observable<any> {
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

    create(id: any, data: any): Observable<any> {
        return this.http
            .post<any>(this._baseUrl + this.apiUrl + "create/" + id, data)
            .pipe(
                map((response) => response),
                tap((a) => {
                    this.logs('crear Opportunity');
                    this.logs(a);
                }),
                catchError(this.errorMgmt)
            );
    }

    //   edit(data: any): Observable<any> {
    //     return this.http
    //       .post<any>(this._baseUrl + this.apiUrl + "actualizar", data)
    //       .pipe(
    //         map((response) => response),
    //         tap((a) => {
    //           this.logs('Actualizar Oportunidad');
    //           this.logs(a);
    //         }),
    //         catchError(this.errorMgmt)
    //       );
    //   }
}
