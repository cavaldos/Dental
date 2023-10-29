import sql from "mssql";

const config = {
  user: "sa",
  password: "password123@",
  server: "localhost",
  port: 1444,
  database: "master",
  options: {
    enableArithAbort: true,
    trustServerCertificate: true, // Tắt xác nhận chứng chỉ
  },
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 60000,
  },
};

    // console.log("    🔥 SQL Server connection successful!\n");
//    console.log("    🔥 SQL Server connection error:");

const pool = new sql.ConnectionPool(config);
export const poolConnect = pool.connect(config);

export const Connect = async () => {
  try {
    await sql.connect(config);
    if (pool.connecting) {
      console.log("    🔥 SQL Server connecting...");
    }
    if (pool.connected) {
      console.log("    🔥 SQL Server connected!");
    }
    
  } catch (error) {
    console.log("    🔥 SQL Server connection error:");
    console.error(error);
  }
};
export default pool;
