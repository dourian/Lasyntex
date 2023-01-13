import { React, useState } from "react";
import TextField from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';

// import '@material/react-text-field/dist/text-field.css';
// import List from "./Components/List"

// import "./App.css";

function Textfile() {
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

export default Textfile;