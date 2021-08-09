import React, { useState } from "react";
import { MenuItems } from "./MenuItems";
import "./Dropdown.css";

const Dropdown = () => {
  const [click, setClick] = useState(false);

  const clickHandler = () => setClick(!click);

  return (
    <>
      <ul
        onClick={clickHandler}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <div className={item.cName} onClick={() => setClick(false)}>
                {item.title}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dropdown;
