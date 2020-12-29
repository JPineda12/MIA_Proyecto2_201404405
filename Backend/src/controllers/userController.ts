import { Request, response, Response } from 'express';
import database from '../database';
class UserController {

    public async getUsers(re: Request, res: Response) {
        let sql = "SELECT idUsuario, nombre, nickname, email, genero, fechaNacimiento, "
            + "telefono, bastones, direccion, USUARIO_IDPADRE, USUARIO_IDROL, USUARIO_IDMUNICIPIO,"
            + "m.MUNICIPIO_IDDEPARTAMENTO, r.Rol, m.MUNICIPIO, d.DEPARTAMENTO"
            + " From Usuario, Rol r, Municipio m, Departamento d "
            + " WHERE r.IDROL = USUARIO_IDROL "
            + " AND m.IDMUNICIPIO = USUARIO_IDMUNICIPIO "
            + " AND m.MUNICIPIO_IDDEPARTAMENTO  = d.IDDEPARTAMENTO ";

        const result = await database.Open(sql, [], false);
        let Users: any = [];
        result.rows.map((user: any) => {
            let userSchema = {
                "idUsuario": user[0],
                "nombre": user[1],
                "nickname": user[2],
                "email": user[3],
                "genero": user[4],
                "fecha": user[5],
                "telefono": user[6],
                "bastones": user[7],
                "direccion": user[8],
                "idPadre": user[9],
                "idRol": user[10],
                "idMunicipio": user[11],
                "idDepartamento": user[12],
                "rol": user[13],
                "municipio": user[14],
                "departamento": user[15],
            }
            Users.push(userSchema);
        })
        res.json(Users);
    }

    public async getUserById(req: Request, res: Response) {
        const { idUsuario } = req.params;
        let sql = "SELECT idUsuario, nombre, nickname, email, genero, fechaNacimiento, "
            + "telefono, bastones, direccion, USUARIO_IDPADRE, USUARIO_IDROL, USUARIO_IDMUNICIPIO,"
            + "m.MUNICIPIO_IDDEPARTAMENTO, r.Rol, m.MUNICIPIO, d.DEPARTAMENTO"
            + " From Usuario, Rol r, Municipio m, Departamento d "
            + " WHERE r.IDROL = USUARIO_IDROL "
            + " AND m.IDMUNICIPIO = USUARIO_IDMUNICIPIO "
            + " AND m.MUNICIPIO_IDDEPARTAMENTO  = d.IDDEPARTAMENTO "
            + " AND idUsuario = :idUsuario";

        const result = await database.Open(sql, [idUsuario], true);
        let Users: any = [];
        result.rows.map((user: any) => {
            let userSchema = {
                "idUsuario": user[0],
                "nombre": user[1],
                "nickname": user[2],
                "email": user[3],
                "genero": user[4],
                "fecha": user[5],
                "telefono": user[6],
                "bastones": user[7],
                "direccion": user[8],
                "idPadre": user[9],
                "idRol": user[10],
                "idMunicipio": user[11],
                "idDepartamento": user[12],
                "rol": user[13],
                "municipio": user[14],
                "departamento": user[15],
            }
            Users.push(userSchema);
        })
        res.json(Users);
    }

    public async getUserByEmail(req: Request, res: Response) {
        const { correo } = req.params;
        let sql = "SELECT idUsuario, nombre, nickname, email, genero, fechaNacimiento, "
            + "telefono, bastones, direccion, USUARIO_IDPADRE, USUARIO_IDROL, USUARIO_IDMUNICIPIO,"
            + "m.MUNICIPIO_IDDEPARTAMENTO, r.Rol, m.MUNICIPIO, d.DEPARTAMENTO"
            + " From Usuario, Rol r, Municipio m, Departamento d "
            + " WHERE r.IDROL = USUARIO_IDROL "
            + " AND m.IDMUNICIPIO = USUARIO_IDMUNICIPIO "
            + " AND m.MUNICIPIO_IDDEPARTAMENTO  = d.IDDEPARTAMENTO "
            + " AND email = :correo";

        const result = await database.Open(sql, [correo], true);
        let Users: any = [];
        result.rows.map((user: any) => {
            let userSchema = {
                "idUsuario": user[0],
                "nombre": user[1],
                "nickname": user[2],
                "email": user[3],
                "genero": user[4],
                "fecha": user[5],
                "telefono": user[6],
                "bastones": user[7],
                "direccion": user[8],
                "idPadre": user[9],
                "idRol": user[10],
                "idMunicipio": user[11],
                "idDepartamento": user[12],
                "rol": user[13],
                "municipio": user[14],
                "departamento": user[15],
            }
            Users.push(userSchema);
        })
        res.json(Users);
    }



