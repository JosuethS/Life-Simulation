import React, { useState, useEffect } from 'react';

const numRows = 45;
const numCols = 86;

const GameOfLifeGrid = () => {
  const generateEmptyGrid = () => {
    return Array.from({ length: numRows }, () => Array(numCols).fill(0));
  };

  const [grid, setGrid] = useState(generateEmptyGrid);
  const [stableGrid, setStableGrid] = useState(generateEmptyGrid);

  const generateRandomGrid = () => {
    return Array.from({ length: numRows }, () =>
      Array(numCols).fill(0).map(() => (Math.random() > 0.7 ? 1 : 0)) // Adjusted probability for alive cells
    );
  };

  useEffect(() => {
    setGrid(generateRandomGrid());
  }, []);

  const runSimulation = () => {
    setGrid((g) => {
      const newGrid = g.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          let liveNeighbors = 0;
          const directions = [
            [0, 1], [0, -1], [1, 0], [-1, 0],
            [1, 1], [1, -1], [-1, 1], [-1, -1]
          ];

          // Count live neighbors
          directions.forEach(([dx, dy]) => {
            const newRow = rowIndex + dx;
            const newCol = colIndex + dy;
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
              liveNeighbors += g[newRow][newCol];
            }
          });

          // Apply Game of Life rules with overcrowding check
          if (g[rowIndex][colIndex] === 1) {
            // Cell is currently alive
            if (liveNeighbors < 2 || liveNeighbors > 3 || liveNeighbors >= 6) {
              return 0; // Cell dies due to underpopulation, overpopulation, or overcrowding
            }
            return 1; // Cell stays alive
          } else {
            // Cell is currently dead
            if (liveNeighbors === 3) {
              return 1; // Cell becomes alive
            }
          }
          return 0; // Cell remains dead
        })
      );

      // Detect stable cells by comparing current grid with new grid
      const newStableGrid = newGrid.map((row, rowIndex) =>
        row.map((col, colIndex) => (g[rowIndex][colIndex] === newGrid[rowIndex][colIndex] ? 1 : 0))
      );

      setStableGrid(newStableGrid);
      return newGrid;
    });
  };

  useEffect(() => {
    const interval = setInterval(runSimulation, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid-container" style={{ gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
      {grid.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${stableGrid[rowIndex][colIndex] ? 'stable' : grid[rowIndex][colIndex] ? 'alive' : 'dead'}`}
          />
        ))
      )}
    </div>
  );
};

export default GameOfLifeGrid;
