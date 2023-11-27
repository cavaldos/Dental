import sql from "mssql-plus";
import dotenv from "dotenv";
dotenv.config();
const PORT = Number(process.env.MSSQL_PORT);

const config = {
  server: process.env.MSSQL_SERVER,
  port: PORT,
  options: {
    enableArithAbort: true,
    trustServerCertificate: true,
    encrypt: true,
  },
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 60000,
  },
};

const poolConnect = async (loginType) => {
  try {
    let user, password, database, logMessage;

    switch (loginType) {
      case 'KH':
        user = process.env.MSSQL_USERNAME_KH;
        password = process.env.MSSQL_PASSWORD_KH;
        database = process.env.MSSQL_DATABASE;
        logMessage = 'Login as KH';
        break;
      case 'NV':
        user = process.env.MSSQL_USERNAME_NV;
        password = process.env.MSSQL_PASSWORD_NV;
        database = process.env.MSSQL_DATABASE;
        logMessage = 'Login as NV';
        break;
      case 'NS':
        user = process.env.MSSQL_USERNAME_NS;
        password = process.env.MSSQL_PASSWORD_NS;
        database = process.env.MSSQL_DATABASE;
        logMessage = 'Login as NS';
        break;
      case 'QTV':
        user = process.env.MSSQL_USERNAME_SERVER;
        password = process.env.MSSQL_PASSWORD_SERVER;
        database = process.env.MSSQL_DATABASE;
        logMessage = 'Login as QTV';
        break;
      default:
        console.error(`Unsupported login type: ${loginType}`);
        return null;
    }

    const connectionConfig = {
      ...config,
      user,
      password,
      database,
    };

    let pool = new sql.ConnectionPool(connectionConfig);
    await pool.connect();
    pool.queryRecordset = async (queryString) => {
      const result = await pool.query(queryString);
      return result.recordset;
    };
    pool.executeSP = async (procedureName, params) => {
      const request = pool.request();
      for (const paramName in params) {
        if (params.hasOwnProperty(paramName)) {
          request.input(paramName, params[paramName]);
        }
      }
      try {
        const result = await request.execute(procedureName);
        return result.recordsets;
      } catch (error) {
        throw error;
      }
    };

    console.log(`🔥 SQL Server pool connection successful!!! ${logMessage}\n`);

    return pool;
  } catch (error) {
    console.log(error);
    console.error(`🔥 poolConnect connection error !!!!!\n`);
    return null;
  }
};

export { poolConnect };
