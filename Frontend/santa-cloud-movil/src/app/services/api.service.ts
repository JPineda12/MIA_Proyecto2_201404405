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

  getDepartamentos() {
    return this.http.get(`${this.API_URI}/api/departamentos`);
  }

  getMunicipios(idDepartamento: string) {
    return this.http.get(`${this.API_URI}/api/municipios/${idDepartamento}`);
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

  getCartas(idSon: string, estado: string) {
    const customHeaders = { 'idusuario': idSon, 'estado': estado }
    return this.http.get(`${this.API_URI}/api/cartas/`, { headers: customHeaders });
  }

  getLastIdCarta() {
    return this.http.get(`${this.API_URI}/api/lastIdCarta`);
  }
  getDetalleCarta(idCarta: string) {
    return this.http.get(`${this.API_URI}/api/articulos/${idCarta}`);
  }

  borrarArticulo(idArticulo: string) {
    return this.http.delete(`${this.API_URI}/api/articulos/${idArticulo}`);
  }

  updateEstadoCarta(idCarta: string, estado: string) {
    return this.http.put(`${this.API_URI}/api/cartas/`,
      {
        "idCarta": idCarta,
        "estado": estado
      }, { headers: this.headers }).pipe(map(data => data));
  }

  updateHijo(idHijo: string, nombre: string, nickname: string, email: string, pass: string,
    genero: string, fecha: string, tel: string, bastones: string, capacidadBastones: string, direccion: string,
    latitud: string, longitud: string, idMunicipio: string) {
    return this.http.put(`${this.API_URI}/api/updateHijo/`,
      {
        "idUsuario": idHijo,
        "nombre": nombre,
        "nickname": nickname,
        "email": email,
        "pass": pass,
        "gender": genero,
        "fecha": fecha,
        "tel": tel,
        "bastones": bastones,
        "capacidadBastones": capacidadBastones,
        "direccion": direccion,
        "latitud": latitud,
        "longitud": longitud,
        "idMunicipio": idMunicipio
      }, { headers: this.headers }).pipe(map(data => data));
  }

  getPublicaciones() {
    return this.http.get(`${this.API_URI}/api/publicaciones`);
  }

  getPublicacionesByUser(idSanta: string) {
    return this.http.get(`${this.API_URI}/api/publicaciones/${idSanta}`);
  }

  getComentariosPublicacion(idPublicacion: string) {
    return this.http.get(`${this.API_URI}/api/comentarios/${idPublicacion}`);
  }

  createPublicacion(texto: string, imagen: string, estado: string, idSanta: string) {
    return this.http.post(`${this.API_URI}/api/publicaciones/`,
      {
        "texto": texto,
        "imagen": imagen,
        "estado": estado,
        "idSanta": idSanta
      }, { headers: this.headers }).pipe(map(data => data));
  }

  updatePublicacion(texto: string, imagen: string, idPublicacion: string) {
    return this.http.put(`${this.API_URI}/api/publicaciones/`,
      {
        "texto": texto,
        "imagen": imagen,
        "idPublicacion": idPublicacion
      }, { headers: this.headers }).pipe(map(data => data));
  }

  deletePublicacion(idPublicacion: string) {
    return this.http.put(`${this.API_URI}/api/deletePublicacion/`,
      {
        "idPublicacion": idPublicacion
      }, { headers: this.headers }).pipe(map(data => data));
  }

  createComentario(mensaje: string, idPublicacion: string, idKid: string, estado: string) {
    return this.http.post(`${this.API_URI}/api/comentarios/`,
      {
        "mensaje": mensaje,
        "idPublicacion": idPublicacion,
        "idKid": idKid,
        "estado": estado
      }, { headers: this.headers }).pipe(map(data => data));
  }

  updateComentario(idComentario: string, mensaje: string,) {
    return this.http.put(`${this.API_URI}/api/comentarios/`,
      {
        "mensaje": mensaje,
        "idComentario": idComentario,
      }, { headers: this.headers }).pipe(map(data => data));
  }

  deleteComentario(idComentario) {
    return this.http.put(`${this.API_URI}/api/deleteComentario/`,
      {
        "idComentario": idComentario
      }, { headers: this.headers }).pipe(map(data => data));
  }



}
