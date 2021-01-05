import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }
  usuario: any;
  titularAlerta: string = ""
  ngOnInit(): void {
  }

  validateLogin() {
    let nickname = ((document.getElementById("username") as HTMLInputElement).value);
    let pass = ((document.getElementById("pass") as HTMLInputElement).value);
    this.apiService.loginNickname(nickname, pass).subscribe(res => {
      this.usuario = res;
      console.log(this.usuario)
      if (this.usuario.auth) {
        localStorage.setItem("user", JSON.stringify(this.usuario))
        if (this.usuario.idRol == 1) {
          this.router.navigate(["/admin"]);
        }else if(this.usuario.idRol == 2){
          this.router.navigate(["/elfo"])
        }else if(this.usuario.idRol == 3){
          this.router.navigate(["/padre"])
        }else if(this.usuario.idRol == 4){
          this.router.navigate(["/kid"])
        }else{
          swal.fire({
            icon: 'error',
            title: 'Error de ROL.',
            text: 'Rol Incorrecto, contacte un administrador',
          })
          localStorage.clear();
        }
      } else {
        swal.fire({
          icon: 'error',
          title: 'Error de autenticacion.',
          text: 'Usuario o Contraseña Incorrectos',
        })
      }
      ((document.getElementById("pass") as HTMLInputElement).value) = ""
    },
      error => console.log(error)
    );
  }

  register() {
    this.router.navigate(["/register"]);
  }




}
