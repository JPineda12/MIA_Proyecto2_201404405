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
exports.publicacionesController = void 0;
var database_1 = __importDefault(require("../database"));
var PublicacionesController = /** @class */ (function () {
    function PublicacionesController() {
    }
    PublicacionesController.prototype.getAllPublicaciones = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "select p.idPublicacion, p.texto, p.imagen, p.estado, p.idSanta, s.nombre as Usuario"
                            + " from Publicacion p, Usuario s "
                            + " WHERE p.idSanta = s.idUsuario "
                            + " AND p.estado = 0"
                            + " ORDER BY p.idPublicacion desc";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        posts = [];
                        result.rows.map(function (p) {
                            var publicacionSchema = {
                                "idPublicacion": p[0],
                                "texto": p[1],
                                "imagen": p[2],
                                "estado": p[3],
                                "idSanta": p[4],
                                "usuario": p[5],
                            };
                            posts.push(publicacionSchema);
                        });
                        res.json(posts);
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicacionesController.prototype.getLastPublicacionId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, publicacion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT Max(idPublicacion) FROM Publicacion";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        publicacion = [];
                        result.rows.map(function (pub) {
                            var publicacionSchema = {
                                "idPublicacion": pub[0]
                            };
                            publicacion.push(publicacionSchema);
                        });
                        res.json(publicacion);
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicacionesController.prototype.getLastComentarioId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, publicacion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT Max(idComentario) FROM Comentario";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        publicacion = [];
                        result.rows.map(function (pub) {
                            var publicacionSchema = {
                                "idComentario": pub[0]
                            };
                            publicacion.push(publicacionSchema);
                        });
                        res.json(publicacion);
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicacionesController.prototype.getPublicacionesByUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idSanta, consulta, result, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idSanta = req.params.idSanta;
                        consulta = "select p.idPublicacion, p.texto, p.imagen, p.estado, p.idSanta, s.nombre as Usuario"
                            + " from Publicacion p, Usuario s "
                            + " WHERE p.idSanta = s.idUsuario "
                            + " AND p.idSanta = :idSanta"
                            + " AND p.estado = 0"
                            + " ORDER BY p.idPublicacion DESC";
                        return [4 /*yield*/, database_1.default.Open(consulta, [idSanta], false)];
                    case 1:
                        result = _a.sent();
                        posts = [];
                        result.rows.map(function (p) {
                            var publicacionSchema = {
                                "idPublicacion": p[0],
                                "texto": p[1],
                                "imagen": p[2],
                                "estado": p[3],
                                "idSanta": p[4],
                                "usuario": p[5],
                            };
                            posts.push(publicacionSchema);
                        });
                        res.json(posts);
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicacionesController.prototype.createPublicacion = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, texto, imagen, estado, idSanta, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, texto = _a.texto, imagen = _a.imagen, estado = _a.estado, idSanta = _a.idSanta;
                        sql = "INSERT INTO PUBLICACION(texto, imagen, estado, idSanta) "
                            + " VALUES(:texto,:imagen, :estado, :idSanta)";
                        return [4 /*yield*/, database_1.default.Open(sql, [texto, imagen, estado, idSanta], true)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({
                            "texto": texto
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicacionesController.prototype.updatePublicacion = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, texto, imagen, idPublicacion, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, texto = _a.texto, imagen = _a.imagen, idPublicacion = _a.idPublicacion;
                        sql = "UPDATE PUBLICACION set texto = :texto, imagen = :imagen "
                            + " WHERE idPublicacion = :idPublicacion";
                        return [4 /*yield*/, database_1.default.Open(sql, [texto, imagen, idPublicacion], true)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({
                            "texto": texto
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicacionesController.prototype.deletePublicacion = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idPublicacion, sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idPublicacion = req.body.idPublicacion;
                        sql = "UPDATE PUBLICACION set estado = 1 "
                            + " WHERE idPublicacion = :idPublicacion";
                        return [4 /*yield*/, database_1.default.Open(sql, [idPublicacion], true)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({
                            "deleted": idPublicacion
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicacionesController.prototype.createComentario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, mensaje, idPublicacion, idKid, estado, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, mensaje = _a.mensaje, idPublicacion = _a.idPublicacion, idKid = _a.idKid, estado = _a.estado;
                        sql = "INSERT INTO COMENTARIO(Mensaje, comentario_idPublicacion, comentario_idKid, estado) "
                            + " VALUES(:mensaje, :idPublicacion, :idKid, :estado)";
                        return [4 /*yield*/, database_1.default.Open(sql, [mensaje, idPublicacion, idKid, estado], true)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({
                            "texto": mensaje
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicacionesController.prototype.getComentariosPublicacion = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idPublicacion, consulta, result, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idPublicacion = req.params.idPublicacion;
                        consulta = "SELECT c.idComentario, c.mensaje, c.comentario_idKid, us.nombre as Usuario"
                            + " FROM COMENTARIO c, USUARIO us, Publicacion p"
                            + " WHERE c.comentario_idkid = us.idUsuario "
                            + " AND c.comentario_idPublicacion = p.idPublicacion"
                            + " AND p.idPublicacion = :idPublicacion "
                            + " AND c.estado = 0 ";
                        return [4 /*yield*/, database_1.default.Open(consulta, [idPublicacion], false)];
                    case 1:
                        result = _a.sent();
                        comments = [];
                        result.rows.map(function (p) {
                            var comentarioSchema = {
                                "idComentario": p[0],
                                "mensaje": p[1],
                                "idKid": p[2],
                                "usuario": p[3],
                            };
                            comments.push(comentarioSchema);
                        });
                        res.json(comments);
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicacionesController.prototype.updateComentario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idComentario, mensaje, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, idComentario = _a.idComentario, mensaje = _a.mensaje;
                        sql = "UPDATE Comentario SET mensaje = :mensaje"
                            + " WHERE idComentario = :idComentario ";
                        return [4 /*yield*/, database_1.default.Open(sql, [idComentario, mensaje], true)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({
                            "texto": mensaje
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicacionesController.prototype.deleteComentario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idComentario, sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idComentario = req.body.idComentario;
                        sql = "UPDATE Comentario SET estado = 0"
                            + " WHERE idComentario = :idComentario ";
                        return [4 /*yield*/, database_1.default.Open(sql, [idComentario], true)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({
                            "idComentario": idComentario
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return PublicacionesController;
}());
exports.publicacionesController = new PublicacionesController();
