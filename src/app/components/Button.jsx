import React from "react";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
      title={props.title ? props.title : null}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
