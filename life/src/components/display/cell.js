import React from 'react';


const Cell = props => {
  return (
    <div className="cell" onClick={() => props.clickCell(props.location)}>
        {props.cell === 0
            ? <div className="dead">0</div> 
            : <div className="alive">1</div> 
        }
    </div>
  );
}

export default Cell;
