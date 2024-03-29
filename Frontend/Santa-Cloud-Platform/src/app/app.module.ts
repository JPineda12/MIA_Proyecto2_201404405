import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { DatePipe } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { NgxCsvParserModule } from 'ngx-csv-parser'
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';
import { KidComponent } from './components/home/kid/kid.component';
import { ElfoComponent } from './components/home/elfo/elfo.component';
import { PadreComponent } from './components/home/padre/padre.component';
import { CRUDAccionesComponent } from './components/admin/crudacciones/crudacciones.component';
import { AddAccionComponent } from './components/admin/crudacciones/add-accion/add-accion.component';
import { EditAccionComponent } from './components/admin/crudacciones/edit-accion/edit-accion.component';
import { CrudproductosComponent } from './components/admin/crudproductos/crudproductos.component';
import { EditProductComponent } from './components/admin/crudproductos/edit-product/edit-product.component';
import { AddProductComponent } from './components/admin/crudproductos/add-product/add-product.component';
import { AddCategoriaComponent } from './components/admin/crudproductos/add-categoria/add-categoria.component';
import { CRUDPerfilesComponent } from './components/admin/crudperfiles/crudperfiles.component';
import { EditperfilComponent } from './components/admin/crudperfiles/editperfil/editperfil.component';
import { AddperfilComponent } from './components/admin/crudperfiles/addperfil/addperfil.component';
import { KidProductosComponent } from './components/kid-productos/kid-productos.component';
import { KidSantaProfileComponent } from './components/kid-santa-profile/kid-santa-profile.component';
import { VerCartasComponent } from './components/ver-cartas/ver-cartas.component';
import { DetalleCartaComponent } from './components/detalle-carta/detalle-carta.component';
import { CargamasivaComponent } from './components/admin/cargamasiva/cargamasiva.component';
import { ReportesComponent } from './components/admin/reportes/reportes.component';
import { ChartsModule } from 'ng2-charts';
import { DetallePublicacionComponent } from './components/detalle-publicacion/detalle-publicacion.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AdminComponent,
    RegisterComponent,
    KidComponent,
    ElfoComponent,
    PadreComponent,
    CRUDAccionesComponent,
    AddAccionComponent,
    EditAccionComponent,
    CrudproductosComponent,
    EditProductComponent,
    AddProductComponent,
    AddCategoriaComponent,
    CRUDPerfilesComponent,
    EditperfilComponent,
    AddperfilComponent,
    KidProductosComponent,
    KidSantaProfileComponent,
    VerCartasComponent,
    DetalleCartaComponent,
    CargamasivaComponent,
    ReportesComponent,
    DetallePublicacionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxCsvParserModule,
    MaterialModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1sC6IYY17ZLNwyt0E4bSDpeR5oE_Dqr0',
      libraries: ['places']
    })
  ],
  providers: [ApiService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [AddAccionComponent, EditAccionComponent]
})
export class AppModule { }
