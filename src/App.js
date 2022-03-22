import logo from './logo.svg';
import './App.css';
import * as mui from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          editieren <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <mui.Button variant='contained' onClick={() => console.log("Test")}>
          Hallo Welt
        </mui.Button>
      </header>
    </div>
  );
}

export default App;
