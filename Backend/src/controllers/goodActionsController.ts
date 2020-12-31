import { Request, response, Response } from 'express';
import database from '../database';
class GoodActionsController {

    public async getGoodActions(req: Request, res: Response) {
        let sql = "SELECT IDBUENA_ACCION, TITULO, DESCRIPCION, RECOMPENSA,"
            + "MINEDAD FROM BUENA_ACCION"

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

    public async getActionById(req: Request, res: Response) {
        const { idAccion } = req.body;

        let sql = "SELECT IDBUENA_ACCION, TITULO, DESCRIPCION, RECOMPENSA,"
            + "MINEDAD FROM BUENA_ACCION"
            + " WHERE IDBUENA_ACCION = :idAccion"

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

    public async insertGoodaction(req: Request, res: Response) {
        const { titulo, descripcion, recompensa, minEdad } = req.body;
        let sql = "INSERT INTO Buena_Accion(TITULO, DESCRIPCION, RECOMPENSA, MINEDAD)"
            + " VALUES(:titulo,:descripcion,:recompensa,:minEdad)"
        await database.Open(sql, [titulo, descripcion, recompensa, minEdad], true);
        res.status(200).json({
            "titulo": titulo,
            "descripcion": descripcion
        })
    }

    public async updateGoodAction(req: Request, res: Response) {
        const { idAccion, titulo, descripcion, recompensa, edadMinima } = req.body;
        let sql = "UPDATE BUENA_ACCION SET TITULO =:titulo, DESCRIPCION =:descripcion,"
            + " RECOMPENSA =:recompensa, MINEDAD =:edadMinima WHERE IDBUENA_ACCION =:idAccion"

        await database.Open(sql, [titulo, descripcion, recompensa, edadMinima, idAccion], true);
        res.status(200).json({
            "idAccion": idAccion,
            "titulo": titulo
        })
    }

    public async deleteGoodAction(req: Request, res: Response) {
        const { idAccion } = req.params;
        console.log(req.params);
        console.log(req.headers);
        console.log(req.body);
        let sql = "DELETE FROM Buena_Accion WHERE idBuena_Accion = :idAccion"
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

export const goodActionsController = new GoodActionsController(); 
