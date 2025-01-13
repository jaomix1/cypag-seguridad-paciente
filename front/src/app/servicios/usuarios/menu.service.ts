import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, of, EMPTY } from 'rxjs';
import { map, take, mergeMap } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';

import jwt_decode from "jwt-decode";
import { BaseService } from '../baseService';

@Injectable({
    providedIn: 'root'
})
export class MenuService extends BaseService {
    public datosUsuario: any = { Nombre: "", Perfil: "", Usuario: "", Mail: "", PerfilId: "" };
    public titulo: string = "";
    constructor(
        @Inject('UrlApi') baseUrl: string,
        private http: HttpClient,
    ) {
        super(baseUrl);
    }

    datos(token: string): any {
        let dato: any = jwt_decode(token);
        this.datosUsuario.Nombre = dato.user.Nombre
        this.datosUsuario.Mail = dato.user.Mail
        this.datosUsuario.PerfilId = dato.user.PerfilId
        this.datosUsuario.Perfil = dato.user.Perfil
        this.datosUsuario.Usuario = dato.user.Nombre
    }

}