import {HttpHeaders} from '@angular/common/http';

export class Configuracion {
  public static readonly  URL = 'http://192.168.0.13:8000/';
  public static readonly  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
}
