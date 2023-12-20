import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const TippyWrap = ({ children, content, placement }) => {
  return (
    <Tippy content={content} placement={placement && placement}>
      {children}
    </Tippy>
  );
};

export default TippyWrap;
