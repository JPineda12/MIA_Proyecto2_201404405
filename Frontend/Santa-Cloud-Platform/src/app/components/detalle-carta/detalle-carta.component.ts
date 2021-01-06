import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import swal from 'sweetalert2';
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-detalle-carta',
  templateUrl: './detalle-carta.component.html',
  styleUrls: ['./detalle-carta.component.css']
})
export class DetalleCartaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetalleCartaComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) { }

  Productos: any;
  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.apiService.getDetalleCarta(this.data.idCarta).subscribe(
      res => {
        this.Productos = res;
      },

      err => console.log("Error de conexion DB: ", err)
    );
  }

  close() {
    this.dialogRef.close(false);
  }

}
