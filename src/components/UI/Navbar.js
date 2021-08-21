import React, { useState } from "react";
// import Button from "./Button";
import "./Navbar.css";
import Dropdown from "./Dropdown";

const Navbar = (props) => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

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
              Algorithms <i className="fas fa-caret-down" />
            </div>

            {dropdown && <Dropdown />}
          </li>

          <li className="nav-item">
            <div className="nav-links">
              <button onClick={props.astarHandler}>Visualize Algorithm</button>
            </div>
          </li>

          <li className="nav-item">
            <div className="nav-links">Generate Maze</div>
          </li>

          <li className="nav-item">
            <div className="nav-links">
              <button onClick={props.clearGridHandler}>Clear Grid</button>
            </div>
          </li>
        </ul>
        {/* <Button /> */}
      </nav>
    </>
  );
};

export default Navbar;
