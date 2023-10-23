import express from "express";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import colors from "ansicolors";
import IP from "./config/ip.js";
import pool from "./config/connectDB.js";
import { Connect } from "./config/connectDB.js"; 
Connect();

app.use(express.json());
dotenv.config();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// // ==========================================
app.get("/", (req, res) => {
  try {
    pool.query("SELECT * FROM Users u", (err, result) => {
      console.log(result);
      res.send(result);
    });

  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 4000;
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log(`\n  🚀  ➜ Local:    `, colors.blue(`http://localhost:${port}`));
  console.log(`  🚀  ➜ Network:  `, colors.green(`http://${IP}:${port}\n`));
});
