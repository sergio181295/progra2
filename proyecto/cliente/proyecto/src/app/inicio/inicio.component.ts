import { Component, OnInit } from '@angular/core';
import {CrudService} from '../crud.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
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
  }

}
