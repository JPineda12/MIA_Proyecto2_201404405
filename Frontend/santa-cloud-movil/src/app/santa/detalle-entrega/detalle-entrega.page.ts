import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from "@ionic-native/google-maps";

import { Platform, LoadingController, ToastController } from "@ionic/angular";
import { ApiService } from '../../services/api.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-detalle-entrega',
  templateUrl: './detalle-entrega.page.html',
  styleUrls: ['./detalle-entrega.page.scss'],
})
export class DetalleEntregaPage implements OnInit {

  map: GoogleMap;
  loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private apiService: ApiService,
    public alertController: AlertController, private modalController: ModalController
  ) { }

  miCarta: any;
  Productos: any;
  totalCarta: number = 0;
  async ngOnInit() {
    console.log("REcibido::", this.miCarta)
    this.getDetalleProductos()
    await this.platform.ready();
    await this.loadMap();

  }
  getDetalleProductos() {
    this.apiService.getDetalleCarta(this.miCarta.idCarta).toPromise().then((res) => {
      this.Productos = res;
      this.getTotal();
    });
  }

  async getTotal() {

    for await (let p of this.Productos) {
      this.totalCarta += (p.cantidad) * (p.precio)
    }
  }

  async closeModal() {
    await this.modalController.dismiss(this.Productos);
  }
  loadMap() {
    this.map = GoogleMaps.create("map_canvas", {
      camera: {
        target: {
          title: this.miCarta.usuario,
          lat: this.miCarta.latitud,
          lng: this.miCarta.longitud,
          animation: GoogleMapsAnimation.BOUNCE
        },
        zoom: 18,
        tilt: 30
      }
    });
    let ubicacion = {
      lat: this.miCarta.latitud,
      lng: this.miCarta.longitud
    }
    let marker: Marker = this.map.addMarkerSync({
      title: this.miCarta.usuario,
      snippet: "",
      position: {
        lat: this.miCarta.latitud,
        lng: this.miCarta.longitud
      },
      animation: GoogleMapsAnimation.BOUNCE
    });
    marker.showInfoWindow();
  }


}
