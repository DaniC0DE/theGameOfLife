import React from "react";
import "./styles.css";

export default function OptionsBar(props) {
  return (
    <div>
      <button
        className={`button ${
          props.isDark ? "dark" : props.isLuminescent ? "luminescent" : "light"
        }`}
        onClick={() => props.setStart(!props.start)}
      >
        {props.start ? "Pause" : "Start"}
      </button>
      <button
        className={`button ${
          props.isDark ? "dark" : props.isLuminescent ? "luminescent" : "light"
        }`}
        onClick={() => props.setStep(true)}
      >
        Step
      </button>
      <button
        className={`button ${
          props.isDark ? "dark" : props.isLuminescent ? "luminescent" : "light"
        }`}
        onClick={props.reset}
      >
        Reset
      </button>
      <button
        className={`button ${
          props.isDark ? "dark" : props.isLuminescent ? "luminescent" : "light"
        }`}
        onClick={props.seedCells}
      >
        Seed
      </button>
      <span>
        <span
          className={`subtitle ${
            props.isDark
              ? "dark"
              : props.isLuminescent
              ? "luminescent"
              : "light"
          }`}
        >
          Speed
        </span>
        <select
          onClick={props.handleSpeed}
          className={`button ${
            props.isDark
              ? "dark"
              : props.isLuminescent
              ? "luminescent"
              : "light"
          }`}
          name="speed"
          id=""
        >
          <option value="slow">900ms</option>
          <option value="medium" selected>
            300ms
          </option>
          <option value="fast">50ms</option>
        </select>
      </span>
      <span>
        <span
          className={`subtitle ${
            props.isDark
              ? "dark"
              : props.isLuminescent
              ? "luminescent"
              : "light"
          }`}
        >
          Size
        </span>
        <select
          className={`button ${
            props.isDark
              ? "dark"
              : props.isLuminescent
              ? "luminescent"
              : "light"
          }`}
          name="grid size"
          id=""
          onClick={props.gridSize}
        >
          <option value="small">30 x 20</option>
          <option value="medium" selected>
            50 x 30
          </option>
          <option value="large">70 x 50</option>
        </select>
      </span>

      <span>
        <span
          className={`subtitle ${
            props.isDark
              ? "dark"
              : props.isLuminescent
              ? "luminescent"
              : "light"
          }`}
        >
          Grid Scheme
        </span>
        <select
          onClick={props.handleGridscheme}
          className={`button ${
            props.isDark
              ? "dark"
              : props.isLuminescent
              ? "luminescent"
              : "light"
          }`}
          name="gridscheme"
          id=""
        >
          <option value="circle" selected>
            #1
          </option>
          <option value="square">#2</option>
          <option value="little">#3</option>
        </select>
      </span>
      <span>
        <span
          className={`subtitle ${
            props.isDark
              ? "dark"
              : props.isLuminescent
              ? "luminescent"
              : "light"
          }`}
        >
          Colors
        </span>
        <select
          onClick={props.handleColors}
          className="button"
          name="colors"
          id=""
        >
          <option value="light" selected>
            Light
          </option>
          <option value="dark">Dark</option>
          <option value="luminescent">Luminescent</option>
        </select>
      </span>
      <span
        className={`subtitle ${
          props.isDark ? "dark" : props.isLuminescent ? "luminescent" : "light"
        }`}
      >
        Generation # {props.fullGrid.generator}
      </span>
    </div>
  );
}
