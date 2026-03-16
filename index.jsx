import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './main.css';

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navigation-container">
      <h1>GF 2 FTW</h1>
      <div className="tabs">
        <button className="tab" onClick={() => navigate("/John_Main")}>John</button>
        <button className="tab active">Kristian</button>
        <button className="tab">Kim</button>
      </div>
      {/* Main navigation content would go here */}
    </div>
  );
};

export default NavigationBar;