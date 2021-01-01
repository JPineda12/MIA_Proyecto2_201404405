import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  goodActionsimg: string = "http://localhost:3020/goodActions.jpg"
  productsimg: string = "http://localhost:3020/productsCRUD.jpg"
  profileimg: string = "http://localhost:3020/perfilesCRUD.jpg"
  cargamasivaimg: string = "http://localhost:3020/bulkload.jpeg"
  chatimg: string = "http://localhost:3020/chatelfos.jpg"
  reportesimg: string = "http://localhost:3020/adminreports.jpg"
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
    }else if (opcion == 3) {
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
