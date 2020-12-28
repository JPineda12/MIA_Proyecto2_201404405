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
  selectedValue: string;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRoles()
  }

  validateRegistro(){
    console.log("AVERR: ",this.Roles);

    alert(this.selectedValue)
  }

  regresar(){
    this.router.navigate(["/login"]);
  }

  getRoles(){
    this.apiService.getRoles().subscribe(
      res => {
        console.log(res);
        this.Roles = res;
      },

      err => console.log("Error de conexion DB: ", err)
    );
  }
}
