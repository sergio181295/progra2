import { Component, OnInit } from '@angular/core';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  
  constructor( 
    public productosService: ProductosService
  ){}

  ngOnInit(){
    this.getProductos();
  }

  listaProductos: any = [];

  getProductos(){
    return this.productosService.getProductos().subscribe((data: {}) => {
      this.listaProductos = data;
    })
  }
}
