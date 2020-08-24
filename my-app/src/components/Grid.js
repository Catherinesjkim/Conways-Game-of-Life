import React from "react"
import { gridDisplay, cellDisplay } from '../helper-functions/display-functions'

// In order to visually display the grid and cells to the screen, we create a Grid component that maps over our grid array and generates an individual cell for each object in the grid array.

// My Grid component, creating an individual cell, represented by a <div> tag for each cell object in the grid array
export default function Grid({ grid, toggleLife, clickable, gridSize }) {
    
    return (
			<div className="grid" style={gridDisplay(gridSize)}> 
				{grid.map((cell, i) => {
					return (
						<div
							key={cell.id}
							className={cell.allive ? "alive" : "dead"}
							onClick={clickable ? toggleLife : null }
							data-id={cell.id}
							style={cellDisplay(cell.alive, gridSize)}
							/>
					);
				})}
			</div>
    );
}
// inline style tag's value of that is a helper function for both my grid and cells to be dynamic based on the input passed into the functions. 