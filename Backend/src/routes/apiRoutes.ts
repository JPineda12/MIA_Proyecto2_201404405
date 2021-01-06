import { Router } from 'express';
import { apiController} from '../controllers/apiController';
import { userController} from '../controllers/userController';
import { productController} from '../controllers/productController';
import { goodDeedsController} from '../controllers/goodDeedsController';
import { cartasController} from '../controllers/cartasController';
class ApiRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }
    
    config():void{
        this.router.get('/departamentos', apiController.getDepartamentos);
        this.router.get('/municipios/:idDepartamento', apiController.getMunicipios);
        this.router.get('/roles', apiController.getRoles);
        //User ROUTES
        this.router.get('/users', userController.getUsers);
        this.router.get('/users/:idUsuario', userController.getUserById);
        this.router.get('/getHijos/:idPadre', userController.getHijos);
        this.router.get('/getUserByEmail/:correo', userController.getUserByEmail);
        this.router.post('/users', userController.newUser);
        this.router.put('/users', userController.updateUser);
        this.router.put('/updateHijo', userController.updateHijo);
        this.router.put('/deleteUser', userController.deleteUser);
        this.router.get('/loginEmail', userController.loginEmail);
        this.router.get('/loginNickname', userController.loginNickname);
        this.router.get('/getAllPadres/', userController.getAllPadres)

        //Product Routes
        this.router.get('/products', productController.getProductos);
        this.router.get('/products/:id', productController.getProductById);
        this.router.post('/products', productController.insertProducto);
        this.router.put('/deleteProduct', productController.deleteProducto);
        this.router.put('/products/', productController.updateProducto);
        this.router.get('/categories', productController.getCategorias);
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
        this.router.put('/cartas', cartasController.updateEstadoCarta);
        this.router.post('/createCarta', cartasController.createCarta);
        this.router.get('/articulos/:idCarta', cartasController.getDetalleCarta);
        this.router.post('/articulos', cartasController.createDetalleCarta);
        this.router.delete('/articulos/:idArticulo', cartasController.borrarArticulo);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
