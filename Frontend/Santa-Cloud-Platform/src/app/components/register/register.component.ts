import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MouseEvent } from '@agm/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Roles: any;
  Generos = [{ nombre: "Masculino" }, { nombre: "Femenino" }]
  Departamentos: any
  depValue: string
  depIdValue: string
  Municipios: any
  munValue: string
  selectedValue: string;
  genderValue: string;
  nuevoUsuario: any
  lat = 14.5873057;
  long = -90.55555;
  constructor(private router: Router, private apiService: ApiService) { }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.long = $event.coords.lng;
  }
  ngOnInit(): void {
    this.getDepartamentos();
  }

  async validateRegistro() {
    let email = ((document.getElementById("email") as HTMLInputElement).value);
    let padre = ((document.getElementById("padre") as HTMLInputElement).value);
    let hijo = ((document.getElementById("hijo") as HTMLInputElement).value);
    let nickname = ((document.getElementById("nickname") as HTMLInputElement).value);
    let pass = ((document.getElementById("pass") as HTMLInputElement).value);
    let myDate = ((document.getElementById("fechaHijo") as HTMLInputElement).value);
    let telefono = ((document.getElementById("telefono") as HTMLInputElement).value);
    let bastones = ((document.getElementById("bastones") as HTMLInputElement).value);
    let direccion = ((document.getElementById("direccion") as HTMLInputElement).value);

    if (this.camposValidos(email, padre, hijo, nickname, pass, myDate, telefono, bastones,
      this.genderValue, this.munValue, this.depValue, direccion)) {

      //Crear Padre
      await this.crearUsuario(padre, null, email, this.genderValue, myDate,
        telefono, null, direccion, null,
        '3', this.obtenerIdMunicipio(), this.depIdValue, pass)
      //Obtener Id del padre recien creado
      let idPadre = await this.obtenerIdPadre(email)
      //Crear Hijo
      await this.crearUsuario(hijo, nickname, email, this.genderValue, myDate, telefono,
        bastones, direccion, idPadre,
        '4', this.obtenerIdMunicipio(), this.depIdValue, pass)
        swal.fire({
          icon: 'success',
          title: 'Registro Completo',
          text: 'Usuarios creados, puede iniciar sesion con sus credenciales',
        })
        this.router.navigate(["/login"]);

    }


  }

  async obtenerIdPadre(email: string): Promise<string> {
    let padre: any
    let myId: string = await new Promise((resolve, reject) => {
      this.apiService.getUserByEmail(email).toPromise().then((res) => {
        padre = res
        console.log("DAD", padre)
        resolve(padre[0].idUsuario)
      });
    })

    return myId;
  }

  obtenerIdMunicipio(): string {
    for (let i = 0; i < this.Municipios.length; i++) {
      if (this.Municipios[i].nombre == this.munValue) {
        return this.Municipios[i].id
      }
    }
    return "-1"
  }

  async crearUsuario(nombre: string, nickname: string, email: string, genero: string, fecha: string,
    telefono: string, bastones: string, direccion: string, idPadre: string, idRol: string,
    idMunicipio: string, idDepartamento: string, pass: string) {

    this.nuevoUsuario = await new Promise(async (resolve, reject) => {
      (await this.apiService.newUser(nombre, nickname, email, pass, genero, fecha,
        telefono, "0", direccion, idRol, idMunicipio, idPadre, bastones, "" + this.lat, "" + this.long)).toPromise().then((res) => {
          resolve(res)
        })
    });

  }


  camposValidos(correo: string, padre: string, hijo: string, nickname: string,
    pass: string, myDate: string, telefono: string, bastones: string,
    genero: string, municipio: string, departamento: string, direccion: string): boolean {

    if (correo.length > 0, padre.length > 0, hijo.length > 0, nickname.length > 0,
      pass.length > 0, myDate.length > 0, telefono.length > 0, bastones.length > 0,
      direccion.length > 0, municipio.length > 0, departamento.length > 0) {

      if (!this.emailIsValid(correo)) {
        swal.fire({
          icon: 'error',
          title: 'Correo Invalido',
          text: 'Porfavor ingrese un correo valido',
        })        
        return false
      }

      if (nickname.length > 50) {
        swal.fire({
          icon: 'error',
          title: 'Nickname invalido',
          text: 'Porfavor ingrese un nickname menor a 50 caracteres',
        })        
        return false
      }

      if (telefono.length > 10) {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ingrese un telefono menor a 10 caracteres',
        })
        return false
      }


    } else {
      swal.fire({
        icon: 'error',
        title: 'Error Faltan campos por llenar',
        text: 'Complete todos los campos!',
      })      
      return false
    }

    return true
  }

  emailIsValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  regresar() {
    this.router.navigate(["/login"]);
  }

  getRoles() {
    this.apiService.getRoles().subscribe(
      res => {
        console.log(res);
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
}
