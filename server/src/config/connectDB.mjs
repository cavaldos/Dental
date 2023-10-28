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
const pool = new sql.ConnectionPool(config);
export const poolConnect = await pool.connect(config);

export const Connect = async () => {
  try {
    await sql.connect(config);
    console.log("    🔥 SQL Server connection successful!\n");
  } catch (error) {
    console.error("    🔥 SQL Server connection error:\n");
  }
}
export default pool;
