import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog, } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import swal from 'sweetalert2';
import { AddperfilComponent } from './addperfil/addperfil.component';
import { EditperfilComponent } from './editperfil/editperfil.component'
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';

export interface Perfil {
  idUsuario: string;
  nombre: string;
  nickname: string;
  email: string;
  genero: string;
  fecha: string;
  telefono: string;
  bastones: number;
  capacidadBastones: number;
  direccion: string;
  latitud: number;
  longitud: number;
  municipio: string;
  departamento: string;
  idPadre: string;
  rol: string;
  idRol: string;
  idMunicipio: string;
  idDepartamento: string;
  pass: string;
}

@Component({
  selector: 'app-crudperfiles',
  templateUrl: './crudperfiles.component.html',
  styleUrls: ['./crudperfiles.component.css']
})
export class CRUDPerfilesComponent implements OnInit {



  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  perfiles: Perfil[] | null = [];
  displayedColumns: string[] = ['Nombre', 'Email', 'Rol', 'Nickname', 'Genero', 'Fecha', 'Telefono',
    'Bastones', 'CapacidadBastones', 'Direccion', 'Municipio', 'Departamento', 'Latitud', 'Longitud'];

  constructor(public dialog: MatDialog, private apiService: ApiService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getPerfiles()
  }

  getPerfiles() {
    this.apiService.getUsers().toPromise().then(async (res) => {
      let p: any = res
      for await (let perf of p) {
        let fechaFormateada = this.datepipe.transform(perf.fecha, 'MM/dd/yyyy');
        let perfil = {
          nombre: perf.nombre,
          nickname: perf.nickname,
          email: perf.email,
          genero: perf.genero,
          fecha: fechaFormateada,
          telefono: perf.telefono,
          bastones: perf.bastones,
          capacidadBastones: perf.capacidadBastones,
          direccion: perf.direccion,
          latitud: perf.latitud,
          longitud: perf.longitud,
          municipio: perf.municipio,
          departamento: perf.departamento,
          idPadre: perf.idPadre,
          idRol: perf.idRol,
          idMunicipio: perf.idMunicipio,
          idDepartamento: perf.idDepartamento,
          rol: perf.rol, 
          pass: perf.pass, 
          idUsuario: perf.idUsuario
        }
        this.perfiles.push(perfil);
      }
      this.table.renderRows();
    });
  }


  crearDialog() {
    const dialogRef = this.dialog.open(AddperfilComponent, {
      width: '500px',
      disableClose: true,
      data: {
        nombre: null, nickname: null, email: null, genero: null,
        fecha: null, telefono: null, bastones: null, direccion: null, capacidadBastones: null,
        idPadre: null, idRol: null, idMunicipio: null, idDepartamento: null, rol: null, municipio: null,
        departamento: null, latitud: null, longitud: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != false) {
        this.perfiles.push(result)
        this.table.renderRows();
      }
    });
  }

  async editarRegistro(profile: any) {
    let nombrePadre: string = null
    if (profile.rol == "Kid") {
      nombrePadre = await this.getPadre(profile.idPadre);
    }
    const dialogRef = this.dialog.open(EditperfilComponent, {
      width: '500px',
      disableClose: true,
      data: {
        nombre: profile.nombre, nickname: profile.nickname, email: profile.email, genero: profile.genero,
        fecha: profile.fecha, telefono: profile.telefono, bastones: profile.bastones,
        direccion: profile.direccion, capacidadBastones: profile.capacidadBastones,
        idPadre: profile.idPadre, idRol: profile.idRol, idMunicipio: profile.idMunicipio,
        idDepartamento: profile.idDepartamento, rol: profile.rol, municipio: profile.municipio,
        departamento: profile.departamento, latitud: profile.latitud, longitud: profile.longitud, 
        padre: nombrePadre, pass: profile.pass, idUsuario: profile.idUsuario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != false) {
        var index = this.perfiles.indexOf(profile);

        if (~index) {
          this.perfiles[index] = result;
        }
        this.table.renderRows();
      }
    });
  }

  async getPadre(idPadre: string): Promise<string> {
    let nombre: string = await new Promise<string>(async (resolve, reject) => {
      (await this.apiService.getPadres()).subscribe(
        res => {
          resolve(this.getNombrePadre(res, idPadre));
        },
        err => console.log("Error de conexion DB: ", err)
      );
    })
    return nombre;
  }
  getNombrePadre(Padres: any, idPadre): string {
    for (let i = 0; i < Padres.length; i++) {
      if (Padres[i].idUsuario == idPadre) {
        return Padres[i].nombre;
      }
    }
    return null;
  }

  borrarRegistro(profile: any) {

    swal.fire({
      title: 'Desea Borrar este registro?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUser(profile.idUsuario).toPromise().then((res) => {
          swal.fire({
            icon: 'success',
            title: 'Registro Eliminado!',
            text: 'Se Elimino un registro satisfactoriamente!',
          })
          this.perfiles.splice(this.perfiles.indexOf(profile), 1);
          this.table.renderRows();
        });
      }
    })
  }
}
