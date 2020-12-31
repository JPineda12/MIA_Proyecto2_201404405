import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { DatePipe } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModule
  ],
  providers: [ApiService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [AddAccionComponent, EditAccionComponent]
})
export class AppModule { }
