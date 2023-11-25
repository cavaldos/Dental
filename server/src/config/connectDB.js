

import sql from "mssql-plus";
import dotenv from "dotenv";
import colors from "ansicolors";
dotenv.config();

const config = {
  user: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  port: parseInt(process.env.MSSQL_PORT),
  database: process.env.MSSQL_DATABASE,
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

const dbs = {
  online: {
    ...config,
    user: process.env.MSSQL_USERNAME_KHTN, // khach hang tiem nang, chua dang nhap
  },
  guest: {
    ...config,
    user: process.env.MSSQL_USERNAME_KH,
  },
  admin: {
    ...config,
    user: process.env.MSSQL_USERNAME_SERVER,
  },
  staff: {
    ...config,
    user: process.env.MSSQL_USERNAME_NV,
  },
  dentist: {
    ...config,
    user: process.env.MSSQL_USERNAME_NS,
  },
};

class Database {
  constructor(role) {
    const poolConfig = dbs[role];
    let connectionConfig = poolConfig ? poolConfig : config;
    this.pool = new sql.ConnectionPool(connectionConfig);
  }

  async connect() {
    try {
      if (this.pool) {
        await this.pool.connect();
      }
      console.log(
        `    💯 SQL Server poolconnection successful !!! username:`,
        colors.blue(`${this.pool.config.user}`),
        "connect to database:",
        colors.blue(`${this.pool.config.database}`),
        `\n`
      );
      return this.pool;
    } catch (error) {
      console.error(
        colors.red(`    🔥 poolconnect  connection error !!! `),
        `${error.message} \n`
      );
      return null;
    }
  }

  async close() {
    try {
      if (this.pool) {
        await this.pool.close();
      }
      console.log(
        `    👍 SQL Server CLOSED !!! username:`,
        colors.blue(`${this.pool.config.user} \n`)
      );
      return this.pool;
    } catch (error) {
      console.error(
        colors.red(`    🔥 poolconnect  connection error !!! `),
        `${error.message} \n`
      );
      return null;
    }
  }
}

export default Database;
