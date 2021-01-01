import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import swal from 'sweetalert2';

export interface DialogData {
  nombre: string
  precio: number,
  edad: number,
  imagen: any,
  categoria: string,
  idProducto: string
}



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  constructor(public dialogRef: MatDialogRef<EditProductComponent>
    , @Inject(MAT_DIALOG_DATA) public data: DialogData, private apiService: ApiService) { }

  Categorias: any
  Productos: any
  catValue: string
  producto: any
  imagen: any
  selectText: string = "Click para subir una imagen del producto"
  showButton: boolean = true



  ngOnInit(): void {
    this.getCategorias();
    ((document.getElementById("nombre") as HTMLInputElement).value) = this.data.nombre;
    ((document.getElementById("precio") as HTMLInputElement).value) = "" + this.data.precio;
    ((document.getElementById("edad") as HTMLInputElement).value) = "" + this.data.edad;
    console.log(this.data.imagen)
    this.catValue = this.data.categoria;
  }

  getCategorias() {
    this.apiService.getCategorias().toPromise().then((res) => {
      this.Categorias = res
    });
  }

  save() {

    this.editarProducto()

  }

  editarProducto() {
    let nombre = ((document.getElementById("nombre") as HTMLInputElement).value);
    let precio = ((document.getElementById("precio") as HTMLInputElement).value);
    let edad = ((document.getElementById("edad") as HTMLInputElement).value);
    let categoriaID = this.getCategoriaId()
    this.apiService.updateProducto(this.data.idProducto, nombre, precio, edad, categoriaID, this.data.imagen).toPromise().then((res) => {
      this.producto = res;
      if (this.producto.nombre != "") {
        swal.fire({
          icon: 'success',
          title: 'Registro editado!',
          text: 'Se edito un Producto',
        })
      }
    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();

  }


  getCategoriaId(): string {
    for (let i = 0; i < this.Categorias.length; i) {
      if (this.Categorias[i].categoria == this.catValue) {
        return this.Categorias[i].id
      }
    }
    return ""
  }

  uploadAction(files: any) {
    let data = new FormData();
    data.append('file', files.item(0));
    this.apiService.uploadImage(data).toPromise().then(res => {
      this.imagen = res;
      this.selectText = "Imagen Subida: ";
      this.showButton = false;
      this.data.imagen = this.imagen.Message;
    }, error => console.log(error)
    )
  }
}
