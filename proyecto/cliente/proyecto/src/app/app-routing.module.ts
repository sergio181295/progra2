import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AnunciosLComponent} from './anuncios/anuncios-l/anuncios-l.component';
import {AnunciosVComponent} from './anuncios/anuncios-v/anuncios-v.component';
import {InicioComponent} from './inicio/inicio.component';
import {UsuariosLComponent} from './usuarios/usuarios-l/usuarios-l.component';
import {UsuariosVComponent} from './usuarios/usuarios-v/usuarios-v.component';
import {ProductosLComponent} from './productos/productos-l/productos-l.component';
import {ProductosVComponent} from './productos/productos-v/productos-v.component';
import { PedidosLComponent } from './pedidos/pedidos-l/pedidos-l.component';
import { PedidosVComponent } from './pedidos/pedidos-v/pedidos-v.component';
import {CarritoComponent} from './carrito/carrito/carrito.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'anuncios' ,component: AnunciosLComponent},
  {path: 'anuncios/nuevo', component: AnunciosVComponent},
  {path: 'anuncios/:id', component: AnunciosVComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'usuarios', component: UsuariosLComponent},
  {path: 'usuarios/nuevo', component: UsuariosVComponent},
  {path: 'usuarios/:id', component: UsuariosVComponent},
  {path: 'productos', component: ProductosLComponent},
  {path: 'productos/nuevo', component: ProductosVComponent},
  {path: 'productos/:id', component: ProductosVComponent},
  {path: 'pedidos', component: PedidosLComponent},
  {path: 'pedidos/nuevo', component: PedidosVComponent},
  {path: 'pedidos/:id', component: PedidosVComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: '**', component: InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
