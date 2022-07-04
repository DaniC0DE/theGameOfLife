import React, { useEffect, useState } from "react";
import produce from "immer";
import Grid from "./Grid";
import OptionsBar from "./OptionsBar";
import "./styles.css";

export default function App() {
  // States
  const [speed, setSpeed] = useState(300);
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(false);
  const [xs, setXs] = useState(30);
  const [ys, setYs] = useState(50);
  const [fullGrid, setFullGrid] = useState({
    generator: 0,
    grid: Array(xs)
      .fill()
      .map(() => Array(ys).fill(false))
  });
  const [isDark, setIsDark] = useState(false);
  const [isLuminescent, setIsLuminescent] = useState(false);
  const [isSquare, setIsSquare] = useState(false);
  const [isLittle, setIsLittle] = useState(false);

  //  Manual select option

  let selectCell = (x, y) => {
    let newGrid = [...fullGrid.grid];
    newGrid[x][y] = !newGrid[x][y];
    setFullGrid({ ...fullGrid, newGrid });
  };

  // Start option - Game's Logic

  const coordinates = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ];

  const play = () => {
    let newGen = produce(fullGrid.grid, (gridCopy) => {
      for (let i = 0; i < xs; i++) {
        for (let j = 0; j < ys; j++) {
          let next = 0;
          coordinates.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (
              newI >= 0 &&
              newI < xs &&
              newJ >= 0 &&
              newJ < ys &&
              fullGrid.grid[newI][newJ]
            ) {
              next++;
            } else if (
              // upper
              newI < 0 &&
              newJ >= 0 &&
              newJ < ys &&
              fullGrid.grid[xs - 1][newJ]
            ) {
              next++;
            } else if (
              // left
              newI >= 0 &&
              newI < xs &&
              newJ < 0 &&
              fullGrid.grid[newI][ys - 1]
            ) {
              next++;
            } else if (
              // down
              newI >= xs &&
              newJ >= 0 &&
              newJ < ys &&
              fullGrid.grid[xs - xs][newJ]
            ) {
              next++;
            } else if (
              // right
              newI >= 0 &&
              newI < xs &&
              newJ >= ys &&
              fullGrid.grid[newI][ys - ys]
            ) {
              next++;
            } else if (
              // left-down corner
              newI >= xs &&
              newJ < 0 &&
              fullGrid.grid[xs - xs][ys - 1]
            ) {
              next++;
            } else if (
              // right-down corner
              newI >= xs &&
              newJ >= ys &&
              fullGrid.grid[xs - xs][ys - ys]
            ) {
              next++;
            } else if (
              // right-up corner
              newI < 0 &&
              newJ >= ys &&
              fullGrid.grid[xs - 1][ys - ys]
            ) {
              next++;
            } else if (
              // left-up corner
              newI < 0 &&
              newJ < 0 &&
              fullGrid.grid[xs - 1][ys - 1]
            ) {
              next++;
            }
          });

          if (next < 2 || next > 3) {
            gridCopy[i][j] = false;
          } else if (fullGrid.grid[i][j] === false && next === 3) {
            gridCopy[i][j] = true;
          }
        }
      }
    });
    setFullGrid({ generator: fullGrid.generator + 1, grid: newGen });
  };

  useEffect(() => {
    if (start) {
      const played = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(play, speed);
      };
      played();
    } else {
      clearInterval(this.intervalId);
    }
  }, [start, speed, play]);

  // Step by step option

  useEffect(() => {
    if (step) {
      const nextStep = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(play, 600);
      };
      nextStep();
      setStep(false);
    }
  }, [step]);

  // To reset and seed the grid options

  const reset = () => {
    let grid = Array(xs)
      .fill()
      .map(() => Array(ys).fill(false));
    setFullGrid({ generator: 0, grid: grid });
  };

  let seedCells = () => {
    let seededGrid = [...fullGrid.grid];
    for (let i = 0; i < xs; i++) {
      for (let j = 0; j < ys; j++) {
        if (Math.floor(Math.random() * 5) === 1) {
          seededGrid[i][j] = true;
        }
      }
    }
    setFullGrid({ ...fullGrid, seededGrid });
  };

  // Speed and Size handlers

  const handleSpeed = (e) => {
    switch (e.target.value) {
      case "slow":
        setSpeed(900);
        break;
      case "medium":
        setSpeed(300);

        break;
      default:
        setSpeed(50);
    }
  };

  const gridSize = (e) => {
    switch (e.target.value) {
      case "small":
        setFullGrid({
          generator: 0,
          grid: Array(20)
            .fill()
            .map(() => Array(30).fill(false))
        });
        setXs(20);
        setYs(30);
        break;
      case "medium":
        setFullGrid({
          generator: 0,
          grid: Array(30)
            .fill()
            .map(() => Array(50).fill(false))
        });
        setXs(30);
        setYs(50);
        break;
      default:
        setFullGrid({
          generator: 0,
          grid: Array(50)
            .fill()
            .map(() => Array(70).fill(false))
        });
        setXs(50);
        setYs(70);
    }
  };

  const handleColors = (e) => {
    switch (e.target.value) {
      case "dark":
        setIsDark(true);
        break;
      case "luminescent":
        setIsDark(false);
        setIsLuminescent(true);
        break;
      default:
        setIsDark(false);
        setIsLuminescent(false);
    }
  };

  const handleGridscheme = (e) => {
    switch (e.target.value) {
      case "square":
        setIsSquare(true);
        break;
      case "little":
        setIsSquare(false);
        setIsLittle(true);
        break;
      default:
        setIsSquare(false);
        setIsLittle(false);
    }
  };

  return (
    <div
      className={`App ${
        isDark ? "dark" : isLuminescent ? "luminescent" : "light"
      }`}
    >
      <h1
        className={`title ${
          isDark ? "dark" : isLuminescent ? "luminescent" : "light"
        }`}
      >
        The Game of Life
      </h1>
      <OptionsBar
        start={start}
        setStart={setStart}
        fullGrid={fullGrid}
        setFullGrid={setFullGrid}
        setStep={setStep}
        reset={reset}
        seedCells={seedCells}
        handleSpeed={handleSpeed}
        handleColors={handleColors}
        handleGridscheme={handleGridscheme}
        gridSize={gridSize}
        isDark={isDark}
        isLuminescent={isLuminescent}
      />
      <Grid
        xs={xs}
        setXs={setXs}
        ys={ys}
        setYs={setYs}
        fullGrid={fullGrid}
        setFullGrid={setFullGrid}
        selectCell={selectCell}
        isDark={isDark}
        isLuminescent={isLuminescent}
        isSquare={isSquare}
        isLittle={isLittle}
      />
    </div>
  );
}
