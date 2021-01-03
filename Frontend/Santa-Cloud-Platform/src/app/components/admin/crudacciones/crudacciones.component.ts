import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddAccionComponent } from './add-accion/add-accion.component';
import { EditAccionComponent } from './edit-accion/edit-accion.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import swal from 'sweetalert2';



@Component({
  selector: 'app-crudacciones',
  templateUrl: './crudacciones.component.html',
  styleUrls: ['./crudacciones.component.css']
})
export class CRUDAccionesComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  buenasAcciones: any


  displayedColumns: string[] = ['Titulo', 'Descripcion', 'Recompensa', 'EdadMinima'];



  constructor(public dialog: MatDialog, private apiService: ApiService) {

  }



  ngOnInit(): void {
    this.getAcciones()
  }

  private getAcciones() {
    this.apiService.getAcciones().toPromise().then((res) => {
      this.buenasAcciones = res
    });
  }

  public crearDialog() {

    const dialogRef = this.dialog.open(AddAccionComponent, {
      width: '250px',
      disableClose: true,
      data: {
        data: {
          idAccion: "", titulo: "",
          descripcion: "",
          recompensa: "",
          minEdad: ""
        }
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != false) {
        this.buenasAcciones.push(result)
        this.table.renderRows();
      }
    });

  }


  private editarRegistro(buenaAccion: any) {

    const dialogRef = this.dialog.open(EditAccionComponent, {
      width: '250px',
      disableClose: true,
      data: {
        idAccion: buenaAccion.id, titulo: buenaAccion.titulo,
        descripcion: buenaAccion.descripcion,
        recompensa: buenaAccion.recompensa,
        minEdad: buenaAccion.minEdad
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != false) {
        var index = this.buenasAcciones.indexOf(buenaAccion);

        if (~index) {
          this.buenasAcciones[index] = result;
        }
        this.table.renderRows();
      }
    });

  }
  private borrarRegistro(buenaAccion: any) {
    swal.fire({
      title: 'Desea Borrar este registro?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteAccion(buenaAccion.id).toPromise().then((res) => {
          this.buenasAcciones.splice(this.buenasAcciones.indexOf(buenaAccion), 1);
          this.table.renderRows();
          swal.fire({
            icon: 'success',
            title: 'Registro Eliminado!',
            text: 'Se Elimino un registro satisfactoriamente!',
          })
        });
      }
    })
  }
}