import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../../services/api.service';
import swal from 'sweetalert2';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { DatePipe } from '@angular/common'
import * as moment from 'moment'

export interface ContenidoCSV {
  correo: string;
  password: string;
  nombreHijo: string;
  nombrePadre: string;
  nickname: string;
  municipio: string;
  departamento: string;
  direccion: string;
  latitud: string;
  longitud: string;
  telefono: string;
  fechaCarta: string;
  nombreJuguete: string;
  categoriaJuguete: string;
  precioJuguete: string;
  edadRecomendada: string;
}

export interface Departamento {
  nombre: string;
}

export interface Municipio {
  nombre: string;
  nombreDepartamento: string;
}

export interface Usuario {
  nombre: string;
  correo: string;
  nickname: string;
  password: string;
  telefono: string;
  nombreMunicipio: string;
  nombreDepartamento: string;
  direccion: string;
  latitud: string;
  longitud: string;
}

export interface Categoria {
  nombre: string;
}

export interface Producto {
  nombre: string;
  precio: string;
  cantidad: string;
  edadRecomendada: string;
  nombreCategoria: string;
}

export interface Carta {
  mensaje: string;
  fecha: string;
  estado: string;
  idUsuario: string;
}

export interface DetalleCarta {
  idCarta: string;
  precioJuguete: number;
  cantidad: number;
  idProducto: string;
}

@Component({
  selector: 'app-cargamasiva',
  templateUrl: './cargamasiva.component.html',
  styleUrls: ['./cargamasiva.component.css']
})
export class CargamasivaComponent implements OnInit {

  constructor(private apiService: ApiService, private ngxCsvParser: NgxCsvParser, public datepipe: DatePipe) { }

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  CSVContent: ContenidoCSV[] = []
  displayedColumns: string[] = ['Correo', 'Password', 'Nombre-Hijo', 'Nombre-Padre',
    'Nickname-Hijo', 'Municipio', 'Departamento', 'Direccion', 'Latitud', 'Longitud',
    'Telefono', 'Fecha-Envio', 'Nombre-Juguete', 'Categoria-Juguete',
    'Precio-Juguete', 'Edad-Recomendada'];

  detallesCartas: DetalleCarta[] = []

  ngOnInit(): void {
  }

