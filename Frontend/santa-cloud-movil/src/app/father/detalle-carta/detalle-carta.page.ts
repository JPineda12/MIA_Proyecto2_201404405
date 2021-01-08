import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service'
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
  selector: 'app-detalle-carta',
  templateUrl: './detalle-carta.page.html',
  styleUrls: ['./detalle-carta.page.scss'],
})
export class DetalleCartaPage implements OnInit {

  constructor(private storage: Storage, private apiService: ApiService,
    public alertController: AlertController, private modalController: ModalController) { }

  nombreUsuario;
  mensaje;
  idCarta;
  estado;
  fecha;
  idUsuario;
  products;
  miCarta: Carta;
  Productos;
  articulosBorrar = [];
  ngOnInit() {
    this.miCarta = {
      nombreUsuario: this.nombreUsuario,
      mensaje: this.mensaje,
      idCarta: this.idCarta,
      estado: this.estado,
      fecha: this.fecha,
      idUsuario: this.idUsuario,
      productos: this.products
    }
    console.log(this.miCarta);
    this.getDetalleProductos();
  }
  async closeModal() {
    const alert = await this.alertController.create({
      header: '¿Cerrar detalle?',
      message: 'Los productos eliminados no se podran recuperar!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Si, cerrar',
          handler: async () => {
            let contador = 0;
            for await (let articulo of this.articulosBorrar) {
              this.apiService.borrarArticulo(articulo.idArticulo).toPromise().then((res) => {
                contador++;
              });
            }
            await this.modalController.dismiss(this.Productos);
          }
        }
      ]
    });
    await alert.present();
  }

  getDetalleProductos() {
    this.apiService.getDetalleCarta(this.miCarta.idCarta).toPromise().then((res) => {
      this.Productos = res;
    });
  }

  addCantidad(producto) {
    var index = this.Productos.indexOf(producto);
    if (~index) {
      this.Productos[index].cantidad += 1;
    }
  }

  restarCantidad(producto) {
    if ((producto.cantidad - 1 > 0)) {
      var index = this.Productos.indexOf(producto);
      if (~index) {
        this.Productos[index].cantidad -= 1;
      }
    }
  }

  eliminar(producto) {
    const index = this.Productos.indexOf(producto, 0);
    if (index > -1) {
      this.articulosBorrar.push(producto);
      this.Productos.splice(index, 1);
    }
  }
}
