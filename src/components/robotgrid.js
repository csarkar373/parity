import React, { Component } from "react";
import "../css/robotgrid.css";
import * as AppConstants from "../util/appconstants";
import Robot from "./robot";

class RobotGrid extends Component {
  constructor(props) {
    super(props);
    const robotStates = [];
    this.state = { robotStates, size: AppConstants.GRIDSIZE };
    this.shuffle = this.shuffle.bind(this);
  }

  componentWillMount() {
    this.shuffle(AppConstants.GRIDSIZE);
  }

  onClick = (row, col) => {
    const robotStates = [...this.state.robotStates];
    robotStates[row][col] = robotStates[row][col] === 0 ? 1 : 0;
    //console.log("robotgrid onclick row col", row, col, robotStates);
    this.setState({ robotStates: robotStates });
  };

  makeRobots = () => {
    //console.log("make robots large = ", this.props.large);
    const size = this.state.size;
    const grid = [];
    for (let row = 0; row < size; ++row) {
      const nextRow = [];
      for (let col = 0; col < size; ++col) {
        const orientation = this.state.robotStates[row][col];
        nextRow.push(
          <Robot
            key={row * size + col}
            orientation={orientation}
            row={row}
            col={col}
            large={this.props.large}
            onClick={this.onClick}
          />
        );
      }
      grid.push(<div key={row}>{nextRow}</div>);
    }
    return grid;
  };

  shuffle(size) {
    //console.log("before shuffle size =", size);
    const robotStates = [];
    for (let r = 0; r < size; ++r) {
      const nextRow = [];
      for (let c = 0; c < size; ++c) {
        const orientation = Math.random() > 0.5 ? 0 : 1;
        nextRow.push(orientation);
      }
      robotStates.push(nextRow);
    }

    this.adjustParity(robotStates, this.props.oddParity);
    this.setState({ robotStates: robotStates });
    //console.log("after shuffle ", robotStates);
  }

  adjustParity(robotStates, oddParity) {
    this.adjustRowParity(robotStates, oddParity);
    this.adjustColParity(robotStates, oddParity);
    //console.log("adjust parity oddparity", robotStates, this.state.oddParity);
  }

  adjustRowParity(robotStates, oddParity) {
    // adjust row parity
    //console.log("robotstates =", robotStates);
    const lastCol = robotStates[0].length - 1;
    for (let row = 0; row < robotStates.length; ++row) {
      let rowParity = 0;
      for (let col = 0; col < lastCol; ++col) {
        rowParity += robotStates[row][col];
      }
      let odd = oddParity ? 0 : 1;
      //console.log("parity calc row  parity", row, rowParity);
      robotStates[row][lastCol] = rowParity % 2 === odd ? 1 : 0;
    }
  }

  adjustColParity(robotStates, oddParity) {
    // adjust col parity
    const lastRow = robotStates.length - 1;
    for (let col = 0; col < robotStates[0].length; ++col) {
      let colParity = 0;
      for (let row = 0; row < lastRow; ++row) {
        colParity += robotStates[row][col];
      }
      let odd = oddParity ? 0 : 1;
      robotStates[lastRow][col] = colParity % 2 === odd ? 1 : 0;
    }
  }

  // called when user toggles parity switch
  changeParity(oddParity) {
    //console.log("user requested parity change oddParity = ", oddParity);
    const robotStates = [...this.state.robotStates];
    this.adjustParity(robotStates, oddParity);
    this.setState(robotStates);
  }

  changeSize(large) {
    const size = large ? AppConstants.GRIDSIZE : AppConstants.GRIDSIZE - 2;
    this.shuffle(size);
    this.setState({ size });
  }

  render() {
    // console.log("robot grid render");
    return (
      <div>
        <div>
          <button
            onClick={() => {
              this.shuffle(this.state.size);
            }}
          >
            Shuffle
          </button>
        </div>
        <div className={"robotgrid"}>{this.makeRobots()}</div>
      </div>
    );
  }
}
export default RobotGrid;
