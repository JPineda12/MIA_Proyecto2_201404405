import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditarPerfilHijoPage } from '../editar-perfil-hijo/editar-perfil-hijo.page';
@Component({
  selector: 'app-perfil-hijo',
  templateUrl: './perfil-hijo.page.html',
  styleUrls: ['./perfil-hijo.page.scss'],
})
export class PerfilHijoPage implements OnInit {

  constructor(private router: Router, private storage: Storage, private apiService: ApiService,
    public alertController: AlertController, private modalController: ModalController) { }

  Hijos: any = [];
  Usuario: any;

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('user').then((val) => {
      this.Usuario = val;
      this.Hijos= []
      this.getHijos()
    });
  }

  getHijos() {
    this.apiService.getHijos(this.Usuario.idUsuario).toPromise().then((res) => {
      this.Hijos = res;
      this.storage.set("hijos", this.Hijos);
    });
  }

  async editarPerfil(hijo: any) {
    const modal = await this.modalController.create({
      component: EditarPerfilHijoPage,
      componentProps: {
        hijo: hijo
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      const index = this.Hijos.indexOf(hijo, 0);
      if (index > -1) {
        this.Hijos[index] = dataReturned.data;
      }
      console.log(dataReturned.data);
      console.log(this.Hijos[index])
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', hijo);
    });
  }

  verMensajes(son) {

  }

  salir() {
    this.storage.clear();
    this.router.navigate(["/login"])
  }
}
