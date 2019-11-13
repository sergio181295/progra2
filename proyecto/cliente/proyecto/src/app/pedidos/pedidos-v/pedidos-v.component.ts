import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../share/crud.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pedidos-v',
  templateUrl: './pedidos-v.component.html'
})
export class PedidosVComponent implements OnInit {

  public formulario: FormGroup;
  public id = 0;
  productos = [];

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    crudService.setRecuros('pedidos/' + localStorage.getItem('usuarioId'));
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.armarFormulario();
    if(this.id !== 0){
      this.obtenerPedido(this.id);
    }
    this.id = 0;
  }

  armarFormulario(){
    this.formulario = this.formBuilder.group({
      id: null,
      nombre: {value: '', disabled: true},
      fechaEntrega: {value: null, disabled: true},
      total: {value: 0.0, disabled: true},
      detalleProductos: [[]]
    })
  }

  obtenerPedido(id: number){
    this.crudService.obtenerUno(id).subscribe(pedido => {
      pedido.fechaEntrega = new Date(pedido.fechaEntrega);
      pedido.fechaEntrega.setDate(pedido.fechaEntrega.getDate() + 1);
      this.formulario.patchValue(pedido);
      this.productos = pedido.detalleProductos;
    })
  }

  regresar() {
    this.router.navigate(['pedidos']);
  }
}
