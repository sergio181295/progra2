import { Injectable } from '@angular/core';
import {Configuracion} from '../share/constantes';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Errores} from '../share/utilidades';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  private urlAnuncios = Configuracion.URL;

  constructor(private http: HttpClient) {
  }

  setRecuros(recurso: string){
    this.urlAnuncios + recurso + '/';
  }

  obtenerTodos(): Observable<any> {
    return this.http.get(this.urlAnuncios).pipe(retry(1), catchError(Errores.manejoErrorHttp));
  }

  obtenerUno(id): Observable<any> {
    return this.http.get(this.urlAnuncios + id)
      .pipe(retry(1), catchError(Errores.manejoErrorHttp));
  }

  crear(data): Observable<any> {
    return this.http.post(this.urlAnuncios, JSON.stringify(data), Configuracion.HTTP_OPTIONS)
      .pipe(retry(1), catchError(Errores.manejoErrorHttp));
  }

  actualizar(id, data): Observable<any> {
    return this.http.put(this.urlAnuncios + id, JSON.stringify(data), Configuracion.HTTP_OPTIONS)
      .pipe(retry(1), catchError(Errores.manejoErrorHttp));
  }

  eliminar(id): Observable<any> {
    return this.http.delete(this.urlAnuncios + id, Configuracion.HTTP_OPTIONS)
      .pipe(retry(1), catchError(Errores.manejoErrorHttp));
  }
}
