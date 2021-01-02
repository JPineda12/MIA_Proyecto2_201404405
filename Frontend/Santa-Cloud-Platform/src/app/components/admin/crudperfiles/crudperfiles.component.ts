import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog, } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import swal from 'sweetalert2';
import { AddperfilComponent } from './addperfil/addperfil.component';
import { EditperfilComponent } from './editperfil/editperfil.component'
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-crudperfiles',
  templateUrl: './crudperfiles.component.html',
  styleUrls: ['./crudperfiles.component.css']
})
export class CRUDPerfilesComponent implements OnInit {



  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  perfiles: any
  displayedColumns: string[] = ['Nombre', 'Nickname', 'Email', 'Genero', 'Fecha', 'Telefono',
    'Bastones', 'CapacidadBastones', 'Direccion', 'Municipio', 'Departamento', 'Latitud', 'Longitud'];
  fechaMostrada: string

  constructor(public dialog: MatDialog, private apiService: ApiService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getPerfiles()
  }

  getPerfiles() {
    this.apiService.getUsers().toPromise().then((res) => {
      this.perfiles = res
      this.formatFechas();
    });
  }

  formatFechas() {

    for(let i = 0; i < this.perfiles.length; i++) {
      console.log(this.perfiles[i].fecha)
      this.perfiles[i].fecha = this.datepipe.transform(this.perfiles[i].fecha, 'yyyy-MM-dd');
      console.log(this.perfiles[i].fecha)

      this.table.renderRows();
    }
  }

  crearDialog() {
    const dialogRef = this.dialog.open(AddperfilComponent, {
      width: '400px',
      disableClose: true,
      data: {
        nombre: "", nickname: 0, email: 0, genero: null,
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

  editarRegistro(profile: any) {
    const dialogRef = this.dialog.open(EditperfilComponent, {
      width: '400px',
      disableClose: true,
      data: {
        nombre: profile.nombre, nickname: profile.nickname, email: profile.email, genero: profile.genero,
        fecha: profile.fecha, telefono: profile.telefono, bastones: profile.bastones,
        direccion: profile.direccion, capacidadBastones: profile.capacidadBastones,
        idPadre: profile.idPadre, idRol: profile.idRol, idMunicipio: profile.idMunicipio,
        idDepartamento: profile.idDepartamento, rol: profile.rol, municipio: profile.municipio,
        departamento: profile.departamento, latitud: profile.latitud, longitud: profile.longitud
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
