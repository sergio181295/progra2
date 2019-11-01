import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnunciosService} from '../anuncios.service';

@Component({
  selector: 'app-anuncios-l',
  templateUrl: './anuncios-l.component.html',
  styleUrls: ['./anuncios-l.component.css']
})
export class AnunciosLComponent implements OnInit {

  public formulario: FormGroup;
  public listaAnuncios = [];

  constructor(private formBuilder: FormBuilder, private anunciosService: AnunciosService) {
    this.anunciosService.setRecuros('anuncios');
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: null,
      texto: [Validators.required, Validators.maxLength(300)],
      imagen: null
    });
    this.anunciosService.setRecuros('anuncios');
    this.obtenerAnuncios();
  }

  obtenerAnuncios() {
    this.anunciosService.obtenerTodos().subscribe((data: any[]) => {
      console.log(data);
      this.listaAnuncios = data;
    })
  }
}
