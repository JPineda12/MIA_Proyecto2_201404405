"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_1 = require("../controllers/apiController");
var userController_1 = require("../controllers/userController");
var productController_1 = require("../controllers/productController");
var goodDeedsController_1 = require("../controllers/goodDeedsController");
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
        this.router.get('/goodDeedsByAge/:minEdad', goodDeedsController_1.goodDeedsController.getGoodDeedsByAge);
        this.router.get('/goodDeeds/:idAccion', goodDeedsController_1.goodDeedsController.getDeedById);
        this.router.post('/goodDeeds', goodDeedsController_1.goodDeedsController.insertGoodDeed);
        this.router.put('/goodDeeds', goodDeedsController_1.goodDeedsController.updateGoodDeed);
        this.router.put('/deleteGoodDeeds', goodDeedsController_1.goodDeedsController.deleteGoodDeed);
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
