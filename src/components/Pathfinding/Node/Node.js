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
}) => {
  const classes = isStart
    ? "node-start"
    : isWall
    ? "iswall"
    : isFinish
    ? "node-finish"
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