  auxDepartamentos: Departamento[] = [];
  auxMunicipios: Municipio[] = [];
  auxPadres: Usuario[] = [];
  auxHijos: Usuario[] = [];
  auxCategorias: Categoria[] = [];
  auxProductos: Producto[] = [];
  async cargarToBD() {
    if (this.CSVContent.length == 0) {
      swal.fire({
        icon: 'error',
        title: 'Cartas vacias.',
        text: 'Aun no has subido ningun archivo csv!',
      })
    } else {
      let arrayDepartamentos: any;
      await this.apiService.getDepartamentos().toPromise().then(async (res) => {
        arrayDepartamentos = res;
      });
      for await (let carta of this.CSVContent) {
        console.log("----- NEW ITERATION ------ ")
        //  1.- Obtener departamentos, comparar con csv Departamento.
        let departamento = await this.verificarDepartamento(carta.departamento, arrayDepartamentos)
        if (!departamento) {
          let duplicate = this.auxDepartamentos.find(x => x.nombre == carta.departamento);
          const index = this.auxDepartamentos.indexOf(duplicate, 0);
          if (index > -1) {
            //Ya existe
          } else {
            let nuevoDep = {
              nombre: carta.departamento
            }
            this.auxDepartamentos.push(nuevoDep)
          }
        }
        // 2.- Verificar Municipio.
        let municipio = await this.verificarMunicipio(carta.municipio, carta.departamento)
        if (!municipio) {
          let duplicate = this.auxMunicipios.find(x => x.nombre == carta.municipio);
          const index = this.auxMunicipios.indexOf(duplicate, 0);
          if (index > -1) {

          } else {
            let nuevoMun = {
              nombre: carta.municipio,
              nombreDepartamento: carta.departamento
            }
            this.auxMunicipios.push(nuevoMun)
          }
        }

        // 3.- Verificar Padre
        let padre = await this.verificarPadre(carta.correo);
        if (!padre) {
          let duplicate = this.auxPadres.find(x => x.correo == carta.correo);
          const index = this.auxPadres.indexOf(duplicate, 0);
          if (index > -1) {
          } else {
            let nuevoPadre = {
              nombre: carta.nombrePadre,
              correo: carta.correo,
              password: carta.password,
              nickname: null,
              telefono: carta.telefono,
              nombreMunicipio: carta.municipio,
              direccion: carta.direccion,
              latitud: carta.latitud,
              longitud: carta.longitud,
              nombreDepartamento: carta.departamento
            }
            this.auxPadres.push(nuevoPadre);
          }
        }
        // 4.- Verificar Hijos.
        let hijo = await this.verificarHijo(carta.nickname);
        if (!hijo) {
          let duplicate = this.auxHijos.find(x => x.nickname == carta.nickname);
          const index = this.auxHijos.indexOf(duplicate, 0);
          if (index > -1) {
          } else {
            let nuevoHijo = {
              nombre: carta.nombreHijo,
              correo: carta.correo,
              password: carta.password,
              nickname: carta.nickname,
              telefono: carta.telefono,
              nombreMunicipio: carta.municipio,
              direccion: carta.direccion,
              latitud: carta.latitud,
              longitud: carta.longitud,
              nombreDepartamento: carta.departamento
            }
            this.auxHijos.push(nuevoHijo);
          }
        }
        // 5.- Verificar Categorias (Juguete)
        let categoria = await this.verificarCategoria(carta.categoriaJuguete);
        if (!categoria) {
          let duplicate = this.auxCategorias.find(x => x.nombre == carta.categoriaJuguete);
          const index = this.auxCategorias.indexOf(duplicate, 0);
          if (index > -1) {
          } else {
            let nuevaCat = {
              nombre: carta.categoriaJuguete
            }
            this.auxCategorias.push(nuevaCat)
          }
        }
        let juguete = await this.verificarJuguete(carta.nombreJuguete)
        if (!juguete) {
          let duplicate = this.auxProductos.find(x => x.nombre == carta.nombreJuguete);
          const index = this.auxProductos.indexOf(duplicate, 0);
          if (index > -1) {
            this.auxProductos[index].cantidad += 1;
          } else {
            let nuevoJuguete: Producto = {
              nombre: carta.nombreJuguete,
              precio: carta.precioJuguete,
              nombreCategoria: carta.categoriaJuguete,
              edadRecomendada: carta.edadRecomendada,
              cantidad: "1"
            }
            this.auxProductos.push(nuevoJuguete)
          }
        }
      }

      if (this.auxDepartamentos.length > 0) {
        let msj = "Se encontraron: " + this.auxDepartamentos.length + " departamentos nuevos";
        msj += " ¿Insertar?"
        if (await this.mostrarMensajeConfirmar(msj)) {
          this.insertarNuevosDepartamentos();
        }
      }

      if (this.auxMunicipios.length > 0) {
        let msj = "Se encontraron: " + this.auxMunicipios.length + " municipios nuevos";
        msj += " ¿Insertar?"
        if (await this.mostrarMensajeConfirmar(msj)) {
          await this.insertarNuevosMunicipios();
        }
      }
      console.log(this.auxPadres)
      if (this.auxPadres.length > 0) {
        let msj = "Se encontraron: " + this.auxPadres.length + " padres nuevos";
        msj += " ¿Insertar?"
        if (await this.mostrarMensajeConfirmar(msj)) {
          await this.insertarNuevosPadres();
        }
      }
      console.log(this.auxHijos)
      if (this.auxHijos.length > 0) {
        let msj = "Se encontraron: " + this.auxHijos.length + " hijos nuevos"
        msj += " ¿Insertar?"
        if (await this.mostrarMensajeConfirmar(msj)) {
          await this.insertarNuevosHijos();
        }
      }

      if (this.auxCategorias.length > 0) {
        let msj = "Se encontraron: " + this.auxCategorias.length + " categorias nuevas";
        msj += " ¿Insertar?"
        if (await this.mostrarMensajeConfirmar(msj)) {
          await this.insertarNuevasCategorias();
        }
      }
      if (this.auxProductos.length > 0) {
        let msj = "Se encontraron: " + this.auxProductos.length + " Productos nuevos";
        msj += " ¿Insertar?"
        if (await this.mostrarMensajeConfirmar(msj)) {
          await this.insertarNuevosProductos();
        }
      }
      if (await this.mostrarMensajeConfirmar("¿Cargar Cartas a la base de datos?")) {
        // INSERTAR CARTAS BRO
        for await (let carta of this.CSVContent) {
          let fecha = moment(carta.fechaCarta, 'DD/MM/YYYY').format('MM/DD/YYYY');
          let hijo = await this.verificarHijo(carta.nickname);
          if (hijo) {
            let cartaExiste: any = await this.buscarCarta(carta.nickname, fecha, hijo.idUsuario)
            console.log("Existe carta: ", cartaExiste)
            if (!cartaExiste) {
              console.log("Insertando nueva Carta....")
              this.apiService.createCarta("Carta enviada con Carga Masiva", fecha, "2",
                hijo.idUsuario).toPromise().then(async (res) => {
                  //Insertar Detalle de Carta
                  let idCarta = await this.getLastidCarta();
                  console.log("my IDCARTA: ",idCarta)
                  let prod = await this.buscarJuguete(carta.nombreJuguete, carta.categoriaJuguete)
                  this.insertDetalle(idCarta, carta.precioJuguete, "1", prod.id);
                });
            } else {
              //Si existe, solo crear detalle.
              //Insertar Detalle de Carta
              let prod = await this.buscarJuguete(carta.nombreJuguete, carta.categoriaJuguete)
              this.insertDetalle(cartaExiste.idCarta, carta.precioJuguete, "1", prod.id);
            }
          }
        }
      }
      swal.fire({
        icon: 'success',
        title: 'Carga Masiva completada!',
        text: 'Las cartas fueron cargadas a la base de datos correctamente.',
      })
    }
  }


