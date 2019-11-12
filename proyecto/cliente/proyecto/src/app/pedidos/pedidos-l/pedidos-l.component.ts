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
  ) { 
    crudService.setRecuros('pedidos/1');
  }

  ngOnInit() {
  }

  async obtenerPedidos() {
    try {
      const pedidos = await this.crudService.obtenerTodos().toPromise();
      this.listaPedidos = pedidos;
    } catch (e) {
      console.log(e.error.message);
    }
  }

  nuevoPedido() {
    this.router.navigate(['pedidos/nuevo'])
  }

}
