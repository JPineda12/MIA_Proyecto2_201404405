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
exports.userController = void 0;
var database_1 = __importDefault(require("../database"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getUsers = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result, Users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT idUsuario, nombre, nickname, email, genero, fechaNacimiento, "
                            + "telefono, bastones, direccion, USUARIO_IDPADRE, USUARIO_IDROL, USUARIO_IDMUNICIPIO,"
                            + "m.MUNICIPIO_IDDEPARTAMENTO, r.Rol, m.MUNICIPIO, d.DEPARTAMENTO"
                            + " From Usuario, Rol r, Municipio m, Departamento d "
                            + " WHERE r.IDROL = USUARIO_IDROL "
                            + " AND m.IDMUNICIPIO = USUARIO_IDMUNICIPIO "
                            + " AND m.MUNICIPIO_IDDEPARTAMENTO  = d.IDDEPARTAMENTO ";
                        return [4 /*yield*/, database_1.default.Open(sql, [], false)];
                    case 1:
                        result = _a.sent();
                        Users = [];
                        result.rows.map(function (user) {
                            var userSchema = {
                                "idUsuario": user[0],
                                "nombre": user[1],
                                "nickname": user[2],
                                "email": user[3],
                                "genero": user[4],
                                "fecha": user[5],
                                "telefono": user[6],
                                "bastones": user[7],
                                "direccion": user[8],
                                "idPadre": user[9],
                                "idRol": user[10],
                                "idMunicipio": user[11],
                                "idDepartamento": user[12],
                                "rol": user[13],
                                "municipio": user[14],
                                "departamento": user[15],
                            };
                            Users.push(userSchema);
                        });
                        res.json(Users);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUsuario, sql, result, Users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUsuario = req.params.idUsuario;
                        sql = "SELECT idUsuario, nombre, nickname, email, genero, fechaNacimiento, "
                            + "telefono, bastones, direccion, USUARIO_IDPADRE, USUARIO_IDROL, USUARIO_IDMUNICIPIO,"
                            + "m.MUNICIPIO_IDDEPARTAMENTO, r.Rol, m.MUNICIPIO, d.DEPARTAMENTO"
                            + " From Usuario, Rol r, Municipio m, Departamento d "
                            + " WHERE r.IDROL = USUARIO_IDROL "
                            + " AND m.IDMUNICIPIO = USUARIO_IDMUNICIPIO "
                            + " AND m.MUNICIPIO_IDDEPARTAMENTO  = d.IDDEPARTAMENTO "
                            + " AND idUsuario = :idUsuario";
                        return [4 /*yield*/, database_1.default.Open(sql, [idUsuario], true)];
                    case 1:
                        result = _a.sent();
                        Users = [];
                        result.rows.map(function (user) {
                            var userSchema = {
                                "idUsuario": user[0],
                                "nombre": user[1],
                                "nickname": user[2],
                                "email": user[3],
                                "genero": user[4],
                                "fecha": user[5],
                                "telefono": user[6],
                                "bastones": user[7],
                                "direccion": user[8],
                                "idPadre": user[9],
                                "idRol": user[10],
                                "idMunicipio": user[11],
                                "idDepartamento": user[12],
                                "rol": user[13],
                                "municipio": user[14],
                                "departamento": user[15],
                            };
                            Users.push(userSchema);
                        });
                        res.json(Users);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUserByEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var correo, sql, result, Users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        correo = req.params.correo;
                        sql = "SELECT idUsuario, nombre, nickname, email, genero, fechaNacimiento, "
                            + "telefono, bastones, direccion, USUARIO_IDPADRE, USUARIO_IDROL, USUARIO_IDMUNICIPIO,"
                            + "m.MUNICIPIO_IDDEPARTAMENTO, r.Rol, m.MUNICIPIO, d.DEPARTAMENTO"
                            + " From Usuario, Rol r, Municipio m, Departamento d "
                            + " WHERE r.IDROL = USUARIO_IDROL "
                            + " AND m.IDMUNICIPIO = USUARIO_IDMUNICIPIO "
                            + " AND m.MUNICIPIO_IDDEPARTAMENTO  = d.IDDEPARTAMENTO "
                            + " AND email = :correo";
                        return [4 /*yield*/, database_1.default.Open(sql, [correo], true)];
                    case 1:
                        result = _a.sent();
                        Users = [];
                        result.rows.map(function (user) {
                            var userSchema = {
                                "idUsuario": user[0],
                                "nombre": user[1],
                                "nickname": user[2],
                                "email": user[3],
                                "genero": user[4],
                                "fecha": user[5],
                                "telefono": user[6],
                                "bastones": user[7],
                                "direccion": user[8],
                                "idPadre": user[9],
                                "idRol": user[10],
                                "idMunicipio": user[11],
                                "idDepartamento": user[12],
                                "rol": user[13],
                                "municipio": user[14],
                                "departamento": user[15],
                            };
                            Users.push(userSchema);
                        });
                        res.json(Users);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getHijos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idPadre, sql, result, Users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idPadre = req.params.idPadre;
                        sql = "SELECT hijo.idUsuario, hijo.nombre, hijo.nickname, hijo.email,"
                            + " hijo.genero, hijo.fechanacimiento,"
                            + " hijo.telefono, hijo.bastones, hijo.direccion "
                            + " FROM USUARIO hijo, USUARIO padre "
                            + " WHERE hijo.USUARIO_IDPADRE = padre.IDUSUARIO "
                            + "AND padre.IDUSUARIO = :idPadre ";
                        return [4 /*yield*/, database_1.default.Open(sql, [idPadre], true)];
                    case 1:
                        result = _a.sent();
                        Users = [];
                        result.rows.map(function (user) {
                            var userSchema = {
                                "idUsuario": user[0],
                                "nombre": user[1],
                                "nickname": user[2],
                                "email": user[3],
                                "genero": user[4],
                                "fecha": user[5],
                                "telefono": user[6],
                                "bastones": user[7],
                                "direccion": user[8],
                            };
                            Users.push(userSchema);
                        });
                        res.json(Users);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.newUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nombre, nickname, email, pass, gender, fecha, tel, bastones, direccion, idRol, idMunicipio, idPadre, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, nombre = _a.nombre, nickname = _a.nickname, email = _a.email, pass = _a.pass, gender = _a.gender, fecha = _a.fecha, tel = _a.tel, bastones = _a.bastones, direccion = _a.direccion, idRol = _a.idRol, idMunicipio = _a.idMunicipio, idPadre = _a.idPadre;
                        sql = "INSERT INTO Usuario(nombre,nickname,email, contrasena, genero,fechaNacimiento, "
                            + "telefono, bastones, direccion, USUARIO_IDROL, USUARIO_IDMUNICIPIO, USUARIO_IDPADRE) "
                            + "VALUES(:nombre, :nickname, :email, :pass, :gender, TO_DATE(:fecha, 'MM/DD/YYYY'), :tel,"
                            + ":bastones, :direccion, :idRol, :idMunicipio, :idPadre)";
                        return [4 /*yield*/, database_1.default.Open(sql, [nombre, nickname, email, pass, gender, fecha, tel, bastones, direccion, idRol, idMunicipio, idPadre], true)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({
                            "email": email,
                            "name": nombre,
                            "bastones": bastones,
                            "fecha": fecha
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.loginEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, sql, ok;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.headers, email = _a.email, password = _a.password;
                        sql = "SELECT idUsuario, bastones, fechaNacimiento, Usuario_idRol, nombre FROM Usuario WHERE email = :email AND contrasena = :password ";
                        return [4 /*yield*/, database_1.default.Open(sql, [email, password], true)];
                    case 1:
                        ok = _b.sent();
                        if (ok.rows.length > 0) {
                            res.json({
                                "auth": true,
                                "idUsuario": ok.rows[0][0],
                                "bastones": ok.rows[0][1],
                                "fecha": ok.rows[0][2],
                                "idRol": ok.rows[0][3],
                                "nombre": ok.rows[0][4]
                            });
                        }
                        else {
                            res.json({
                                "auth": false
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.loginNickname = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nickname, password, sql, ok;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.headers, nickname = _a.nickname, password = _a.password;
                        sql = "SELECT idUsuario, bastones, fechaNacimiento, Usuario_idRol FROM Usuario WHERE nickname = :nickname AND contrasena = :password ";
                        return [4 /*yield*/, database_1.default.Open(sql, [nickname, password], true)];
                    case 1:
                        ok = _b.sent();
                        if (ok.rows.length > 0) {
                            res.json({
                                "auth": true,
                                "idUsuario": ok.rows[0][0],
                                "bastones": ok.rows[0][1],
                                "fecha": ok.rows[0][2],
                                "idRol": ok.rows[0][3],
                            });
                        }
                        else {
                            res.json({
                                "auth": false
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idUsuario, nombre, nickname, email, pass, gender, fecha, tel, bastones, direccion, idRol, idMunicipio, idPadre, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, idUsuario = _a.idUsuario, nombre = _a.nombre, nickname = _a.nickname, email = _a.email, pass = _a.pass, gender = _a.gender, fecha = _a.fecha, tel = _a.tel, bastones = _a.bastones, direccion = _a.direccion, idRol = _a.idRol, idMunicipio = _a.idMunicipio, idPadre = _a.idPadre;
                        sql = "UPDATE USUARIO SET nombre = :nombre, nickname = :nickname, email = :email,"
                            + " contrasena = :pass, genero = :gender, fechanacimiento = TO_DATE(:fecha, 'YYYY/MM/DD'), telefono = :tel,"
                            + " bastones = :bastones, direccion = :direccion, USUARIO_IDROL = :idRol,"
                            + "USUARIO_IDMUNICIPIO = :idMunicipio, USUARIO_IDPADRE = :idPadre "
                            + "WHERE idUsuario = :idUsuario";
                        return [4 /*yield*/, database_1.default.Open(sql, [nombre, nickname, email, pass, gender, fecha, tel, bastones, direccion, idRol, idMunicipio, idPadre, idUsuario], true)];
                    case 1:
                        _b.sent();
                        res.status(200).json({
                            "email": email,
                            "name": nombre,
                            "bastones": bastones,
                            "fecha": fecha,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUsuario, sql, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUsuario = req.body.idUsuario;
                        sql = "DELETE FROM Usuario WHERE idUsuario = :idUsuario ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.Open(sql, [idUsuario], true)];
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
    return UserController;
}());
exports.userController = new UserController();
