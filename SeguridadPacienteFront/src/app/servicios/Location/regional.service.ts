import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from "../baseService";
import { Regional } from 'src/app/modelos/Location/regional';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegionalService extends BaseService {
    private apiUrl : string = "/api/Regional/";
    constructor(
        @Inject('UrlApi') baseUrl: string,
        private http: HttpClient,
    ) {
        super(baseUrl);

    }

    getAll(): Observable<Regional[]> {
        return this.http.get<ResponseContract<Regional[]>>(
            this._baseUrl + this.apiUrl
        ).pipe(
            map(response => response.data),
            tap(a => {
                this.logs("consulta de regionales");
                this.logs(a);
            }),
            catchError(this.errorMgmt)
        );
    }

    get(dato : string): Observable<Regional> {
        return this.http.get<ResponseContract<Regional>>(
            this._baseUrl + this.apiUrl + dato
        ).pipe(
            map(response => response.data),
            tap(a => {
                this.logs("consulta de regional");
                this.logs(a);
            }),
            catchError(this.errorMgmt)
        );
    }

    create(data : any) : Observable<Regional> {
        return this.http.post<ResponseContract<Regional>>(
            this._baseUrl + this.apiUrl, data
        ).pipe(
            map(response => response.data),
            tap(a => {
                this.logs("crear regional");
                this.logs(a);
            }),
            catchError(this.errorMgmt)
        );
    }

    edit(data : any) : Observable<Regional> {
        return this.http.put<ResponseContract<Regional>>(
            this._baseUrl + this.apiUrl, data
        ).pipe(
            map(response => response.data),
            tap(a => {
                this.logs("editar regional");
                this.logs(a);
            }),
            catchError(this.errorMgmt)
        );
    }

    delete(data : string) : Observable<Regional> {
        return this.http.delete<ResponseContract<Regional>>(
            this._baseUrl + this.apiUrl + data 
        ).pipe(
            map(response => response.data),
            tap(a => {
                this.logs("eliminar regional");
                this.logs(a);
            }),
            catchError(this.errorMgmt)
        );
    }
}