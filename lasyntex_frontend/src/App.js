import logo from './logo.svg';
import './App.css';
import GetCommand from './CRUDrequests/Requests';
import { useEffect } from 'react';
import Global from './classes/Global';
import Requests from './CRUDrequests/Requests';
import Command from './classes/Command';
// required reclaration to use react-latex library
var Latex = require('react-latex');


function App() {
  // useEffect(() => {
  //   fetch("https://lasyntex-service-ftd5kbbgma-uc.a.run.app")
  //       .then((response) => response.json())
  //       .then((data) => {
  //           Global.allCommands.push(new Command(data.name, data.syntax, data.example, data.description))

  //       })
  //       .catch((err) => {
  //           console.log(err.message);
  //       });
        
  //       console.log(Global.allCommands)
  // })
  
  return (
    <div className="App">
      <header className="App-header">
      <div className="posts-container">
           {/* {Global.allCommands.map((post) => {
              return (
                <div>
                <p>{post.name}</p>
                <p>{post.syntax}</p>
                <p>{post.example}</p>
                <p>{post.description}</p>
                </div>
              );
           })} */}
        </div>
        <Requests apiUrl={"https://lasyntex-service-ftd5kbbgma-uc.a.run.app/"} commandName={"allcommands"}></Requests>
            {/* <h3>
                <Latex displayMode={true}> $$\LaTeX$$</Latex>
            </h3> */}
      </header>
    </div>
  );
}

export default App;
