/* Now that my grid has been built and will dynamically resize itself, I need to take a look at the logic around how the cell changes based on a generational iteration and how the controls of the game are wired up. 

All of the stateful logic around how I control what the grid looks like at an individual generaatin is handled in a custom hook called useGrid. 
*/
import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  defaultGrid1, 
  defaultGrid2,
  defaultGrid3, 
  defaultGrid4
}

// useGrid has multiple useState calls to keep track of various pieces of info that we'll use both for iterating through generations and for our game controls. 
// state used to keep track of info that I will use for iterating through generations and for game controls. 
export const useGrid = () => {
  const [grid, setGrid] = useState(defaultGrid1);
  const [generation, setGeneration] = useState(0);
  const [clickable, setClickable] = useState(true);
  const [speedInput, setSpeedInput] = useState("");
  const [gridSize, setGridSize] = useState(25);
}

/* 2nd part of the framework: Need a way to step through generations. Based on the existing grid, do we have a combo of cells that meets the criteria of the game to be able to be mutated? Handle all of this logic within a helper function inside useGrid called stepThroughAutomata.
*/

// First, set a variable of validGrid to be False
// nextGeneration maps over the current grid, then checks for the current cell's neighbors
// We then check for how many of the current cell's neighbors are alive 
// Based on how many are alive, we return a cell either untouched, or we toggle it's alive state, based on the rules passed into the if statements. 
// If we were able to toggle a cell's alive state, we know the grid is valid, 
// So we increase the current generation count and set the grid to be nextGeneration
// Else, we return an alert to the user letting them know the grid isn't valid
const steThroughAutomata = () => {
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
  })
}
