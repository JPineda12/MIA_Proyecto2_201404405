import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from "@ionic-native/google-maps";

import { Platform, LoadingController, ToastController } from "@ionic/angular";
import { DetalleEntregaPage } from '../detalle-entrega/detalle-entrega.page';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repartir',
  templateUrl: './repartir.page.html',
  styleUrls: ['./repartir.page.scss'],
})
export class RepartirPage implements OnInit {


  Cartas: any;
  sinCartas = false;
  constructor(private storage: Storage, private apiService: ApiService,
    private modalController: ModalController, private router: Router) { }

  async ngOnInit() {

  }

  ionViewWillEnter() {
    this.getCartas()
  }

  getCartas() {
    this.apiService.getCartasEntregar().toPromise().then((res) => {
      this.Cartas = res;
      if (this.Cartas.length == 0) {
        this.sinCartas = true
      }
    });
  }

  async verCarta(c) {
    const modal = await this.modalController.create({
      component: DetalleEntregaPage,
      componentProps: {
        miCarta: c
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      console.log(dataReturned.data);
      if (dataReturned.data) {
        const index = this.Cartas.indexOf(c, 0);
        if (index > -1) {
          this.Cartas.splice(index, 1);
        }
      }
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', c);
    });
  }

  salir() {
    this.storage.clear();
    this.router.navigate(["/login"])
  }



}
