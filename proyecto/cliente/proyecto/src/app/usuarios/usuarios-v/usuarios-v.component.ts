import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../share/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificacionesService} from '../../share/notificaciones.service';

@Component({
  selector: 'app-usuarios-v',
  templateUrl: './usuarios-v.component.html'
})
export class UsuariosVComponent implements OnInit {

  public formulario: FormGroup;
  public telefonos = [];
  public id = 0;
  public confirmacion = '';
  public pedidos = [];
  public passOriginal = '';

  constructor(
    private crudService: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notificaciones: NotificacionesService
  ) {
    crudService.setRecuros('usuarios');
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.aramarFormulario();
  }

  ngOnInit() {
    if (this.id !== 0) {
      this.obtenerUsuario(this.id);
    }
    this.id = 0;
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
      this.formulario.patchValue({telefonos: telefonosUsuario});

      //fecha
      let fecha = new Date(this.formulario.value.fechaNacimiento);
      fecha.setDate(fecha.getDate() + 1);
      this.formulario.patchValue({fechaNacimiento: fecha});

      await this.crudService.guardar(this.formulario.value).toPromise();
      this.router.navigate(['usuarios']);
    } catch (e) {
      this.notificaciones.emitir('danger', e.error ? e.error.message : e);
    }
  }

  obtenerUsuario(id: number) {
    this.crudService.obtenerUno(id).subscribe(usuario => {
      this.formulario.patchValue(usuario);
      this.telefonos = this.formulario.value.telefonos;
      this.pedidos = this.formulario.value.pedidos;
      this.passOriginal = this.formulario.value.password;
      this.notificaciones.emitir('success', 'Datos cargados.');
    });
  }

  agregarTelefono() {
    this.telefonos.push({telefono: ''});
  }

  aramarFormulario() {
    this.formulario = this.formBuilder.group({
      id: null,
      correo: [null, Validators.required],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
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
