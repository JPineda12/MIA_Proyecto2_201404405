import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service'
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-editar-perfil-hijo',
  templateUrl: './editar-perfil-hijo.page.html',
  styleUrls: ['./editar-perfil-hijo.page.scss'],
})
export class EditarPerfilHijoPage implements OnInit {

  constructor(private storage: Storage, private apiService: ApiService,
    public alertController: AlertController, private modalController: ModalController) { }


  nombre: string = "sdladkañsld";
  nickname: string = "aksldsklda";
  email: string;
  genero: string;
  fecha: string;
  telefono: string;
  bastones: string;
  direccion: string;
  capacidadBastones: string;
  hijo: any
  idMunicipio: string;
  latitud: string;
  longitud: string;
  pass: string = "";
  Departamentos: any;
  depValue: string;
  Municipios: any;
  munValue: string;

  ngOnInit() {
    this.getDepartamentos();
    console.log("Receivenien: ",this.hijo);
    this.nombre = this.hijo.nombre;
    this.nickname = this.hijo.nickname;
    this.email = this.hijo.email;
    this.genero = this.hijo.genero;
    this.telefono = this.hijo.telefono;
    this.fecha = this.hijo.fecha;
    this.bastones = this.hijo.bastones;
    this.direccion = this.hijo.direccion;
    this.capacidadBastones = this.hijo.capacidadBastones;
    this.depValue = this.hijo.departamento;
    this.munValue = this.hijo.municipio;
  }

  getDepartamentos() {
    this.apiService.getDepartamentos().subscribe(
      res => {
        this.Departamentos = res;
        this.getMunicipios();
      },

      err => console.log("Error de conexion DB: ", err)
    );
  }

  getMunicipios() {
    let depIdValue = ""
    for (let i = 0; i < this.Departamentos.length; i++) {
      if (this.Departamentos[i].nombre == this.depValue) {
        depIdValue = this.Departamentos[i].id
        break;
      }
    }
    this.apiService.getMunicipios(depIdValue).subscribe(
      res => {
        this.Municipios = res;

      },

      err => console.log("Error de conexion DB: ", err)
    );
  }


  async closeModal() {
    await this.modalController.dismiss(this.hijo);
  }

  async editar() {
    const alert = await this.alertController.create({
      header: '¿Editar Perfil?',
      message: 'El perfil del hijo sera editado',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Si, editar',
          handler: async () => {
            if (this.pass == "") {
              this.pass = this.hijo.pass;
            }
            this.apiService.updateHijo(this.hijo.idUsuario, this.nombre, this.nickname
              , this.email, this.pass, this.genero, this.hijo.fecha, this.telefono, this.bastones
              , this.capacidadBastones, this.direccion, this.hijo.latitud, this.hijo.longitud, this.hijo.idMunicipio).toPromise().then(async (res) => {
                this.mostrarMensajeOk()
                this.hijo.nombre = this.nombre;
                this.hijo.nickname = this.nickname;
                this.hijo.email = this.email;
                this.hijo.pass = this.pass;
                this.hijo.genero = this.genero;
                this.hijo.telefono = this.telefono;
                this.hijo.bastones = this.bastones;
                this.hijo.capacidadBastones = this.capacidadBastones;
                this.hijo.direccion = this.direccion;
                
                await this.modalController.dismiss(this.hijo);

              });

          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarMensajeOk() {
    const alert = await this.alertController.create({
      header: 'Perfil de hijo Editado!',
      buttons: ['OK']
    });
    await alert.present();
  }
}
