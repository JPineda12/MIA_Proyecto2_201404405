import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import swal from 'sweetalert2';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, } from '@angular/material/dialog';
import {DetallePublicacionComponent} from '../detalle-publicacion/detalle-publicacion.component'
@Component({
  selector: 'app-kid-santa-profile',
  templateUrl: './kid-santa-profile.component.html',
  styleUrls: ['./kid-santa-profile.component.css']
})
export class KidSantaProfileComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private apiService: ApiService) { }



  Publicaciones;

  ngOnInit(): void {
    this.getPublicaciones();
  }

  async getPublicaciones() {
    this.apiService.getPublicaciones().toPromise().then(res => {
      this.Publicaciones = res;
    })
  }

  async comentar(publi) {
    const dialogRef = this.dialog.open(DetallePublicacionComponent, {
      width: '900px',
      height: '700px',
      data: {
        publicacion: publi
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
