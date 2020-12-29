import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  Usuario: any;
  Hijos: any;
  ngOnInit(): void {
    this.Usuario = JSON.parse(localStorage.getItem("user"));
    this.getHijos()
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  getHijos(){
    if (this.Usuario.idRol == 3){
      this.apiService.getHijos(this.Usuario.idUsuario).toPromise().then((res) => {
        this.Hijos = res
        console.log(this.Hijos)
      });
    } 
  }
}
