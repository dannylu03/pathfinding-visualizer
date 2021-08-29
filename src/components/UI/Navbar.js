import React, { useState } from "react";
import Button from "./Button";
import "./Navbar.css";
import Dropdown from "./Dropdown";

const Navbar = (props) => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [algorithm, setAlgorithm] = useState("Algorithm");

  const algorithmHandler = (selectedAlgorithm) => {
    setAlgorithm(selectedAlgorithm);
    props.algorithmHandler(selectedAlgorithm);
  };

  const clickHandler = () => {
    setClick(!click);
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const visualizeAlgorithm = () => {
    if (algorithm === "A*") props.astarHandler();
    if (algorithm === "Breadth First Search") props.bfsHandler();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">Pathfinding Visualizer</div>
        <div className="menu-icon" onClick={clickHandler}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="nav-links">
              {algorithm} <i className="fas fa-caret-down" />
            </div>

            {dropdown && <Dropdown algorithmHandler={algorithmHandler} />}
          </li>

          <li className="nav-item">
            <div className="nav-links">
              <Button
                clickHandler={visualizeAlgorithm}
                text={`Visualize ${algorithm}`}
              />
            </div>
          </li>

          <li className="nav-item">
            <div className="nav-links">Generate Maze</div>
          </li>

          <li className="nav-item">
            <div className="nav-links">
              <Button
                clickHandler={props.clearGridHandler}
                text={"Clear Grid"}
              />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
