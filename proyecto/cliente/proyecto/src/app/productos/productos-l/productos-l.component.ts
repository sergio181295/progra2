import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CrudService} from '../../crud.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-productos-l',
  templateUrl: './productos-l.component.html'
})
export class ProductosLComponent implements OnInit {
  public listaProductos = [];

  constructor(
    private crudService: CrudService,
    private router: Router
  ) {
    this.crudService.setRecuros('productos');
    this.cargarProductos();
  }

  ngOnInit() {
  }

  async cargarProductos() {
    try {
      const productos = await this.crudService.obtenerTodos().toPromise();
      this.listaProductos = productos;

    }catch (e) {
      console.log(e.error.message);
    }
  }

  nuevoProducto() {
    this.router.navigate(['productos/nuevo']);
  }

  async eliminarProducto(id: number) {
    try {
      await this.crudService.eliminar(id).toPromise();
      this.cargarProductos();

    }catch (e) {
      console.log(e.error.message);
    }
  }

  editarProducto(id: number) {
    this.router.navigate(['productos/' + id]);
  }
}