  async buscarCarta(nicknameEnviado: string, fechaEnviada: string, idHijo: string) {
    let carta = await new Promise(async (resolve, reject) => {
      (await this.apiService.getCartas("" + idHijo, "2")).toPromise().then(async (res) => {
        let auxC: any = res;
        let foundCarta = null;
        for await (let c of auxC) {
          var otroF = c.fecha.substring(0,10)
          let otroFecha = moment(otroF).format('MM/DD/YYYY');
          console.log("Comparando fechas: Enviada: ",fechaEnviada+" ===== ", otroFecha)
          if (fechaEnviada === otroFecha) {
            foundCarta = c;
            break;
          }
        }
        resolve(foundCarta)
      })
    })
    return carta;
  }
  async insertarNuevosDepartamentos() {
    for await (let dep of this.auxDepartamentos) {
      this.apiService.createDepartamento(dep.nombre).toPromise().then((res) => {
        console.log("Departamento: ", dep.nombre + " creado!")
      });
    }
  }

  async insertarNuevosMunicipios() {
    for await (let muni of this.auxMunicipios) {
      this.apiService.getDepartamentosByName(muni.nombreDepartamento).toPromise().then((res) => {
        let auxD: any = res;
        console.log(auxD)
        console.log(auxD[0].idDepartamento);
        console.log(muni.nombre);
        this.apiService.createMunicipio(muni.nombre, auxD[0].idDepartamento).toPromise().then((res) => {
          console.log("Municipio: ", muni.nombre, " creado.")
        })
      })
    }
  }

