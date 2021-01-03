import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog,} from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import swal from 'sweetalert2';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component'
import { AddCategoriaComponent } from './add-categoria/add-categoria.component'
@Component({
  selector: 'app-crudproductos',
  templateUrl: './crudproductos.component.html',
  styleUrls: ['./crudproductos.component.css']
})
export class CrudproductosComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  productos: any
  displayedColumns: string[] = ['Nombre', 'Precio', 'EdadMinima', 'Categoria', 'Imagen'];


  constructor(public dialog: MatDialog, private apiService: ApiService) {
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
      disableClose: true,
      data: { nombre: "", precio: 0, minEdad: 0, image_url: null, categoria: null, idProducto: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != false) {
        this.productos.push(result)
        this.table.renderRows();
      }
    });
  }

  save(){

  }

  close(){
    
  }

  crearCategoria() {
    const dialogRef = this.dialog.open(AddCategoriaComponent, {
      width: '400px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editarRegistro(producto: any) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '400px',
      disableClose: true,
      data: {
        idProducto: producto.id, nombre: producto.nombre,
        precio: producto.precio,
        minEdad: producto.minEdad,
        categoria: producto.categoria,
        image_url: producto.image_url
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != false) {
        var index = this.productos.indexOf(producto);

        if (~index) {
          this.productos[index] = result;
        }
        this.table.renderRows();

      }
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
          this.productos.splice(this.productos.indexOf(producto), 1);
          this.table.renderRows();
        });
      }
    })
  }

}
