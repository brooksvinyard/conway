# Conway's Game of Life
[Play me!](https://conways.netlify.com/)

Conway's Game of Life is a cellular automaton game created in 1970. The rules of the game are simple:
> * The game is a grid of cells that are all either alive or dead.
> * If a cell is alive and has 2 or 3 neighbors, it remains alive. Otherwise it dies.
> * If a cell is dead and has exactly 3 neighbors, it comes to life. Otherwise it remains dead.
-----
## Components
In order to build this game, I broke it down into discrete elements. The main components of the game are the display, and the controls. The game logic was started and stopped by the controls and the result of the life simulation was displayed on the display grid. 

### Display
The display on my version of the Game of Life is a 50 x 50 matrix of arrays. The display receives an array of arrays from the game logic and will then iterate over each cell in the array to in order to show if it is alive or dead. The display is set to render each step of the game, every 100ms. Additionally, each cell in the display can be clicked to change its state from alive to dead, or dead to alive. 

### Controls
The controls of the game will either start or stop the simulation. There is also a button to individually step through the simulation or restart from the initial state. Below the main controls, there are several different preset buttons to influence the starting of the game. There is a **random** button, to start with a random 50 x 50 grid, a **blank** button to clear the game grid, and a **glider gun** button to display Gosper's glider gun, which is a pattern that continually creates glider patterns. 

-----

## Game Logic
In order to work with all the cells of the game, I needed to convert the game grid from an array of 50 arrays, to one long array. By converting to one long array, it is easier to iterate through each cell and determine the number of living neighbors each cell has. Then, with the number of neighbors each cell has, the game logic can determine if the cell lives or dies.

### Neighbors
While the logic of the Game of Life is simple, it takes some work to determine if a cells neighbors are alive or dead. A cells neighbors are the 8 cells surrounding it, above and below, left and right, and the four diagonals. Since the logic is working with one long array, instead of an array of arrays, the table below displays how to determine each cell's 8 neighbors based on how big the grid is. 

|              | Neighbors |              |
|:------------:|:---------:|:------------:|
| -gridsize -1 | -gridsize | -gridsize +1 |
|      -1      |    cell   |      +1      |
| +gridsize -1 | +gridsize | +gridsize +1 |

When determining all of a cells neighbors, the logic needs to make sure that a cell is not next to an edge. Without coding in edge cases, a cell will be influenced by cells on the other side of the screen. Since we know how long a row is by the grid size, we can use the index of the cell modulo (%) gridsize to see if there is any remainder. For example, if we are looking at cell index 50, it is the cell on the second row, all the way against the left edge. We do not want to look at it's neighbor to the left, because it does not have one! If we perform (index % gredSize) or (50 % 50) we get 0. So we can ignore the neighbor on the left of the cell we get a modulo of 0. 

-----
[Play the Game of Life](https://conways.netlify.com/)

Brooks Vinyard