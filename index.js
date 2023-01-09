const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Lasyntex Rest API listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.json({status: "Lasyntex writing proofs since 2023" });
});

app.get("/:mathcommands", async (req, res) => {
  const query = "SELECT * FROM mathcommands WHERE name = ?";
  pool.query(query, [req.params.mathcommands], (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not found!" });
    } else {
      res.json(results[0]);
    }
  });
});

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
})
