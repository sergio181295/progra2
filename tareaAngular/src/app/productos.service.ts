import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

   urlServicios = 'http://localhost:9090/productos';

   constructor(private http: HttpClient) { }
 
   httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   } 
 
   getProductos(): Observable<any> {
     return this.http.get<any>(this.urlServicios)
     .pipe(
       retry(1),
       catchError(this.errorHandl)
     )
   }

   // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
