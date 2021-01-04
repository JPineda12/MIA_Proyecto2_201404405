import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-kid',
  templateUrl: './kid.component.html',
  styleUrls: ['./kid.component.css']
})
export class KidComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }


  buenasAcciones: any = [];
  accionesPendientes: any = []
  accionesRealizadas: any = []

  Usuario: any
  ngOnInit(): void {
    this.Usuario = JSON.parse(localStorage.getItem("user"));
    this.getBuenasAccionesPendientes();
    this.getBuenasAcciones();

  }

  public obtenerEdad(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getBuenasAccionesPendientes() {
    this.apiService.getPendingGoodDeeds("" + this.Usuario.idUsuario).toPromise().then(async (res) => {
      let auxAcciones: any = res
      for await (let aux of auxAcciones) {
        if (aux.estado == 1) {
          this.accionesPendientes.push(aux)
        } else if (aux.estado == 2) {
          this.accionesRealizadas.push(aux)
        }
      }
    });
  }

  getBuenasAcciones() {
    this.apiService.getAccionesByAge("" + this.Usuario.idUsuario,
      "" + this.obtenerEdad(this.Usuario.fecha)).toPromise().then((res) => {
        this.buenasAcciones = res
        console.log(this.buenasAcciones)
      });
  }

  realizarAccion(gDeed: any) {
    swal.fire({
      title: 'Realizar Buena Accion!',
      text: '¿Marcar esta Buena Accion como Realizando?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Regresar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.insertarAccionRealizar("" + gDeed.idAccion, "" + this.Usuario.idUsuario,
          this.obtenerFecha(), "1", gDeed.recompensa).toPromise().then((res) => {
            console.log(res)
            this.accionesPendientes.push(gDeed);
            const index = this.buenasAcciones.indexOf(gDeed, 0);
            if (index > -1) {
              this.buenasAcciones.splice(index, 1);
            }
          });
      }
    })
  }

  obtenerFecha(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
  }

  accionPendiente(gDeed: any) {

    if (gDeed.estado == 1) {
      swal.fire({
        title: '¿Completar Esta Accion?!',
        text: 'Esta accion sera marcada como realizada, pendiente de aprobacion',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: `Aceptar`,
        cancelButtonText: 'Regresar'
      }).then((result) => {
        if (result.isConfirmed) {

          this.apiService.changeGoodDeedState("" + gDeed.idAccion, "" + this.Usuario.idUsuario, "2").toPromise().then((res) => {
            gDeed.estado = 2;
            this.accionesRealizadas.push(gDeed);
            const index = this.accionesPendientes.indexOf(gDeed, 0);
            if (index > -1) {
              this.accionesPendientes.splice(index, 1);
            }
          });
        }
      })
    }else{
      swal.fire({
        icon: 'success',
        title: 'Accion Completada!',
        text: 'Ya completaste esta buena accion, esperando la aprobacion de tus padres!',
      })
    }
  }



}
