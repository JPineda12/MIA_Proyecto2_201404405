"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_1 = require("../controllers/apiController");
var userController_1 = require("../controllers/userController");
var productController_1 = require("../controllers/productController");
var goodDeedsController_1 = require("../controllers/goodDeedsController");
var cartasController_1 = require("../controllers/cartasController");
var ReportsController_1 = require("../controllers/ReportsController");
var PublicacionesController_1 = require("../controllers/PublicacionesController");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes.prototype.config = function () {
        this.router.get('/departamentos', apiController_1.apiController.getDepartamentos);
        this.router.get('/municipios/:idDepartamento', apiController_1.apiController.getMunicipios);
        this.router.get('/departamentos/:nombre', apiController_1.apiController.getDepartamentoByName);
        this.router.get('/municipiosByName/:nombre', apiController_1.apiController.getMunicipioByName);
        this.router.post('/departamentos/', apiController_1.apiController.createDepartamento);
        this.router.post('/municipios/', apiController_1.apiController.createMunicipio);
        this.router.get('/roles', apiController_1.apiController.getRoles);
        //User ROUTES
        this.router.get('/users', userController_1.userController.getUsers);
        this.router.get('/users/:idUsuario', userController_1.userController.getUserById);
        this.router.get('/getHijos/:idPadre', userController_1.userController.getHijos);
        this.router.get('/getUserByEmail/:correo', userController_1.userController.getUserByEmail);
        this.router.get('/getUserByNickname/:nickname', userController_1.userController.getUserByNickname);
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
        this.router.get('/productsByName/:nombre', productController_1.productController.getProductosByName);
        this.router.get('/categories', productController_1.productController.getCategorias);
        this.router.get('/categoriesByName/:nombre', productController_1.productController.getCategoriasByName);
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
        this.router.get('/cartasEntregar', cartasController_1.cartasController.getCartasEntregar);
        this.router.put('/cartas', cartasController_1.cartasController.updateEstadoCarta);
        this.router.post('/createCarta', cartasController_1.cartasController.createCarta);
        this.router.get('/articulos/:idCarta', cartasController_1.cartasController.getDetalleCarta);
        this.router.post('/articulos', cartasController_1.cartasController.createDetalleCarta);
        this.router.delete('/articulos/:idArticulo', cartasController_1.cartasController.borrarArticulo);
        //REPORTS ROUTES
        this.router.get('/report1', ReportsController_1.reportsController.getTop10Productos);
        this.router.get('/report2', ReportsController_1.reportsController.getTop10Departamentos);
        this.router.get('/report3', ReportsController_1.reportsController.getTop10Municipios);
        this.router.get('/report4', ReportsController_1.reportsController.getTop5GoodDeeds);
        this.router.get('/report5', ReportsController_1.reportsController.getTop5Categorias);
        this.router.get('/report6', ReportsController_1.reportsController.getTopCartas);
        // Publicaciones routes
        this.router.get('/publicaciones', PublicacionesController_1.publicacionesController.getAllPublicaciones);
        this.router.get('/publicaciones/:idSanta', PublicacionesController_1.publicacionesController.getPublicacionesByUser);
        this.router.post('/publicaciones', PublicacionesController_1.publicacionesController.createPublicacion);
        this.router.put('/publicaciones', PublicacionesController_1.publicacionesController.updatePublicacion);
        this.router.put('/deletePublicacion', PublicacionesController_1.publicacionesController.deletePublicacion);
        this.router.get('/comentarios/:idPublicacion', PublicacionesController_1.publicacionesController.getComentariosPublicacion);
        this.router.post('/comentarios', PublicacionesController_1.publicacionesController.createComentario);
        this.router.put('/comentarios', PublicacionesController_1.publicacionesController.updateComentario);
        this.router.put('/deleteComentario', PublicacionesController_1.publicacionesController.deleteComentario);
        this.router.get('/lastIdPublicacion', PublicacionesController_1.publicacionesController.getLastPublicacionId);
        this.router.get('/lastIdComentario', PublicacionesController_1.publicacionesController.getLastComentarioId);
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
