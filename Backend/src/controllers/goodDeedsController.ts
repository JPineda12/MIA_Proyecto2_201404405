import { Request, response, Response } from 'express';
import database from '../database';
class GoodDeedsController {

    public async getGoodDeeds(req: Request, res: Response) {
        let sql = "SELECT IDBUENA_ACCION, TITULO, DESCRIPCION, RECOMPENSA,"
            + " MINEDAD FROM BUENA_ACCION WHERE ESTADO = 0"

        const result = await database.Open(sql, [], false);
        let acciones: any = [];
        result.rows.map((accion: any) => {
            let accionesSchema = {
                "id": accion[0],
                "titulo": accion[1],
                "descripcion": accion[2],
                "recompensa": accion[3],
                "minEdad": accion[4],
            }
            acciones.push(accionesSchema);
        })
        res.json(acciones);
    }

    //Obtiene todas las buenas acciones menos o iguales que su edad y que NO ha realizado.
    public async getGoodDeedsByAge(req: Request, res: Response) {
        const { idusuario, minedad } = req.headers;
        let sql = "SELECT b.IDBUENA_ACCION, b.titulo, b.descripcion, b.recompensa, b.MINEDAD"
            + " FROM BUENA_ACCION b "
            + " WHERE b.MINEDAD <= :minedad"
        const result = await database.Open(sql, [minedad], true);
        let acciones: any = [];
        result.rows.map((accion: any) => {
            let accionesSchema = {
                "idAccion": accion[0],
                "titulo": accion[1],
                "descripcion": accion[2],
                "recompensa": accion[3],
                "minEdad": accion[4],
            }
            acciones.push(accionesSchema);
        })
        res.json(acciones);
    }

    public async getPendingGoodDeeds(req: Request, res: Response) {
        const { idUsuario } = req.params;
        let sql = "SELECT ba.IDBUENA_ACCION, ba.TITULO, ba.DESCRIPCION,"
            + "ar.RECOMPENSA, ba.MINEDAD, u.NICKNAME, ar.ESTADO "
            + " FROM BUENA_ACCION ba, USUARIO u, ACCION_REALIZAR ar "
            + " WHERE ar.REALIZAR_IDBUENA_ACCION = ba.IDBUENA_ACCION "
            + " AND ar.REALIZAR_IDUSUARIO = u.IDUSUARIO "
            + " AND ar.ESTADO != 3"
            + " AND u.IDUSUARIO = :idUsuario"
        const result = await database.Open(sql, [idUsuario], true);
        let acciones: any = [];
        result.rows.map((accion: any) => {
            let accionesSchema = {
                "idAccion": accion[0],
                "titulo": accion[1],
                "descripcion": accion[2],
                "recompensa": accion[3],
                "minEdad": accion[4],
                "nickname": accion[5],
                "estado": accion[6],
                "idUsuario": idUsuario,
            }
            acciones.push(accionesSchema);
        })
        res.json(acciones);
    }

    public async ChangeGoodDeedState(req: Request, res: Response) {
        const { idAccion, idUsuario, estado } = req.body;
        let sql = "UPDATE ACCION_REALIZAR SET estado = :estado"
            + " WHERE REALIZAR_IDBUENA_ACCION = :idAccion AND REALIZAR_IDUSUARIO = :idUsuario "
        let x = await database.Open(sql, [estado, idAccion, idUsuario], true);

        res.status(200).json({
            "idAccion": idAccion,
            "idUsuario": idUsuario,
            "estado": estado
        })
    }

    public async getGoodDeedsDone(req: Request, res: Response) {
        const { idUsuario } = req.params;

        let sql = "SELECT * FROM ACCION_REALIZAR ar"
            + " WHERE ESTADO = 3"
            + " AND REALIZAR_IDUSUARIO = :idUsuario"

        const result = await database.Open(sql, [idUsuario], true);
        let acciones: any = [];
        result.rows.map((accion: any) => {
            let accionesSchema = {
                "idAccion": accion[0],
                "idUsuario": accion[1],
                "Fecha": accion[2],
                "Estado": accion[3],
                "Recompensa": accion[4],
            }
            acciones.push(accionesSchema);
        })
        res.json(acciones);
    }
    public async insertGoodDeedDone(req: Request, res: Response) {
        const { idAccion, idUsuario, fecha, estado, recompensa } = req.body;
        let sql = "INSERT INTO ACCION_REALIZAR(REALIZAR_IDBUENA_ACCION, REALIZAR_IDUSUARIO, FECHA, ESTADO, RECOMPENSA)"
            + " VALUES(:idAccion,:idUsuario,TO_DATE(:fecha, 'MM/DD/YYYY'), :estado, :recompensa)"
        await database.Open(sql, [idAccion, idUsuario, fecha, estado, recompensa], true);
        res.status(200).json({
            "idAccion": idAccion,
            "idUsuario": idUsuario,
            "fecha": fecha,
            "estado": estado,
            "recompensa": recompensa
        })
    }

    public async getDeedById(req: Request, res: Response) {
        const { idAccion } = req.params;

        let sql = "SELECT IDBUENA_ACCION, TITULO, DESCRIPCION, RECOMPENSA,"
            + "MINEDAD FROM BUENA_ACCION"
            + " WHERE IDBUENA_ACCION = :idAccion"
            + " AND ESTADO = 0"

        const result = await database.Open(sql, [idAccion], true);
        let acciones: any = [];
        result.rows.map((accion: any) => {
            let accionesSchema = {
                "idAccion": accion[0],
                "titulo": accion[1],
                "descripcion": accion[2],
                "recompensa": accion[3],
                "minEdad": accion[4],
            }
            acciones.push(accionesSchema);
        })
        res.json(acciones);
    }

    public async insertGoodDeed(req: Request, res: Response) {
        const { titulo, descripcion, recompensa, minEdad } = req.body;
        let sql = "INSERT INTO Buena_Accion(TITULO, DESCRIPCION, RECOMPENSA, MINEDAD, ESTADO)"
            + " VALUES(:titulo,:descripcion,:recompensa,:minEdad, 0)"
        await database.Open(sql, [titulo, descripcion, recompensa, minEdad], true);
        res.status(200).json({
            "titulo": titulo,
            "descripcion": descripcion
        })
    }

    public async updateGoodDeed(req: Request, res: Response) {
        const { idAccion, titulo, descripcion, recompensa, edadMinima } = req.body;
        let sql = "UPDATE BUENA_ACCION SET TITULO =:titulo, DESCRIPCION =:descripcion,"
            + " RECOMPENSA =:recompensa, MINEDAD =:edadMinima WHERE IDBUENA_ACCION =:idAccion"

        await database.Open(sql, [titulo, descripcion, recompensa, edadMinima, idAccion], true);
        res.status(200).json({
            "idAccion": idAccion,
            "titulo": titulo
        })
    }

    public async deleteGoodDeed(req: Request, res: Response) {
        const { idAccion } = req.body;
        let sql = "UPDATE Buena_Accion SET ESTADO = 1 WHERE idBuena_Accion = :idAccion"
        try {
            await database.Open(sql, [idAccion], true);

            res.status(200).json({
                "deleted": true,
                "idAccion": idAccion
            })
        } catch (err) {
            console.log("Error al realizar la consulta => ", err)
            res.json({ "deleted": false })
        }

    }
}

export const goodDeedsController = new GoodDeedsController(); 
