import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import swal from 'sweetalert2';


export interface DialogData {

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
  Productos: any
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
    let nombre = ((document.getElementById("nombre") as HTMLInputElement).value);
    let precio = ((document.getElementById("precio") as HTMLInputElement).value);
    let edad = ((document.getElementById("edad") as HTMLInputElement).value);
    let categoriaID = this.getCategoriaId()
    this.apiService.insertProducto(nombre, precio, edad, categoriaID).toPromise().then((res) => {
      this.producto = res;
      if (this.producto.nombre != "") {
        swal.fire({
          icon: 'success',
          title: 'Nuevo registro insertado!',
          text: 'Se inserto una nueva buena accion',
        })
      }
    });

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  getCategoriaId(): string{
    for(let i = 0; i < this.Categorias.length; i){
      if(this.Categorias[i].categoria == this.catValue){
        return this.Categorias[i].id
      }
    }
    return ""
  }

  uploadAction(files: any) {
    console.log(files.item(0))
    let data = new FormData();
    this.apiService.uploadProductImage(data).toPromise().then(res => {
      this.imagen = res;
      this.selectText = "Imagen Subida: ";
      this.showButton = false;
    }, error => console.log(error)
    )
  }
}
