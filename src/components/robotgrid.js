import React, { Component } from "react";
import "../css/robotgrid.css";
import * as AppConstants from "../util/appconstants";
import Robot from "./robot";
import App from "../App";
class RobotGrid extends Component {
  constructor(props) {
    super(props);
    const robotStates = [];
    this.state = { robotStates, oddParity: true };
  }

  componentWillMount() {
    this.shuffle();
  }

  onClick = (row, col) => {
    const robotStates = [...this.state.robotStates];
    robotStates[row][col] = robotStates[row][col] === 0 ? 1 : 0;
    console.log("robotgrid onclick row col", row, col, robotStates);
    this.setState({ robotStates: robotStates });
  };

  makeRobots = () => {
    const grid = [];
    for (let row = 0; row < AppConstants.GRIDSIZE; ++row) {
      const nextRow = [];
      for (let col = 0; col < AppConstants.GRIDSIZE; ++col) {
        const orientation = this.state.robotStates[row][col];
        nextRow.push(
          <Robot
            key={row * AppConstants.GRIDSIZE + col}
            orientation={orientation}
            row={row}
            col={col}
            onClick={this.onClick}
          />
        );
      }
      grid.push(<div key={row}>{nextRow}</div>);
    }
    return grid;
  };

  shuffle = () => {
    const robotStates = [];
    for (let r = 0; r < AppConstants.GRIDSIZE; ++r) {
      const nextRow = [];
      let rowParity = 0;
      for (let c = 0; c < AppConstants.GRIDSIZE; ++c) {
        const orientation = Math.random() > 0.5 ? 0 : 1;
        nextRow.push(orientation);
      }
      robotStates.push(nextRow);
    }
    //console.log("before shuffle ", robotStates);
    this.adjustParity(robotStates);
    this.setState({ robotStates: robotStates });
    //console.log("after shuffle ", robotStates);
  };

  adjustParity(robotStates) {
    this.adjustRowParity(robotStates);
    this.adjustColParity(robotStates);
    //console.log("adjust parity oddparity", robotStates, this.state.oddParity);
  }

  adjustRowParity(robotStates) {
    // adjust row parity
    const lastCol = robotStates[0].length - 1;
    for (let row = 0; row < robotStates.length; ++row) {
      let rowParity = 0;
      for (let col = 0; col < lastCol; ++col) {
        rowParity += robotStates[row][col];
      }
      let odd = this.state.oddParity ? 0 : 1;
      //console.log("parity calc row  parity", row, rowParity);
      robotStates[row][lastCol] = rowParity % 2 == odd ? 1 : 0;
    }
  }

  adjustColParity(robotStates) {
    // adjust col parity
    const lastRow = robotStates.length - 1;
    for (let col = 0; col < robotStates[0].length; ++col) {
      let colParity = 0;
      for (let row = 0; row < lastRow; ++row) {
        colParity += robotStates[row][col];
      }
      let odd = this.state.oddParity ? 0 : 1;
      robotStates[lastRow][col] = colParity % 2 == odd ? 1 : 0;
    }
  }

  render() {
    //console.log("robot grid render");
    const orientation = Math.random() > 0.5 ? 0 : 1;
    return (
      <div>
        <div>
          <button onClick={this.shuffle}>Shuffle</button>
        </div>
        <div className={"robotgrid"}>{this.makeRobots()}</div>
      </div>
    );
  }
}
export default RobotGrid;
