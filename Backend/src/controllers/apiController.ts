import { Request, Response } from 'express';
import database from '../database';
class ApiController {


    public async getDepartamentos(re: Request, res: Response) {
        let consulta = "SELECT * FROM Departamento";
        const result = await database.Open(consulta, [], false);
        let deps: any = [];
        result.rows.map((dep: any) => {
            let departamentoSchema = {
                "id": dep[0],
                "nombre": dep[1]
            }
            deps.push(departamentoSchema);
        })
        res.json(deps);
    }

    public async getDepartamentoByName(req: Request, res: Response){
        const { nombre } = req.params;
        let consulta = "SELECT * From Departamento "
            + " WHERE departamento = :nombre";
        const result = await database.Open(consulta, [nombre], true);
        let deps: any = [];
        result.rows.map((dep: any) => {
            let depSchema = {
                "idDepartamento": dep[0],
                "nombre": dep[1],
            }
            deps.push(depSchema);
        })
        res.json(deps);
    }


    public async getMunicipios(re: Request, res: Response) {
        const { idDepartamento } = re.params;
        let consulta = "SELECT m.IDMUNICIPIO, m.MUNICIPIO , d.DEPARTAMENTO, d.idDepartamento "
            + " FROM Municipio m, DEPARTAMENTO d "
            + " WHERE m.MUNICIPIO_IDDEPARTAMENTO  = d.IDDEPARTAMENTO"
            + " AND d.IDDEPARTAMENTO = :idDepartamento";
        const result = await database.Open(consulta, [idDepartamento], true);
        let municipios: any = [];
        result.rows.map((muni: any) => {
            let municipiosSchema = {
                "id": muni[0],
                "nombre": muni[1],
                "departamento": muni[2],
                "idDepartamento": muni[3]
            }
            municipios.push(municipiosSchema);
        })
        res.json(municipios);
    }

    public async getMunicipioByName(req: Request, res: Response){
        const { nombre } = req.params;
        let consulta = "SELECT m.IDMUNICIPIO, m.MUNICIPIO , d.DEPARTAMENTO, d.idDepartamento "
            + " FROM Municipio m, DEPARTAMENTO d "
            + " WHERE m.MUNICIPIO_IDDEPARTAMENTO  = d.IDDEPARTAMENTO"
            + " AND m.Municipio = :nombre";
        const result = await database.Open(consulta, [nombre], true);
        let municipios: any = [];
        result.rows.map((muni: any) => {
            let municipiosSchema = {
                "id": muni[0],
                "nombre": muni[1],
                "departamento": muni[2],
                "idDepartamento": muni[3],
            }
            municipios.push(municipiosSchema);
        })
        res.json(municipios);
    }

    public async createDepartamento(req: Request, res: Response) {
        const { departamento } = req.body;
        let sql = "INSERT INTO DEPARTAMENTO(departamento) VALUES(:departamento)"

        const result = await database.Open(sql, [departamento], true);
        res.status(200).json({
            "nombre": departamento
        })
    }


    public async createMunicipio(req: Request, res: Response) {
        const { municipio, idDepartamento } = req.body;
        console.log("Muni:",municipio);
        console.log("idDep:", idDepartamento);
        let sql = "INSERT INTO Municipio(municipio, municipio_idDepartamento) VALUES(:municipio, :idDepartamento)"

        const result = await database.Open(sql, [municipio, idDepartamento], true);
        res.status(200).json({
            "nombre": municipio,
            "idDepartamento": idDepartamento,
        })
    }

    public async getRoles(re: Request, res: Response) {
        let consulta = "SELECT * FROM Rol";
        const result = await database.Open(consulta, [], false);
        let roles: any = [];
        result.rows.map((rol: any) => {
            let rolesSchema = {
                "id": rol[0],
                "nombre": rol[1]
            }
            roles.push(rolesSchema);
        })
        res.json(roles);
    }

}

export const apiController = new ApiController(); 
