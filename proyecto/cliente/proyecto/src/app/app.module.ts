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
  NbThemeModule
} from '@nebular/theme';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AnunciosLComponent } from './anuncios/anuncios-l/anuncios-l.component';
import {CrudService} from './crud.service';
import { AnunciosVComponent } from './anuncios/anuncios-v/anuncios-v.component';
import { UsuariosLComponent } from './usuarios/usuarios-l/usuarios-l.component';
import { UsuariosVComponent } from './usuarios/usuarios-v/usuarios-v.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    AnunciosLComponent,
    AnunciosVComponent,
    UsuariosLComponent,
    UsuariosVComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'corporate'}),
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
    NbCheckboxModule
  ],
  providers: [
    CrudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
