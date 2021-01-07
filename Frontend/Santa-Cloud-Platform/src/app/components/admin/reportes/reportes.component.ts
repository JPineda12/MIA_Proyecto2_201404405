import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../../services/api.service';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

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

  catColumns: string[] = ['Categoria', 'Cantidad', 'Generado']
  catSource: any;
  isCatRep = false;

  cartaColumns: string[] = ['Nombre_Usuario', 'Total_Gastado', 'Fecha', 'Mensaje']
  cartaSource: any;
  isCartaRep = false;

  isGenerado = false;
  isReport6 = false;


  public pieChartOptions: ChartOptions = {

  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  ngOnInit(): void {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsTooltip();
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];


  barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  generarGrafica() {
    if (!this.isGenerado) {
      swal.fire({
        icon: 'error',
        title: 'Sin grafica que generar',
        text: 'Primero genera un reporte!',
      })
    } else {

    }
  }

  llenarPieChartLabels(label: string, pos: number) {
    this.pieChartLabels[pos] = label
  }

  llenarPieChartData(data: number, pos: number) {
    this.pieChartData[pos] = data
  }

  llenarBarChartLabels(label: string, pos: number) {
    this.barChartLabels[pos] = label
  }

  llenarBarChartData(data: number, pos: number) {
    this.barChartData[0].data[pos] = data
  }


  generarReporte() {

    if (this.isProductRep) {
      //REPORTE 1
      this.apiService.reporte1().toPromise().then(async res => {
        this.productSource = res;
        this.isGenerado = true;
        this.isReport6 = false;
        this.pieChartLabels = []
        this.pieChartData = []
        let n = 0
        for await (let p of this.productSource) {
          this.llenarPieChartData(p.cantidad, n)
          this.llenarPieChartLabels(p.producto, n)
          n++;
        }


      });
    } else if (this.isDepRep) {
      // REPORTE 2
      this.apiService.reporte2().toPromise().then(async res => {
        this.depSource = res;
        this.isGenerado = true;
        this.isReport6 = false;
        this.pieChartLabels = []
        this.pieChartData = []
        for await (let p of this.depSource) {
          this.pieChartLabels.push(p.departamento)
          this.pieChartData.push(p.cartas_enviadas)
        }
      })
    } else if (this.isMunRep) {
      // REPORTE 3
      this.apiService.reporte3().toPromise().then(async res => {
        this.munSource = res;
        this.isGenerado = true;
        this.isReport6 = false;

        this.pieChartLabels = []
        this.pieChartData = []
        for await (let p of this.munSource) {
          this.pieChartLabels.push(p.municipio)
          this.pieChartData.push(p.cartas_enviadas)
        }
      })
    } else if (this.isAccionRep) {
      // REPORTE 4
      this.apiService.reporte4().toPromise().then(async res => {
        this.accionSource = res;
        this.isGenerado = true;
        this.isReport6 = false;

        this.pieChartLabels = []
        this.pieChartData = []
        for await (let p of this.accionSource) {
          this.pieChartLabels.push(p.titulo)
          this.pieChartData.push(p.veces_realizada)
        }
      })
    } else if (this.isCatRep) {
      // REPORTE 5
      this.apiService.reporte5().toPromise().then(async res => {
        this.catSource = res;
        this.isGenerado = true;
        this.isReport6 = false;

        this.pieChartLabels = []
        this.pieChartData = []
        for await (let p of this.catSource) {
          this.pieChartLabels.push(p.categoria)
          this.pieChartData.push(p.cantidad)
        }
      })
    } else if (this.isCartaRep) {
      // REPORTE 6
      this.apiService.reporte6().toPromise().then(async res => {
        this.cartaSource = res;
        this.isGenerado = true;
        this.isReport6 = true;
        this.barChartData[0].label = "Top Cartas con mayor gasto"
        for await (let p of this.cartaSource) {
          this.barChartLabels.push(p.nombre)
          this.barChartData[0].data.push(p.total_gastado)
        }
      })
    }

  }

  changeTabla() {
    this.isGenerado = false;
    if (this.repValue == "Top 10 Productos mas comprados") {
      this.isProductRep = true;
      this.isDepRep = false;
      this.isMunRep = false;
      this.isAccionRep = false;
      this.isCatRep = false;
      this.isCartaRep = false;
      //this.table.renderRows();
    } else if (this.repValue == "Top 10 Departamentos con mas ventas") {
      this.isProductRep = false;
      this.isDepRep = true;
      this.isMunRep = false;
      this.isAccionRep = false;
      this.isCatRep = false;
      this.isCartaRep = false;
      //this.table.renderRows();
    } else if (this.repValue == "Top 10 municipios con mas ventas") {
      this.isProductRep = false;
      this.isDepRep = false;
      this.isMunRep = true;
      this.isAccionRep = false;
      this.isCatRep = false;
      this.isCartaRep = false;
    } else if (this.repValue == "Top 5 de buenas acciones mas realizadas") {
      this.isProductRep = false;
      this.isDepRep = false;
      this.isMunRep = false;
      this.isAccionRep = true;
      this.isCatRep = false;
      this.isCartaRep = false;
    } else if (this.repValue == "Top 5 categorias con mas compras") {
      this.isProductRep = false;
      this.isDepRep = false;
      this.isMunRep = false;
      this.isAccionRep = false;
      this.isCatRep = true;
      this.isCartaRep = false;
    } else if (this.repValue == "Top de cartas con mayor gasto") {
      this.isProductRep = false;
      this.isDepRep = false;
      this.isMunRep = false;
      this.isAccionRep = false;
      this.isCatRep = false;
      this.isCartaRep = true;
    }
  }
}
