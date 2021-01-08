import { Request, Response } from 'express';
import database from '../database';

class ReportsController {


    public async getTop10Productos(re: Request, res: Response) {
        let consulta = "SELECT * FROM ( "
            + " SELECT p.nombre as Prod, x.idProducto, x.cantidad, x.generado FROM Producto p,( "
            + " SELECT a.articulos_idProducto as idProducto, count(a.articulos_idProducto) "
            + " as cantidad, sum(a.precio) as Generado "
            + " from articulos_carta a"
            + " group by a.articulos_idProducto) x"
            + " WHERE p.idProducto = x.idProducto "
            + "  order by x.cantidad desc, x.Generado desc )"
            + " WHERE ROWNUM <= 10"
        const result = await database.Open(consulta, [], false);
        let prods: any = [];
        result.rows.map((prod: any) => {
            let productosSchema = {
                "producto": prod[0],
                "idProducto": prod[1],
                "cantidad": prod[2],
                "generado": prod[3],
            }
            prods.push(productosSchema);
        })
        res.json(prods);
    }

    public async getTop10Departamentos(re: Request, res: Response) {
        let consulta = "SELECT * FROM ( "
            + " SELECT p.nombre as Prod, x.idProducto, x.cantidad, x.generado FROM Producto p,( "
            + " SELECT a.articulos_idProducto as idProducto, count(a.articulos_idProducto) "
            + " as cantidad, sum(a.precio) as Generado "
            + " from articulos_carta a"
            + " group by a.articulos_idProducto) x"
            + " WHERE p.idProducto = x.idProducto "
            + "  order by x.cantidad desc, x.Generado desc )"
            + " WHERE ROWNUM <= 10"
        const result = await database.Open(consulta, [], false);
        let prods: any = [];
        result.rows.map((prod: any) => {
            let productosSchema = {
                "producto": prod[0],
                "idProducto": prod[1],
                "cantidad": prod[2],
                "generado": prod[3],
            }
            prods.push(productosSchema);
        })
        res.json(prods);
    }

    public async getTop10Municipios(re: Request, res: Response) {
        let consulta = "SELECT * FROM ( "
            + " SELECT M.municipio, y.Cartas_Enviadas FROM MUNICIPIO M, "
            + " ( SELECT count(c.idCarta) as Cartas_Enviadas, us.USUARIO_idMunicipio "
            + " FROM CARTA c, USUARIO us "
            + " WHERE c.carta_idusuario = us.idUsuario"
            + " GROUP BY us.USUARIO_idMunicipio "
            + "  ORDER BY Cartas_Enviadas DESC ) y"
            + " WHERE m.idMunicipio = Y.USUARIO_idMunicipio "
            + " ORDER BY y.Cartas_Enviadas DESC)"
            + " WHERE ROWNUM <= 10"
        const result = await database.Open(consulta, [], false);
        let municipios: any = [];
        result.rows.map((mun: any) => {
            let municipioSchema = {
                "municipio": mun[0],
                "cartas_enviadas": mun[1],
            }
            municipios.push(municipioSchema);
        })
        res.json(municipios);
    }

    public async getTop5GoodDeeds(re: Request, res: Response) {
        let consulta = "SELECT * FROM ( "
            + " SELECT b.titulo, x.veces_realizada from buena_accion b, ( "
            + " SELECT ac.realizar_idbuena_accion as idAccion, count(ac.realizar_idbuena_accion) "
            + "  as veces_realizada FROM accion_realizar ac "
            + " GROUP BY ac.realizar_idbuena_accion) x "
            + "  WHERE b.idBuena_Accion = x.idAccion "
            + " ORDER BY x.veces_realizada DESC)"
            + " WHERE ROWNUM <= 5"
        const result = await database.Open(consulta, [], false);
        let goodDeeds: any = [];
        result.rows.map((accion: any) => {
            let accionSchema = {
                "titulo": accion[0],
                "veces_realizada": accion[1],
            }
            goodDeeds.push(accionSchema);
        })
        res.json(goodDeeds);
    }

    public async getTop5Categorias(re: Request, res: Response) {
        let consulta = "SELECT * FROM ( "
            + "  SELECT c.Categoria, count(y.prod) as cantidad, sum(y.generado) as Generado "
            + " FROM Categoria c, (  "
            + "  SELECT p.producto_idCategoria as idCategoria, p.nombre as prod, "
            + " x.idProducto, x.cantidad, x.generado FROM Producto p,("
            + " SELECT a.articulos_idProducto as idProducto, count(a.articulos_idProducto) "
            + " as cantidad, sum(a.precio) as Generado "
            + "   from articulos_carta a group by a.articulos_idProducto "
            + " order by cantidad desc, Generado desc ) x "
            + " WHERE p.idProducto = x.idProducto ) y "
            + "  WHERE c.idCategoria = y.idCategoria "
            + " GROUP BY c.categoria "
            + " ORDER BY cantidad DESC) "
            + " WHERE ROWNUM <= 10 "
        const result = await database.Open(consulta, [], false);
        let categorias: any = [];
        result.rows.map((cat: any) => {
            let catSchema = {
                "categoria": cat[0],
                "cantidad": cat[1],
                "generado": cat[2],

            }
            categorias.push(catSchema);
        })
        res.json(categorias);
    }

    public async getTopCartas(re: Request, res: Response) {
        let consulta = "SELECT y.idCarta, ca.carta_idUsuario as idUsuario,"
            + " y.totalGastado, ca.fecha, ca.mensaje, us.nombre, ca.estado"
            + "  FROM CARTA ca, Usuario us,( "
            + " SELECT x.idCarta,Sum(x.total) as TOTALGASTADO FROM ( "
            + "  SELECT ac.idarticulos_carta as ARTICULO, c.idCarta as idCarta, ac.precio * ac.cantidad as TOTAL "
            + " FROM CARTA c, articulos_carta ac "
            + " WHERE c.idCarta = ac.articulos_idcarta) x "
            + " GROUP BY x.idCarta ) y "
            + "   WHERE ca.idCarta = y.idcarta "
            + " AND ca.carta_idUsuario = us.idUsuario "
            + " AND ca.estado = 2"
            + " ORDER BY y.totalgastado DESC "
        const result = await database.Open(consulta, [], false);
        let cartas: any = [];
        result.rows.map((carta: any) => {
            let cartaSchema = {
                "idCarta": carta[0],
                "idUsuario": carta[1],
                "total_gastado": carta[2],
                "fecha": carta[3],
                "mensaje": carta[4],
                "nombre": carta[5],
            }
            cartas.push(cartaSchema);
        })
        res.json(cartas);
    }
    
        public async getComentariosPorKid(req: Request, res: Response) {
                const { idUsuario } = req.params;
        let consulta = "select us.nombre as Usuario,  c.idComentario, c.mensaje, p.idPublicacion, p.texto"
            + " from Publicacion p, Comentario c, Usuario us"
            + "  WHERE us.idUsuario = c.comentario_idkid "
            + " AND c.comentario_idPublicacion = p.idPublicacion"
            + "  AND us.idUsuario = :idUsuario "
            + " order by c.idComentario asc"

        const result = await database.Open(consulta, [idUsuario], true);
        let comentarios: any = [];
        result.rows.map((comment: any) => {
            let commentSchema = {
                "usuario": comment[0],
                "idComentario": comment[1],
                "mensaje": comment[2],
                "idPublicacion": comment[3],
                "texto": comment[4],
            }
            comentarios.push(commentSchema);
        })
        res.json(comentarios);
    }

}



export const reportsController = new ReportsController(); 
