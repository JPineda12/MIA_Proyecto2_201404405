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
  image_url: string,
  cantidad: number
}

@Component({
  selector: 'app-kid-productos',
  templateUrl: './kid-productos.component.html',
  styleUrls: ['./kid-productos.component.css']
})
export class KidProductosComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;



  constructor(public dialog: MatDialog, private router: Router, private apiService: ApiService) { }

  displayedColumns: string[] = ['Nombre', 'Precio', 'Imagen'];
  Productos: Producto[] = [];
  Usuario: any;
  ProductosDeseados: Producto[] = [];
  total: number = 0;
  ngOnInit(): void {
    this.Usuario = JSON.parse(localStorage.getItem("user"));
    this.getProductos()
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
            image_url: prod.image_url,
            cantidad: 1
          }
          this.Productos.push(p);
        }
      }
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

  public enviar() {
    let textoCarta = ((document.getElementById("notes") as HTMLInputElement).value);
    if (this.listaJuguetes.length == 0) {
      swal.fire(
        'Escoge un juguete!',
        'Para enviar una carta debes agregar al menos un juguete a la lista :)',
        'error'
      )
    } else {
      swal.fire({
        title: '¿Enviar carta a santa?',
        text: "Tu carta sera enviada a santa :)",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, enviar!'
      }).then((result) => {
        if (result.isConfirmed) {
          swal.fire(
            'Carta Enviada!',
            'Tu carta y lista de juguetes fue enviada :)',
            'success'
          )
        }
      })
    }
  }

  listaJuguetes: any[] = []
  public agregarJuguete(producto: any) {
    if (!this.listaJuguetes.includes(producto)) {
      swal.fire({
        title: '¿Deseas agregar este juguete?',
        text: "Este Juguete se agregara a tu carta a santa",
        icon: 'info',
        imageUrl: producto.image_url,
        imageWidth: 250,
        imageHeight: 250,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, agregar!'
      }).then((result) => {
        if (result.isConfirmed) {
          let auxTotal = this.total + producto.precio;
          if (auxTotal > this.Usuario.bastones) {
            swal.fire(
              'NO se pudo agregar!',
              'Con este juguete se excederia la cantidad de bastones que tienes!',
              'error'
            )
          } else {
            this.listaJuguetes.push(producto);
            swal.fire(
              'Agregado!',
              'Tu juguete ha sido agregado.',
              'success'
            )
            this.total += producto.precio;
          }
        }
      })
    } else {
      swal.fire({
        title: 'Este Juguete ya esta en tu lista',
        text: "Ya agregaste este juguete a tu lista, ¿Deseas agregar otro igual?",
        icon: 'info',
        imageUrl: producto.image_url,
        imageWidth: 200,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, agregar uno mas!'
      }).then((result) => {
        if (result.isConfirmed) {
          let auxTotal = this.total + producto.precio;
          if (auxTotal > this.Usuario.bastones) {
            swal.fire(
              'NO se pudo agregar!',
              'Con este juguete se excederia la cantidad de bastones que tienes!',
              'error'
            )
          } else {
            const index = this.listaJuguetes.indexOf(producto, 0);
            if (index > -1) {
              this.listaJuguetes[index].cantidad += 1
            }
            swal.fire(
              'Agregado!',
              'Se agrego el juguete.',
              'success'
            )
            this.total += producto.precio;
          }
        }
      })
    }
  }

  public quitarDeLista(producto: any) {
    swal.fire({
      title: '¿Eliminar Juguete de lista?',
      text: "¿Deseas eliminar este juguete de tu lista?",
      icon: 'error',
      imageUrl: producto.image_url,
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.listaJuguetes.indexOf(producto, 0);
        this.total = this.total - producto.precio * this.listaJuguetes[index].cantidad;
        if (index > -1) {
          this.listaJuguetes[index].cantidad = 1;
          this.listaJuguetes.splice(index, 1);
        }
        swal.fire(
          'Eliminado!',
          'El juguete ha sido eliminado.',
          'success'
        )
      }
    })
  }
}
