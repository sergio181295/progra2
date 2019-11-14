import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CrudService} from '../../share/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificacionesService} from '../../share/notificaciones.service';

@Component({
  selector: 'app-productos-l',
  templateUrl: './productos-l.component.html'
})
export class ProductosLComponent implements OnInit {
  public listaProductos = [];

  constructor(
    private crudService: CrudService,
    private router: Router,
    private notificaciones: NotificacionesService
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
      this.notificaciones.emitir('success', 'Datos cargados.');
    }catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  nuevoProducto() {
    this.router.navigate(['productos/nuevo']);
  }

  async eliminarProducto(id: number) {
    try {
      await this.crudService.eliminar(id).toPromise();
      this.cargarProductos();
      this.notificaciones.emitir('success', 'Registro Eliminado.');
    }catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  editarProducto(id: number) {
    this.router.navigate(['productos/' + id]);
  }
}
