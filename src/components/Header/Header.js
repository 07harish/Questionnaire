import React from "react";
import "./style.css";

const Header = () => {
  return (
    <div className="Header-Container">
      <div className="Header-Heading">Mathematics Trivia</div>
      <div className="Header-Color-Description">
        <span className="Header-Color">
          <span className="Header-Color-item Header-y" /> Attempted Answer
        </span>
        <span className="Header-Color">
          <span className="Header-Color-item Header-b" /> Answer Not Visited
        </span>
        <span className="Header-Color">
          <span className="Header-Color-item Header-r" /> Blank Answer
        </span>
      </div>
    </div>
  );
};

export default Header;
