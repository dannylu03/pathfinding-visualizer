import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(true);

  useImperativeHandle(props.ref, () => {
    return {
      close: () => close(),
    };
  });

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className={"modal-wrapper"}>
        <div onClick={close} className={"modal-backdrop"} />
        <div className="modal-box">{props.children}</div>
      </div>,
      document.getElementById("modal-root")
    );
  }

  return null;
});

export default Modal;
