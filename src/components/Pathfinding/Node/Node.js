import React from "react";
import "./Node.css";

const Node = ({ isStart, isFinish, row, col, isWall }) => {
  const classes = isStart
    ? "node-start"
    : isWall
    ? "iswall"
    : isFinish
    ? "node-finish"
    : "";
  return <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>;
};

export default Node;
