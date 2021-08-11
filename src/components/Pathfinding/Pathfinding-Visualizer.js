import React, { useState, useEffect, Fragment } from "react";
import Node from "./Node/Node";
import Navbar from "../UI/Navbar";
import "./PathfindingVisualizer.css";

const numCols = 35;
const numRows = 12;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = numRows - 1;
const NODE_END_COL = numCols - 1;

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    initializeGrid();
  }, []);

  // Creates the grid
  const initializeGrid = () => {
    const grid = new Array(numRows);

    for (let i = 0; i < numCols; i++) {
      grid[i] = new Array(numCols);
    }

    createSpot(grid);
    setGrid(grid);
    console.log(grid);
  };

  // Creates the spots
  const createSpot = (grid) => {
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  function Spot(i, j) {
    this.x = i; // Rows
    this.y = j; // Cols
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isFinish = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
  }

  // Grid with Node
  // Every row array contains arrays of column arrays created using spot instances
  const gridWithNode = (
    <div>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="row">
            {row.map((col, colIdx) => {
              const { isStart, isFinish } = col;
              return (
                <Node
                  key={colIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  row={rowIdx}
                  col={colIdx}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <Fragment>
      <Navbar />
      <div className="grid">{gridWithNode}</div>
    </Fragment>
  );
};

export default PathfindingVisualizer;
