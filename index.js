const express = require ("express");
const mysql = require("mysql");
const app = express();

app.use(express. json ()) ;
const port = process.env.PORT || 8080;

app.listen (port, () => {
console. log ('Lasyntex Rest API listening on port ${port}');
});

app.get ("/", async (req, res) => {
res.ison ({ status:
"Lasyntex writing proofs since 2023" });
});