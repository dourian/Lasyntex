const express = require("express");
const mysql = require("mysql");
const app = express();

// import library and files
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

// let express to use this
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
const port = process.env.PORT || 8080;

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
})

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

app.post("/", async (req, res) => {
  const data = {
    name: req.body.name,
    content: req.body.content
  }
  const query = "INSERT INTO mathcommands VALUES (?,?)";
  pool.query(query,Object.values(data), (error) => {
    if (error){
      res.json({
        status: "failure", reason: error.code
      });
    } else {
      res.json({
        status: "success", data: data
      });
    }
  });
});

app.patch("/:mathcommands", async (req, res) => {
  const data = {
    name: req.body.name,
    content: req.body.content
  }
  const query = "DELETE FROM mathcommands WHERE name= ?"
  pool.query(query, [req.body.name], (error) => {
    if (error){
      res.json({
        status: "failure to delete", reason: error.code
      })
    } else{
      // res.json({
      //   status: "success"
      // })
    }
  })
  const secondquery = "INSERT INTO mathcommands VALUES (?,?)";
  pool.query(secondquery,Object.values(data), (error) => {
    if (error){
      res.json({
        status: "failure", reason: error.code
      });
    } else {
      res.json({
        status: "success", data: data
      });
    }
  });
})