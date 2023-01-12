import logo from './logo.svg';
import './App.css';
import GetCommand from './CRUDrequests/Requests';
import Requests from './CRUDrequests/Requests';
// required reclaration to use react-latex library
var Latex = require('react-latex');


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Requests apiUrl={"https://lasyntex-service-e5x5h3x7kq-uc.a.run.app/"} commandName={"sqrt"}></Requests>
            {/* <h3>
                <Latex displayMode={true}> $$\LaTeX$$</Latex>
            </h3> */}
      </header>
    </div>
  );
}

export default App;
