import { Router } from 'express';
import { apiController} from '../controllers/apiController';
import { userController} from '../controllers/userController';
import { productController} from '../controllers/productController';
import { goodDeedsController} from '../controllers/goodDeedsController';
import { cartasController} from '../controllers/cartasController';
import { reportsController} from '../controllers/ReportsController';
import { publicacionesController} from '../controllers/PublicacionesController';
class ApiRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }
    
    config():void{
        this.router.get('/departamentos', apiController.getDepartamentos);
        this.router.get('/municipios/:idDepartamento', apiController.getMunicipios);
        this.router.get('/departamentos/:nombre', apiController.getDepartamentoByName)
        this.router.get('/municipiosByName/:nombre', apiController.getMunicipioByName)
        this.router.post('/departamentos/', apiController.createDepartamento);
        this.router.post('/municipios/', apiController.createMunicipio);
        this.router.get('/roles', apiController.getRoles);
        //User ROUTES
        this.router.get('/users', userController.getUsers);
        this.router.get('/getKids', userController.getKids);
        this.router.get('/users/:idUsuario', userController.getUserById);
        this.router.get('/getHijos/:idPadre', userController.getHijos);
        this.router.get('/getUserByEmail/:correo', userController.getUserByEmail);
        this.router.get('/getUserByNickname/:nickname', userController.getUserByNickname);
        this.router.post('/users', userController.newUser);
        this.router.put('/users', userController.updateUser);
        this.router.put('/updateHijo', userController.updateHijo);
        this.router.put('/deleteUser', userController.deleteUser);
        this.router.get('/loginEmail', userController.loginEmail);
        this.router.get('/loginNickname', userController.loginNickname);
        this.router.get('/getAllPadres/', userController.getAllPadres);

        //Product Routes
        this.router.get('/products', productController.getProductos);
        this.router.get('/products/:id', productController.getProductById);
        this.router.post('/products', productController.insertProducto);
        this.router.put('/deleteProduct', productController.deleteProducto);
        this.router.put('/products/', productController.updateProducto);
        this.router.get('/productsByName/:nombre', productController.getProductosByName);
        this.router.get('/categories', productController.getCategorias);
        this.router.get('/categoriesByName/:nombre', productController.getCategoriasByName);
        this.router.post('/categories',productController.insertCategoria);
        this.router.put('/categories/', productController.updateCategoria);
        this.router.put('/deletecategory/', productController.deleteCategoria);
        //GoodActions Routes
        this.router.get('/goodDeeds', goodDeedsController.getGoodDeeds);
        this.router.get('/goodDeedsByAge/', goodDeedsController.getGoodDeedsByAge);
        this.router.get('/goodDeeds/:idAccion', goodDeedsController.getDeedById);
        this.router.post('/goodDeeds', goodDeedsController.insertGoodDeed);
        this.router.post('/goodDeedDone', goodDeedsController.insertGoodDeedDone);
        this.router.put('/goodDeeds', goodDeedsController.updateGoodDeed);
        this.router.put('/deleteGoodDeeds', goodDeedsController.deleteGoodDeed)
        this.router.get('/goodDeedsDone/:idUsuario', goodDeedsController.getGoodDeedsDone);
        this.router.put('/ChangeGoodDeedState', goodDeedsController.ChangeGoodDeedState);
        this.router.get('/pendingGoodDeeds/:idUsuario', goodDeedsController.getPendingGoodDeeds);
        
        //Cartas Routes
        this.router.get('/cartas', cartasController.getCartasByUser);
        this.router.get('/lastIdCarta', cartasController.getLastId);
        this.router.get('/allCartas', cartasController.getAllCartas);
        this.router.get('/cartasEntregar', cartasController.getCartasEntregar);
        this.router.put('/cartas', cartasController.updateEstadoCarta);
        this.router.post('/createCarta', cartasController.createCarta);
        this.router.get('/articulos/:idCarta', cartasController.getDetalleCarta);
        this.router.post('/articulos', cartasController.createDetalleCarta);
        this.router.delete('/articulos/:idArticulo', cartasController.borrarArticulo);

        //REPORTS ROUTES
        this.router.get('/report1', reportsController.getTop10Productos);
        this.router.get('/report2', reportsController.getTop10Departamentos);
        this.router.get('/report3', reportsController.getTop10Municipios);
        this.router.get('/report4', reportsController.getTop5GoodDeeds);
        this.router.get('/report5', reportsController.getTop5Categorias);
        this.router.get('/report6', reportsController.getTopCartas);
        this.router.get('/report7/:idUsuario', reportsController.getComentariosPorKid);

        // Publicaciones routes
        this.router.get('/publicaciones', publicacionesController.getAllPublicaciones);
        this.router.get('/publicaciones/:idSanta', publicacionesController.getPublicacionesByUser);
        this.router.post('/publicaciones', publicacionesController.createPublicacion);
        this.router.put('/publicaciones', publicacionesController.updatePublicacion);
        this.router.put('/deletePublicacion', publicacionesController.deletePublicacion);
        this.router.get('/comentarios/:idPublicacion', publicacionesController.getComentariosPublicacion);
        this.router.post('/comentarios', publicacionesController.createComentario);
        this.router.put('/comentarios',publicacionesController.updateComentario);
        this.router.put('/deleteComentario',publicacionesController.deleteComentario);
        this.router.get('/lastIdPublicacion', publicacionesController.getLastPublicacionId);
        this.router.get('/lastIdComentario', publicacionesController.getLastComentarioId);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
