const express = require("express");
const mysql = require("mysql");
const app = express();

// Use cors
var cors = require("cors");

// import library and files
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Fixes: [Error] Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin. Status code: 200
app.use(cors());

// let express to use this
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
const port = process.env.PORT || 8080;

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});

app.listen(port, () => {
  console.log(`Lasyntex Rest API listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.json({ status: "Lasyntex writing proofs since 2023" });
});

app.get("/allcommands", async (req, res) => {
  const query = "SELECT * FROM commands";
  pool.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.json({
        status: "failure",
        reason: error,
      });
    } else {
      res.json(results);
    }
  });
});

app.get("/:commands", async (req, res) => {
  const query = "SELECT * FROM commands WHERE name = ?";
  pool.query(query, [req.params.commands], (error, results) => {
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
    syntax: req.body.syntax,
    example: req.body.example,
    description: req.body.description,
  };
  const query = "INSERT INTO commands VALUES (?,?,?,?)";
  pool.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({
        status: "failure",
        reason: error.code,
      });
    } else {
      res.json({
        status: "success",
        data: data,
      });
    }
  });
});

app.delete("/:commands", async (req, res) => {
  const query = `DELETE FROM commands WHERE name= ?`;
  pool.query(query, [req.params.commands], (error) => {
    if (error) {
      res.json({
        status: "failure to delete",
        reason: error.code,
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

app.patch("/:commands", async (req, res) => {
  const data = {
    name: req.body.name,
    syntax: req.body.syntax,
    example: req.body.example,
    description: req.body.description,
  };
  const query = `UPDATE commands SET name = '${data.name}', syntax = '${data.syntax}', example = '${data.example}', description = '${data.description}' WHERE name = ?`;
  pool.query(query, [req.body.name], (error) => {
    if (error) {
      res.json({
        status: "failure to update",
        reason: error.code,
      });
    } else {
      res.json({
        status: "success",
        data: data,
      });
    }
  });
});

// app.patch("/:commands", async (req, res) => {
//   const data = {
//     name: req.body.name,
//     syntax: req.body.syntax,
//     example: req.body.example,
//     description: req.body.description
//   }
//   const query = "DELETE FROM commands WHERE name = ?"
//   pool.query(query, [req.body.name], (error) => {
//     if (error){
//       res.json({
//         status: "failure to delete", reason: error.code
//       })
//     } else{
//       // res.json({
//       //   status: "success"
//       // })
//     }
//   })
//   const secondquery = "INSERT INTO commands VALUES (?,?,?,?)";
//   pool.query(secondquery,Object.values(data), (error) => {
//     if (error){
//       res.json({
//         status: "failure", reason: error.code
//       });
//     } else {
//       res.json({
//         status: "success", data: data
//       });
//     }
//   });
// })
