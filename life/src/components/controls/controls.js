import React from 'react';
import './controls.css'


function Controls(props) {
  return (
    <div className="controls">
      <h2 className="title" >Controls</h2>
      <div className="buttons" >
        {props.start === true
            ? <button className="stop" onClick={props.stopGame} >Stop</button> 
            : <button className="start" onClick={props.startGame} >Start</button> 
        }
        <button className="step" onClick={props.gameTick} >Step</button>
        <button className="reset" onClick={props.resetGame}>Reset</button>
      </div>
      
      <div className="generation">Generation: {props.generation}</div>

      <h2 className="presets" >Presets:</h2>
      <div className="buttons" >
        <button className="preset" onClick={props.generateGrid} >Random</button>
        <button className="preset" onClick={props.blankGrid}>Blank</button>
        <button className="preset" onClick={props.gunGrid}>Glider Gun</button>
      </div>
      

        
    </div>
  );
}

export default Controls;
