import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-usuarios-v',
  templateUrl: './usuarios-v.component.html'
})
export class UsuariosVComponent implements OnInit {

  public formulario: FormGroup;
  public telefonos = [];
  public id = 0;

  constructor(
    private crudService: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    crudService.setRecuros('usuarios');
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.aramarFormulario();
    if(this.id !== 0){
      this.obtenerUsuario(this.id);
    }
    this.id = 0;
  }

  guardarUsuario() {
    
    //eliminar telefonos en blanco
    let telefonosUsuario = [];
    for (let i = 0; i < this.telefonos.length; i++) {
      if(this.telefonos[i].telefono !== ''){
        telefonosUsuario.push(this.telefonos[i]);
      }
      
    }
    this.formulario.patchValue({telefonos: telefonosUsuario});
    
    this.crudService.guardar(this.formulario.value).subscribe(usuario => {
      this.router.navigate(['usuarios']);
    })
  }

  obtenerUsuario(id: number) {
    this.crudService.obtenerUno(id).subscribe(usuario => {
      this.formulario.patchValue(usuario);
      this.telefonos = this.formulario.value.telefonos;
    })
  }

  agregarTelefono() {
    this.telefonos.push({telefono: '0'});
  }

  aramarFormulario(){
    this.formulario = this.formBuilder.group({
      id: null,
      correo: [null, Validators.required],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      fechaNacimiento: [null, Validators.required],
      direccionEntrega: [null, Validators.required],
      password: [null, Validators.required],
      activo: null,
      esAdministrador: null,
      telefonos: [[]],
      pedidos: [[]]
    });
  }
}
