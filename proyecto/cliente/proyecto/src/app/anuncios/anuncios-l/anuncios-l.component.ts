import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../share/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificacionesService} from '../../share/notificaciones.service';

@Component({
  selector: 'app-anuncios-l',
  templateUrl: './anuncios-l.component.html'
})
export class AnunciosLComponent implements OnInit {

  public formulario: FormGroup;
  public listaAnuncios = [];

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private notificaciones: NotificacionesService
  ) {
    crudService.setRecuros('anuncios');
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: null,
      texto: [Validators.required, Validators.maxLength(300)],
      imagen: null
    });
    this.obtenerAnuncios();
  }

  async obtenerAnuncios() {
    try {
      const data = await this.crudService.obtenerTodos().toPromise();
      this.listaAnuncios = data;
      this.notificaciones.emitir('success', 'Datos cargados.');
    } catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  nuevoAnuncio() {
    this.router.navigate(['anuncios/nuevo']);
  }

  editarAnuncio(id: number) {
    this.router.navigate(['anuncios/' + id]);
  }

  async borrarAnuncio(id: number) {
    try {
      await this.crudService.eliminar(id).toPromise();
      this.obtenerAnuncios();
      this.notificaciones.emitir('success', 'Registro eliminado.');
    } catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }
}
