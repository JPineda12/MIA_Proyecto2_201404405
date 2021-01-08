import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  goodActionsimg: string = "assets/images/goodActions.jpg"
  productsimg: string = "assets/images/productsCRUD.jpg"
  profileimg: string = "assets/images/perfilesCRUD.jpg"
  cargamasivaimg: string = "assets/images/bulkload.jpeg"
  chatimg: string = "assets/images/chatelfos.jpg"
  reportesimg: string = "assets/images/adminreports.jpg"
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  acceder(opcion: number) {

    if (opcion == 0) {
      swal.fire({
        icon: 'info',
        title: 'Buenas Acciones',
        text: 'CRUD ACCIONES',
      })
      this.router.navigate(["/adminacciones"]);
    }else if (opcion == 1) {
      swal.fire({
        icon: 'info',
        title: 'Productos',
        text: 'CRUD Productos',
      })
      this.router.navigate(["/adminproductos"]);
    }else if (opcion == 2) {
      swal.fire({
        icon: 'info',
        title: 'Perfiles',
        text: 'CRUD Perfiles',
      })
      this.router.navigate(["/adminperfiles"]);
    }else if (opcion == 3) {
      this.router.navigate(["/cargamasiva"]);
      swal.fire({
        icon: 'info',
        title: 'Carga Masiva',
        text: 'Carga Masiva',
      })
    }else if (opcion == 4) {
      swal.fire({
        icon: 'info',
        title: 'Chat Elfos',
        text: 'Chat',
      })
    }else if (opcion == 5) {
      swal.fire({
        icon: 'info',
        title: 'Reportes',
        text: 'Reportes',
      })
    }
  }

}
