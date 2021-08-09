import React from "react";
import "./App.css";
import Navbar from "./components/UI/Navbar";
import PathfindingVisualizer from "./components/Pathfinding/Pathfinding-Visualizer";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <PathfindingVisualizer></PathfindingVisualizer>
    </>
  );
}

export default App;
