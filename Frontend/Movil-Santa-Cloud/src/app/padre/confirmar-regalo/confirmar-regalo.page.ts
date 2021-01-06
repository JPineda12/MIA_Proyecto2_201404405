import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DetalleCartaPage } from '../detalle-carta/detalle-carta.page'
import { ModalController } from '@ionic/angular';

export interface Carta {
  nombreUsuario: string
  mensaje: string,
  idCarta: string,
  estado: string,
  fecha: string,
  idUsuario: string,
  productos: any,
}

@Component({
  selector: 'app-confirmar-regalo',
  templateUrl: './confirmar-regalo.page.html',
  styleUrls: ['./confirmar-regalo.page.scss'],
})
export class ConfirmarRegaloPage implements OnInit {

  constructor(private router: Router, private storage: Storage, private apiService: ApiService,
    public alertController: AlertController, private modalController: ModalController) { }


  Cartas: Carta[] = [];


  ngOnInit() {
  }

  Hijos: any;
  Usuario: any;

  ionViewWillEnter() {
    this.storage.get('user').then((val) => {
      this.Usuario = val;
      this.getHijos()
    });
  }

  async getCartas() {
    for await (let son of this.Hijos) {
      this.apiService.getCartas("" + son.idUsuario, "0").toPromise().then(async (res) => {
        let auxCartas: any = res;
        let prods: any
        for await (let aux of auxCartas) {
          let newCarta = {
            nombreUsuario: son.nombre,
            idUsuario: aux.idUsuario,
            mensaje: aux.mensaje,
            idCarta: aux.idCarta,
            estado: aux.estado,
            fecha: aux.fecha,
            productos: prods
          }
          this.Cartas.push(newCarta);
        }
      });
    }
  }

  async confirmarCarta(carta) {
    const alert = await this.alertController.create({
      header: '¿Confirmar Regalo?',
      message: 'Confirmar carta y regalos para ser entregados.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.apiService.updateEstadoCarta(carta.idCarta, "1").toPromise().then(async (res) => {
              const alert = await this.alertController.create({
                header: 'Regalo confirmado!',
                message: 'Marcaste este regalo como confirmado!',
                buttons: ['OK']
              });
              await alert.present();
              const index = this.Cartas.indexOf(carta, 0);
              if (index > -1) {
                this.Cartas.splice(index, 1);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async borrarCarta(carta) {
    const alert = await this.alertController.create({
      header: '¿Eliminar Regalo?',
      message: 'Eliminar esta carta y regalos.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.apiService.updateEstadoCarta(carta.idCarta, "3").toPromise().then(async (res) => {
              const alert = await this.alertController.create({
                header: 'Regalo Eliminado!',
                buttons: ['OK']
              });
              await alert.present();
              const index = this.Cartas.indexOf(carta, 0);
              if (index > -1) {
                this.Cartas.splice(index, 1);
              }
            });
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
      this.getCartas()
    });
  }

  async openDetalleCarta(miCarta) {
    const modal = await this.modalController.create({
      component: DetalleCartaPage,
      componentProps: {
        nombreUsuario: miCarta.nombreUsuario,
        mensaje: miCarta.mensaje,
        idCarta: miCarta.idCarta,
        estado: miCarta.estado,
        fecha: miCarta.fecha,
        idUsuario: miCarta.idUsuario,
        productos: miCarta.productos
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      var index = this.Cartas.indexOf(miCarta);
      if (~index) {
        this.Cartas[index].productos = dataReturned.data;
      }
      console.log(this.Cartas[index]);
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', miCarta);
    });
  }
}
