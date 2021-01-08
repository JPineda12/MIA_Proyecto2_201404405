import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


export interface Publicacion{
  idPublicacion: string;
  texto: string;
  imagen: string;
  estado: string;
  idSanta: string;
  usuario: string;

}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private router: Router, private storage: Storage, private apiService: ApiService,
    public alertController: AlertController, private camera: Camera) { }

  textoPublicacion: string = "";
  Usuario: any;
  Publicaciones;
  ngOnInit() {

  }
  nombre: string = "";
  imgURL = ""
  ionViewWillEnter() {
    this.storage.get('user').then((val) => {
      this.Usuario = val;
      this.nombre = this.Usuario.nombre;
      this.Publicaciones = [];
      this.getPublicaciones();
    });
  }

  getPublicaciones(){
    this.apiService.getPublicacionesByUser(this.Usuario.idUsuario).toPromise().then(async (res) => {
      let auxPubs: any = res;
      for await(let publi of auxPubs){
        let p: Publicacion = {
          idPublicacion: publi.idPublicacion,
          texto: publi.texto,
          imagen: publi.imagen,
          estado: publi.estado,
          idSanta: publi.idSanta,
          usuario: publi.usuario,
        }
        this.Publicaciones.push(p)
      }
    })
  }
  publicar() {
    this.apiService.createPublicacion(this.textoPublicacion, null, "0", this.Usuario.idUsuario).toPromise().then((res) => {
      this.Publicaciones = [];
      this.textoPublicacion = ""
      this.getPublicaciones()
    })
  }

  editar(publicacion){

  }

  borrar(publicacion){

  }

  getCamera() {
    this.camera.getPicture(
      {
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.FILE_URI
      }
    ).then((res) => {
      this.imgURL = res;
    }).catch((err) => {
      console.log(err)
    })
  }

  getGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI
    }).then((res) => {
      this.imgURL = res;
    }).catch((err) => {
      console.log(err)
    })
  }

  salir() {
    this.storage.clear();
    this.router.navigate(["/login"])
  }

}
