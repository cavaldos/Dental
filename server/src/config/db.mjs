import sql from "mssql-plus";
import dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.MSSQL_PORT);
let pools = {};
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

const createPool = async (loginType) => {
  try {
    let user, password, database, logMessage;

    switch (loginType) {
      case "KH":
        user = process.env.MSSQL_USERNAME_KH;
        password = process.env.MSSQL_PASSWORD_KH;
        database = process.env.MSSQL_DATABASE;
        logMessage = "Login as KH";
        break;
      case "NV":
        user = process.env.MSSQL_USERNAME_NV;
        password = process.env.MSSQL_PASSWORD_NV;
        database = process.env.MSSQL_DATABASE;
        logMessage = "Login as NV";
        break;
      case "NS":
        user = process.env.MSSQL_USERNAME_NS;
        password = process.env.MSSQL_PASSWORD_NS;
        database = process.env.MSSQL_DATABASE;
        logMessage = "Login as NS";
        break;
      case "QTV":
        user = process.env.MSSQL_USERNAME_QTV;
        password = process.env.MSSQL_PASSWORD_QTV;
        database = process.env.MSSQL_DATABASE;
        logMessage = "Login as QTV";
        break;
      case "KHONLINE":
        user = process.env.MSSQL_USERNAME_KHONLINE;
        password = process.env.MSSQL_PASSWORD_KHONLINE;
        database = process.env.MSSQL_DATABASE;
        logMessage = "Login as KHONLINE";
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
    if (!pool.connected) {
      try {
        await pool.connect();
      } catch (error) {
        console.error(`Error connecting to SQL Server: ${error.message}`);
        return null;
      }
    }
  
    console.log(`🔥 SQL Server pool connection successful!!! ${logMessage}\n`);

    return pool;
  } catch (error) {
    console.log(error);
    console.error(`🔥 createPool connection error !!!!!\n`);
    return null;
  }
};

const getPool =  (loginType) => {
  let dbVar = "MSSQL_USERNAME_" + loginType;
  const pool = pools.find((p) => p && p.config.user === process.env[dbVar]);

  if (!pool) {
    console.error(`No pool found for login type: ${loginType}`);
    return null;
  }
  const request = pool.request();
  request.executeSP = async (procedureName, params) => {
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
  return request;
};

pools = await Promise.all(
  ["KH", "NV", "NS", "QTV", "KHONLINE"].map(createPool)
);

export { getPool };
