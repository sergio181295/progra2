import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../crud.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuarios-l',
  templateUrl: './usuarios-l.component.html',
  styleUrls: []
})
export class UsuariosLComponent implements OnInit {

  public listaUsuarios = [];

  constructor(
    private crudService: CrudService,
    private router: Router
  ) {
    this.crudService.setRecuros('usuarios');

  }

  ngOnInit() {
    this.cargarusuarios();
  }

  cargarusuarios() {
    this.crudService.obtenerTodos().subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    })
  }

  nuevoUsuario() {
    this.router.navigate(['usuarios/nuevo']);
  }

  eliminarUsuario(id: number) {
    this.crudService.eliminar(id).subscribe(res => {
      this.cargarusuarios();
    })
  }

  editarUsuario(id: number) {
    this.router.navigate(['usuarios/' + id]);
  }
}
