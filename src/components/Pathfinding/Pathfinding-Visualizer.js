import React, { useState, useEffect, Fragment } from "react";
import Node from "./Node/Node";
import Navbar from "../UI/Navbar";
import "./PathfindingVisualizer.css";
import astar from "./Algorithms/astar";
// Constants

const numCols = 35;
const numRows = 15;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = numRows - 1;
const NODE_END_COL = numCols - 1;

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [mousePressed, setMousePressed] = useState(false);
  const [visualizingAlgorithm, setVisualizingAlgorithm] = useState(false);

  const getNewGridWithWalls = (grid, row, col) => {
    let newGrid = grid.slice();
    let node = grid[row][col];
    let newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const mouseDownHandler = (row, col) => {
    const newGrid = getNewGridWithWalls(grid, row, col);
    setGrid(newGrid);
    setMousePressed(true);
  };

  const mouseEnterHandler = (row, col) => {
    if (mousePressed) {
      const newGrid = getNewGridWithWalls(grid, row, col);
      setGrid(newGrid);
      setMousePressed(true);
    }
  };

  const mouseUpHandler = () => {
    setMousePressed(false);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  const clearGrid = () => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (
          !(
            (row === NODE_START_ROW && col === NODE_START_COL) ||
            (row === NODE_END_ROW && col === NODE_END_COL)
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    initializeGrid();
  };

  // Creates the grid
  const initializeGrid = () => {
    let grid = new Array(numRows);

    for (let i = 0; i < numRows; i++) {
      grid[i] = new Array(numCols);
    }

    createPoint(grid);
    setGrid(grid);

    addNeighbors(grid);

    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];

    startNode.isWall = false; // Start node will never be a wall
    endNode.isWall = false;
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
    this.previousNode = null;
    this.isWall = false;
    this.isVisited = false;
    this.isShortest = false;
    this.distance = Infinity;
    this.totalDistance = Infinity;

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
              const { isStart, isFinish, isWall, isVisited, isShortest } = col;
              return (
                <Node
                  key={colIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  isVisited={isVisited}
                  isShortest={isShortest}
                  row={rowIdx}
                  col={colIdx}
                  isWall={isWall}
                  onMouseDown={(row, col) => mouseDownHandler(row, col)}
                  onMouseEnter={(row, col) => mouseEnterHandler(row, col)}
                  onMouseUp={() => mouseUpHandler()}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  // Animates shortest path
  // const visualizeShortestPath = (shortestPath) => {
  //   console.log(path);
  //   for (let i = 0; i < shortestPath.length; i++) {
  //     setTimeout(() => {
  //       const node = shortestPath[i];
  //       document.getElementById(`node-${node.x}-${node.y}`).className =
  //         "node node-shortest-path";
  //     }, 10 * i);
  //   }
  // };
  const updateNodesForRender = (
    grid,
    nodesInShortestPathOrder,
    visitedNodesInOrder
  ) => {
    let newGrid = grid.slice();
    for (let node of visitedNodesInOrder) {
      if (
        (node.x === NODE_START_ROW && node.y === NODE_START_COL) ||
        (node.x === NODE_END_ROW && node.y === NODE_END_COL)
      )
        continue;
      let newNode = {
        ...node,
        isVisited: true,
      };
      newGrid[node.x][node.y] = newNode;
    }
    for (let node of nodesInShortestPathOrder) {
      if (node.x === NODE_END_ROW && node.y === NODE_END_COL) {
        return newGrid;
      }
      let newNode = {
        ...node,
        isVisited: false,
        isShortest: true,
      };
      newGrid[node.x][node.y] = newNode;
    }
  };

  const visualizeShortestPath = (
    nodesInsShortestPathOrder,
    visitedNodesInOrder
  ) => {
    for (let i = 1; i < nodesInsShortestPathOrder.length - 1; i++) {
      if (i === nodesInsShortestPathOrder.length - 1) {
        setTimeout(() => {
          let newGrid = updateNodesForRender(
            grid,
            nodesInsShortestPathOrder,
            visitedNodesInOrder
          );
          setGrid(newGrid);
        }, i * 30);
        return;
      }
      let node = nodesInsShortestPathOrder[i];
      setTimeout(() => {
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, i * 30);
    }
  };
  const visualizeAlgorithm = (
    visitedNodesInOrder,
    nodesInShortestPathOrder
  ) => {
    let newGrid = grid.slice();
    for (let row of newGrid) {
      for (let node of row) {
        let newNode = {
          ...node,
          isVisited: false,
        };
        newGrid[node.x][node.y] = newNode;
      }
    }
    setGrid(grid);
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      let node = visitedNodesInOrder[i];
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          visualizeShortestPath(nodesInShortestPathOrder, visitedNodesInOrder);
        }, i * 10);
        return;
      }
      setTimeout(() => {
        //visited node
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-visited";
      }, i * 10);
    }
  };

  // const visualizeAlgorithm = () => {
  //   console.log(visitedNodes);
  //   for (let i = 0; i <= visitedNodes.length; i++) {
  //     if (i === visitedNodes.length) {
  //       setTimeout(() => {
  //         visualizeShortestPath(path);
  //       }, 20 * i);
  //     } else {
  //       setTimeout(() => {
  //         const node = visitedNodes[i];
  //         document.getElementById(`node-${node.x}-${node.y}`).className =
  //           "node node-visited";
  //       }, 20 * i);
  //     }
  //   }
  // };

  const visualizeAstar = () => {
    setTimeout(() => {
      const startNode = grid[NODE_START_ROW][NODE_START_COL];
      const endNode = grid[NODE_END_ROW][NODE_END_COL];
      let path = astar(startNode, endNode);
      const visitedNodesInOrder = path.visitedNodes;
      const nodesInShortestPathOrder = path.path;
      visualizeAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, 10);
  };

  return (
    <Fragment>
      <Navbar astarHandler={visualizeAstar} clearGridHandler={clearGrid} />
      {/* <button onClick={visualizeAstar}>Visualize Algorithm</button> */}
      <div className="grid">{gridWithNode}</div>
    </Fragment>
  );
};

export default PathfindingVisualizer;
