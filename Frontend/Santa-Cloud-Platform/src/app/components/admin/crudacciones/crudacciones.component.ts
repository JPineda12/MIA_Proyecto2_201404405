import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddAccionComponent } from './add-accion/add-accion.component';
import { EditAccionComponent } from './edit-accion/edit-accion.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { Router, NavigationEnd } from '@angular/router';
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

  accion: any
  animal: string;
  name: string;

  displayedColumns: string[] = ['Titulo', 'Descripcion', 'Recompensa', 'EdadMinima'];



  constructor(private router: Router, public dialog: MatDialog, private apiService: ApiService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });

  }



  ngOnInit(): void {
    this.getAcciones()
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  private getAcciones() {
    this.apiService.getAcciones().toPromise().then((res) => {
      this.buenasAcciones = res
    });
  }

  public crearDialog() {

    const dialogRef = this.dialog.open(AddAccionComponent, {
      width: '250px',
      data: { name: "", animal: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.router.navigate(["/adminacciones"]);
    });

  }


  private editarRegistro(buenaAccion: any) {
    console.log(buenaAccion)
    const dialogRef = this.dialog.open(EditAccionComponent, {
      width: '250px',
      data: {
        idAccion: buenaAccion.id, titulo: buenaAccion.titulo,
        descripcion: buenaAccion.descripcion,
        recompensa: buenaAccion.recompensa,
        edad: buenaAccion.minEdad
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/adminacciones"]);
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

          swal.fire({
            icon: 'success',
            title: 'Registro Eliminado!',
            text: 'Se Elimino un registro satisfactoriamente!',
          })
          this.router.navigate(["/adminacciones"]);
        });
      }
    })



  }
}