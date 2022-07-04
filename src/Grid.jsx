import React from "react";
import "./styles.css";

export default function Grid(props) {
  const width = props.ys * 18;
  const rowsArray = [];
  let cellClass = "";

  for (let i = 0; i < props.xs; i++) {
    for (let j = 0; j < props.ys; j++) {
      let cellId = i + "_" + j;

      cellClass =
        props.fullGrid.grid && props.fullGrid.grid[i][j]
          ? "cell on"
          : "cell off";

      cellClass = props.isDark
        ? cellClass + " dark"
        : props.isLuminescent
        ? cellClass + " luminescent"
        : cellClass + " light";

      cellClass = props.isSquare
        ? cellClass + " square"
        : props.isLittle
        ? cellClass + " little"
        : cellClass + " circle";

      rowsArray.push(
        <Cell
          cellClass={cellClass}
          key={cellId}
          cellId={cellId}
          x={i}
          y={j}
          selectCell={props.selectCell}
          isDark={props.isDark}
          isLuminescent={props.isLuminescent}
        />
      );
    }
  }

  return (
    <div className="grid" style={{ width: width }}>
      {rowsArray}
    </div>
  );
}

function Cell(props) {
  const selectCell = () => {
    props.selectCell(props.x, props.y);
  };
  return (
    <div className={props.cellClass} id={props.id} onClick={selectCell}></div>
  );
}
