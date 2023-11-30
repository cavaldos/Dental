import DatabaseCache from "./DatabaseCache";

class DatabaseLoader {
  constructor(role) {
    this.role = role;
    this.dbCache = new DatabaseCache();
  }

  async load(sql) {
    try {
      const { pool } = await this.dbCache.getDatabase(this.role);
      const result = await pool.request().query(sql);
      return result.recordset;
    } catch (error) {
      console.log("SQL load Error Code:", error.code);
      console.log("SQL load Error Message:", error.message);
      return null;
    }
  }
}

// Sử dụng
const loader = new DatabaseLoader("defaultRole");
loader
  .load("SELECT * FROM table1")
  .then((data) => {
    // Xử lý dữ liệu
  })
  .catch((error) => {
    // Xử lý lỗi
  });
