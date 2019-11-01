import { Component } from '@angular/core';
import {NbSidebarService} from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private sidebarService: NbSidebarService) {
  }
  title = 'proyecto';

  items = [
    {
      title: 'Mi Perfil',
      icon: 'person-outline',
      link: [],
    },
    {
      title: 'Inicio',
      icon: 'home-outline',
      link: [],
    },
    {
      title: 'Anuncios',
      icon: 'grid-outline',
      link: 'anuncios',
    },
    {
      title: 'Vendedores',
      icon: 'people-outline',
      link: [],
    },
    {
      title: 'Productos',
      icon: 'cube-outline',
      link: [],
    },
    {
      title: 'Carrito',
      icon: 'shopping-cart-outline',
      link: [],
    },
    {
      title: 'Mis Pedidos',
      icon: 'list-outline',
      link: [],
    },
    {
      title: 'Cerrar Sesion',
      icon: 'lock-outline',
      link: 'login',
    },
  ];

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