    public async getHijos(req: Request, res: Response) {
        const { idPadre } = req.params;
        let sql = "SELECT hijo.idUsuario, hijo.nombre, hijo.nickname, hijo.email,"
            + " hijo.genero, hijo.fechanacimiento,"
            + " hijo.telefono, hijo.bastones, hijo.direccion "
            + " FROM USUARIO hijo, USUARIO padre "
            + " WHERE hijo.USUARIO_IDPADRE = padre.IDUSUARIO "
            + "AND padre.IDUSUARIO = :idPadre ";

        const result = await database.Open(sql, [idPadre], true);
        let Users: any = [];
        result.rows.map((user: any) => {
            let userSchema = {
                "idUsuario": user[0],
                "nombre": user[1],
                "nickname": user[2],
                "email": user[3],
                "genero": user[4],
                "fecha": user[5],
                "telefono": user[6],
                "bastones": user[7],
                "direccion": user[8],
            }
            Users.push(userSchema);
        })
        res.json(Users);
    }

    public async newUser(req: Request, res: Response) {

        const { nombre, nickname, email, pass, gender, fecha, tel, bastones, direccion, idRol, idMunicipio, idPadre } = req.body;
        let sql = "INSERT INTO Usuario(nombre,nickname,email, contrasena, genero,fechaNacimiento, "
            + "telefono, bastones, direccion, USUARIO_IDROL, USUARIO_IDMUNICIPIO, USUARIO_IDPADRE) "
            + "VALUES(:nombre, :nickname, :email, :pass, :gender, TO_DATE(:fecha, 'MM/DD/YYYY'), :tel,"
            + ":bastones, :direccion, :idRol, :idMunicipio, :idPadre)";

        let result = await database.Open(sql, [nombre, nickname, email, pass, gender, fecha, tel, bastones, direccion, idRol, idMunicipio, idPadre], true);
        res.status(200).json({
            "email": email,
            "name": nombre,
            "bastones": bastones,
            "fecha": fecha
        })
    }

    public async loginEmail(req: Request, res: Response) {
        const { email, password } = req.headers;
        let sql = "SELECT idUsuario, bastones, fechaNacimiento, Usuario_idRol, nombre FROM Usuario WHERE email = :email AND contrasena = :password ";
        let ok = await database.Open(sql, [email, password], true);

        if (ok.rows.length > 0) {
            res.json({
                "auth": true,
                "idUsuario": ok.rows[0][0],
                "bastones": ok.rows[0][1],
                "fecha": ok.rows[0][2],
                "idRol": ok.rows[0][3],
                "nombre": ok.rows[0][4]
            })
        } else {
            res.json({
                "auth": false
            })
        }
    }

    public async loginNickname(req: Request, res: Response) {
        const { nickname, password } = req.headers;
        let sql = "SELECT idUsuario, bastones, fechaNacimiento, Usuario_idRol FROM Usuario WHERE nickname = :nickname AND contrasena = :password ";
        let ok = await database.Open(sql, [nickname, password], true);

        if (ok.rows.length > 0) {
            res.json({
                "auth": true,
                "idUsuario": ok.rows[0][0],
                "bastones": ok.rows[0][1],
                "fecha": ok.rows[0][2],
                "idRol": ok.rows[0][3],
            })
        } else {
            res.json({
                "auth": false
            })
        }
    }


    public async updateUser(req: Request, res: Response) {
        const { idUsuario, nombre, nickname, email, pass, gender, fecha, tel,
            bastones, direccion, idRol, idMunicipio, idPadre } = req.body;
        let sql = "UPDATE USUARIO SET nombre = :nombre, nickname = :nickname, email = :email,"
            + " contrasena = :pass, genero = :gender, fechanacimiento = TO_DATE(:fecha, 'YYYY/MM/DD'), telefono = :tel,"
            + " bastones = :bastones, direccion = :direccion, USUARIO_IDROL = :idRol,"
            + "USUARIO_IDMUNICIPIO = :idMunicipio, USUARIO_IDPADRE = :idPadre "
            + "WHERE idUsuario = :idUsuario";
        await database.Open(sql, [nombre, nickname, email, pass, gender, fecha, tel, bastones, direccion, idRol, idMunicipio, idPadre, idUsuario], true);
        res.status(200).json({
            "email": email,
            "name": nombre,
            "bastones": bastones,
            "fecha": fecha,
        })
    }

    public async deleteUser(req: Request, res: Response) {
        const { idUsuario } = req.body;
        let sql = "DELETE FROM Usuario WHERE idUsuario = :idUsuario ";

        try {
            await database.Open(sql, [idUsuario], true);

            res.status(200).json({
                "deleted": true
            })
        } catch (err) {
            console.log("Error al realizar la consulta => ", err)
            res.json({ "deleted": false })
        }
    }
}

export const userController = new UserController(); 
