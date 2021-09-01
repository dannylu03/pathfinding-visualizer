import React, { useRef } from "react";
import "./App.css";
import PathfindingVisualizer from "./components/Pathfinding/Pathfinding-Visualizer";
import Modal from "./components/UI/Modal";

function App() {
  const modalRef = useRef();

  return (
    <>
      <Modal ref={modalRef}>
        <h1>Tutorial</h1>
        <p>
          <br />
          <span>
            Select an algorithm from the dropdown and click visualize algorithm
            to visualize the path.
          </span>
          <br />
          <br />
          <span>To add walls, click and hold left click then drag mouse. </span>
        </p>
      </Modal>
      <PathfindingVisualizer></PathfindingVisualizer>
    </>
  );
}

export default App;
