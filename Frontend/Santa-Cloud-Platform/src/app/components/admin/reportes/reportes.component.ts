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
  constructor(private apiService: ApiService) { }


  repValue: string;
  Reportes: string[] = ['Top 10 Productos mas comprados', 'Top 10 Departamentos con mas ventas',
    'Top 10 municipios con mas ventas', 'Top 5 de buenas acciones mas realizadas', 
  'Bitacora de respuestas a publicaciones', 'Top 5 categorias con mas compras', 
  'Top de cartas con mayor gasto']

  productColumns: string[] = ['Producto', 'Cantidad', 'Generado'];
  productSource: any; 
  isProductRep = false;

  depColumns: string[] = ['Departamento', 'Ventas']
  depSource: any;
  isDepRep = false;

  munColumns: string[] = ['Municipio', 'Ventas']
  munSource: any;
  isMunRep = false;

  accionColumns: string[] = ['Titulo', 'Veces_Realizada']
  accionSource: any;
  isAccionRep = false;

  catColumns: string[] = ['Categoria', 'Cantidad','Generado']
  catSource: any;
  isCatRep = false;

  cartaColumns: string[] = ['Nombre_Usuario', 'Total_Gastado','Fecha', 'Mensaje']
  cartaSource: any;
  isCartaRep = false;

  ngOnInit(): void {
  }
  generarReporte(){
    if(this.isProductRep){
      //REPORTE 1
      this.apiService.reporte1().toPromise().then(res => {
        this.productSource = res;
      })
    }else if(this.isDepRep){
      // REPORTE 2
      this.apiService.reporte2().toPromise().then(res => {
        this.depSource = res;
      })
    }else if(this.isMunRep){
      // REPORTE 3
      this.apiService.reporte3().toPromise().then(res => {
        this.munSource = res;
      })
    }else if(this.isAccionRep){
      // REPORTE 4
      this.apiService.reporte4().toPromise().then(res => {
        this.accionSource = res;
      })
    }else if(this.isCatRep){
      // REPORTE 5
      this.apiService.reporte5().toPromise().then(res => {
        this.catSource = res;
      })
    }else if(this.isCartaRep){
      // REPORTE 6
      this.apiService.reporte6().toPromise().then(res => {
        this.cartaSource = res;
      })
    }

  }

  changeTabla(){
    if(this.repValue == "Top 10 Productos mas comprados"){
      this.isProductRep = true;
      this.isDepRep = false;
      this.isMunRep = false;
      this.isAccionRep = false;
      this.isCatRep = false;
      this.isCartaRep = false;
      //this.table.renderRows();
    }else if(this.repValue == "Top 10 Departamentos con mas ventas"){
      this.isProductRep = false;
      this.isDepRep = true;
      this.isMunRep = false;
      this.isAccionRep = false;
      this.isCatRep = false;
      this.isCartaRep = false;
      //this.table.renderRows();
    }else if(this.repValue == "Top 10 municipios con mas ventas"){
      this.isProductRep = false;
      this.isDepRep = false;
      this.isMunRep = true;
      this.isAccionRep = false;
      this.isCatRep = false;
      this.isCartaRep = false;
    }else if(this.repValue == "Top 5 de buenas acciones mas realizadas"){
      this.isProductRep = false;
      this.isDepRep = false;
      this.isMunRep = false;
      this.isAccionRep = true;
      this.isCatRep = false;
      this.isCartaRep = false;
    }else if(this.repValue == "Top 5 categorias con mas compras"){
      this.isProductRep = false;
      this.isDepRep = false;
      this.isMunRep = false;
      this.isAccionRep = false;
      this.isCatRep = true;
      this.isCartaRep = false;
    }else if(this.repValue == "Top de cartas con mayor gasto"){
      this.isProductRep = false;
      this.isDepRep = false;
      this.isMunRep = false;
      this.isAccionRep = false;
      this.isCatRep = false;
      this.isCartaRep = true;
    }
  }
}
