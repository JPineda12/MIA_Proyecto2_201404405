import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import swal from 'sweetalert2';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-add-accion',
  templateUrl: './add-accion.component.html',
  styleUrls: ['./add-accion.component.css']
})
export class AddAccionComponent {



  constructor(public dialogRef: MatDialogRef<AddAccionComponent>
    , @Inject(MAT_DIALOG_DATA) public data: DialogData, private apiService: ApiService) { }

  buenaAccion: any;

  ngOnInit(): void {
  }

  save() {
    let titulo = ((document.getElementById("title") as HTMLInputElement).value);
    let descripcion = ((document.getElementById("descripcion") as HTMLInputElement).value);
    let recompensa = ((document.getElementById("recompensa") as HTMLInputElement).value);
    let edad = ((document.getElementById("edad") as HTMLInputElement).value);

    this.apiService.insertarAccion(titulo, descripcion, recompensa, edad).toPromise().then((res) => {
      this.buenaAccion = res;
      if (this.buenaAccion.titulo != "") {
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

}
