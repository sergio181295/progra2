import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbListModule, NbDatepicker, NbDatepickerModule, NbUserModule, NbToastrModule, NbAccordionModule
} from '@nebular/theme';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AnunciosLComponent } from './anuncios/anuncios-l/anuncios-l.component';
import {CrudService} from './share/crud.service';
import { AnunciosVComponent } from './anuncios/anuncios-v/anuncios-v.component';
import { UsuariosLComponent } from './usuarios/usuarios-l/usuarios-l.component';
import { UsuariosVComponent } from './usuarios/usuarios-v/usuarios-v.component';
import {NbDateFnsDateModule} from '@nebular/date-fns';
import { ProductosLComponent } from './productos/productos-l/productos-l.component';
import { ProductosVComponent } from './productos/productos-v/productos-v.component';
import { PedidosLComponent } from './pedidos/pedidos-l/pedidos-l.component';
import { PedidosVComponent } from './pedidos/pedidos-v/pedidos-v.component';
import { CarritoComponent } from './carrito/carrito/carrito.component';
import { PerfilComponent } from './perfil/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    AnunciosLComponent,
    AnunciosVComponent,
    UsuariosLComponent,
    UsuariosVComponent,
    ProductosLComponent,
    ProductosVComponent,
    PedidosLComponent,
    PedidosVComponent,
    CarritoComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbMenuModule,
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbIconModule,
    NbCheckboxModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbListModule,
    FormsModule,
    NbDatepickerModule,
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule,
    NbUserModule,
    NbToastrModule.forRoot(),
    NbAccordionModule
  ],
  providers: [
    CrudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
