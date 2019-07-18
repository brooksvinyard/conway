import React from 'react';

import Controls from '../controls/controls'
import Display from '../display/display'
var gameInterval

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            generation: 0,
            grid: null,
            gridSize: 50, // Grid size is hard coded to be 50x50
            start: false,
            initialGrid: [],

        }
    }
    componentDidMount = () => {
        // When the page is loaded, generate a new random grid and make it the initial grid
        var randomGrid = this.generateGrid(this.state.gridSize)
        this.setState({ grid: randomGrid });
        this.setState({ initialGrid: randomGrid });
    }

    generateGrid = () => {
        // Greate a new random grid
        var size = this.state.gridSize
        var newGrid =  new Array(size*size).fill(0).map(function(n) {
            return Math.round(Math.random());
        });
        var gridgrid = this.lineToGridFn(size, newGrid)
        this.setState({ generation: 0 });
        this.setState({ grid: gridgrid });
        return this.lineToGridFn(size, newGrid)
    }
    blankGrid = () => {
        // Greate a new blank grid
        var size = this.state.gridSize
        var newGrid =  new Array(size*size).fill(0).map(function(n) {
            return 0;
        });
        var gridgrid = this.lineToGridFn(size, newGrid)
        this.setState({ grid: gridgrid });
        this.setState({ generation: 0 });
        return this.lineToGridFn(size, newGrid)
    }

    clickCell = (location) => {
        // On click, change if a cell is alive or dead
        var newGrid = this.state.grid
        if (newGrid[location[0]][location[1]] === 0){
            newGrid[location[0]][location[1]] = 1
        } else {
            newGrid[location[0]][location[1]] = 0
        }
        console.log(location, newGrid[location[0]][location[1]])
        this.setState({ grid: newGrid });
    }

    startGame = e => {
        this.setState({ start: true });
        gameInterval = setInterval(this.gameTick, 100);
    }

    gameTick = () => {
        this.game(this.state.gridSize, this.state.grid)
        this.setState({ generation: this.state.generation + 1 });
    }

    stopGame = () => {
        this.setState({ start: false });
        clearInterval(gameInterval);
    }

    resetGame = () => {
        this.setState({ start: false });
        this.setState({ generation: 0 });
        this.setState({ grid: this.state.initialGrid });
    }

    gridToLineFn = (grid) => {
        var line = [] 
        for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[i].length; j++){
                line.push(grid[i][j])
            }
        }
        return line
    }

    lineToGridFn = (gridSize, gridLine) => {
        var outerGrid = [] 
        var innerGrid = [] 
 
        for (var i = 0; i < gridLine.length; i++){
            if (innerGrid.length === gridSize-1 ) {
                innerGrid.push(gridLine[i])
                outerGrid.push(innerGrid)
                innerGrid = []
            }
            else {
                innerGrid.push(gridLine[i])
            }
        }
        return outerGrid
    }

    game = (gridSize, grid) => {
        // If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
        // If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
        var gridLine = this.gridToLineFn(grid)

        var newGridLine = []
        gridLine.map((cell, index) => {
            var neighbors = this.neighbors(index, gridLine, gridSize)
            if (cell === 1){ // cell alive
                if (neighbors === 2 || neighbors === 3){ // cell has 2 or 3 neighbors
                    newGridLine.push(1) // Cell stays alive
                } else {
                    newGridLine.push(0) // Cell dies
                }

            } else { // cell dead
                if (neighbors === 3){ // cell has 3 neighbors
                    newGridLine.push(1) // Cell comes to life
                } else {
                    newGridLine.push(0) // Cell stays dead
                }
            }
            return newGridLine
        })

        var newGrid = this.lineToGridFn(gridSize, newGridLine)
        this.setState({ grid: newGrid });
    }

    neighbors = (index, gridLine, gridSize) => {
        // neighbor =   -gridSize -1, -gridSize, -gridSize +1
        //                        -1,     cell            ,+1
        //              +gridSize -1, +gridSize, +gridSize +1 
        var neighbors = 0

        if ((index % gridSize) !== 0 && (index - gridSize) >= 0 && gridLine[index - gridSize - 1] === 1)    {neighbors += 1}
        if ((index - gridSize) >= 0 && gridLine[index - gridSize    ] === 1)                                {neighbors += 1}
        if (((index+1) % gridSize) !== 0 && (index - gridSize) >= 0 && gridLine[index - gridSize + 1] === 1){neighbors += 1}
        if ((index % gridSize) !== 0 && gridLine[index - 1] === 1)                                          {neighbors += 1}
        if (((index+1) % gridSize) !== 0 && gridLine[index + 1] === 1)                                      {neighbors += 1}
        if ((index % gridSize) !== 0 && gridLine[index + gridSize - 1] === 1)                               {neighbors += 1}
        if (gridLine[index + gridSize    ] === 1)                                                           {neighbors += 1}
        if (((index+1) % gridSize) !== 0 && gridLine[index + gridSize + 1] === 1)                           {neighbors += 1}
        return neighbors
    }

    render(){
        if (this.state.grid === null) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
            <div className="game">
                <Controls blankGrid={this.blankGrid} generateGrid={this.generateGrid} gameTick={this.gameTick} start={this.state.start} startGame={this.startGame} stopGame={this.stopGame} resetGame={this.resetGame} generation={this.state.generation}/>
                <Display grid={this.state.grid} clickCell={this.clickCell}/>
            </div>
            );
        }
    }
}

export default Game;
