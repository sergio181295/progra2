import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AnunciosLComponent} from './anuncios/anuncios-l/anuncios-l.component';
import {AnunciosVComponent} from './anuncios/anuncios-v/anuncios-v.component';
import {InicioComponent} from './inicio/inicio.component';
import {UsuariosLComponent} from './usuarios/usuarios-l/usuarios-l.component';
import {UsuariosVComponent} from './usuarios/usuarios-v/usuarios-v.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'anuncios' ,component: AnunciosLComponent},
  {path: 'anuncios/nuevo', component: AnunciosVComponent},
  {path: 'anuncios/:id', component: AnunciosVComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'usuarios', component: UsuariosLComponent},
  {path: 'usuarios/nuevo', component: UsuariosVComponent},
  {path: 'usuarios/:id', component: UsuariosVComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
