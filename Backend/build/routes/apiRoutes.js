"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_1 = require("../controllers/apiController");
var userController_1 = require("../controllers/userController");
var productController_1 = require("../controllers/productController");
var goodDeedsController_1 = require("../controllers/goodDeedsController");
var cartasController_1 = require("../controllers/cartasController");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes.prototype.config = function () {
        this.router.get('/departamentos', apiController_1.apiController.getDepartamentos);
        this.router.get('/municipios/:idDepartamento', apiController_1.apiController.getMunicipios);
        this.router.get('/roles', apiController_1.apiController.getRoles);
        //User ROUTES
        this.router.get('/users', userController_1.userController.getUsers);
        this.router.get('/users/:idUsuario', userController_1.userController.getUserById);
        this.router.get('/getHijos/:idPadre', userController_1.userController.getHijos);
        this.router.get('/getUserByEmail/:correo', userController_1.userController.getUserByEmail);
        this.router.post('/users', userController_1.userController.newUser);
        this.router.put('/users', userController_1.userController.updateUser);
        this.router.put('/updateHijo', userController_1.userController.updateHijo);
        this.router.put('/deleteUser', userController_1.userController.deleteUser);
        this.router.get('/loginEmail', userController_1.userController.loginEmail);
        this.router.get('/loginNickname', userController_1.userController.loginNickname);
        this.router.get('/getAllPadres/', userController_1.userController.getAllPadres);
        //Product Routes
        this.router.get('/products', productController_1.productController.getProductos);
        this.router.get('/products/:id', productController_1.productController.getProductById);
        this.router.post('/products', productController_1.productController.insertProducto);
        this.router.put('/deleteProduct', productController_1.productController.deleteProducto);
        this.router.put('/products/', productController_1.productController.updateProducto);
        this.router.get('/categories', productController_1.productController.getCategorias);
        this.router.post('/categories', productController_1.productController.insertCategoria);
        this.router.put('/categories/', productController_1.productController.updateCategoria);
        this.router.put('/deletecategory/', productController_1.productController.deleteCategoria);
        //GoodActions Routes
        this.router.get('/goodDeeds', goodDeedsController_1.goodDeedsController.getGoodDeeds);
        this.router.get('/goodDeedsByAge/', goodDeedsController_1.goodDeedsController.getGoodDeedsByAge);
        this.router.get('/goodDeeds/:idAccion', goodDeedsController_1.goodDeedsController.getDeedById);
        this.router.post('/goodDeeds', goodDeedsController_1.goodDeedsController.insertGoodDeed);
        this.router.post('/goodDeedDone', goodDeedsController_1.goodDeedsController.insertGoodDeedDone);
        this.router.put('/goodDeeds', goodDeedsController_1.goodDeedsController.updateGoodDeed);
        this.router.put('/deleteGoodDeeds', goodDeedsController_1.goodDeedsController.deleteGoodDeed);
        this.router.get('/goodDeedsDone/:idUsuario', goodDeedsController_1.goodDeedsController.getGoodDeedsDone);
        this.router.put('/ChangeGoodDeedState', goodDeedsController_1.goodDeedsController.ChangeGoodDeedState);
        this.router.get('/pendingGoodDeeds/:idUsuario', goodDeedsController_1.goodDeedsController.getPendingGoodDeeds);
        //Cartas Routes
        this.router.get('/cartas', cartasController_1.cartasController.getCartasByUser);
        this.router.get('/lastIdCarta', cartasController_1.cartasController.getLastId);
        this.router.get('/allCartas', cartasController_1.cartasController.getAllCartas);
        this.router.put('/cartas', cartasController_1.cartasController.updateEstadoCarta);
        this.router.post('/createCarta', cartasController_1.cartasController.createCarta);
        this.router.get('/articulos/:idCarta', cartasController_1.cartasController.getDetalleCarta);
        this.router.post('/articulos', cartasController_1.cartasController.createDetalleCarta);
        this.router.delete('/articulos/:idArticulo', cartasController_1.cartasController.borrarArticulo);
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
