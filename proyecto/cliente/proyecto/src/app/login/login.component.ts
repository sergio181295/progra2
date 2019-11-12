import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.armarFormulario();
  }

  private armarFormulario() {
    this.formulario = this.formBuilder.group({
      usuario: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public ingresar() {
    const usuario = this.formulario.value;
    console.log(usuario);
  }
}
