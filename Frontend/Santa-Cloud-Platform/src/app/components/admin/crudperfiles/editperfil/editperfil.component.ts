import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import swal from 'sweetalert2';
import { MouseEvent } from '@agm/core';

export interface Perfil {
  idUsuario: string
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
  padre: string;
}

export interface Rol {
  id: string
  nombre: string
}

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrls: ['./editperfil.component.css']
})
export class EditperfilComponent {

  constructor(public dialogRef: MatDialogRef<EditperfilComponent>
    , @Inject(MAT_DIALOG_DATA) public data: Perfil, private apiService: ApiService) { }


  Padres: any;
  padreValue: string = "";
  Municipios: any;
  munValue: string = "";
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

    this.rolValue = this.data.rol;
    this.depValue = this.data.departamento;
    this.munValue = this.data.municipio;
    if (this.data.rol == "Kid") {
      this.getPadres()
      this.padreValue = this.data.padre;
    }

    this.lat = this.data.latitud;
    this.long = this.data.longitud;
    this.genderValue = this.data.genero;
    ((document.getElementById("nombre") as HTMLInputElement).value) = this.data.nombre;
    ((document.getElementById("email") as HTMLInputElement).value) = this.data.email;
    ((document.getElementById("nombre") as HTMLInputElement).value) = this.data.nombre;
    ((document.getElementById("fecha") as HTMLInputElement).value) = this.data.fecha;
    ((document.getElementById("nickname") as HTMLInputElement).value) = this.data.nickname;
    ((document.getElementById("pass") as HTMLInputElement).value) = this.data.pass;
    ((document.getElementById("telefono") as HTMLInputElement).value) = this.data.telefono;
    ((document.getElementById("bastones") as HTMLInputElement).value) = "" + this.data.bastones;
    ((document.getElementById("capacidadBastones") as HTMLInputElement).value) = "" + this.data.capacidadBastones;
    ((document.getElementById("direccion") as HTMLInputElement).value) = this.data.direccion;
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
        this.Departamentos = res;
        this.getMunicipios(this.data.departamento);
      },

      err => console.log("Error de conexion DB: ", err)
    );
  }
  getMunicipios(dep: string) {
    for (let i = 0; i < this.Departamentos.length; i++) {
      if (this.Departamentos[i].nombre == dep) {
        this.depIdValue = this.Departamentos[i].id
        break;
      }
    }
    this.apiService.getMunicipios(this.depIdValue).subscribe(
      res => {
        this.Municipios = res;
      },

      err => console.log("Error de conexion DB: ", err)
    );
  }

  markerDragEnd($event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.long = $event.coords.lng;
    console.log(this.lat);
    console.log(this.long);
  }

  buscarDireccion() {
    let direccion = ((document.getElementById("direccion") as HTMLInputElement).value);
    let ubicacion = direccion + "," + this.munValue + "," + this.depValue
    let datos: any;
    this.apiService.getUbicacion(ubicacion).subscribe(res => {
      datos = res
      this.lat = datos.results[0].geometry.location.lat
      this.long = datos.results[0].geometry.location.lng
      console.log(this.lat);
      console.log(this.long);
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
    this.data.idPadre = this.getIdPadre();
    this.data.genero = this.genderValue;
    this.data.municipio = this.munValue;
    this.data.idMunicipio = this.obtenerIdMunicipio();
    this.data.departamento = this.depValue;
    console.log(this.data.fecha);
    (await this.apiService.updateUser(this.data.idUsuario, this.data.nombre, this.data.nickname, this.data.email,
      this.data.pass, this.data.genero, this.data.fecha, this.data.telefono, "" + this.data.bastones,
      this.data.direccion, this.data.idRol, this.data.idMunicipio, this.data.idPadre, "" + this.data.capacidadBastones,
      "" + this.lat, "" + this.long)).toPromise().then((res) => {
        this.usuario = res;
        if (this.usuario.fecha != "") {
          swal.fire({
            icon: 'success',
            title: 'Nuevo registro Editado!',
            text: 'Se edito un Usuario',
          })
        }
      }, err => swal.fire({
        icon: 'error',
        title: 'Error al insertar!',
        text: 'Ocurrio un error al intentar editar en la base de datos',
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
    if (this.rolValue != "Kid") {
      ((document.getElementById("bastones") as HTMLInputElement).value) = "";
      ((document.getElementById("capacidadBastones") as HTMLInputElement).value) = "";
    }
    if (this.rolValue != "Kid" && this.rolValue != "Elfo") {
      ((document.getElementById("nickname") as HTMLInputElement).value) = "";
      ((document.getElementById("email") as HTMLInputElement).value) = this.data.email;
    }
    if (this.rolValue != "Padre" && this.rolValue != "Santa") {
      ((document.getElementById("email") as HTMLInputElement).value) = "";
    }
    if (this.rolValue == "Kid") {
      ((document.getElementById("bastones") as HTMLInputElement).value) = "" + this.data.bastones;
      ((document.getElementById("capacidadBastones") as HTMLInputElement).value) = "" + this.data.capacidadBastones;
    }
    if (this.rolValue != "Kid") {
      this.Padres = []
      this.padreValue = ""
    } else {
      this.getPadres();
    }
  }
}
