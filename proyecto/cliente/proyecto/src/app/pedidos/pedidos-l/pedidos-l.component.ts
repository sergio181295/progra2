import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/share/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificacionesService} from '../../share/notificaciones.service';

@Component({
  selector: 'app-pedidos-l',
  templateUrl: './pedidos-l.component.html'
})
export class PedidosLComponent implements OnInit {

  public listaPedidos = [];

  constructor(
    private crudService: CrudService,
    private router: Router,
    private notificaciones: NotificacionesService
  ) {  }

  ngOnInit() {
    this.obtenerPedidos();
  }

  async obtenerPedidos() {
    try {
      this.crudService.setRecuros('pedidos/' + localStorage.getItem('usuarioId'));
      const pedidos = await this.crudService.obtenerTodos().toPromise();
      for (const det of pedidos) {
        det.fechaEntrega = new Date(det.fechaEntrega);
        det.fechaEntrega.setDate(det.fechaEntrega.getDate() + 1);
      }
      this.listaPedidos = pedidos;
      this.notificaciones.emitir('success', 'Datos cargados.');
    } catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  async eliminarPedido(id: number) {
    try {
      this.crudService.setRecuros('pedidos');
      await this.crudService.eliminar(id).toPromise();
      this.obtenerPedidos();
      this.notificaciones.emitir('success', 'Registro eliminado.');
    }catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  editarPedido(id: number) {
    this.router.navigate(['pedidos/' + id]);
  }
}
