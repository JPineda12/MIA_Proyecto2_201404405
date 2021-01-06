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

  getUbicacion(direccion: string) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=${direccion}`)
  }

  getRoles() {
    return this.http.get(`${this.API_URI}/api/roles`);
  }

  getDepartamentos() {
    return this.http.get(`${this.API_URI}/api/departamentos`);
  }

  async getPadres() {
    return this.http.get(`${this.API_URI}/api/getallpadres`);

  }

  getMunicipios(idDepartamento: string) {
    return this.http.get(`${this.API_URI}/api/municipios/${idDepartamento}`);
  }

  getUsersById(id: string) {
    return this.http.get(`${this.API_URI}/api/users/${id}`);
  }

  getUserByEmail(correo: string) {
    return this.http.get(`${this.API_URI}/api/getUserByEmail/${correo}`);
  }

  getHijos(idPadre: string) {
    return this.http.get(`${this.API_URI}/api/getHijos/${idPadre}`);
  }

  loginemail(email: string, pass: string) {
    const customHeaders = { 'email': email, 'password': pass }
    return this.http.get(`${this.API_URI}/api/loginemail/`, { headers: customHeaders });
  }

  loginNickname(nickname: string, pass: string){
    const customHeaders = { 'nickname': nickname, 'password': pass }
    return this.http.get(`${this.API_URI}/api/loginnickname/`, { headers: customHeaders });
  }

  async newUser(nombre: string, nickname: string, email: string, pass: string,
    gender: string, fecha: string, tel: string, bastones: string, direccion: string,
    idRol: string, idMunicipio: String, idPadre: String, capacidadBastones: string,
    latitud: string, longitud: string) {

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
        "capacidadBastones": capacidadBastones,
        "latitud": latitud,
        "longitud": longitud,
        "direccion": direccion,
        "idRol": idRol,
        "idMunicipio": idMunicipio,
        "idPadre": idPadre
      }, { headers: this.headers }).pipe(map(data => data));
  }

  updateUser(idUsuario: string, nombre: string, nickname: string, email: string, pass: string,
    gender: string, fecha: string, tel: string, bastones: string,
    direccion: string, idRol: string, idMunicipio: String, idPadre: String,
    capacidadBastones: string, latitud: string, longitud: string) {

    return this.http.put(`${this.API_URI}/api/users/`,
      {
        "idUsuario": idUsuario,
        "nombre": nombre,
        "nickname": nickname,
        "email": email,
        "pass": pass,
        "gender": gender,
        "fecha": fecha,
        "tel": tel,
        "bastones": bastones,
        "capacidadBastones": capacidadBastones,
        "latitud": latitud,
        "longitud": longitud,
        "direccion": direccion,
        "idRol": idRol,
        "idMunicipio": idMunicipio,
        "idPadre": idPadre
      }, { headers: this.headers }).pipe(map(data => data));
  }

  deleteUser(idUsuario: string) {
    return this.http.put(`${this.API_URI}/api/deleteUser/`,
      {
        "idUsuario": idUsuario,
      }, { headers: this.headers }).pipe(map(data => data));
  }

  getAcciones() {
    return this.http.get(`${this.API_URI}/api/goodDeeds`);
  }
  getAccionesByAge(idUsuario: string, minEdad: string){
    const customHeaders = { 'minedad': minEdad, 'idusuario': idUsuario }
    return this.http.get(`${this.API_URI}/api/goodDeedsByAge/`, { headers: customHeaders });
  }

  getPendingGoodDeeds(idUsuario: string){
    return this.http.get(`${this.API_URI}/api/pendingGoodDeeds/${idUsuario}`);
  }

  insertarAccionRealizar(idAccion: string, idUsuario: string, fecha: string, estado: string, recompensa: string){
    return this.http.post(`${this.API_URI}/api/goodDeedDone/`,
    {
      "idAccion": idAccion,
      "idUsuario": idUsuario,
      "fecha": fecha,
      "estado": estado,
      "recompensa": recompensa,
    }, { headers: this.headers }).pipe(map(data => data));
  }

  changeGoodDeedState(idAccion: string, idUsuario: string, nuevoEstado: string){
    return this.http.put(`${this.API_URI}/api/changeGoodDeedState/`,
      {
        "idAccion": idAccion,
        "idUsuario": idUsuario,
        "estado": nuevoEstado
      }, { headers: this.headers }).pipe(map(data => data));
  }

  getGoodDeedsDone(idUsuario: string){
    return this.http.get(`${this.API_URI}/api/goodDeedsDone/${idUsuario}`);
  }
  getAccionesById(id: string) {
    return this.http.get(`${this.API_URI}/api/goodDeeds/${id}`);
  }

  insertarAccion(titulo: string, descripcion: string, recompensa: string, minEdad: string) {
    return this.http.post(`${this.API_URI}/api/goodDeeds/`,
      {
        "titulo": titulo,
        "descripcion": descripcion,
        "recompensa": recompensa,
        "minEdad": minEdad
      }, { headers: this.headers }).pipe(map(data => data));
  }

  updateAccion(titulo: string, descripcion: string, recompensa: string, edadMinima: string, idAccion: string) {

    return this.http.put(`${this.API_URI}/api/goodDeeds/`,
      {
        "titulo": titulo,
        "descripcion": descripcion,
        "recompensa": recompensa,
        "edadMinima": edadMinima,
        "idAccion": idAccion
      }, { headers: this.headers }).pipe(map(data => data));
  }

  deleteAccion(idAccion: string) {
    return this.http.put(`${this.API_URI}/api/deleteGoodDeeds/`,
      {
        "idAccion": idAccion,
      }, { headers: this.headers }).pipe(map(data => data));
  }


  getProductos() {
    return this.http.get(`${this.API_URI}/api/products`);
  }

  getProductosById(idProducto: string) {
    return this.http.get(`${this.API_URI}/api/products/${idProducto}`);
  }

  insertProducto(nombre: string, precio: string, edadMinima: string, idCategoria: string, urlimagen: string) {
    return this.http.post(`${this.API_URI}/api/products/`,
      {
        "nombre": nombre,
        "precio": precio,
        "edadMinima": edadMinima,
        "idCategoria": idCategoria,
        "urlimagen": urlimagen
      }, { headers: this.headers }).pipe(map(data => data));
  }

  updateProducto(idProducto: string, nombre: string, precio: string, edadMinima: string, idCategoria: string, image_url: string) {
    return this.http.put(`${this.API_URI}/api/products/`,
      {
        "idProducto": idProducto,
        "nombre": nombre,
        "precio": precio,
        "edadMinima": edadMinima,
        "idCategoria": idCategoria,
        "image_url": image_url,
      }, { headers: this.headers }).pipe(map(data => data));
  }

  deleteProducto(idProducto: string) {
    return this.http.put(`${this.API_URI}/api/deleteProduct/`,
      {
        "idProducto": idProducto,
      }, { headers: this.headers }).pipe(map(data => data));
  }

  getCategorias() {
    return this.http.get(`${this.API_URI}/api/categories`);
  }

  createCategoria(categoria: string) {
    return this.http.post(`${this.API_URI}/api/categories/`,
      {
        "categoria": categoria
      }, { headers: this.headers }).pipe(map(data => data));
  }

  updateCategoria(categoria: string, idCategoria: string) {
    return this.http.put(`${this.API_URI}/api/categories/`,
      {
        "idCategoria": idCategoria,
        "categoria": categoria
      }, { headers: this.headers }).pipe(map(data => data));
  }

  deleteCategoria(idCategoria: string) {
    return this.http.put(`${this.API_URI}/api/deletecategory/`,
      {
        "idCategoria": idCategoria,
      }, { headers: this.headers }).pipe(map(data => data));
  }

  uploadImage(archivo: any) {
    return this.http.post(`${this.API_URI}/api/uploadImage/`, archivo)
  }


  getCartas(idUsuario: string, estado: string){
    const customHeaders = { 'idUsuario': idUsuario, 'estado': estado }
    return this.http.get(`${this.API_URI}/api/cartas/`, { headers: customHeaders });
  }

  updateEstadoCarta(idCarta: string, estado: string){
    return this.http.put(`${this.API_URI}/api/cartas/`,
      {
        "idCarta": idCarta,
        "estado": estado
      }, { headers: this.headers }).pipe(map(data => data));
  }

  createCarta(mensaje: string, fecha: string, estado:string, idUsuario: string){
    return this.http.post(`${this.API_URI}/api/createCarta/`,
      {
        "mensaje": mensaje, 
        "fecha": fecha, 
        "estado": estado,
        "idUsuario": idUsuario
      }, { headers: this.headers }).pipe(map(data => data));
  }

  createDetalleCarta(cantidad: string, precio: string, idcarta: string, idProducto: string){

    return this.http.post(`${this.API_URI}/api/articulos/`,
      {
        "cantidad": cantidad,
        "precio": precio,
        "idCarta": idcarta,
        "idProducto": idProducto
      }, { headers: this.headers }).pipe(map(data => data));
  }
  getLastIdCarta(){
    return this.http.get(`${this.API_URI}/api/lastIdCarta`);
  }
  getDetalleCarta(idCarta: string){
    return this.http.get(`${this.API_URI}/api/articulos/${idCarta}`);
  }

  borrarArticulo(idArticulo: string){
    return this.http.delete(`${this.API_URI}/api/articulos/${idArticulo}`);
  }
}
