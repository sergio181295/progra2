import {HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';

export class Errores {
  public static manejoErrorHttp(error: HttpErrorResponse) {
    let mensajeError = 'Error Desconocido!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      mensajeError = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      mensajeError = `Error Servicio: ${error.message}`;
    }
    window.alert(mensajeError);
    return throwError(mensajeError);
  }
}
