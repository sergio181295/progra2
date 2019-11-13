import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/share/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-l',
  templateUrl: './pedidos-l.component.html'
})
export class PedidosLComponent implements OnInit {

  public listaPedidos = [];

  constructor(
    private crudService: CrudService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.obtenerPedidos();
  }

  async obtenerPedidos() {
    try {
      this.crudService.setRecuros('pedidos/' + localStorage.getItem('usuarioId'));
      const pedidos = await this.crudService.obtenerTodos().toPromise();
      this.listaPedidos = pedidos;
    } catch (e) {
      console.log(e.error.message);
    }
  }

  async eliminarPedido(id: number) {
    try {
      this.crudService.setRecuros('pedidos');
      await this.crudService.eliminar(id).toPromise();
      this.obtenerPedidos();
    }catch (e) {
      console.log(e.error.message);
    }
  }

  editarPedido(id: number) {
    this.router.navigate(['pedidos/' + id]);
  }
}
