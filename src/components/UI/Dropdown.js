import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
  const menuItems = [
    {
      title: "A*",
      cName: "dropdown-link",
    },
    {
      title: "Dijkstra",
      cName: "dropdown-link",
    },
    {
      title: "Breadth First Search",
      cName: "dropdown-link",
    },
    {
      title: "Depth First Search",
      cName: "dropdown-link",
    },
  ];

  const [click, setClick] = useState(false);

  const clickHandler = () => setClick(!click);

  const algorithmHandler = (event) => {
    props.algorithmHandler(event.target.innerText);
  };

  return (
    <>
      <ul
        onClick={algorithmHandler}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <div className={item.cName}>{item.title}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dropdown;
