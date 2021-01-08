import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.css']
})
export class DetallePublicacionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetallePublicacionComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService, private _snackBar: MatSnackBar) { }

  Comentarios

  Usuario: any;
  ngOnInit(): void {
    this.Comentarios = [];
    this.Usuario = JSON.parse(localStorage.getItem("user"));
  this.getComentarios()    
  }

  getComentarios(){
    this.apiService.getComentariosPublicacion(this.data.publicacion.idPublicacion).toPromise().then(response => {
      this.Comentarios = response;
    })
  }

  enviarComentario(){
    let textoComentario = ((document.getElementById("notes") as HTMLInputElement).value);
    console.log(textoComentario)
    console.log(this.Usuario.idUsuario);
    this.apiService.createComentario(textoComentario, this.data.publicacion.idPublicacion, 
      this.Usuario.idUsuario,"0").toPromise().then(response => {
        this.Comentarios = [];
        (document.getElementById("notes") as HTMLInputElement).value = ""
        this.getComentarios();
        this._snackBar.open("Comentario publicado!", "Listo!", {
          duration: 2000,
        });
      })
  }

}