  async insertarNuevosPadres() {
    for await (let padre of this.auxPadres) {
      this.apiService.getMunicipioByName(padre.nombreMunicipio).toPromise().then(async (res) => {
        let auxM: any = res;
        for await (let m of auxM) {
          console.log(m.departamento)
          if (m.departamento == padre.nombreDepartamento) {
            (await this.apiService.newUser(padre.nombre, null, padre.correo, padre.password, "Masculino"
              , "04/05/1995", padre.telefono, "0", padre.direccion, "3", m.id, null, null,
              padre.latitud, padre.longitud)).toPromise().then((res) => {
                console.log("Padre insertado")
              })
            break;
          }
        }
      })

    }
  }

  async insertarNuevosHijos() {
    for await (let hijo of this.auxHijos) {
      this.apiService.getMunicipioByName(hijo.nombreMunicipio).toPromise().then(async (res) => {
        let auxM: any = res;
        for await (let m of auxM) {
          if (m.departamento == hijo.nombreDepartamento) {
            let padre: any = await this.verificarPadre(hijo.correo);
            console.log("idPadre: ", padre.idUsuario);
            (await this.apiService.newUser(hijo.nombre, hijo.nickname, hijo.correo, hijo.password,
              "Masculino"
              , "04/05/1995", hijo.telefono, "500", hijo.direccion, "4", m.id, padre.idUsuario,
              "4000", hijo.latitud, hijo.longitud)).toPromise().then((res) => {
                console.log("Hijo insertado")
              })

            break;
          }
        }
      })

    }
  }

  async insertarNuevasCategorias() {
    for await (let cat of this.auxCategorias) {
      (await this.apiService.createCategoria(cat.nombre)).toPromise().then((result) => {
        console.log("Categoria: ", cat.nombre, " insertada")
      })
    }
  }

  async insertarNuevosProductos() {
    for await (let prod of this.auxProductos) {
      let categoria = await this.verificarCategoria(prod.nombreCategoria);
      (await this.apiService.insertProducto(prod.nombre, prod.precio, prod.edadRecomendada,
        categoria.id, "http://35.238.184.178:3020/sinimagen.jpg")).toPromise().then((res) => {
          console.log("Producto: ", prod.nombre, " insertado!");
        })
    }
  }

