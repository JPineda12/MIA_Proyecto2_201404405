import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

}
