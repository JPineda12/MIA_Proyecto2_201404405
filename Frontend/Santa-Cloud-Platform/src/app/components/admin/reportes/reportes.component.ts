import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../../services/api.service';
import swal from 'sweetalert2';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor() { }


  repValue: string;
  Reportes: string[] = ['Top 10 Productos mas comprados', 'Top 10 Departamentos con mas ventas',
    'Top 10 municipios con mas ventas', 'Top 5 de buenas acciones mas realizadas', 
  'Bitacora de respuestas a publicaciones', 'Top 5 categorias con mas compras', 
  'Top de cartas con mayor gasto']

  productColumns: string[] = ['Producto', 'Precio', 'Cantidad', 'Imagen'];
  productSource: any; 
  isProductRep = false;

  depColumns: string[] = ['Departamento', 'Ventas']
  depSource: any;
  isDepRep = false;

  ngOnInit(): void {
  }
  generarReporte(){

  }

  changeTabla(){
    console.log("Hoa")
    if(this.repValue == "Top 10 Productos mas comprados"){
      this.isProductRep = true;
      this.isDepRep = false;
      //this.table.renderRows();
    }else if(this.repValue == "Top 10 Departamentos con mas ventas"){
      this.isDepRep = true;
      this.isProductRep = false;
      //this.table.renderRows();
    }
  }
}
