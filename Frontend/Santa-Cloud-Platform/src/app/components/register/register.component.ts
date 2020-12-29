import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

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
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDepartamentos();
  }

  validateRegistro() {
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
      let idPadre = this.crearUsuario(padre, null, email, this.genderValue, myDate,
        telefono, null, direccion, null,
        '3', this.obtenerIdMunicipio(), this.depIdValue, pass)
      //Crear Hijo
      this.crearUsuario(hijo, nickname, email, this.genderValue, myDate, telefono,
        bastones, direccion, idPadre,
        '4', this.obtenerIdMunicipio(), this.depIdValue, pass)
    }


  }

  obtenerIdMunicipio(): string {
    for (let i = 0; i < this.Municipios.length; i++) {
      if (this.Municipios[i].nombre == this.munValue) {
        return this.Municipios[i].id
      }
    }
    return "-1"
  }

  crearUsuario(nombre: string, nickname: string, email: string, genero: string, fecha: string,
    telefono: string, bastones: string, direccion: string, idPadre: string, idRol: string,
    idMunicipio: string, idDepartamento: string, pass: string): string {

    console.log("nombre: ", nombre)
    console.log("nick: ", nickname)
    console.log("email: ", email)
    console.log("genero: ", genero)
    console.log("fecha: ", fecha)
    console.log("telefono: ", telefono)
    console.log("bastones:", bastones)
    console.log("direccion: ", direccion)
    console.log("idPadre: ", idPadre)
    console.log("idRol: ", idRol)
    console.log("idMunicipio: ", idMunicipio)
    console.log("idDepartamento: ", idDepartamento)

    this.apiService.newUser(nombre, nickname, email, pass, genero, fecha,
      telefono, bastones, direccion, idRol, idMunicipio, idPadre).toPromise().then((res) => {
        this.nuevoUsuario = res;
        return this.nuevoUsuario.id;
      })

      return ""
  }


  camposValidos(correo: string, padre: string, hijo: string, nickname: string,
    pass: string, myDate: string, telefono: string, bastones: string,
    genero: string, municipio: string, departamento: string, direccion: string): boolean {

    if (correo.length > 0, padre.length > 0, hijo.length > 0, nickname.length > 0,
      pass.length > 0, myDate.length > 0, telefono.length > 0, bastones.length > 0,
      direccion.length > 0, municipio.length > 0, departamento.length > 0) {

      if (!this.emailIsValid(correo)) {
        alert("Porfavor ingrese un correo valido");
        return false
      }

      if (nickname.length > 50) {
        alert("Porfavor ingrese un nickname menor a 50 caracteres");
        return false
      }


    } else {
      alert("Porfavor Llene todos los campos");
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
}
