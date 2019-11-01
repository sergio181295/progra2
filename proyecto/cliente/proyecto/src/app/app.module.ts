import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule} from '@nebular/theme';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AnunciosLComponent } from './anuncios/anuncios-l/anuncios-l.component';
import {AnunciosService} from './anuncios/anuncios.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    AnunciosLComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
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
    HttpClientModule
  ],
  providers: [
    AnunciosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
