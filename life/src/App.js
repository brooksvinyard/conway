import React from 'react';
// import logo from './logo.svg';

import Game from './components/game/game.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="conway-title">
        <h3 className="title1">Conway's</h3>
        <h1 className="title2">Game of Life</h1>
      </div>
      <Game />
      <div className="footer" >
        <a href="https://brooksvinyard.com">&copy; Brooks Vinyard</a> : <a href="http://https://github.com/brooksvinyard/conway">GitHub</a>
      </div>
    </div>
  );
}

export default App;
