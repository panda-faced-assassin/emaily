import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Hi There</h2>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="http://localhost:5000/auth/google">
          Sign In With Google
        </a>
      </header>
    </div>
  );
}

export default App;
