import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import swal from 'sweetalert2';
import { MouseEvent } from '@agm/core';

export interface Perfil {
  nombre: string;
  nickname: string;
  email: string;
  genero: string;
  fecha: string;
  telefono: string;
  bastones: number;
  capacidadBastones: number;
  pass: string;
  direccion: string;
  latitud: number;
  longitud: number;
  municipio: string;
  departamento: string;
  idPadre: string;
  rol: string;
  idRol: string;
  idMunicipio: string;
  idDepartamento: string;
}

export interface Rol {
  id: string
  nombre: string
}

@Component({
  selector: 'app-addperfil',
  templateUrl: './addperfil.component.html',
  styleUrls: ['./addperfil.component.css']
})
export class AddperfilComponent {

  constructor(public dialogRef: MatDialogRef<AddperfilComponent>
    , @Inject(MAT_DIALOG_DATA) public data: Perfil, private apiService: ApiService) { }

  Padres: any;
  padreValue: string = "";
  Municipios: any;
  munValue: string;
  Departamentos: any;
  depValue: string = "";
  depIdValue: string;
  perfil: any
  Roles: any;
  rolValue: string = "";
  Generos = [{ nombre: "Masculino" }, { nombre: "Femenino" }]
  genderValue: string;
  usuario: any

  lat = 14.5873057;
  long = -90.55555;

  ngOnInit(): void {
    this.getRoles();
    this.getDepartamentos();

  }

  async getPadres() {
    (await this.apiService.getPadres()).subscribe(
      res => {
        this.Padres = res;
      },

      err => console.log("Error de conexion DB: ", err)
    );
  }

  getRoles() {
    this.apiService.getRoles().subscribe(
      res => {
        this.Roles = res;
      },

      err => console.log("Error de conexion DB: ", err)
    );
  }

  getDepartamentos() {
    this.apiService.getDepartamentos().subscribe(
      res => {
        console.log(res);
        this.Departamentos = res;
      },

      err => console.log("Error de conexion DB: ", err)
    );
  }
  getMunicipios() {
    for (let i = 0; i < this.Departamentos.length; i++) {
      if (this.Departamentos[i].nombre == this.depValue) {
        this.depIdValue = this.Departamentos[i].id
        break;
      }
    }
    this.apiService.getMunicipios(this.depIdValue).subscribe(
      res => {
        console.log(res);
        this.Municipios = res;
      },

      err => console.log("Error de conexion DB: ", err)
    );
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.long = $event.coords.lng;
  }

  buscarDireccion() {
    let direccion = ((document.getElementById("direccion") as HTMLInputElement).value);
    let ubicacion = direccion + "," + this.munValue + "," + this.depValue
    let datos: any;
    this.apiService.getUbicacion(ubicacion).subscribe(res => {
      datos = res
      this.lat = datos.results[0].geometry.location.lat
      this.long = datos.results[0].geometry.location.lng
    })
  }

  async save() {
    this.data.email = ((document.getElementById("email") as HTMLInputElement).value);
    this.data.nombre = ((document.getElementById("nombre") as HTMLInputElement).value);
    this.data.nickname = ((document.getElementById("nickname") as HTMLInputElement).value);
    this.data.pass = ((document.getElementById("pass") as HTMLInputElement).value);
    this.data.fecha = ((document.getElementById("fecha") as HTMLInputElement).value);
    this.data.telefono = ((document.getElementById("telefono") as HTMLInputElement).value);
    this.data.bastones = +((document.getElementById("bastones") as HTMLInputElement).value);
    this.data.capacidadBastones = +((document.getElementById("capacidadBastones") as HTMLInputElement).value);
    this.data.direccion = ((document.getElementById("direccion") as HTMLInputElement).value);
    this.data.rol = this.rolValue;
    this.data.idRol = await this.getRolId(this.rolValue);
    this.data.idPadre = this.getIdPadre()
    this.data.genero = this.genderValue;
    this.data.municipio = this.munValue;
    this.data.idMunicipio = this.obtenerIdMunicipio();
    this.data.departamento = this.depValue;
    this.data.latitud = this.lat;
    this.data.longitud = this.long;
    (await this.apiService.newUser(this.data.nombre, this.data.nickname, this.data.email,
      this.data.pass, this.data.genero, this.data.fecha, this.data.telefono, "" + this.data.bastones,
      this.data.direccion, this.data.idRol, this.data.idMunicipio, this.data.idPadre, "" + this.data.capacidadBastones,
      "" + this.data.latitud, "" + this.data.longitud)).toPromise().then((res) => {

        this.usuario = res;
        if (this.usuario.fecha != "") {
          swal.fire({
            icon: 'success',
            title: 'Nuevo registro insertado!',
            text: 'Se inserto un nuevo Usuario',
          })
        }
      }, err => swal.fire({
        icon: 'error',
        title: 'Error al insertar!',
        text: 'Ocurrio un error al intentar insertar en la base de datos',
      })
      );



    this.dialogRef.close(this.data);

  }

  obtenerIdMunicipio(): string {
    for (let i = 0; i < this.Municipios.length; i++) {
      if (this.Municipios[i].nombre == this.munValue) {
        return this.Municipios[i].id
      }
    }
    return null
  }

  getIdPadre(): string {
    if (this.rolValue == "Kid") {
      for (let i = 0; i < this.Padres.length; i++) {
        if (this.padreValue == this.Padres[i].nombre) {
          console.log("Dad",this.Padres[i].nombre)
          console.log("Mail:",this.Padres[i].email)
          this.data.email = this.Padres[i].email;
          return this.Padres[i].idUsuario;
        }
      }
    }
    return null;
  }
  close() {
    this.dialogRef.close(false);
  }

  async getRolId(nombreRol: string): Promise<string> {
    let idRol: string = await new Promise((resolve, reject) => {
      if (nombreRol == "Elfo") {
        resolve("1");
      } else if (nombreRol == "Santa") {
        resolve("2");
      } else if (nombreRol == "Padre") {
        resolve("3");
      } else if (nombreRol == "Kid") {
        resolve("4");
      } else {
        resolve(null);
      }

    })
    return idRol
  }

  clearInputs() {
    ((document.getElementById("bastones") as HTMLInputElement).value) = "";
    ((document.getElementById("capacidadBastones") as HTMLInputElement).value) = "";
    ((document.getElementById("nickname") as HTMLInputElement).value) = "";
    ((document.getElementById("email") as HTMLInputElement).value) = "";
    this.padreValue = ""

    if (this.rolValue != "Kid") {
      this.Padres = []
    } else {
      this.getPadres();
    }
  }
}
