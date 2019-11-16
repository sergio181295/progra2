import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificacionesService } from './notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  
  constructor(
    private notificaciones:NotificacionesService,
    private router: Router
  ){}
  
  canActivate()  {
    if(+localStorage.getItem('acceso') === 2){
      this.notificaciones.emitir('warning', 'Acceso Restringido');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
