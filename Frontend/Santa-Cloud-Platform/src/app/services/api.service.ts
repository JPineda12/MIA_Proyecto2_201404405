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

  getUsers() {
    return this.http.get(`${this.API_URI}/api/users`);
  }

  getRoles() {
    return this.http.get(`${this.API_URI}/api/roles`);
  }

  getDepartamentos(){
    return this.http.get(`${this.API_URI}/api/departamentos`);
  }

  getMunicipios(idDepartamento: string){
    return this.http.get(`${this.API_URI}/api/municipios/${idDepartamento}`);
  }

  getUsersById(id: string){
    return this.http.get(`${this.API_URI}/api/users/${id}`);
  }

  getUserByEmail(correo: string){
    return this.http.get(`${this.API_URI}/api/users/${correo}`);
  }

  getHijos(idPadre: string){
    return this.http.get(`${this.API_URI}/api/getHijos/${idPadre}`);
  }

  loginemail(email: string, pass: string) {
    const customHeaders = { 'email': email, 'password': pass }
    return this.http.get(`${this.API_URI}/api/loginemail/`, { headers: customHeaders });
  }

  newUser(nombre: string, nickname: string, email: string, pass: string,
    gender: string, fecha: string, tel: string, bastones: string, direccion: string, 
    idRol: string, idMunicipio: String, idPadre: String) {
    return this.http.post(`${this.API_URI}/api/users/`,
      {
        "nombre": nombre,
        "nickname": nickname,
        "email": email,
        "pass": pass,
        "gender": gender,
        "fecha": fecha,
        "tel": tel,
        "bastones": bastones,
        "direccion": direccion,
        "idRol": idRol,
        "idMunicipio": idMunicipio,
        "idPadre": idPadre
      }, { headers: this.headers }).pipe(map(data => data));
  }

  getAcciones(){
    return this.http.get(`${this.API_URI}/api/goodActions`);
  }

  getAccionesById(id: string){
    return this.http.get(`${this.API_URI}/api/goodActions/${id}`);
  }

  insertarAccion(titulo: string, descripcion: string, recompensa: string, minEdad: string){
    return this.http.post(`${this.API_URI}/api/goodActions/`,
      {
        "titulo": titulo,
        "descripcion": descripcion,
        "recompensa": recompensa,
        "minEdad": minEdad
      }, { headers: this.headers }).pipe(map(data => data));
  }

  updateAccion(titulo: string, descripcion: string, recompensa: string, edadMinima: string, idAccion: string){

    return this.http.put(`${this.API_URI}/api/goodActions/`,
    {
      "titulo": titulo,
      "descripcion": descripcion,
      "recompensa": recompensa,
      "edadMinima": edadMinima,
      "idAccion": idAccion
    }, { headers: this.headers }).pipe(map(data => data));
  }

  deleteAccion(idAccion: string){
    const customHeaders = { 'idAccion': idAccion}
    return this.http.delete(`${this.API_URI}/api/goodActions/`, { headers: customHeaders });
  }

}
