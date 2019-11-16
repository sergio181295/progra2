import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../share/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificacionesService} from '../../share/notificaciones.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public acceso = 2;
  public formulario: FormGroup;
  public telefonos = [];
  public confirmacion = '';
  public passOriginal = '';

  constructor(
    private crudService: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notificaciones: NotificacionesService
  ) {
    this.acceso = +localStorage.getItem('acceso');
    crudService.setRecuros('usuarios');
    this.aramarFormulario();
    if(localStorage.getItem('reload') === 's'){
      localStorage.setItem('reload', 'n');
      window.location.reload();
    }
  }

  ngOnInit() {
    this.obtenerUsuario(+localStorage.getItem('usuarioId'))
      .then(res => {
        this.notificaciones.emitir('success', 'Datos cargados.');
      });
  }

  async guardarUsuario() {
    try {
      //validar contrasenia
      if (this.formulario.value.password !== this.passOriginal) {
        let error = '';
        const pass = this.formulario.value.password;

        if (pass.search(/[a-z]/) < 0) {
          error += 'La contraseña debe tener al menos una letra minuscula.\n';
        }
        if (pass.search(/[0-9]/) < 0) {
          error += 'La contraseña debe tener al menos un numero.\n';
        }
        if (pass.search(/[A-Z]/) < 0) {
          error += 'La contraseña debe tener al menos una letra mayuscula.\n';
        }

        if (error !== '') {
          throw error;
        }

        if (this.formulario.value.password !== this.confirmacion) {
          throw 'Las contraseñas deben de ser iguales.';
        }
      }

      //eliminar telefonos en blanco
      let telefonosUsuario = [];
      for (let i = 0; i < this.telefonos.length; i++) {
        if (this.telefonos[i].telefono !== '') {
          telefonosUsuario.push(this.telefonos[i]);
        }
      }

      //fecha
      let fecha = new Date(this.formulario.value.fechaNacimiento);
      fecha.setDate(fecha.getDate() + 1);
      this.formulario.patchValue({fechaNacimiento: fecha});

      this.formulario.patchValue({telefonos: telefonosUsuario});
      await this.crudService.guardar(this.formulario.value).toPromise();
      this.obtenerUsuario(+localStorage.getItem('usuarioId'));
      this.notificaciones.emitir('success', 'Datos guardados.');
    } catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  async obtenerUsuario(id: number) {
    try {
      const usuario = await this.crudService.obtenerUno(id).toPromise();
      this.formulario.patchValue(usuario);
      this.telefonos = this.formulario.value.telefonos;
      this.passOriginal = this.formulario.value.password;
    } catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  agregarTelefono() {
    this.telefonos.push({telefono: ''});
  }

  aramarFormulario() {
    this.formulario = this.formBuilder.group({
      id: null,
      correo: [null, Validators.required],
      nombre: null,
      apellido: null,
      fechaNacimiento: [new Date(), Validators.required],
      direccionEntrega: [null, Validators.required],
      password: [null, Validators.required],
      activo: null,
      esAdministrador: null,
      telefonos: [[]],
      pedidos: [[]],
      usuario: null
    });
  }


}
