import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AnunciosLComponent} from './anuncios/anuncios-l/anuncios-l.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'anuncios' ,component: AnunciosLComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
