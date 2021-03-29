/* Now that my grid has been built and will dynamically resize itself, I need to take a look at the logic around how the cell changes based on a generational iteration and how the controls of the game are wired up. 

All of the stateful logic around how I control what the grid looks like at an individual generaatin is handled in a custom hook called useGrid. 
*/
import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  defaultGrid1, 
  defaultGrid2,
  defaultGrid3, 
  defaultGrid4
} from "../dummy-data-structures/default-grids.js";
import getNeighbors from "./grid-neighbors";

export const useInterval = (callback, delay, grid, clickable) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!clickable) {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }
  }, [delay, grid, clickable]);
};

// useGrid has multiple useState calls to keep track of various pieces of info that we'll use both for iterating through generations and for our game controls. 
// state used to keep track of info that I will use for iterating through generations and for game controls. 
export const useGrid = () => {
  const [grid, setGrid] = useState(defaultGrid1);
  const [generation, setGeneration] = useState(0);
  const [Clickable, setClickable] = useState(true);
  const [speedInput, setSpeedInput] = useState("");
  const [gridSize, setGridSize] = useState(15);

// Takes in a number and creates an array of objects where the alive property will be randomly set to true or false, based on the size of the number passed in.
// Resets the current generation to 0
// Sets the grid to be the random grid created. 
const createRandomGrid = useCallback(num => {
  let numberOfCells = num * num;
  let randomGrid = [];

  for (let i = 0; i < numberOfCells; i++) {
    randomGrid = [...randomGrid, { alive: Math.round(Math.random()), id: i }];
  }
  setGeneration(0);
  setGrid(randomGrid);
}, []);


/* 2nd part of the framework: Need a way to step through generations. Based on the existing grid, do we have a combo of cells that meets the criteria of the game to be able to be mutated? Handle all of this logic within a helper function inside useGrid called stepThroughAutomata.
*/

// Step 1: set a variable of validGrid to be False
// nextGeneration maps over the current grid, then checks for the current cell's neighbors
// We then check for how many of the current cell's neighbors are alive 
// Based on how many are alive, we return a cell either untouched, or we toggle it's alive state, based on the rules passed into the if statements. 
// If we were able to toggle a cell's alive state, we know the grid is valid, 
// So we increase the current generation count and set the grid to be nextGeneration
// Else, we return an alert to the user letting them know the grid isn't valid
const stepThroughAutomata = () => {
  // Step 1: set a variable to determine if the grid is valid (can make a mutation based on the rules)
  let validGrid = false;
  // neighbors[0] = north west neighbor
  // neighbors[1] = north neighbor
  // neighbors[2] = north east neighbor
  // neighbors[3] = west neighbor
  // neighbors[4] = east neighbor
  // neighbors[5] = south west neighbor
  // neighbors[6] = south neighbor
  // neighbors[7] = south east neighbor

  // Step 2: Map over the current grid, saving this new map as nextGeneration and check for the current cell's neighbors using the getNeighbors helper function
  const nextGeneration = grid.map((cell, i) => {
    let neighbors = getNeighbors(i, gridSize, gridSize);
    let livingNeighbors = 0;

    if (grid[neighbors[0]].alive) {
      livingNeighbors += 1;
    }
    if (grid[neighbors[1]].alive) {
      livingNeighbors += 1;
    }
    if (grid[neighbors[2]].alive) {
      livingNeighbors += 1;
    }
    if (grid[neighbors[3]].alive) {
      livingNeighbors += 1;
    }
    if (grid[neighbors[4]].alive) {
      livingNeighbors += 1;
    }
    if (grid[neighbors[5]].alive) {
      livingNeighbors += 1;
    }
    if (grid[neighbors[6]].alive) {
      livingNeighbors += 1;
    }
    if (grid[neighbors[7]].alive) {
      livingNeighbors += 1;
    }

    if (cell.alive && (livingNeighbors === 2 || livingNeighbors === 3)) {
      return cell;
    }
    if (cell.alive && (livingNeighbors < 2 || livingNeighbors >= 4)) {
      validGrid = true;
      return { ...cell, alive: !cell.alive };
    }
    if (!cell.alive && (livingNeighbors === 3) {
      validGrid = true;
      return { ...cell, alive: !cell.alive };
    }
    return cell;
  });

  if (validGrid) {
    setGeneration(prevState => (prevState += 1));
  } else {
    setClickable(true);
    return alert(
      "Grid is invalid, or no changes will be made due to rules. \nToggle some live cells or select a default grid."
    );
  }
  setGrid(nextGeneration);
};

// toggleLife creates a newGrid by mapping over the current grid.
// Inside the map, we check if the current cell matches the data-id of the current target.
// If it does, we return that cell but toggle the alive boolean, else, we return the cell unchanged. 
// We then set the grid to be the new grid. 
const toggleLife = e => {
  const column = e.target.dataset.column;
  const row = e.target.dataset.row;
  const id = e.target.dataset.id;
  const newGrid = grid.map(cell => {
    if (cell.id === +id) {
      return { 
        column: +column,
        row: +row,
        alive: !cell.alive, 
        clickable: true, 
        id: +id
      };
    } else {
      return cell;
    }
  });

  setGrid(newGrid);
  };

// A helper function to set the grid based on what gets passed in onClick of the default grid buttons. 
const setDefaultGrid = e => {
  e.preventDefault();
  switch (e.target.value) {
    case "Clear Grid":
      setGridSize(25);
      setGrid(defaultGrid1);
      setGeneration(0);
      break;
    case "Default Grid 1":
      setGridSize(25);
      setGrid(defaultGrid2);
      setGeneration(0);
      break;
    case "Default Grid 2":
      setGridSize(25);
      setGrid(defaultGrid3);
      setGeneration(0);
      break;
    case "Default Grid 3":
      setGridSize(25);
      setGrid(defaultGrid4);
      setGeneration(0);
      break;
    default:
      return;
    }
  };

  return [
    grid,
    setGrid,
    generation,
    setGeneration,
    Clickable,
    setClickable,
    speedInput,
    setSpeedInput,
    stepThroughAutomata,
    toggleLife, 
    setDefaultGrid,
    createRandomGrid,
    gridSize,
    setGridSize
  ];
};