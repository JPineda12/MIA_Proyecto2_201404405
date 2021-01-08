import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File, IWriteOptions, FileEntry } from '@ionic-native/file/ngx';
export interface Publicacion {
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

  constructor(private file: File, private router: Router, private storage: Storage, private apiService: ApiService,
    public alertController: AlertController, private camera: Camera) { }

  textoPublicacion: string = "";
  Usuario: any;
  nuevaImagen = null;
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

  getPublicaciones() {
    this.apiService.getPublicacionesByUser(this.Usuario.idUsuario).toPromise().then(async (res) => {
      let auxPubs: any = res;
      for await (let publi of auxPubs) {
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
    console.log("Hmm: ",this.nuevaImagen)
    this.apiService.createPublicacion(this.textoPublicacion, this.nuevaImagen, "0", this.Usuario.idUsuario).toPromise().then((res) => {
      this.Publicaciones = [];
      this.textoPublicacion = ""
      this.imgURL = null
      this.getPublicaciones()
    })
  }

  editar(publicacion) {

  }

  borrar(publicacion) {

  }

  getCamera() {
    this.camera.getPicture(
      {
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.FILE_URI
      }
    ).then((res) => {
      this.imgURL = res;
      this.apiService.uploadImage(this.imgURL)
    }).catch((err) => {
      console.log(err)
    })
  }
  getGallery() {

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.camera.getPicture(options).then((imageData) => {
      //console.log(imageData);
      this.imgURL = 'data:image/jpeg;base64,' + imageData;
      const file = this.DataURIToBlob(this.imgURL)
      const formData = new FormData();
      formData.append('file', file, 'imagen.jpg')
      this.apiService.uploadImage(formData).toPromise().then(response => {
        let nueva: any = response;
        this.nuevaImagen = nueva.Message;
      })
    }, (err) => {
      // Handle error
    });

  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      formData.append('name', 'Hello');
      formData.append('file', imgBlob, file.name);
      this.apiService.uploadImage(formData).subscribe(dataRes => {
        console.log(dataRes);
      });
    };
    reader.readAsArrayBuffer(file);
  }


  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  salir() {
    this.storage.clear();
    this.router.navigate(["/login"])
  }

}
