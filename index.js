const express = require("express");
const mysql = require("mysql");
var cors = require("cors");

require('dotenv').config()

const dbUrl = 'mysql://bb6feb847afa04:b6ae9368@us-cdbr-east-06.cleardb.net/heroku_e4902988adbe801?reconnect=true';
const dbUrlObj = new URL(dbUrl);

console.log(dbUrlObj.host)
console.log(dbUrlObj.username)

const db = mysql.createPool({
  host: dbUrlObj.host,
  user: dbUrlObj.username,
  password: dbUrlObj.password,
  database: dbUrlObj.pathname.substr(1),
  reconnect: true, // Enable automatic reconnection
  reconnectInterval: 2000, // Interval between reconnection attempts (in milliseconds)
});

db.getConnection((err) => {
  if (err) {
    throw err;
  } else {
    console.log("MySql connected");
  }
})

// var connection;
// function handleDisconnect() {
//     connection = mysql.createConnection(db);  // Recreate the connection, since the old one cannot be reused.
//     connection.connect( function onConnect(err) {   // The server is either down
//         if (err) {                                  // or restarting (takes a while sometimes).
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 10000);    // We introduce a delay before attempting to reconnect,
//         }                                           // to avoid a hot loop, and to allow our node script to
//     });                                             // process asynchronous requests in the meantime.
//                                                     // If you're also serving http, display a 503 error.
//     connection.on('error', function onError(err) {
//         console.log('db error', err);
//         if (err.code == 'PROTOCOL_CONNECTION_LOST') {   // Connection to the MySQL server is usually
//             handleDisconnect();                         // lost due to either server restart, or a
//         } else {                                        // connnection idle timeout (the wait_timeout
//             throw err;                                  // server variable configures this)
//         }
//     });
// }
// handleDisconnect();

const app = express();
app.use(cors());

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


