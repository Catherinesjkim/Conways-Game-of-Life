// a helper function that dynamically changes amount of space given to each column and row within my grid
export const gridDisplay = gridSize => {
	// gridSize is a variable that stores the size of the grid. 3 default sizes. Based on the grid size, I will have different styles 
	if (gridSize === 25) {
		return {
			display: "grid",
			gridTemplateColumns: `repeat(${gridSize}, 15px)`,
			gridTemplateRows: `repeat(${gridSize}, 15px)`
		};
	}
	if (gridSize === 30) {
		return {
			display: "grid",
			gridTemplateColumns: `repeat(${gridSize}, 10px)`,
			gridTemplateRows: `repeat(${gridSize}, 10px)`
		};
	}
	if (gridSize === 50) {
		return {
			display: "grid",
			gridTemplateColumns: `repeat(${gridSize}, 6px)`,
			gridTemplateRows: `repeat(${gridSize}, 6px)`
		};
	}
};

// cellSize will return the width and height of an individual cell based on the gridSize
const cellSize = gridSize => {
	if (gridSize === 25) {
		return '15px'
	}
	if (gridSize === 30) {
		return '10px'
	}
	if (gridSize === 50) {
		return '6px'
	}
}

// cellDisplay creates 3 random colors, and then checks to see if the cell passed in is alive or dead
export const cellDisplay = (alive, gridSize) => {
	const ranColorNum1 = Math.floor(Math.random() * Math.floor(255))
	const ranColorNum2 = Math.floor(Math.random() * Math.floor(255))
	const ranColorNum3 = Math.floor(Math.random() * Math.floor(255))

	// If it's alive, it dynamically sets the size of the cell and then gives it a random color, if it's dead, then it dynamically sets the size of the cell and sets the background to black
	if (alive) {
		return {
			width: `${cellSize(gridSize)}`,
			height: `${cellSize(gridSize)}`,
			background: `rgb(${ranColorNum1}, rgb(${ranColorNum2}, rgb(${ranColorNum3})`,

		};
	} else {
		return {
			width: `${cellSize(gridSize)}`,
			height: `${cellSize(gridSize)}`,
			background: "black",
			// border: '0.1px solid black`
		};
	}
};