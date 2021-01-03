import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-kid',
  templateUrl: './kid.component.html',
  styleUrls: ['./kid.component.css']
})
export class KidComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }


  buenasAcciones: any;
  Usuario: any
  ngOnInit(): void {
    this.Usuario = JSON.parse(localStorage.getItem("user"));

    this.getBuenasAcciones();
    
  }

  public obtenerEdad(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getBuenasAcciones(){
    this.apiService.getAccionesByAge(""+this.obtenerEdad(this.Usuario.fecha)).toPromise().then((res) => {
      this.buenasAcciones = res
    });
  }

  realizar(){
    swal.fire({
      icon: 'info',
      title: '¿Realizar Accion?.',
      text: '¿Marcar esta buena accion como completada?',
    })
  }
  


}
