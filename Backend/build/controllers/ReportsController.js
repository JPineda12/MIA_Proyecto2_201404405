"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsController = void 0;
var database_1 = __importDefault(require("../database"));
var ReportsController = /** @class */ (function () {
    function ReportsController() {
    }
    ReportsController.prototype.getTop10Productos = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, prods;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT * FROM ( "
                            + " SELECT p.nombre as Prod, x.idProducto, x.cantidad, x.generado FROM Producto p,( "
                            + " SELECT a.articulos_idProducto as idProducto, count(a.articulos_idProducto) "
                            + " as cantidad, sum(a.precio) as Generado "
                            + " from articulos_carta a"
                            + " group by a.articulos_idProducto) x"
                            + " WHERE p.idProducto = x.idProducto "
                            + "  order by x.cantidad desc, x.Generado desc )"
                            + " WHERE ROWNUM <= 10";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        prods = [];
                        result.rows.map(function (prod) {
                            var productosSchema = {
                                "producto": prod[0],
                                "idProducto": prod[1],
                                "cantidad": prod[2],
                                "generado": prod[3],
                            };
                            prods.push(productosSchema);
                        });
                        res.json(prods);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportsController.prototype.getTop10Departamentos = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, prods;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT * FROM ( "
                            + " SELECT p.nombre as Prod, x.idProducto, x.cantidad, x.generado FROM Producto p,( "
                            + " SELECT a.articulos_idProducto as idProducto, count(a.articulos_idProducto) "
                            + " as cantidad, sum(a.precio) as Generado "
                            + " from articulos_carta a"
                            + " group by a.articulos_idProducto) x"
                            + " WHERE p.idProducto = x.idProducto "
                            + "  order by x.cantidad desc, x.Generado desc )"
                            + " WHERE ROWNUM <= 10";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        prods = [];
                        result.rows.map(function (prod) {
                            var productosSchema = {
                                "producto": prod[0],
                                "idProducto": prod[1],
                                "cantidad": prod[2],
                                "generado": prod[3],
                            };
                            prods.push(productosSchema);
                        });
                        res.json(prods);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportsController.prototype.getTop10Municipios = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, municipios;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT * FROM ( "
                            + " SELECT M.municipio, y.Cartas_Enviadas FROM MUNICIPIO M, "
                            + " ( SELECT count(c.idCarta) as Cartas_Enviadas, us.USUARIO_idMunicipio "
                            + " FROM CARTA c, USUARIO us "
                            + " WHERE c.carta_idusuario = us.idUsuario"
                            + " GROUP BY us.USUARIO_idMunicipio "
                            + "  ORDER BY Cartas_Enviadas DESC ) y"
                            + " WHERE m.idMunicipio = Y.USUARIO_idMunicipio "
                            + " ORDER BY y.Cartas_Enviadas DESC)"
                            + " WHERE ROWNUM <= 10";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        municipios = [];
                        result.rows.map(function (mun) {
                            var municipioSchema = {
                                "municipio": mun[0],
                                "cartas_enviadas": mun[1],
                            };
                            municipios.push(municipioSchema);
                        });
                        res.json(municipios);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportsController.prototype.getTop5GoodDeeds = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, goodDeeds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT * FROM ( "
                            + " SELECT b.titulo, x.veces_realizada from buena_accion b, ( "
                            + " SELECT ac.realizar_idbuena_accion as idAccion, count(ac.realizar_idbuena_accion) "
                            + "  as veces_realizada FROM accion_realizar ac "
                            + " GROUP BY ac.realizar_idbuena_accion) x "
                            + "  WHERE b.idBuena_Accion = x.idAccion "
                            + " ORDER BY x.veces_realizada DESC)"
                            + " WHERE ROWNUM <= 5";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        goodDeeds = [];
                        result.rows.map(function (accion) {
                            var accionSchema = {
                                "titulo": accion[0],
                                "veces_realizada": accion[1],
                            };
                            goodDeeds.push(accionSchema);
                        });
                        res.json(goodDeeds);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportsController.prototype.getTop5Categorias = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, categorias;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT * FROM ( "
                            + "  SELECT c.Categoria, count(y.prod) as cantidad, sum(y.generado) as Generado "
                            + " FROM Categoria c, (  "
                            + "  SELECT p.producto_idCategoria as idCategoria, p.nombre as prod, "
                            + " x.idProducto, x.cantidad, x.generado FROM Producto p,("
                            + " SELECT a.articulos_idProducto as idProducto, count(a.articulos_idProducto) "
                            + " as cantidad, sum(a.precio) as Generado "
                            + "   from articulos_carta a group by a.articulos_idProducto "
                            + " order by cantidad desc, Generado desc ) x "
                            + " WHERE p.idProducto = x.idProducto ) y "
                            + "  WHERE c.idCategoria = y.idCategoria "
                            + " GROUP BY c.categoria "
                            + " ORDER BY cantidad DESC) "
                            + " WHERE ROWNUM <= 10 ";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        categorias = [];
                        result.rows.map(function (cat) {
                            var catSchema = {
                                "categoria": cat[0],
                                "cantidad": cat[1],
                                "generado": cat[2],
                            };
                            categorias.push(catSchema);
                        });
                        res.json(categorias);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportsController.prototype.getTopCartas = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, cartas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT y.idCarta, ca.carta_idUsuario as idUsuario,"
                            + " y.totalGastado, ca.fecha, ca.mensaje, us.nombre, ca.estado"
                            + "  FROM CARTA ca, Usuario us,( "
                            + " SELECT x.idCarta,Sum(x.total) as TOTALGASTADO FROM ( "
                            + "  SELECT ac.idarticulos_carta as ARTICULO, c.idCarta as idCarta, ac.precio * ac.cantidad as TOTAL "
                            + " FROM CARTA c, articulos_carta ac "
                            + " WHERE c.idCarta = ac.articulos_idcarta) x "
                            + " GROUP BY x.idCarta ) y "
                            + "   WHERE ca.idCarta = y.idcarta "
                            + " AND ca.carta_idUsuario = us.idUsuario "
                            + " AND ca.estado = 2"
                            + " ORDER BY y.totalgastado DESC ";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        cartas = [];
                        result.rows.map(function (carta) {
                            var cartaSchema = {
                                "idCarta": carta[0],
                                "idUsuario": carta[1],
                                "total_gastado": carta[2],
                                "fecha": carta[3],
                                "mensaje": carta[4],
                                "nombre": carta[5],
                            };
                            cartas.push(cartaSchema);
                        });
                        res.json(cartas);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportsController.prototype.getComentariosPorKid = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUsuario, consulta, result, comentarios;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUsuario = req.params.idUsuario;
                        consulta = "select us.nombre as Usuario,  c.idComentario, c.mensaje, p.idPublicacion, p.texto"
                            + " from Publicacion p, Comentario c, Usuario us"
                            + "  WHERE us.idUsuario = c.comentario_idkid "
                            + " AND c.comentario_idPublicacion = p.idPublicacion"
                            + "  AND us.idUsuario = :idUsuario "
                            + " order by c.idComentario asc";
                        return [4 /*yield*/, database_1.default.Open(consulta, [idUsuario], true)];
                    case 1:
                        result = _a.sent();
                        comentarios = [];
                        result.rows.map(function (comment) {
                            var commentSchema = {
                                "usuario": comment[0],
                                "idComentario": comment[1],
                                "mensaje": comment[2],
                                "idPublicacion": comment[3],
                                "texto": comment[4],
                            };
                            comentarios.push(commentSchema);
                        });
                        res.json(comentarios);
                        return [2 /*return*/];
                }
            });
        });
    };
    return ReportsController;
}());
exports.reportsController = new ReportsController();
