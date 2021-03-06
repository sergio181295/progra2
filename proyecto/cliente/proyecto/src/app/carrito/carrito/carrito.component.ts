import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CrudService} from '../../share/crud.service';
import {Router} from '@angular/router';
import {NotificacionesService} from '../../share/notificaciones.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {

  public formulario: FormGroup;
  public productos = [];
  public detalleProductos = [];
  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private notificaciones: NotificacionesService
  ) {
    this.armarFormulario();
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  armarFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: null,
      fechaEntrega: null,
      usuarioId: [localStorage.getItem('usuarioId')],
      total: [{value: 0.0, disabled: true}],
      detalleProductos: [[]]
    });
  }

  async obtenerProductos() {
    try {
      this.crudService.setRecuros('productos');
      this.productos = await this.crudService.obtenerTodos().toPromise();
      this.notificaciones.emitir('success', 'Datos cargados.');
    }catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  async guardarPedido() {
    try {
      let detallePedido = [];
      for (let i = 0; i < this.detalleProductos.length; i++) {
        if(this.detalleProductos[i].cantidad > 0){
          detallePedido.push(this.detalleProductos[i]);
        }
      }
      this.formulario.patchValue({detalleProductos: detallePedido});

      //fecha
      let fecha = new Date(this.formulario.value.fechaEntrega);
      fecha.setDate(fecha.getDate() + 1);
      this.formulario.patchValue({fechaEntrega: fecha});

      this.crudService.setRecuros('pedidos/'+localStorage.getItem('usuarioId'));
      await this.crudService.guardar(this.formulario.value).toPromise();
      this.router.navigate(['pedidos']);
    } catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  agregarProducto(det: any) {
    this.detalleProductos.push({
      producto: det,
      cantidad: 1,
      total: 0,
      productoId: det.id
    });
    this.calcularTotal();
  }

  eliminarProducto(i) {
    this.detalleProductos.splice(i,1);
    this.calcularTotal();
  }

  calcularTotal() {
    let total = 0;
    for (let i = 0; i < this.detalleProductos.length; i++) {
        const det = this.detalleProductos[i];
        det.total = det.producto.costoUnitario * det.cantidad;
        total += det.total;
    }
    this.formulario.patchValue({total: total});
  }
}
