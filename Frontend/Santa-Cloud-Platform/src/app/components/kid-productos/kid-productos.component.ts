import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatDialog, } from '@angular/material/dialog';

export interface Producto {
  idProducto: number,
  nombre: string,
  precio: number,
  minEdad: number,
  idCategoria: number,
  categoria: string,
  image_url: string
}

@Component({
  selector: 'app-kid-productos',
  templateUrl: './kid-productos.component.html',
  styleUrls: ['./kid-productos.component.css']
})
export class KidProductosComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;



  constructor(private router: Router, private apiService: ApiService) { }

  displayedColumns: string[] = ['Nombre', 'Precio', 'Imagen'];
  Productos: Producto[] = [];
  Usuario: any;
  ngOnInit(): void {
    this.Usuario = JSON.parse(localStorage.getItem("user"));
    this.getProductos()
    console.log(this.Productos);
  }

  getProductos() {
    let edad = this.obtenerEdad(this.Usuario.fecha)
    this.apiService.getProductos().toPromise().then(async (res) => {
      let auxProductos: any = res;
      for await (let prod of auxProductos) {
        if (prod.minEdad <= edad) {
          prod.precio = Math.round((prod.precio + Number.EPSILON) * 100) / 100
          let p = {
            idProducto: prod.id,
            nombre: prod.nombre,
            precio: prod.precio,
            minEdad: prod.minEdad,
            idCategoria: prod.idCategoria,
            categoria: prod.categoria,
            image_url: prod.image_url
          }
          this.Productos.push(p);
        }
      }
      this.table.renderRows();

    });
  }

  public obtenerEdad(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public adquirir(producto: any) {
    /*swal.fire({
      title: '¿Deseas Adquirir este producto?!',
      text: '¿Marcar esta Buena Accion como Realizando?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Regresar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.insertarAccionRealizar("" + gDeed.idAccion, "" + this.Usuario.idUsuario,
          this.obtenerFecha(), "1", gDeed.recompensa).toPromise().then((res) => {
            console.log(res)
            this.accionesPendientes.push(gDeed);
            const index = this.buenasAcciones.indexOf(gDeed, 0);
            if (index > -1) {
              this.buenasAcciones.splice(index, 1);
            }
          });
      }
    })
    */
  }

  listaJuguetes: any[] = []
  public agregarJuguete(prod: any) {
    this.listaJuguetes.push(prod)
    let texto = "Lista de Juguetes: "
    for (let i = 0; i < this.listaJuguetes.length-1; i++) {
      texto += this.listaJuguetes[i].nombre+",";
    }
    texto += prod.nombre;
    ((document.getElementById("text") as HTMLInputElement).value) = texto;
  }
}
