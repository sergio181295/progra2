import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../share/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificacionesService} from '../share/notificaciones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private notificaciones: NotificacionesService
  ) {
    if (+localStorage.getItem('acceso') !== 2) {
      localStorage.setItem('acceso', '2');
      window.location.reload();
    }
    this.crudService.setRecuros('usuarios/login');
  }

  ngOnInit() {
    this.armarFormulario();
  }

  private armarFormulario() {
    this.formulario = this.formBuilder.group({
      usuario: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  async ingresar() {
    try {
      const usuario = await this.crudService.guardar(this.formulario.value).toPromise();
      localStorage.setItem('acceso', usuario.esAdministrador? '0' : '1');
      localStorage.setItem('reload', 's');
      localStorage.setItem('usuarioId', usuario.id);
      this.router.navigate(['inicio']);
    } catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }
}
