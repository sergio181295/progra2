import { Injectable } from '@angular/core';
import { Configuracion } from './constantes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private url: string = Configuracion.URL;
  
  constructor(private http: HttpClient) { }

  obtenerPedido(): Observable<any> {
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