  async mostrarMensajeConfirmar(mensaje: string): Promise<boolean> {
    let insertar: boolean = await new Promise((resolve, reject) => {
      swal.fire({
        title: mensaje,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: `Si, insertar`,
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
    return insertar;
  }
  async insertDetalle(idCarta: string, precioJuguete: string,
    cantidad: string, idProducto: string) {
    console.log("Insertando nuevo detalle... en carta: ", idCarta)
    this.apiService.createDetalleCarta(cantidad, precioJuguete, idCarta, idProducto)
      .toPromise().then((res) => {
        console.log("Detalle insertado, cantidad:", cantidad)
      });
  }

  async verificarJuguete(jugueteBuscar: string) {
    let miJuguete: any = await new Promise((resolve, reject) => {
      this.apiService.getProductosByName(jugueteBuscar).toPromise().then(async (res) => {
        let juguetes: any = res;
        if (juguetes.length > 0) {
          resolve(juguetes)
        } else {
          resolve(null)
        }
      },
        err => console.log(err)
      );
    });
    return miJuguete;
  }

  async buscarJuguete(nombreJuguete: string, nombreCategoria: string) {
    let miJuguete: any = await new Promise((resolve, reject) => {
      this.apiService.getProductosByName(nombreJuguete).toPromise().then(async (res) => {
        let juguetes: any = res;
        let found = null;
        for await (let jug of juguetes) {
          if (jug.categoria.toLowerCase() == nombreCategoria.toLowerCase()) {
            found = jug;
            break;
          }
        }
        resolve(found)

      },
        err => console.log(err)
      );
    });
    return miJuguete;
  }


  async getLastidCarta(): Promise<string> {
    let lastId: string = await new Promise((resolve, reject) => {
      this.apiService.getLastIdCarta()
        .toPromise().then((res) => {
          let aux: any = res;
          resolve(aux[0].idCarta)
        });
    });
    return lastId;
  }

  async verificarCategoria(catBuscar: string) {
    let miCategoria: any = await new Promise((resolve, reject) => {
      this.apiService.getCategoriesByName(catBuscar).toPromise().then(async (res) => {
        let categoria: any = res;
        if (categoria.length > 0) {
          resolve(categoria[0]);
        } else {
          resolve(null)
        }
      },
        err => console.log(err)
      );
    });
    return miCategoria;
  }

  async verificarPadre(correoBuscar: string) {
    let miUsuario: any = await new Promise((resolve, reject) => {
      this.apiService.getUserByEmail(correoBuscar).toPromise().then(async (res) => {
        let usuario: any = res;
        if (usuario.length > 0) {
          resolve(usuario[0]);
        } else {
          resolve(null)
        }
      },
        err => console.log(err)
      );
    });
    return miUsuario;
  }

  async verificarHijo(nicknameBuscar: string) {
    let miUsuario: any = await new Promise((resolve, reject) => {
      this.apiService.getUserByNickname(nicknameBuscar).toPromise().then(async (res) => {
        let usuario: any = res;
        if (usuario.length > 0) {
          resolve(usuario[0]);
        } else {
          resolve(null)
        }
      },
        err => console.log(err)
      );
    });
    return miUsuario;
  }

  async verificarDepartamento(depBuscar: string, arrayDepartamentos: any[]): Promise<any> {
    let miDepartamento: any = await new Promise(async (resolve, reject) => {
      let depFound = null;
      for await (let aux of arrayDepartamentos) {
        if (aux.nombre.toLowerCase() === depBuscar.toLowerCase()) {
          depFound = aux;
          break;
        }
      }
      resolve(depFound)
    });
    return miDepartamento;
  }

  async verificarMunicipio(munBuscar: string, nombreDepartamento: string): Promise<any> {
    let miMunicipio: any = await new Promise((resolve, reject) => {
      this.apiService.getMunicipioByName(munBuscar).toPromise().then(async (res) => {
        let municipios: any = res;
        let munFound = null;
        for await (let aux of municipios) {
          if (aux.departamento.toLowerCase() == nombreDepartamento.toLowerCase()) {
            resolve(aux)
          }
        }
        resolve(munFound)

      })
    });
    return miMunicipio;
  }

  archivo: any
  selectText: string = "Elige un archivo CSV"
  showButton: boolean = true
  header = true;
  cargarCSV(files: any) {
    let data = new FormData();
    data.append('file', files.item(0));

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files.item(0), { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.selectText = "Archivo Subido: ";
        this.showButton = false;
        this.validarColumnas(result);
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  async validarColumnas(csvArray: Array<any>) {
    for await (let fila of csvArray) {
      let auxCarta = {
        correo: fila.CorreoElectronico,
        password: fila.Password,
        nombreHijo: fila.NombreHijo,
        nombrePadre: fila.NombrePadre,
        nickname: fila.NicknameHijo,
        municipio: fila.Municipio,
        departamento: fila.Departamento,
        direccion: fila.DescripcionDireccion,
        latitud: fila.Latitud,
        longitud: fila.Longitud,
        telefono: fila.NumeroTelefono,
        fechaCarta: fila.FechaCarta,
        nombreJuguete: fila.NombreJuguete,
        categoriaJuguete: fila.CategoriaJuguete,
        precioJuguete: fila.PrecioJuguete,
        edadRecomendada: fila.EdadRecomendable,
      }
      this.CSVContent.push(auxCarta);
    }
    this.table.renderRows();
    console.log(this.CSVContent);
  }
}
