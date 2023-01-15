import "./App.css";
import React from "react";
import Home from "./pages/Home";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Cmd from "./pages/Cmd";



// required reclaration to use react-latex library


function App() {
  

  return (
    // <Home></Home>
    <Router>
      <div className="App">
      <Routes>
        {/* <Route exact path="/"  element={<Home></Home>}></Route> */}
        <Route exact path="/"  element={<div>asdf</div>}></Route>
      </Routes>

      </div>
      {/* <Home></Home> */}
    
    </Router>
  );
}

export default App;
