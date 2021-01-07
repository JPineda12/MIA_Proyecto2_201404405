import { Component} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent {

  constructor(public dialogRef: MatDialogRef<AddCategoriaComponent>
    ,private apiService: ApiService) { }

  ngOnInit(): void {
  }

  categoria: any

  async save(){
    let nombre = ((document.getElementById("nombre") as HTMLInputElement).value);
    (await this.apiService.createCategoria(nombre)).toPromise().then((res) => {
      this.categoria = res;
      if (this.categoria.nombre != "") {
        swal.fire({
          icon: 'success',
          title: 'Nueva Categoria',
          text: 'Se creo una nueva categoria satisfactoriamente',
        })
      }
    });
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();

  }

}
