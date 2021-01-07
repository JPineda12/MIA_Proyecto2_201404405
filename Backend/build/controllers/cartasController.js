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
exports.cartasController = void 0;
var database_1 = __importDefault(require("../database"));
var CartasController = /** @class */ (function () {
    function CartasController() {
    }
    CartasController.prototype.getCartasByUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idusuario, estado, consulta, result, cartas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.headers, idusuario = _a.idusuario, estado = _a.estado;
                        console.log("idUsuario: ", idusuario);
                        console.log("estado: ", estado);
                        consulta = "SELECT idCarta, Mensaje, Fecha, Estado, Carta_idUsuario"
                            + " FROM CARTA WHERE estado = :estado AND Carta_idUsuario = :idusuario";
                        return [4 /*yield*/, database_1.default.Open(consulta, [estado, idusuario], true)];
                    case 1:
                        result = _b.sent();
                        cartas = [];
                        result.rows.map(function (cart) {
                            var cartasSchema = {
                                "idCarta": cart[0],
                                "mensaje": cart[1],
                                "fecha": cart[2],
                                "estado": cart[3],
                                "idUsuario": cart[4]
                            };
                            cartas.push(cartasSchema);
                        });
                        res.json(cartas);
                        return [2 /*return*/];
                }
            });
        });
    };
    CartasController.prototype.getDetalleCarta = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idCarta, consulta, result, articulos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idCarta = req.params.idCarta;
                        consulta = "SELECT p.idProducto, p.nombre, p.image_url as Imagen, ar.cantidad, ar.precio, "
                            + " ar.idArticulos_carta, ar.Articulos_idCarta"
                            + " FROM Producto p, Carta c, Articulos_Carta ar"
                            + " WHERE ar.articulos_idproducto = p.idproducto"
                            + " AND ar.articulos_idcarta = c.idcarta"
                            + " and ar.articulos_idcarta = :idCarta";
                        return [4 /*yield*/, database_1.default.Open(consulta, [idCarta], true)];
                    case 1:
                        result = _a.sent();
                        articulos = [];
                        result.rows.map(function (articulo) {
                            var articulosSchema = {
                                "idProducto": articulo[0],
                                "Nombre": articulo[1],
                                "image_url": articulo[2],
                                "cantidad": articulo[3],
                                "precio": articulo[4],
                                "idArticulo": articulo[5],
                                "idCarta": articulo[6]
                            };
                            articulos.push(articulosSchema);
                        });
                        res.json(articulos);
                        return [2 /*return*/];
                }
            });
        });
    };
    CartasController.prototype.getAllCartas = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, cartas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT idCarta, Mensaje, Fecha, Estado, Carta_idUsuario"
                            + " FROM CARTA";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        cartas = [];
                        result.rows.map(function (cart) {
                            var cartasSchema = {
                                "idCarta": cart[0],
                                "mensaje": cart[1],
                                "fecha": cart[2],
                                "estado": cart[3],
                                "idUsuario": cart[4]
                            };
                            cartas.push(cartasSchema);
                        });
                        res.json(cartas);
                        return [2 /*return*/];
                }
            });
        });
    };
    CartasController.prototype.getLastId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, cartas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT Max(idCarta) FROM Carta";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        cartas = [];
                        result.rows.map(function (carta) {
                            var cartasSchema = {
                                "idCarta": carta[0]
                            };
                            cartas.push(cartasSchema);
                        });
                        res.json(cartas);
                        return [2 /*return*/];
                }
            });
        });
    };
    CartasController.prototype.createCarta = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, mensaje, fecha, estado, idUsuario, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, mensaje = _a.mensaje, fecha = _a.fecha, estado = _a.estado, idUsuario = _a.idUsuario;
                        sql = "CALL crear_Carta(:mensaje, TO_DATE(:fecha, 'MM/DD/YYYY'), :estado,:idUsuario)";
                        console.log("Hmm: ", sql);
                        return [4 /*yield*/, database_1.default.Open(sql, [mensaje, fecha, estado, idUsuario], true)];
                    case 1:
                        result = _b.sent();
                        console.log("RES: ", result);
                        res.status(200).json({
                            "mensaje": mensaje,
                            "fecha": fecha,
                            "estado": estado,
                            "idUsuario": idUsuario
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CartasController.prototype.createDetalleCarta = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cantidad, precio, idCarta, idProducto, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, cantidad = _a.cantidad, precio = _a.precio, idCarta = _a.idCarta, idProducto = _a.idProducto;
                        sql = "INSERT INTO ARTICULOS_CARTA(CANTIDAD, PRECIO, ARTICULOS_IDCARTA, ARTICULOS_IDPRODUCTO)"
                            + " VALUES(:cantidad, :precio, :idCarta, :idProducto)";
                        return [4 /*yield*/, database_1.default.Open(sql, [cantidad, precio, idCarta, idProducto], true)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({
                            "cantidad": cantidad,
                            "precio": precio,
                            "idCarta": idCarta,
                            "idProducto": idProducto
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CartasController.prototype.borrarArticulo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idDetalle, sql, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idDetalle = req.params.idDetalle;
                        sql = "DELETE FROM ARTICULOS_CARTA WHERE IDARTICULOS_CARTA = :idDetalle";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.Open(sql, [idDetalle], true)];
                    case 2:
                        _a.sent();
                        res.status(200).json({
                            "deleted": true
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log("Error al realizar la consulta => ", err_1);
                        res.json({ "deleted": false });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CartasController.prototype.updateEstadoCarta = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, estado, idCarta, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, estado = _a.estado, idCarta = _a.idCarta;
                        sql = "UPDATE CARTA SET ESTADO = :estado"
                            + " WHERE IDCARTA = :idCarta";
                        return [4 /*yield*/, database_1.default.Open(sql, [estado, idCarta], true)];
                    case 1:
                        _b.sent();
                        res.status(200).json({
                            "estado": estado,
                            "idCarta": idCarta
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return CartasController;
}());
exports.cartasController = new CartasController();
