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
    
    public async getGoodDeedsByAge(req: Request, res: Response) {
            const { minEdad } = req.params;
        let sql = "SELECT IDBUENA_ACCION, TITULO, DESCRIPCION, RECOMPENSA,"
            + " MINEDAD FROM BUENA_ACCION WHERE ESTADO = 0 AND MINEDAD <= :minEdad"

        const result = await database.Open(sql, [minEdad], true);
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
