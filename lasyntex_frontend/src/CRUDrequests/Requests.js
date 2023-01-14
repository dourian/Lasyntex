import React, { useState, useEffect } from "react";
import Command from "../classes/Command";
import Global from "../classes/Global";
import TextField from "@mui/material/TextField";
var Latex = require("react-latex");


function Requests({ apiUrl, commandName }) {
  const [postList, setPosts] = useState([]);

  // Stores the data retrieved from API
  useEffect(() => {
    fetch(apiUrl + commandName)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return (
    <div className="main">
      <h1>React Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      {/* <List /> */}
    </div>
  );
}

export default Requests;
