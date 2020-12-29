import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,  private apiService: ApiService) { }
  usuario: any;
  ngOnInit(): void {
  
    
  }

  validateLogin(){
    let email = ((document.getElementById("username") as HTMLInputElement).value);
    let pass = ((document.getElementById("pass") as HTMLInputElement).value);
    this.apiService.loginemail(email, pass).subscribe(res => {
      this.usuario = res;
      console.log(this.usuario)
      if(this.usuario.auth){
        console.log("SI MI LOCO")
      }else{
        console.log("NEL BRO")
      }
    },
      error => console.log(error)
    );
  }

  register(){
    this.router.navigate(["/register"]);
  }
  
  
  

}
