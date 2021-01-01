import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import swal from 'sweetalert2';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component'
@Component({
  selector: 'app-crudproductos',
  templateUrl: './crudproductos.component.html',
  styleUrls: ['./crudproductos.component.css']
})
export class CrudproductosComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  productos: any
  displayedColumns: string[] = ['Nombre', 'Precio', 'EdadMinima', 'Categoria'];


  constructor(private router: Router, public dialog: MatDialog, private apiService: ApiService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos() {
    this.apiService.getProductos().toPromise().then((res) => {
      this.productos = res
    });
  }

  crearDialog() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.router.navigate(["/adminproductos"]);
    });
  }

  editarRegistro(producto: any) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '400px',
      data: {
        idProducto: producto.id, nombre: producto.nombre,
        precio: producto.precio,
        edad: producto.minEdad, 
        categoria: producto.categoria
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/adminproductos"]);
    });
  }

  borrarRegistro(producto: any) {
    swal.fire({
      title: 'Desea Borrar este registro?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteProducto(producto.id).toPromise().then((res) => {

          swal.fire({
            icon: 'success',
            title: 'Registro Eliminado!',
            text: 'Se Elimino un registro satisfactoriamente!',
          })
          this.router.navigate(["/adminproductos"]);
        });
      }
    })
  }

}
