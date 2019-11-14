import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../share/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificacionesService} from '../../share/notificaciones.service';

@Component({
  selector: 'app-productos-v',
  templateUrl: './productos-v.component.html'
})
export class ProductosVComponent implements OnInit {

  public formulario: FormGroup;
  public imagen = '';
  public id = 0;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificaciones: NotificacionesService
  ) {
    crudService.setRecuros('productos');
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.armarFormulario();
    if(this.id !== 0){
      this.obtenerProducto(this.id);
    }
    this.id = 0;
  }

  armarFormulario(){
    this.formulario = this.formBuilder.group({
      id: null,
      nombre: [null, Validators.required],
      costoUnitario: [null, Validators.required],
      descripcion: [null, Validators.required],
      imagen: null
    })
  }

  async guardarProducto(){
    try {
      await this.crudService.guardar(this.formulario.value).toPromise();
      this.router.navigate(['productos']);
    }catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  obtenerProducto(id: number){
    this.crudService.obtenerUno(id).subscribe(producto => {
      this.formulario.patchValue(producto);
      this.imagen = producto.imagen;
      this.notificaciones.emitir('success', 'Datos cargados.');
    })
  }

  cargarImagen(event) {
    const imagen = event.srcElement.files[0];
    if(imagen){
      const fileReader = new FileReader();
      fileReader.onload = this.convertirImagen.bind(this);
      fileReader.readAsBinaryString(imagen);
    }
  }

  convertirImagen(e){
    this.imagen = 'data:image/png;base64,' + btoa(e.target.result);
    this.formulario.patchValue({ imagen: 'data:image/png;base64,' + btoa(e.target.result) });
  }
}
