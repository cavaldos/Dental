import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "test",
  port: 3308,
  database: "dentists",
  password: "test",
  waitForConnections: true,
  connectionLimit: 100,
  maxIdle: 100,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
pool.on("connection", (connection) => {
  console.log("    🔥 MySQL Connection successful!");
});

const Connect = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("    🔥 Database connection was closed.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("    🔥 Database has too many connections.");
      }
      if (err.code === "ECONNREFUSED") {
        console.error("    🔥 Database connection was refused.");
      }
    }
    if (connection) connection.release();
    return;
  });
};



export { Connect };
export default pool;
