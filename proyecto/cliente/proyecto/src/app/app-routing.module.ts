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
import {PerfilComponent} from './perfil/perfil/perfil.component';
import { AdminGuard } from './share/admin.guard';
import { VendedorGuard } from './share/vendedor.guard';
import { UsuarioGuard } from './share/usuario.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'anuncios' ,component: AnunciosLComponent, canActivate: [AdminGuard] },
  {path: 'anuncios/nuevo', component: AnunciosVComponent, canActivate: [AdminGuard] },
  {path: 'anuncios/:id', component: AnunciosVComponent, canActivate: [AdminGuard] },
  {path: 'inicio', component: InicioComponent, canActivate: [VendedorGuard] },
  {path: 'usuarios', component: UsuariosLComponent, canActivate: [AdminGuard] },
  {path: 'usuarios/nuevo', component: UsuariosVComponent, canActivate: [AdminGuard] },
  {path: 'usuarios/:id', component: UsuariosVComponent, canActivate: [AdminGuard] },
  {path: 'productos', component: ProductosLComponent, canActivate: [AdminGuard] },
  {path: 'productos/nuevo', component: ProductosVComponent, canActivate: [AdminGuard] },
  {path: 'productos/:id', component: ProductosVComponent, canActivate: [AdminGuard] },
  {path: 'pedidos', component: PedidosLComponent, canActivate: [VendedorGuard] },
  {path: 'pedidos/nuevo', component: PedidosVComponent, canActivate: [VendedorGuard] },
  {path: 'pedidos/:id', component: PedidosVComponent, canActivate: [VendedorGuard] },
  {path: 'carrito', component: CarritoComponent, canActivate: [VendedorGuard] },
  {path: 'perfil', component: PerfilComponent, canActivate: [UsuarioGuard]},
  {path: '', component: PerfilComponent, canActivate: [UsuarioGuard]},
  {path: '**', component: PerfilComponent, canActivate: [UsuarioGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
