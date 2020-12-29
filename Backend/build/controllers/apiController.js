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
exports.apiController = void 0;
var database_1 = __importDefault(require("../database"));
var ApiController = /** @class */ (function () {
    function ApiController() {
    }
    ApiController.prototype.getDepartamentos = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, deps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT * FROM Departamento";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        deps = [];
                        result.rows.map(function (dep) {
                            var departamentoSchema = {
                                "id": dep[0],
                                "nombre": dep[1]
                            };
                            deps.push(departamentoSchema);
                        });
                        res.json(deps);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getMunicipios = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idDepartamento, consulta, result, municipios;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idDepartamento = re.params.idDepartamento;
                        consulta = "SELECT m.IDMUNICIPIO, m.MUNICIPIO , d.DEPARTAMENTO "
                            + " FROM Municipio m, DEPARTAMENTO d "
                            + " WHERE m.MUNICIPIO_IDDEPARTAMENTO  = d.IDDEPARTAMENTO"
                            + " AND d.IDDEPARTAMENTO = :idDepartamento";
                        return [4 /*yield*/, database_1.default.Open(consulta, [idDepartamento], true)];
                    case 1:
                        result = _a.sent();
                        municipios = [];
                        result.rows.map(function (muni) {
                            var municipiosSchema = {
                                "id": muni[0],
                                "nombre": muni[1],
                                "idDepartamento": muni[2]
                            };
                            municipios.push(municipiosSchema);
                        });
                        res.json(municipios);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getRoles = function (re, res) {
        return __awaiter(this, void 0, void 0, function () {
            var consulta, result, roles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consulta = "SELECT * FROM Rol";
                        return [4 /*yield*/, database_1.default.Open(consulta, [], false)];
                    case 1:
                        result = _a.sent();
                        roles = [];
                        result.rows.map(function (rol) {
                            var rolesSchema = {
                                "id": rol[0],
                                "nombre": rol[1]
                            };
                            roles.push(rolesSchema);
                        });
                        res.json(roles);
                        return [2 /*return*/];
                }
            });
        });
    };
    return ApiController;
}());
exports.apiController = new ApiController();
