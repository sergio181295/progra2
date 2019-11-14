import {Component, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'proyecto';
  public items = [];
  constructor(private sidebarService: NbSidebarService) {
  }

  ngOnInit() {
      if(+localStorage.getItem("acceso") === 0) {
        this.items = [
          {
            title: 'Mi Perfil',
            icon: 'person-outline',
            link: ['perfil'],
          },
          {
            title: 'Inicio*',
            icon: 'home-outline',
            link: ['inicio'],
          },
          {
            title: 'Anuncios',
            icon: 'grid-outline',
            link: 'anuncios',
          },
          {
            title: 'Vendedores',
            icon: 'people-outline',
            link: ['usuarios'],
          },
          {
            title: 'Productos',
            icon: 'cube-outline',
            link: ['productos'],
          },
          {
            title: 'Carrito*',
            icon: 'shopping-cart-outline',
            link: ['carrito'],
          },
          {
            title: 'Mis Pedidos*',
            icon: 'list-outline',
            link: ['pedidos'],
          },
          {
            title: 'Cerrar Sesion',
            icon: 'lock-outline',
            link: 'login',
          },
        ];
      }else if(+localStorage.getItem("acceso") === 1){
        this.items = [
          {
            title: 'Mi Perfil',
            icon: 'person-outline',
            link: ['perfil'],
          },
          {
            title: 'Inicio',
            icon: 'home-outline',
            link: ['inicio'],
          },
          {
            title: 'Carrito',
            icon: 'shopping-cart-outline',
            link: ['carrito'],
          },
          {
            title: 'Mis Pedidos',
            icon: 'list-outline',
            link: ['pedidos'],
          },
          {
            title: 'Cerrar Sesion',
            icon: 'lock-outline',
            link: 'login',
          },
        ];
      }else if(+localStorage.getItem('acceso') === -1){
        this.items = [
          {
            title: 'Mi Perfil',
            icon: 'person-outline',
            link: ['perfil'],
          },
          {
            title: 'Inicio',
            icon: 'home-outline',
            link: ['inicio'],
          },
          {
            title: 'Anuncios',
            icon: 'grid-outline',
            link: 'anuncios',
          },
          {
            title: 'Vendedores',
            icon: 'people-outline',
            link: ['usuarios'],
          },
          {
            title: 'Productos',
            icon: 'cube-outline',
            link: ['productos'],
          },
          {
            title: 'Carrito',
            icon: 'shopping-cart-outline',
            link: ['carrito'],
          },
          {
            title: 'Mis Pedidos',
            icon: 'list-outline',
            link: ['pedidos'],
          },
          {
            title: 'Cerrar Sesion',
            icon: 'lock-outline',
            link: 'login',
          },
        ];

      }
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }


}
