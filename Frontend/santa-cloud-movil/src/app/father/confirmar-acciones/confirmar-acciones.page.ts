import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-acciones',
  templateUrl: './confirmar-acciones.page.html',
  styleUrls: ['./confirmar-acciones.page.scss'],
})
export class ConfirmarAccionesPage implements OnInit {



  constructor(private router: Router, private storage: Storage, private apiService: ApiService,
    public alertController: AlertController) { }


  Hijos: any;
  Usuario: any;
  accionesPendientes = [];
  accionesRealizadas = [];
  sinAcciones = false;
  ngOnInit() {
  	this.accionesPendientes = [];
  	this.accionesRealizadas = [];
  	this.Hijos = [];
  	this.Usuario = [];
    this.storage.get('user').then((val) => {
      this.Usuario = val;
      this.getHijos()
    });
  }

  ionViewWillEnter() {
    this.storage.get('user').then((val) => {
      this.Usuario = val;
      this.getHijos()
    });
  }

  async confirmar(gDeed: any) {
    let mensaje = ""
    let textconfirmar = ""
    if (gDeed.estado == 1) {
      mensaje = "Buena Accion pendiente de realizar por " + gDeed.nickname
      textconfirmar = "Si, Confirmar"
    } else if (gDeed.estado == 2) {
      mensaje = "Buena Accion realizada por " + gDeed.nickname
      textconfirmar = "Confirmar"
    }
    const alert = await this.alertController.create({
      header: '¿Confirmar Buena Accion?',
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Accion cancelada');
          }
        }, {
          text: textconfirmar + '',
          handler: () => {
            this.apiService.changeGoodDeedState(gDeed.idAccion, gDeed.idUsuario, "3")
              .toPromise().then((res) => {
                console.log("Confirmada: ", res);
              });
            if (gDeed.estado == 1) {
              const index = this.accionesPendientes.indexOf(gDeed, 0);
              if (index > -1) {
                this.accionesPendientes.splice(index, 1);
              }
            } else {
              const index = this.accionesRealizadas.indexOf(gDeed, 0);
              if (index > -1) {
                this.accionesRealizadas.splice(index, 1);
              }
            }
            this.revisarSinAcciones()
            this.mostraMensajeConfirmada()
          }
        }
      ]
    });
    await alert.present();
  }


  revisarSinAcciones() {
    if (this.accionesPendientes.length == 0 && this.accionesRealizadas.length == 0) {
      this.sinAcciones = true
    }

  }
  async mostraMensajeConfirmada() {
    const alert = await this.alertController.create({
      header: 'Accion Confirmada!',
      subHeader: 'Confirmaste una buena accion',
      message: 'Los bastones de recompensa fueron sumados!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async eliminar(gDeed: any) {
    let mensaje = "Seguro que desea eliminar esta accion hecha por: " + gDeed.nickname
    let textconfirmar = "Si, eliminar"
    const alert = await this.alertController.create({
      header: '¿Eliminar?',
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Accion cancelada');
          }
        }, {
          text: textconfirmar + '',
          handler: async () => {
            console.log('Eliminando');
            this.apiService.changeGoodDeedState(gDeed.idAccion, gDeed.idUsuario, "4")
              .toPromise().then((res) => {
                console.log("Eliminada: ", res);
              });

            if (gDeed.estado == 1) {
              const index = this.accionesPendientes.indexOf(gDeed, 0);
              if (index > -1) {
                this.accionesPendientes.splice(index, 1);
              }
            } else {
              const index = this.accionesRealizadas.indexOf(gDeed, 0);
              if (index > -1) {
                this.accionesRealizadas.splice(index, 1);
              }
            }
            this.revisarSinAcciones()
            const alert = await this.alertController.create({
              header: 'Accion Eliminada!',
              subHeader: 'Buena Accion eliminada',
              message: 'Marcaste esta buena accion como incompleta!',
              buttons: ['OK']
            });
            await alert.present();
          }
        }
      ]
    });
    await alert.present();
  }

  getHijos() {
    this.apiService.getHijos(this.Usuario.idUsuario).toPromise().then((res) => {
      this.Hijos = res;
      this.storage.set("hijos", this.Hijos);
      this.accionesPendientes = []
      this.accionesRealizadas = []
      this.getAccionesPendientes()
    });
  }

  async getAccionesPendientes() {
    for await (let son of this.Hijos) {
      this.apiService.getPendingGoodDeeds("" + son.idUsuario).toPromise().then(async (res) => {
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
  }

  salir() {
    this.storage.clear();
    this.router.navigate(["/login"])
  }
}
