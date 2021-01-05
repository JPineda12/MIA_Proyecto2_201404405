import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  API_URI = "http://localhost:3000"
  API_KEY = "AIzaSyD1sC6IYY17ZLNwyt0E4bSDpeR5oE_Dqr0"

  getUsers() {
    return this.http.get(`${this.API_URI}/api/users`);
  }

  loginemail(email: string, pass: string) {
    const customHeaders = { 'email': email, 'password': pass }
    return this.http.get(`${this.API_URI}/api/loginemail/`, { headers: customHeaders });
  }

  getHijos(idPadre: string) {
    return this.http.get(`${this.API_URI}/api/getHijos/${idPadre}`);
  }

  getPendingGoodDeeds(idUsuario: string) {
    return this.http.get(`${this.API_URI}/api/pendingGoodDeeds/${idUsuario}`);
  }

  changeGoodDeedState(idAccion: string, idUsuario: string, nuevoEstado: string) {
    return this.http.put(`${this.API_URI}/api/changeGoodDeedState/`,
      {
        "idAccion": idAccion,
        "idUsuario": idUsuario,
        "estado": nuevoEstado
      }, { headers: this.headers }).pipe(map(data => data));
  }

}
