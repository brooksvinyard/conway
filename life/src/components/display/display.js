import React from 'react';

import Cell from './cell.js'

import './display.css'


function Display(props) {
  return (
    <div className="display">
      <h2 className="title" >Game</h2>
        {props.grid.map((row, rowIndex) => 
        <div className={"row " + rowIndex}> 
            {row.map((col, colIndex) => <Cell cell={col} location={[rowIndex, colIndex]} clickCell={props.clickCell} /> )}
        </div> 
        )}
    </div>
  );
}

export default Display;
