import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Usuario } from 'src/app/modelos/user';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends BaseService {

    constructor(
        @Inject('UrlApi') baseUrl: string,
        private http: HttpClient,
        //private router: Router,       
    ) {
        super(baseUrl);
    }

    consultarUsuarios() {
        return this.http.get<Usuario[]>(
            this._baseUrl + `/api/Usuarios/Index`
        ).pipe(
            catchError(this.errorMgmt)
        );
    }

    consultarUsuario(guid: string) {
        return this.http.get<Usuario>(
            this._baseUrl + `/api/Usuarios/Index/${guid}`
        ).pipe(
            catchError(this.errorMgmt)
        );
    }

    crearUsuario(dato: Usuario) {
        return this.http.post<Usuario>(
            this._baseUrl + `/Usuarios/Create`, dato
        ).pipe(
            catchError(this.errorMgmt)
        );
    }

    editarUsuario(dato: Usuario) {
        return this.http.post<Usuario>(
            this._baseUrl + `/api/Usuarios/Edit`, dato
        ).pipe(
            catchError(this.errorMgmt)
        );
    }

    bloquearUsuario(guid: string) {
        return this.http.post<Usuario>(
            this._baseUrl + `/api/Usuarios/Bloq/` + guid, "1"
        ).pipe(
            catchError(this.errorMgmt)
        );
    }
}