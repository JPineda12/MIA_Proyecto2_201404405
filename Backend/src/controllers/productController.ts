import { Request, response, Response } from 'express';
import database from '../database';

class ProductController {

    public async getCategorias(req: Request, res: Response) {
        let sql = "SELECT idCategoria, categoria FROM CATEGORIA"
        const result = await database.Open(sql, [], false);
        let categorias: any = [];
        result.rows.map((cat: any) => {
            let categoriasSchema = {
                "id": cat[0],
                "categorias": cat[1]
            }
            categorias.push(categoriasSchema);
        })
        res.json(categorias);
    }

    public async getProductos(req: Request, res: Response) {
        let sql = "SELECT idProducto, nombre, precio, minEdad, Producto_idCategoria, c.categoria "
            + "FROM Producto, CATEGORIA c "
            + "WHERE PRODUCTO_IDCATEGORIA  = c.IDCATEGORIA"
        const result = await database.Open(sql, [], false);
        let productos: any = [];
        result.rows.map((prod: any) => {
            let productsSchema = {
                "id": prod[0],
                "nombre": prod[1],
                "precio": prod[2],
                "minEdad": prod[3],
                "idCategoria": prod[4],
                "categoria": prod[5],
            }
            productos.push(productsSchema);
        })
        res.json(productos);
    }

    public async getProductById(req: Request, res: Response) {
        const { idProducto } = req.body;
        let sql = "SELECT idProducto, nombre, precio, minEdad, Producto_idCategoria, c.CATEGORIA "
            + " FROM Producto, CATEGORIA c "
            + " WHERE PRODUCTO_IDCATEGORIA  = c.IDCATEGORIA "
            + "AND idProducto = :idProducto"
        const result = await database.Open(sql, [idProducto], true);
        let productos: any = [];
        result.rows.map((prod: any) => {
            let productsSchema = {
                "id": prod[0],
                "nombre": prod[1],
                "precio": prod[2],
                "minEdad": prod[3],
                "idCategoria": prod[4],
                "categoria": prod[5],
            }
            productos.push(productsSchema);
        })
        res.json(productos);
    }

    public async insertCategoria(req: Request, res: Response) {
        const { categoria } = req.body;
        let sql = "INSERT INTO CATEGORIA(categoria) VALUES(:categoria)"

        const result = await database.Open(sql, [categoria], true);
        res.status(200).json({
            "id": result.id,
            "categoria": categoria
        })
    }

    public async insertProducto(req: Request, res: Response) {
        const { nombre, precio, edadMinima, idCategoria } = req.body;
        let sql = "INSERT INTO PRODUCTO(NOMBRE , PRECIO , MINEDAD, PRODUCTO_IDCATEGORIA)"
            + " VALUES(:nombre, :precio, :edadMinima, :idCategoria)"
        const result = await database.Open(sql, [nombre, precio, edadMinima, idCategoria], true);
        res.status(200).json({
            "id": result.id,
            "nombre": nombre,
            "precio": precio,
            "edadMinima": edadMinima,
            "idCategoria": idCategoria
        })
    }

    public async updateCategoria(req: Request, res: Response) {
        const { idCategoria, categoria } = req.body;
        let sql = "UPDATE Categoria SET categoria = :categoria WHERE idCategoria = :idCategoria";
        await database.Open(sql, [categoria], true);
        res.status(200).json({
            "idCategoria": idCategoria,
            "categoria": categoria
        })
    }

    public async updateProducto(req: Request, res: Response) {
        const { idProducto, nombre, precio, edadMinima, idCategoria } = req.body;
        let sql = "UPDATE Producto SET nombre = :nombre, precio = :precio, "
            + "minedad = :edadMinima, PRODUCTO_IDCATEGORIA = :idCategoria "
            + " WHERE IDPRODUCTO  = :idProducto;"
        await database.Open(sql, [nombre, precio, edadMinima, idCategoria, idProducto], true);
        res.status(200).json({
            "id": idProducto,
            "nombre": nombre,
            "precio": precio,
            "edadMinima": edadMinima,
            "idCategoria": idCategoria
        })
    }

    public async deleteCategoria(req: Request, res: Response){
        const{idCategoria} = req.body;
        let sql = "DELETE FROM CATEGORIA WHERE idCategoria= :idCategoria";
        try {
            await database.Open(sql, [idCategoria], true);

            res.status(200).json({
                "deleted": true,
                "idCategoria": idCategoria
            })
        } catch (err) {
            console.log("Error al realizar la consulta => ", err)
            res.json({ "deleted": false })
        }
    }

    public async deleteProducto(req: Request, res:Response){
        const {idProducto } = req.body
        let sql = "DELETE FROM Producto WHERE idProducto = :idProducto"
        try {
            await database.Open(sql, [idProducto], true);

            res.status(200).json({
                "deleted": true,
                "idCategoria": idProducto
            })
        } catch (err) {
            console.log("Error al realizar la consulta => ", err)
            res.json({ "deleted": false })
        }
    }
}

export const productController = new ProductController(); 