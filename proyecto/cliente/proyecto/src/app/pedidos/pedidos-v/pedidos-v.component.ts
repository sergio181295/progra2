import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../share/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificacionesService} from '../../share/notificaciones.service';

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
    private activatedRoute: ActivatedRoute,
    private notificaciones: NotificacionesService
  ) {
    crudService.setRecuros('pedidos/' + localStorage.getItem('usuarioId'));
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.armarFormulario();
    if (this.id !== 0) {
      this.obtenerPedido(this.id);
    }
    this.id = 0;
  }

  armarFormulario() {
    this.formulario = this.formBuilder.group({
      id: null,
      nombre: {value: '', disabled: true},
      fechaEntrega: {value: new Date(), disabled: true},
      total: {value: 0.0, disabled: true},
      detalleProductos: [[]]
    });
  }

  async obtenerPedido(id: number) {
    try {
      let pedido = await this.crudService.obtenerUno(id).toPromise();
      this.formulario.patchValue(pedido);
      this.productos = pedido.detalleProductos;
      this.notificaciones.emitir('success', 'Datos cargados.');
    } catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  regresar() {
    this.router.navigate(['pedidos']);
  }
}
