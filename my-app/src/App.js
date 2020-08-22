import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

const numRows = 50;
const numCols = 50;

// represents 'neighbours' - column doesn't change but the row does - we increase the row to go down 1
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generateEmptyGrid = () => {
  const rows = [];
    // set state logic
    for (let i = 0; i < numRows; i++ ) {
      rows.push(Array.from(Array(numCols), () => 0));
  }

return rows;
}

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef();
  runningRef.current = running

  // kind of a recursive fn - constantly doing this
  const runSimulation = useCallback(() => {
    // see if we are currently running - our kill condition
    // call run simulation, make sure we are running, if we are not, return
    // references to our current value is always going to be updated
    if (!runningRef.current) {
      return;
    }

    // big part that simulates everything
    // g == current value of the grid
    setGrid((g) => {
      // will generate a new grid and update the setGrid fn
      return produce(g, gridCopy => {
        for (let i = 0; i <numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            // given cell, how many neighbors it has
            // 0 neighbors, a live cell dies - death # 1
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              // out of bounce? out of the grid? only 3 neighbors
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK]
              }
            })

            // if a live cell has less than 2 neighbors or more than 3 neighbors, it dies - death # 2
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
              // if a cell is dead and has 3 neighbors, it becomes a live === Life
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    // simulate - set state logic to simulate update
    setTimeout(runSimulation, 500);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          // state update happening - it has to happen in time
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}>
        {running ? "stop" : "start"}
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++ ) {
            rows.push(Array.from(Array(numCols), () => Math.random() > .7 ? 1 : 0));
          }

          setGrid(rows);
        }}
      >
        seed
      </button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}
      >
        clear
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "pink" : undefined,
                border: "solid 1px black",
              }}
            />
          )),
        )}
      </div>
    </>
  );
};

export default App;
