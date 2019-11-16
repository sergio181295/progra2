import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NotificacionesService } from './notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private notificaciones:NotificacionesService,
    private router: Router
  ){}
  
  canActivate()  {
    if(+localStorage.getItem('acceso') !== 0){
      this.notificaciones.emitir('warning', 'Acceso Restringido');
      if(+localStorage.getItem('acceso') === 2){
        this.router.navigate(['login']);
      }else{
        this.router.navigate(['perfil']);
      }
      return false;
    }
    return true;
  }
  
}
