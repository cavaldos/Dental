import Database from "../config/connectDB.js";
const databaseCache = {};

const getDatabase = async (role) => {
  try {
    if (!databaseCache[role]) {
      const database = new Database(role);
      const pool = await database.connect();
      databaseCache[role] = {
        database,
        pool,
      };
    }
    return databaseCache[role];
  } catch (error) {
    console.log("SQL Error Code:", error.code);
    console.log("SQL Error Message:", error.message);
    return null;
  }
};
const closeDatabase = async (role) => {
  try {
    if (databaseCache[role]) {
      const { database, pool } = databaseCache[role];
      await database.close();
      delete databaseCache[role];
      console.log(`Database connection for role ${role} closed.`);
    }
  } catch (error) {
    console.log("SQL Error Code:", error.code);
    console.log("SQL Error Message:", error.message);
  }
};

const load = async (sql, role) => {
  try {
    const { pool } = await getDatabase(role);
    const result = await pool.request().query(sql);
    return result.recordset;
  } catch (error) {
    console.log("SQL load Error Code:", error.code);
    console.log("SQL load Error Message:", error.message);
  }
};

const add = async (tableName, entity, role) => {
  try {
    const { pool } = await getDatabase(role);

    const columns = Object.keys(entity).join(", ");
    const values = Object.values(entity)
      .map((value) => (typeof value === "string" ? `'${value}'` : value))
      .join(", ");
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
    const result = await pool.request().query(sql);
    console.log("add :", result);
  } catch (error) {
    console.log("SQL add Error Code add:", error.code);
    console.log("SQL add Error Message add:", error.message);
  }
};

const del = async (tableName, condition, role) => {
  try {
    const { pool } = await getDatabase(role);

    const sql = `DELETE FROM ${tableName} WHERE ${condition}`;
    const result = await pool.request().query(sql);
    console.log("delete :", result);
  } catch (error) {
    console.log("SQL del Error Code:", error.code);
    console.log("SQL del Error Message:", error.message);
  }
};
const patch = async (tableName, entity, condition, role) => {
  try {
    const { pool } = await getDatabase(role);
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
    const result = await pool.request().query(sql);
    console.log("patch :", result);
  } catch (error) {
    console.log("SQL patch Error Code:", error.code);
    console.log("SQL patch Error Message:", error.message);
  }
};

const getTables = async (role) => {
  try {
    const { pool } = await getDatabase(role);
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
    `);
    const tables = result.recordset.map((r) => r.table_name);
    console.log("table", tables);
    return tables;
  } catch (error) {
    console.log("SQL getTables Error Code:", error.code);
    console.log("SQL getTables Error Message:", error.message);
  }
};
const disconnect = async (role) => {
  try {
    const { pool } = await getDatabase(role);
    await pool.close();
    await closeDatabase(role);
  } catch (error) {
    console.log("SQL disconnect Error Code:", error.code);
    console.log("SQL disconnect Error Message:", error.message);
  }
}
export { load, add, del, patch, getTables, disconnect };
