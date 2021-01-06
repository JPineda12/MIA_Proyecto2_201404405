import { Request, Response } from 'express';
import database from '../database';

class CartasController {

    public async getCartasByUser(req: Request, res: Response) {
        const { idusuario, estado } = req.headers;
        let consulta = "SELECT idCarta, Mensaje, Fecha, Estado, Carta_idUsuario"
            + " FROM CARTA WHERE estado = :estado AND Carta_idUsuario = :idusuario"
        const result = await database.Open(consulta, [estado, idusuario], true);
        let cartas: any = [];
        result.rows.map((cart: any) => {
            let cartasSchema = {
                "idCarta": cart[0],
                "mensaje": cart[1],
                "fecha": cart[2],
                "estado": cart[3],
                "idUsuario": cart[4]
            }
            cartas.push(cartasSchema);
        })
        res.json(cartas);
    }

    public async getDetalleCarta(req: Request, res: Response) {
        const { idCarta } = req.params;

        let consulta = "SELECT p.idProducto, p.nombre, p.image_url as Imagen, ar.cantidad, ar.precio, "
            + " ar.idArticulos_carta, ar.Articulos_idCarta"
            + " FROM Producto p, Carta c, Articulos_Carta ar"
            + " WHERE ar.articulos_idproducto = p.idproducto"
            + " AND ar.articulos_idcarta = c.idcarta"
            + " and ar.articulos_idcarta = :idCarta"

        const result = await database.Open(consulta, [idCarta], true);
        let articulos: any = [];
        result.rows.map((articulo: any) => {
            let articulosSchema = {
                "idProducto": articulo[0],
                "Nombre": articulo[1],
                "image_url": articulo[2],
                "cantidad": articulo[3],
                "precio": articulo[4],
                "idArticulo": articulo[5],
                "idCarta": articulo[6]
            }
            articulos.push(articulosSchema);
        })
        res.json(articulos);
    }

    public async getAllCartas(req: Request, res: Response){
        let consulta = "SELECT idCarta, Mensaje, Fecha, Estado, Carta_idUsuario"
            + " FROM CARTA"
        const result = await database.Open(consulta, [], false);
        let cartas: any = [];
        result.rows.map((cart: any) => {
            let cartasSchema = {
                "idCarta": cart[0],
                "mensaje": cart[1],
                "fecha": cart[2],
                "estado": cart[3],
                "idUsuario": cart[4]
            }
            cartas.push(cartasSchema);
        })
        res.json(cartas);
    }

    public async getLastId(req: Request, res: Response) {
        let consulta = "SELECT Max(idCarta) FROM Carta";
        const result = await database.Open(consulta, [], false);
        let cartas: any = [];
        result.rows.map((carta: any) => {
            let cartasSchema = {
                "idCarta": carta[0]
            }
            cartas.push(cartasSchema);
        })
        res.json(cartas);
    }

    public async createCarta(req: Request, res: Response) {
        const { mensaje, fecha, estado, idUsuario } = req.body;
        let sql = "CALL crear_Carta(:mensaje, TO_DATE(:fecha, 'MM/DD/YYYY'), :estado,:idUsuario)";
        console.log("Hmm: ", sql)
        let result = await database.Open(sql, [mensaje, fecha, estado, idUsuario], true);
        console.log("RES: ", result);
        res.status(200).json({
            "mensaje": mensaje,
            "fecha": fecha,
            "estado": estado,
            "idUsuario": idUsuario
        })
    }

    public async createDetalleCarta(req: Request, res: Response) {
        const { cantidad, precio, idCarta, idProducto } = req.body;
        let sql = "INSERT INTO ARTICULOS_CARTA(CANTIDAD, PRECIO, ARTICULOS_IDCARTA, ARTICULOS_IDPRODUCTO)"
            + " VALUES(:cantidad, :precio, :idCarta, :idProducto)"
        let result = await database.Open(sql, [cantidad, precio, idCarta, idProducto], true);
        res.status(200).json({
            "cantidad": cantidad,
            "precio": precio,
            "idCarta": idCarta,
            "idProducto": idProducto
        })
    }

    public async borrarArticulo(req: Request, res: Response) {
        const { idDetalle } = req.params;
        let sql = "DELETE FROM ARTICULOS_CARTA WHERE IDARTICULOS_CARTA = :idDetalle";

        try {
            await database.Open(sql, [idDetalle], true);
            res.status(200).json({
                "deleted": true
            })
        } catch (err) {
            console.log("Error al realizar la consulta => ", err)
            res.json({ "deleted": false })
        }
    }

    public async updateEstadoCarta(req: Request, res: Response) {
        const { estado, idCarta } = req.body;
        let sql = "UPDATE CARTA SET ESTADO = :estado"
            + " WHERE IDCARTA = :idCarta"
        await database.Open(sql, [estado, idCarta], true);
        res.status(200).json({
            "estado": estado,
            "idCarta": idCarta
        })
    }



}

export const cartasController = new CartasController(); 
