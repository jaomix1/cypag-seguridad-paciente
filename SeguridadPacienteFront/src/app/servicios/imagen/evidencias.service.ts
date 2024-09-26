import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvidenciasService extends BaseService {

  private apiUrl: string = '/api/master';

  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  upload(data: any, id_master: string): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "/fileupload/" + id_master, data, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('subir imagen de evidencias');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }


  uploadEvidenciaSeguimiento(data: any, seguimientoId: number): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "/fileUploadSeguimiento/" + seguimientoId, data, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('subir imagen de evidencias');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }





  // downlod(id_Imagen: string): Observable<any> {
  //   return this.http
  //     .get<any>(this._baseUrl + this.apiUrl + "/filedownload/" + id_Imagen)
  //     .pipe(
  //       map((response) => response),
  //       tap((a) => {
  //         this.logs('Descargar imagen');
  //         this.logs(a);
  //       }),
  //       catchError(this.errorMgmt)
  //     );
  // }
}
