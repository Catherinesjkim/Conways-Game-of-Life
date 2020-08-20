/* Now that my grid has been built and will dynamically resize itself, I need to take a look at the logic around how the cell changes based on a generational iteration and how the controls of the game are wired up. 

All of the stateful logic around how I control what the grid looks like at an individual generaatin is handled in a custom hook called useGrid. 

useGrid has multiple useState calls to keep track of various pieces of info that we'll use both for iterating through generations and for our game controls. 
*/

// State used to keep track of info that I will use for iterating through generations and for game controls. 
export const useGrid = () => {
  const [grid, setGrid] = useState(defaultGrid1);
  const [generation, setGeneration] = useState(0);
  const [clickable, setClickable] = useState(true);
  const [speedInput, setSpeedInput] = useState("");
  const [gridSize, setGridSize] = useState(25);
}