import sql from "mssql-plus";

const config = {
  user: "sa",
  password: "password123@",
  server: "localhost",
  port: 1444,
  database: "master",
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
