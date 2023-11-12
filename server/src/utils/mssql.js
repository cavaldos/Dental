import { poolConnect } from "../config/connectDB.js";

const load = async (sql, Connect) => {
  try {
    let pool = await poolConnect(Connect.user, Connect.pass, Connect.database);
    const result = await pool.query(sql);
    console.log("result load:", result.recordset);
    const close = pool.close.bind(pool);
    await close();
  } catch (error) {
    console.log("SQL Error Code:", error.code);

    console.log("SQL Error Message:", error.message);
  }
};

const add = async (tableName, entity, Connect) => {
  try {
    const pool = await poolConnect(
      Connect.user,
      Connect.pass,
      Connect.database
    );
    const columns = Object.keys(entity).join(", ");
    const values = Object.values(entity)
      .map((value) => (typeof value === "string" ? `'${value}'` : value))
      .join(", ");
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
    const result = await pool.query(sql);
    console.log("add :", result);
    const close = pool.close.bind(pool);
    await close();
  } catch (error) {
    console.log(error);
  }
};

const del = async (tableName, condition, Connect) => {
  try {
    const pool = await poolConnect(
      Connect.user,
      Connect.pass,
      Connect.database
    );
    const sql = `DELETE FROM ${tableName} WHERE ${condition}`;

    const result = await pool.query(sql);
    console.log("delete :", result);
    const close = pool.close.bind(pool);
    await close();
  } catch (error) {
    console.log(error);
  }
};
const patch = async (tableName, entity, condition, Connect) => {
  try {
    const pool = await poolConnect(
      Connect.user,
      Connect.pass,
      Connect.database
    );
    const updates = Object.entries(entity)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key} = '${value}'`;
        } else {
          return `${key} = ${value}`;
        }
      })
      .join(", ");
    const sql = `UPDATE ${tableName} SET ${updates} WHERE ${condition}`;

    const result = await pool.query(sql);
    console.log("patch :", result);
    const close = pool.close.bind(pool);
    await close();
  } catch (error) {
    console.log(error);
  }
};

const getTables = async (Connect) => {
  try {
    const pool = await poolConnect(
      Connect.user,
      Connect.pass,
      Connect.database
    );
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
    `);
    const tables = result.recordset.map((r) => r.table_name);
    console.log("table", tables);
    const close = pool.close.bind(pool);
    await close();
  } catch (error) {
    console.log(error);
  }
};
export { load, add, del, patch, getTables };
