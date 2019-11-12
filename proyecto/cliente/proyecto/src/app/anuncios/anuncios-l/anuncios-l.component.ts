import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../share/crud.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-anuncios-l',
  templateUrl: './anuncios-l.component.html',
  styleUrls: ['./anuncios-l.component.css']
})
export class AnunciosLComponent implements OnInit {

  public formulario: FormGroup;
  public listaAnuncios = [];

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {
    crudService.setRecuros("anuncios")
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: null,
      texto: [Validators.required, Validators.maxLength(300)],
      imagen: null
    });
    this.obtenerAnuncios();
  }

  obtenerAnuncios() {
    this.crudService.obtenerTodos().subscribe((data: any[]) => {
      this.listaAnuncios = data;
    })
  }

  nuevoAnuncio(){
    this.router.navigate(['anuncios/nuevo']);
  }

  editarAnuncio(id: number){
    this.router.navigate(['anuncios/'+id]);
  }

  borrarAnuncio(id: number){
    this.crudService.eliminar(id).subscribe(res => {
      this.obtenerAnuncios();
    });
  }
}
