import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../share/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificacionesService} from '../../share/notificaciones.service';

@Component({
  selector: 'app-usuarios-l',
  templateUrl: './usuarios-l.component.html',
  styleUrls: []
})
export class UsuariosLComponent implements OnInit {

  public listaUsuarios = [];

  constructor(
    private crudService: CrudService,
    private router: Router,
    private notificaciones: NotificacionesService
  ) {
    this.crudService.setRecuros('usuarios');
    this.cargarusuarios();
  }

  ngOnInit() {
  }

  cargarusuarios() {
    this.crudService.obtenerTodos().subscribe(usuarios => {
      this.listaUsuarios = usuarios;
      this.notificaciones.emitir('success', 'Datos cargados.');
    });
  }

  nuevoUsuario() {
    this.router.navigate(['usuarios/nuevo']);
  }

  async eliminarUsuario(id: number) {
    try {
      if(id === +localStorage.getItem('usuarioId')){
        throw 'No puede eliminar el usuario de la sesion actual.'
      }
      await this.crudService.eliminar(id).toPromise();
      this.cargarusuarios();
      this.notificaciones.emitir('success', 'Registro Eliminado.');
    } catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  editarUsuario(id: number) {
    this.router.navigate(['usuarios/' + id]);
  }
}
