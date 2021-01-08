import { Request, Response } from 'express';
import database from '../database';
class PublicacionesController {


    public async getAllPublicaciones(re: Request, res: Response) {
        let consulta = "select p.idPublicacion, p.texto, p.imagen, p.estado, p.idSanta, s.nombre as Usuario"
            + " from Publicacion p, Usuario s "
            + " WHERE p.idSanta = s.idUsuario "
            + " AND p.estado = 0"
            + " ORDER BY p.idPublicacion desc"
        const result = await database.Open(consulta, [], false);
        let posts: any = [];
        result.rows.map((p: any) => {
            let publicacionSchema = {
                "idPublicacion": p[0],
                "texto": p[1],
                "imagen": p[2],
                "estado": p[3],
                "idSanta": p[4],
                "usuario": p[5],
            }
            posts.push(publicacionSchema);
        })
        res.json(posts);
    }
    
    public async getLastPublicacionId(req: Request, res: Response) {
        let consulta = "SELECT Max(idPublicacion) FROM Publicacion";
        const result = await database.Open(consulta, [], false);
        let publicacion: any = [];
        result.rows.map((pub: any) => {
            let publicacionSchema = {
                "idPublicacion": pub[0]
            }
            publicacion.push(publicacionSchema);
        })
        res.json(publicacion);
    }
    
    public async getLastComentarioId(req: Request, res: Response) {
        let consulta = "SELECT Max(idComentario) FROM Comentario";
        const result = await database.Open(consulta, [], false);
        let publicacion: any = [];
        result.rows.map((pub: any) => {
            let publicacionSchema = {
                "idComentario": pub[0]
            }
            publicacion.push(publicacionSchema);
        })
        res.json(publicacion);
    }

    public async getPublicacionesByUser(req: Request, res: Response) {
        const { idSanta } = req.params;
        let consulta = "select p.idPublicacion, p.texto, p.imagen, p.estado, p.idSanta, s.nombre as Usuario"
            + " from Publicacion p, Usuario s "
            + " WHERE p.idSanta = s.idUsuario "
            + " AND p.idSanta = :idSanta"
            + " AND p.estado = 0"
            + " ORDER BY p.idPublicacion DESC"
        const result = await database.Open(consulta, [idSanta], false);
        let posts: any = [];
        result.rows.map((p: any) => {
            let publicacionSchema = {
                "idPublicacion": p[0],
                "texto": p[1],
                "imagen": p[2],
                "estado": p[3],
                "idSanta": p[4],
                "usuario": p[5],
            }
            posts.push(publicacionSchema);
        })
        res.json(posts);
    }

    public async createPublicacion(req: Request, res: Response) {
        const { texto, imagen, estado, idSanta } = req.body;
        let sql = "INSERT INTO PUBLICACION(texto, imagen, estado, idSanta) "
            + " VALUES(:texto,:imagen, :estado, :idSanta)"

        const result = await database.Open(sql, [texto, imagen, estado, idSanta], true);
        res.status(200).json({
            "texto": texto
        })
    }

    public async updatePublicacion(req: Request, res: Response) {
        const { texto, imagen, idPublicacion } = req.body;
        let sql = "UPDATE PUBLICACION set texto = :texto, imagen = :imagen "
            + " WHERE idPublicacion = :idPublicacion"

        const result = await database.Open(sql, [texto, imagen, idPublicacion], true);
        res.status(200).json({
            "texto": texto
        })
    }

    public async deletePublicacion(req: Request, res: Response) {
        const { idPublicacion } = req.body;
        let sql = "UPDATE PUBLICACION set estado = 1 "
            + " WHERE idPublicacion = :idPublicacion"

        const result = await database.Open(sql, [idPublicacion], true);
        res.status(200).json({
            "deleted": idPublicacion
        })
    }

    public async createComentario(req: Request, res: Response) {
        const { mensaje, idPublicacion, idKid, estado } = req.body;
        let sql = "INSERT INTO COMENTARIO(Mensaje, comentario_idPublicacion, comentario_idKid, estado) "
            + " VALUES(:mensaje, :idPublicacion, :idKid, :estado)"

        const result = await database.Open(sql, [mensaje, idPublicacion, idKid, estado], true);
        res.status(200).json({
            "texto": mensaje
        })
    }

    public async getComentariosPublicacion(req: Request, res: Response) {
        const { idPublicacion } = req.params;
        let consulta = "SELECT c.idComentario, c.mensaje, c.comentario_idKid, us.nombre as Usuario"
            + " FROM COMENTARIO c, USUARIO us, Publicacion p"
            + " WHERE c.comentario_idkid = us.idUsuario "
            + " AND c.comentario_idPublicacion = p.idPublicacion"
            + " AND p.idPublicacion = :idPublicacion "
            + " AND c.estado = 0 "
        const result = await database.Open(consulta, [idPublicacion], false);
        let comments: any = [];
        result.rows.map((p: any) => {
            let comentarioSchema = {
                "idComentario": p[0],
                "mensaje": p[1],
                "idKid": p[2],
                "usuario": p[3],

            }
            comments.push(comentarioSchema);
        })
        res.json(comments);
    }

    public async updateComentario(req: Request, res: Response) {
        const { idComentario, mensaje} = req.body;
        let sql = "UPDATE Comentario SET mensaje = :mensaje"
            + " WHERE idComentario = :idComentario "

        const result = await database.Open(sql, [idComentario, mensaje], true);
        res.status(200).json({
            "texto": mensaje
        })
    }

    public async deleteComentario(req: Request, res: Response){
        const { idComentario} = req.body;
        let sql = "UPDATE Comentario SET estado = 0"
            + " WHERE idComentario = :idComentario "

        const result = await database.Open(sql, [idComentario], true);
        res.status(200).json({
            "idComentario": idComentario
        })
    }
}

export const publicacionesController = new PublicacionesController(); 
