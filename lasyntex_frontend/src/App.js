import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Global from "./classes/Global"


function App() {
  fetch("https://lasyntex.herokuapp.com/allcommands")
    .then((response) => response.json())
    .then((data) => {
      // sorts array lexigraphically first
      var dummy = [];
      dummy = data;
      let sorteddummy = dummy.sort((r1, r2) => r1.name.localeCompare(r2.name))
      Global.commandsList = sorteddummy
      console.log("made http req")
    })
    .catch((err) => {
      console.log(err.message);
    });
  

  return (
    <Home></Home>
  );
}

export default App;
