import sql from "mssql-plus";
import dotenv from "dotenv";
dotenv.config()
const PORT= Number(process.env.MSSQL_PORT)
const config = {
  user: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  port: PORT,
  database: process.env.DATABASE,
  options: {
    enableArithAbort: true,
    trustServerCertificate: true, // Tắt xác nhận chứng chỉ
    encrypt: true, // Sử dụng kết nối mã hóa SSL
  },
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 60000,
  },
};

const ConnectMSSQL = async () => {
  try {
    await sql.connect(config);
    console.log("    🔥 SQL Server connection successful!\n");
  } catch (error) {
    console.error("    🔥 SQL Server connection error !!!!!   \n");
  }
};


const poolConnect = async () => {
  try {
    let pool = new sql.ConnectionPool(config);
    await pool.connect(config);
    return pool;
  } catch (error) {
    console.error("    🔥 poolconnect connection error !!!!!   \n");
  }
};

export { ConnectMSSQL, poolConnect };
