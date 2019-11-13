import { Component, OnInit } from '@angular/core';
import {CrudService} from '../share/crud.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  public listaAnuncios = [];

  constructor(
    private crudService: CrudService
  ) {
    this.crudService.setRecuros('anuncios');
    this.crudService.obtenerTodos().subscribe(anuncios => {
      this.listaAnuncios = anuncios;
    })
  }

  ngOnInit() {
    if(localStorage.getItem('reload') === 's'){
      localStorage.setItem('reload', 'n');
      window.location.reload();
    }
  }

}
