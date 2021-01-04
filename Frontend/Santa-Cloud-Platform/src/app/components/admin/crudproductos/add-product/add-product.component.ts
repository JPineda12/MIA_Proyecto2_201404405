import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import swal from 'sweetalert2';


export interface DialogData {
  nombre: string
  precio: number,
  minEdad: number,
  image_url: any,
  categoria: string,
  idProducto: string
}



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(public dialogRef: MatDialogRef<AddProductComponent>
    , @Inject(MAT_DIALOG_DATA) public data: DialogData, private apiService: ApiService) { }

  Categorias: any
  catValue: string
  producto: any
  imagen: any
  selectText: string = "Click para subir una imagen del producto"
  showButton: boolean = true
  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias() {
    this.apiService.getCategorias().toPromise().then((res) => {
      this.Categorias = res
    });
  }

  save() {
    if (!this.imagen) {
      swal.fire({
        title: 'No ha subido imagen del producto!',
        text: '¿Desea insertar un producto sin imagen?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: `Aceptar`,
        cancelButtonText: 'Regresar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.data.image_url = "http://localhost:3020/sinimagen.jpg"
          this.insertarProducto()
        }
      })
    } else {
      this.insertarProducto()
    }
  }

  insertarProducto() {
    this.data.nombre = ((document.getElementById("nombre") as HTMLInputElement).value);
    this.data.precio = +((document.getElementById("precio") as HTMLInputElement).value);
    this.data.minEdad = +((document.getElementById("edad") as HTMLInputElement).value);
    let categoriaID = this.getCategoriaId()
    this.data.categoria = this.catValue
    this.apiService.insertProducto(this.data.nombre, "" + this.data.precio, "" + this.data.minEdad,
      categoriaID, this.data.image_url).toPromise().then((res) => {
        this.producto = res;
        if (this.producto.nombre != "") {
          swal.fire({
            icon: 'success',
            title: 'Nuevo registro insertado!',
            text: 'Se inserto un nuevo Producto',
          })
        }
      });
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close(false);
  }

  getCategoriaId(): string {
    for (let i = 0; i < this.Categorias.length; i++) {
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
      this.data.image_url = this.imagen.Message;
    }, error => console.log(error)
    )
  }
}
