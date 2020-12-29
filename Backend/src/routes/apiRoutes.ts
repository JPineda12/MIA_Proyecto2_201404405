import { Router } from 'express';
import { apiController} from '../controllers/apiController';
import { userController} from '../controllers/userController';
import { productController} from '../controllers/productController';
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
        this.router.delete('/users/:id', userController.deleteUser);
        this.router.get('/loginEmail', userController.loginEmail);
        this.router.get('/loginNickname', userController.loginNickname);

        //Product Routes
        this.router.get('/products', productController.getProductos);
        this.router.get('/products/:id', productController.getProductById);
        this.router.post('/products', productController.insertProducto);
        this.router.delete('/products/:id', productController.deleteProducto);
        this.router.put('/products/', productController.updateProducto);
        this.router.get('/categories', productController.getCategorias);
        this.router.post('/categories',productController.insertCategoria);
        this.router.put('/categories/', productController.updateCategoria);
        this.router.delete('/categories/', productController.deleteCategoria);

    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
