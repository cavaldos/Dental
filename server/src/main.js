import express from "express";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import colors from "ansicolors";
import IP from "./config/ip.js";
import sql from "mssql";

import pool from "./config/connectDB.mjs";
import { Connect, poolConnect } from "./config/connectDB.mjs";


Connect();

app.use(express.json());
dotenv.config();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// // ==========================================

// test function 
const getAllRecords = async () => {
    try{
        const pool = await poolConnect;
        const result = await pool.request().query("SELECT * FROM Users u");
        console.log(result);
    }
    catch(error){
        console.log(error);
    }
};
getAllRecords();

const port = process.env.PORT || 4000;
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log(`\n  🚀  ➜ Local:    `, colors.blue(`http://localhost:${port}`));
  console.log(`  🚀  ➜ Network:  `, colors.green(`http://${IP}:${port}\n`));
});
