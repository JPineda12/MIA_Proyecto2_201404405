import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import swal from 'sweetalert2';


export interface AccionData {
  idAccion: string
  titulo: string;
  descripcion: string;
  recompensa: number;
  minEdad: number
}

@Component({
  selector: 'app-add-accion',
  templateUrl: './add-accion.component.html',
  styleUrls: ['./add-accion.component.css']
})
export class AddAccionComponent {



  constructor(public dialogRef: MatDialogRef<AddAccionComponent>
    , @Inject(MAT_DIALOG_DATA) public data: AccionData, private apiService: ApiService) { }

  buenaAccion: any;

  ngOnInit(): void {
  }

  save() {
    this.data.titulo = ((document.getElementById("title") as HTMLInputElement).value);
    this.data.descripcion = ((document.getElementById("descripcion") as HTMLInputElement).value);
    this.data.recompensa = +((document.getElementById("recompensa") as HTMLInputElement).value);
    this.data.minEdad = +((document.getElementById("edad") as HTMLInputElement).value);

    this.apiService.insertarAccion(this.data.titulo, this.data.descripcion, 
      ""+this.data.recompensa, ""+this.data.minEdad).toPromise().then((res) => {
      this.buenaAccion = res;
      if (this.buenaAccion.titulo != "") {
        swal.fire({
          icon: 'success',
          title: 'Nuevo registro insertado!',
          text: 'Se inserto una nueva buena accion',
        })
      }
    });
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close(false);
  }

}
