import React from "react";
import "./Node.css";

const Node = ({
  isStart,
  isFinish,
  row,
  col,
  isWall,
  onMouseEnter,
  onMouseDown,
  onMouseUp,
  isVisited,
  isShortest,
}) => {
  const classes = isStart
    ? "node-start"
    : isWall
    ? "iswall"
    : isFinish
    ? "node-finish"
    : isVisited
    ? "node node-visited"
    : isShortest
    ? "node node-shortest-path"
    : "";
  return (
    <div
      className={`node ${classes}`}
      id={`node-${row}-${col}`}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
