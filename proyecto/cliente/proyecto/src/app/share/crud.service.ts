import { Injectable } from '@angular/core';
import {Configuracion} from './constantes';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private url: string = Configuracion.URL;

  constructor(private http: HttpClient) {
  }

  setRecuros(recurso: string) {
    this.url = Configuracion.URL + recurso + '/'
  }

  obtenerTodos(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerUno(id): Observable<any> {
    return this.http.get(this.url + id);
  }

  guardar(data): Observable<any> {
    return this.http.put(this.url, JSON.stringify(data), Configuracion.HTTP_OPTIONS);
  }

  eliminar(id): Observable<any> {
    return this.http.delete(this.url + id, Configuracion.HTTP_OPTIONS);
  }
}
