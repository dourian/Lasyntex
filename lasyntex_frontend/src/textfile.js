import { React, useState } from "react";
import TextField from "@mui/material/TextField";
// import List from "./Components/List"
// import "./App.css";

function textfile() {
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
    </div>
  );
}

export default textfile;