import React from "react";
import "./Node.css";

const Node = ({ isStart, isFinish, row, col }) => {
  const classes = isStart ? "node-start" : isFinish ? "node-finish" : "";
  return <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>;
};

export default Node;
