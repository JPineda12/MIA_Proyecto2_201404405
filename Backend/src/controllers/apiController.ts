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

    public async getMunicipios(re: Request, res: Response) {
        const { idDepartamento } = re.params;
        let consulta = "SELECT m.IDMUNICIPIO, m.MUNICIPIO , d.DEPARTAMENTO "
            + " FROM Municipio m, DEPARTAMENTO d "
            + " WHERE m.MUNICIPIO_IDDEPARTAMENTO  = d.IDDEPARTAMENTO"
            + " AND d.IDDEPARTAMENTO = :idDepartamento";
        const result = await database.Open(consulta, [idDepartamento], true);
        let municipios: any = [];
        result.rows.map((muni: any) => {
            let municipiosSchema = {
                "id": muni[0],
                "nombre": muni[1],
                "idDepartamento": muni[2]
            }
            municipios.push(municipiosSchema);
        })
        res.json(municipios);
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
