const express = require("express");
const mysql = require("mysql");

require('dotenv').config()

const dbUrl = 'mysql://bb6feb847afa04:b6ae9368@us-cdbr-east-06.cleardb.net/heroku_e4902988adbe801?reconnect=true';
const dbUrlObj = new URL(dbUrl);

console.log(process.env.PORT)

const db = mysql.createConnection({
  host: dbUrlObj.host,
  user: dbUrlObj.username,
  password: dbUrlObj.password,
  database: dbUrlObj.pathname.substr(1)
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("MySql connected");
  }
})

const app = express();

// create database

app.get("/createdb", (req, res) => {
  let sql = 'CREATE DATABASE latexcommands';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result)
      res.send('database created')
    }
  })
})

// create table

app.get("/", async (req, res) => {
  res.json({ status: "Lasyntex writing proofs since 2023" });
});

app.get("/allcommands", async (req, res) => {
  const query = "SELECT * FROM commands";
  db.query(query, (error, results) => {
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
  db.query(query, [req.params.commands], (error, results) => {
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
  db.query(query, Object.values(data), (error) => {
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

app.post("/addmultiple", async (req, res) => {
  var ar = req.body.commands;
  const query = "INSERT INTO commands VALUES (?,?,?,?)";
  ar.forEach(element => {
    const data = {
      name: element.name,
      syntax: element.syntax,
      example: element.example,
      description: element.description
    }
    db.query(query, Object.values(data), (error) => {
      if (error) {
        res.json({
          status: "failure",
          reason: error.code,
        })
      } else {
        res.json({
          status: "success",
          data: data,
        });
      }
    })
  });
})

app.delete("/:commands", async (req, res) => {
  const query = `DELETE FROM commands WHERE name= ?`;
  db.query(query, [req.params.commands], (error) => {
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
  db.query(query, [req.body.name], (error) => {
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

let port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`server started on ${process.env.PORT}`)
})


// // Use cors
// var cors = require("cors");

// // import library and files
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

// // Fixes: [Error] Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin. Status code: 200
// app.use(cors());

// // let express to use this
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use(express.json());
// const port = process.env.PORT || 8080;

// const pool = mysql.createPool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
// });

// app.listen(port, () => {
//   console.log(`Lasyntex Rest API listening on port ${port}`);
// });


