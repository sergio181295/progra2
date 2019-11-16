import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificacionesService } from './notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class VendedorGuard implements CanActivate {
  
  constructor(
    private notificaciones:NotificacionesService,
    private router: Router
  ){}
  
  canActivate()  {
    if(+localStorage.getItem('acceso') !== 1){
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
