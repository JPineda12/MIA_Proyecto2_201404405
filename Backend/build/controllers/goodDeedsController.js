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
exports.goodDeedsController = void 0;
var database_1 = __importDefault(require("../database"));
var GoodDeedsController = /** @class */ (function () {
    function GoodDeedsController() {
    }
    GoodDeedsController.prototype.getGoodDeeds = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result, acciones;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT IDBUENA_ACCION, TITULO, DESCRIPCION, RECOMPENSA,"
                            + " MINEDAD FROM BUENA_ACCION WHERE ESTADO = 0";
                        return [4 /*yield*/, database_1.default.Open(sql, [], false)];
                    case 1:
                        result = _a.sent();
                        acciones = [];
                        result.rows.map(function (accion) {
                            var accionesSchema = {
                                "id": accion[0],
                                "titulo": accion[1],
                                "descripcion": accion[2],
                                "recompensa": accion[3],
                                "minEdad": accion[4],
                            };
                            acciones.push(accionesSchema);
                        });
                        res.json(acciones);
                        return [2 /*return*/];
                }
            });
        });
    };
    //Obtiene todas las buenas acciones menos o iguales que su edad y que NO ha realizado.
    GoodDeedsController.prototype.getGoodDeedsByAge = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idusuario, minedad, sql, result, acciones;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.headers, idusuario = _a.idusuario, minedad = _a.minedad;
                        sql = "SELECT b.IDBUENA_ACCION, b.titulo, b.descripcion, b.recompensa, b.MINEDAD"
                            + " FROM BUENA_ACCION b "
                            + " WHERE b.MINEDAD <= :minedad";
                        return [4 /*yield*/, database_1.default.Open(sql, [minedad], true)];
                    case 1:
                        result = _b.sent();
                        acciones = [];
                        result.rows.map(function (accion) {
                            var accionesSchema = {
                                "idAccion": accion[0],
                                "titulo": accion[1],
                                "descripcion": accion[2],
                                "recompensa": accion[3],
                                "minEdad": accion[4],
                            };
                            acciones.push(accionesSchema);
                        });
                        res.json(acciones);
                        return [2 /*return*/];
                }
            });
        });
    };
    GoodDeedsController.prototype.getPendingGoodDeeds = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUsuario, sql, result, acciones;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUsuario = req.params.idUsuario;
                        sql = "SELECT ba.IDBUENA_ACCION, ba.TITULO, ba.DESCRIPCION,"
                            + "ar.RECOMPENSA, ba.MINEDAD, u.NICKNAME, ar.ESTADO "
                            + " FROM BUENA_ACCION ba, USUARIO u, ACCION_REALIZAR ar "
                            + " WHERE ar.REALIZAR_IDBUENA_ACCION = ba.IDBUENA_ACCION "
                            + " AND ar.REALIZAR_IDUSUARIO = u.IDUSUARIO "
                            + " AND u.IDUSUARIO = :idUsuario";
                        return [4 /*yield*/, database_1.default.Open(sql, [idUsuario], true)];
                    case 1:
                        result = _a.sent();
                        acciones = [];
                        result.rows.map(function (accion) {
                            var accionesSchema = {
                                "idAccion": accion[0],
                                "titulo": accion[1],
                                "descripcion": accion[2],
                                "recompensa": accion[3],
                                "minEdad": accion[4],
                                "nickname": accion[5],
                                "estado": accion[6],
                                "idUsuario": idUsuario,
                            };
                            acciones.push(accionesSchema);
                        });
                        res.json(acciones);
                        return [2 /*return*/];
                }
            });
        });
    };
    GoodDeedsController.prototype.ChangeGoodDeedState = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idAccion, idUsuario, estado, sql, x;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, idAccion = _a.idAccion, idUsuario = _a.idUsuario, estado = _a.estado;
                        sql = "UPDATE ACCION_REALIZAR SET estado = :estado"
                            + " WHERE REALIZAR_IDBUENA_ACCION = :idAccion AND REALIZAR_IDUSUARIO = :idUsuario ";
                        return [4 /*yield*/, database_1.default.Open(sql, [estado, idAccion, idUsuario], true)];
                    case 1:
                        x = _b.sent();
                        res.status(200).json({
                            "idAccion": idAccion,
                            "idUsuario": idUsuario,
                            "estado": estado
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    GoodDeedsController.prototype.getGoodDeedsDone = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUsuario, sql, result, acciones;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUsuario = req.params.idUsuario;
                        sql = "SELECT * FROM ACCION_REALIZAR ar"
                            + " WHERE ESTADO = 3"
                            + " AND REALIZAR_IDUSUARIO = :idUsuario";
                        return [4 /*yield*/, database_1.default.Open(sql, [idUsuario], true)];
                    case 1:
                        result = _a.sent();
                        acciones = [];
                        result.rows.map(function (accion) {
                            var accionesSchema = {
                                "idAccion": accion[0],
                                "idUsuario": accion[1],
                                "Fecha": accion[2],
                                "Estado": accion[3],
                                "Recompensa": accion[4],
                            };
                            acciones.push(accionesSchema);
                        });
                        res.json(acciones);
                        return [2 /*return*/];
                }
            });
        });
    };
    GoodDeedsController.prototype.insertGoodDeedDone = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idAccion, idUsuario, fecha, estado, recompensa, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, idAccion = _a.idAccion, idUsuario = _a.idUsuario, fecha = _a.fecha, estado = _a.estado, recompensa = _a.recompensa;
                        sql = "INSERT INTO ACCION_REALIZAR(REALIZAR_IDBUENA_ACCION, REALIZAR_IDUSUARIO, FECHA, ESTADO, RECOMPENSA)"
                            + " VALUES(:idAccion,:idUsuario,TO_DATE(:fecha, 'MM/DD/YYYY'), :estado, :recompensa)";
                        return [4 /*yield*/, database_1.default.Open(sql, [idAccion, idUsuario, fecha, estado, recompensa], true)];
                    case 1:
                        _b.sent();
                        res.status(200).json({
                            "idAccion": idAccion,
                            "idUsuario": idUsuario,
                            "fecha": fecha,
                            "estado": estado,
                            "recompensa": recompensa
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    GoodDeedsController.prototype.getDeedById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idAccion, sql, result, acciones;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idAccion = req.params.idAccion;
                        sql = "SELECT IDBUENA_ACCION, TITULO, DESCRIPCION, RECOMPENSA,"
                            + "MINEDAD FROM BUENA_ACCION"
                            + " WHERE IDBUENA_ACCION = :idAccion"
                            + " AND ESTADO = 0";
                        return [4 /*yield*/, database_1.default.Open(sql, [idAccion], true)];
                    case 1:
                        result = _a.sent();
                        acciones = [];
                        result.rows.map(function (accion) {
                            var accionesSchema = {
                                "idAccion": accion[0],
                                "titulo": accion[1],
                                "descripcion": accion[2],
                                "recompensa": accion[3],
                                "minEdad": accion[4],
                            };
                            acciones.push(accionesSchema);
                        });
                        res.json(acciones);
                        return [2 /*return*/];
                }
            });
        });
    };
    GoodDeedsController.prototype.insertGoodDeed = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, titulo, descripcion, recompensa, minEdad, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, titulo = _a.titulo, descripcion = _a.descripcion, recompensa = _a.recompensa, minEdad = _a.minEdad;
                        sql = "INSERT INTO Buena_Accion(TITULO, DESCRIPCION, RECOMPENSA, MINEDAD, ESTADO)"
                            + " VALUES(:titulo,:descripcion,:recompensa,:minEdad, 0)";
                        return [4 /*yield*/, database_1.default.Open(sql, [titulo, descripcion, recompensa, minEdad], true)];
                    case 1:
                        _b.sent();
                        res.status(200).json({
                            "titulo": titulo,
                            "descripcion": descripcion
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    GoodDeedsController.prototype.updateGoodDeed = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idAccion, titulo, descripcion, recompensa, edadMinima, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, idAccion = _a.idAccion, titulo = _a.titulo, descripcion = _a.descripcion, recompensa = _a.recompensa, edadMinima = _a.edadMinima;
                        sql = "UPDATE BUENA_ACCION SET TITULO =:titulo, DESCRIPCION =:descripcion,"
                            + " RECOMPENSA =:recompensa, MINEDAD =:edadMinima WHERE IDBUENA_ACCION =:idAccion";
                        return [4 /*yield*/, database_1.default.Open(sql, [titulo, descripcion, recompensa, edadMinima, idAccion], true)];
                    case 1:
                        _b.sent();
                        res.status(200).json({
                            "idAccion": idAccion,
                            "titulo": titulo
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    GoodDeedsController.prototype.deleteGoodDeed = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idAccion, sql, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idAccion = req.body.idAccion;
                        sql = "UPDATE Buena_Accion SET ESTADO = 1 WHERE idBuena_Accion = :idAccion";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.Open(sql, [idAccion], true)];
                    case 2:
                        _a.sent();
                        res.status(200).json({
                            "deleted": true,
                            "idAccion": idAccion
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
    return GoodDeedsController;
}());
exports.goodDeedsController = new GoodDeedsController();
