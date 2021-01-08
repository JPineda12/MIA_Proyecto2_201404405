const oracledb = require('oracledb');

class Database{


    public cns = {
        user: "brestlocal",
        password: "1234",
        connectString: "172.17.0.2/ORCL18"
    }

    public async Open(sql: any , binds: any, autoCommit: any) {
        let cnn = await oracledb.getConnection(this.cns);
        let result = await cnn.execute(sql, binds, { autoCommit });
        cnn.release();
        console.log("DB is Connected")
        return result;
    }
}

const database = new Database();
export default database;
