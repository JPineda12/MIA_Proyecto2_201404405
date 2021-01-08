import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private apiService: ApiService, private storage: Storage,
    public alertController: AlertController) { }

    email: string;
  password: string;
  usuario: any;

  ngOnInit() {
  }

  validarLogin() {
    this.apiService.loginemail(this.email, this.password).subscribe(async res => {
      this.usuario = res;
      if (this.usuario.auth) {
        this.storage.set("user", this.usuario);
        if (this.usuario.idRol == 2) {
          this.router.navigate(["/santa-tabs"]);
        } else if (this.usuario.idRol == 3) {
          this.router.navigate(["/father-tabs"])
        }
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Usuario no permitido',
          message: 'Solo usuarios santa y padre pueden logearse!',
          buttons: ['OK']
        });
        await alert.present();
        this.storage.clear();
      }
    });
  }

}
