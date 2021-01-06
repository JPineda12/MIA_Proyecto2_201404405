import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {DetalleCartaComponent} from '../detalle-carta/detalle-carta.component';
import { DatePipe } from '@angular/common'
import { MatDialog, } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-cartas',
  templateUrl: './ver-cartas.component.html',
  styleUrls: ['./ver-cartas.component.css']
})
export class VerCartasComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private apiService: ApiService) { }

  Cartas: any;
  Usuario: any;
  ngOnInit(): void {
    this.Usuario = JSON.parse(localStorage.getItem("user"));

    this.getCartas();
  }

  getCartas() {
    console.log(this.Usuario.idUsuario)
    this.apiService.getCartas("" + this.Usuario.idUsuario, "0").toPromise().then((res) => {
      console.log(res);
      this.Cartas = res
    });
  }

  verDetalle(carta: any) {
    console.log(carta);
    const dialogRef = this.dialog.open(DetalleCartaComponent, {
      width: '500px',
      disableClose: true,
      data: {
        idCarta: carta.idCarta
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
