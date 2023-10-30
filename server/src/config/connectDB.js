import sql from "mssql-plus";

import dotenv from "dotenv";
import colors from "ansicolors";
dotenv.config();
const PORT = Number(process.env.MSSQL_PORT);

const config = {
  user: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  port: PORT,
  database: process.env.DATABASE,
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

const poolConnect = async (name, pass) => {
  try {
    const connectionConfig = {
      ...config,
      user: name || config.user,
      password: pass || config.password,
    };
    let pool = new sql.ConnectionPool(connectionConfig);
    await pool.connect();
    console.log(
      `    🔥 SQL Server poolconnection successful !!! username:`,
      colors.red(`${connectionConfig.user}`),
      `\n`
    );
    return pool;
  } catch (error) {
    console.error(`    🔥 poolconnect connection error !!!!!   \n`);
  }
};

export { poolConnect };
