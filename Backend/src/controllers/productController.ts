import { Request, response, Response } from 'express';
import database from '../database';

class ProductController {

    public async getCategorias(req: Request, res: Response) {
        let sql = "SELECT idCategoria, categoria FROM CATEGORIA"
            + " WHERE ESTADO = 0"
        const result = await database.Open(sql, [], false);
        let categorias: any = [];
        result.rows.map((cat: any) => {
            let categoriasSchema = {
                "id": cat[0],
                "categoria": cat[1]
            }
            categorias.push(categoriasSchema);
        })
        res.json(categorias);
    }

    public async getCategoriasByName(req: Request, res: Response) {
        const { nombre } = req.params;
        let sql = "SELECT idCategoria, categoria FROM CATEGORIA"
            + " WHERE ESTADO = 0"
            + " AND categoria = :nombre"
        const result = await database.Open(sql, [nombre], true);
        let categorias: any = [];
        result.rows.map((cat: any) => {
            let categoriasSchema = {
                "id": cat[0],
                "categoria": cat[1]
            }
            categorias.push(categoriasSchema);
        })
        res.json(categorias);
    }

    public async getProductos(req: Request, res: Response) {
        let sql = "SELECT p.idProducto, p.nombre, p.precio, p.minEdad, p.Producto_idCategoria, c.categoria, p.image_url "
            + "FROM Producto p, CATEGORIA c "
            + "WHERE p.PRODUCTO_IDCATEGORIA  = c.IDCATEGORIA"
            + " AND p.ESTADO = 0"
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
                "image_url": prod[6]
            }
            productos.push(productsSchema);
        })
        res.json(productos);
    }

    public async getProductosByName(req: Request, res: Response) {
        const { nombre } = req.params;
        let sql = "SELECT p.idProducto, p.nombre, p.precio, p.minEdad, p.Producto_idCategoria, c.CATEGORIA, p.image_url "
            + " FROM Producto p, CATEGORIA c "
            + " WHERE p.PRODUCTO_IDCATEGORIA  = c.IDCATEGORIA "
            + " AND p.ESTADO = 0"
            + " AND p.nombre = :nombre"
        const result = await database.Open(sql, [nombre], true);
        let productos: any = [];
        result.rows.map((prod: any) => {
            let productsSchema = {
                "id": prod[0],
                "nombre": prod[1],
                "precio": prod[2],
                "minEdad": prod[3],
                "idCategoria": prod[4],
                "categoria": prod[5],
                "image_url": prod[6]
            }
            productos.push(productsSchema);
        })
        res.json(productos);
    }

    public async getProductById(req: Request, res: Response) {
        const { idProducto } = req.params;
        let sql = "SELECT p.idProducto, p.nombre, p.precio, p.minEdad, p.Producto_idCategoria, c.CATEGORIA, p.image_url "
            + " FROM Producto p, CATEGORIA c "
            + " WHERE p.PRODUCTO_IDCATEGORIA  = c.IDCATEGORIA "
            + " AND p.ESTADO = 0"
            + " AND idProducto = :idProducto"
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
                "image_url": prod[6]
            }
            productos.push(productsSchema);
        })
        res.json(productos);
    }

    public async insertCategoria(req: Request, res: Response) {
        const { categoria } = req.body;
        let sql = "INSERT INTO CATEGORIA(categoria, estado) VALUES(:categoria, 0)"

        const result = await database.Open(sql, [categoria], true);
        res.status(200).json({
            "id": result.id,
            "categoria": categoria
        })
    }

    public async insertProducto(req: Request, res: Response) {
        const { nombre, precio, edadMinima, idCategoria, urlimagen } = req.body;
        let sql = "INSERT INTO PRODUCTO(NOMBRE , PRECIO , MINEDAD, PRODUCTO_IDCATEGORIA, ESTADO, image_url)"
            + " VALUES(:nombre, :precio, :edadMinima, :idCategoria, 0, :urlimagen)"
        const result = await database.Open(sql, [nombre, precio, edadMinima, idCategoria, urlimagen], true);
        res.status(200).json({
            "id": result.id,
            "nombre": nombre,
            "precio": precio,
            "edadMinima": edadMinima,
            "idCategoria": idCategoria,
            "image_url": urlimagen
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
        const { idProducto, nombre, precio, edadMinima, idCategoria, image_url } = req.body;
        let sql = "UPDATE Producto SET nombre = :nombre, precio = :precio, "
            + "minedad = :edadMinima, PRODUCTO_IDCATEGORIA = :idCategoria, image_url = :image_url "
            + " WHERE IDPRODUCTO  = :idProducto"
        await database.Open(sql, [nombre, precio, edadMinima, idCategoria, image_url, idProducto], true);
        res.status(200).json({
            "id": idProducto,
            "nombre": nombre,
            "precio": precio,
            "edadMinima": edadMinima,
            "idCategoria": idCategoria,
            "image_url": image_url
        })
    }

    public async deleteCategoria(req: Request, res: Response) {
        const { idCategoria } = req.body;
        let sql = "UPDATE CATEGORIA SET ESTADO = 1 WHERE idCategoria= :idCategoria";
        try {
            await database.Open(sql, [idCategoria], true);
            res.status(200).json({
                "idCategoria": idCategoria,
                "deleted": true
            })
        } catch (err) {
            console.log("Error al realizar la consulta => ", err)
            res.json({ "deleted": false })
        }
    }

    public async deleteProducto(req: Request, res: Response) {
        const { idProducto } = req.body;
        let sql = "UPDATE Producto SET ESTADO = 1 WHERE idProducto = :idProducto"
        try {
            let ok = await database.Open(sql, [idProducto], true);
            res.status(200).json({
                "deleted": true,
                "idProducto": idProducto
            })
        } catch (err) {
            console.log("Error al realizar la consulta => ", err)
            res.json({ "deleted": false })
        }
    }

}

export const productController = new ProductController(); 
