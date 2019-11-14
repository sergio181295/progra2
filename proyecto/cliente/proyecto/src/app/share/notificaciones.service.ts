import { Injectable } from '@angular/core';
import {NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private toastr: NbToastrService) { }

  emitir(status: any, mensaje: any){
    let duration: any = 3000;
    if(status === 'danger'){
      duration = 6000;
    }
    let position: any = 'bottom-right'
    console.log('1', status, duration, mensaje);
    this.toastr.show(
      '',
      mensaje,
      {position, status, duration});
    console.log('2', status, mensaje);
  }
}
