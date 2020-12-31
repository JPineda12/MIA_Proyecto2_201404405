import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface AccionData {
  idAccion: string
  titulo: string;
  descripcion: string;
  recompensa: number;
  edad: number
}



@Component({
  selector: 'app-edit-accion',
  templateUrl: './edit-accion.component.html',
  styleUrls: ['./edit-accion.component.css']
})
export class EditAccionComponent{

  constructor(public dialogRef: MatDialogRef<EditAccionComponent>
    , @Inject(MAT_DIALOG_DATA) public data: AccionData, private apiService: ApiService) { }

  ngOnInit(): void {
    ((document.getElementById("title") as HTMLInputElement).value) = this.data.titulo;
    ((document.getElementById("descripcion") as HTMLInputElement).value) = this.data.descripcion;
    ((document.getElementById("recompensa") as HTMLInputElement).value) = ""+this.data.recompensa;
    ((document.getElementById("edad") as HTMLInputElement).value) = ""+this.data.edad;
    console.log(this.data)
  }

  save() {
    let titulo = ((document.getElementById("title") as HTMLInputElement).value);
    let descripcion = ((document.getElementById("descripcion") as HTMLInputElement).value);
    let recompensa = ((document.getElementById("recompensa") as HTMLInputElement).value);
    let edad = ((document.getElementById("edad") as HTMLInputElement).value);
    this.apiService.updateAccion(titulo, descripcion, recompensa, edad, this.data.idAccion).toPromise().then((res) => {

      swal.fire({
        icon: 'success',
        title: 'Registro Editado!',
        text: 'Se Edito un registro satisfactoriamente!',
      })

    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
