import React, { useState, useEffect, Fragment } from "react";
import Node from "./Node/Node";
import Navbar from "../UI/Navbar";
import "./PathfindingVisualizer.css";
import astar from "./Algorithms/astar";

const numCols = 35;
const numRows = 20;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = numRows - 1;
const NODE_END_COL = numCols - 1;

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);

  useEffect(() => {
    initializeGrid();
  }, []);

  // Creates the grid
  const initializeGrid = () => {
    const grid = new Array(numRows);

    for (let i = 0; i < numRows; i++) {
      grid[i] = new Array(numCols);
    }

    createPoint(grid);
    setGrid(grid);

    addNeighbors(grid);

    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];

    let path = astar(startNode, endNode);
    startNode.isWall = false; // Start node will never be a wall
    endNode.isWall = false;
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
  };

  // Creates the nodes
  const createPoint = (grid) => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        grid[row][col] = new Point(row, col);
      }
    }
  };

  // Loops through all nodes in the grid and neighbors to each of them
  const addNeighbors = (grid) => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        grid[row][col].addneighbors(grid);
      }
    }
  };

  // Class constructor for a point/node object
  function Point(row, col) {
    this.x = row; // Rows
    this.y = col; // Cols
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isFinish = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.f = 0; // the sum of g and h
    this.g = 0; // Movement cost from start node to a given node
    this.h = 0; // Estimated movement cost from given node and end node
    this.neighbors = [];
    this.previousNode = undefined;
    this.isWall = false;

    // 20% of points are walls
    if (Math.random(1) < 0.2) {
      this.isWall = true;
    }

    // Adds neighbors to specific node instances
    this.addneighbors = function (grid) {
      // Checks for the boundaries of the grid, left, right, bottom, top
      // Adds left node as a neighbor
      if (this.x > 0) {
        this.neighbors.push(grid[row - 1][col]);
      }

      // Adds right node as a neighbor
      if (this.x < numRows - 1) {
        this.neighbors.push(grid[row + 1][col]);
      }

      // Adds top node as a neigbor
      if (this.y > 0) {
        this.neighbors.push(grid[row][col - 1]);
      }

      // Adds bottom node as a neigbor
      if (this.y < numCols - 1) {
        this.neighbors.push(grid[row][col + 1]);
      }
    };
  }

  // Grid with Node
  // Every row array contains arrays of column arrays created using point/node instances
  const gridWithNode = (
    <div>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="row">
            {row.map((col, colIdx) => {
              const { isStart, isFinish, isWall } = col;
              return (
                <Node
                  key={colIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  row={rowIdx}
                  col={colIdx}
                  isWall={isWall}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  // Animates shortest path
  const visualizeShortestPath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 10 * i);
    }
  };

  const visualizeAstar = () => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, 20 * i);
      }
    }
  };

  return (
    <Fragment>
      {/* <Navbar onClick={visualizePath} /> */}
      <button onClick={visualizeAstar}>Visualize Algorithm</button>
      <div className="grid">{gridWithNode}</div>
    </Fragment>
  );
};

export default PathfindingVisualizer;
