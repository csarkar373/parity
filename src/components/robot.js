import React, { Component } from "react";
import "../css/robot.css";
import RobotFront from "../img/androidFront.png";
import RobotBack from "../img/androidBack.png";
const ROBOTPICS = [RobotBack, RobotFront];
class Robot extends Component {
  constructor(props) {
    super(props);
    const { orientation, row, col } = this.props;
    //console.log("orientation row col ", orientation, row, col);
    this.row = row;
    this.col = col;
  }
  flip = () => {
    this.props.onClick(this.row, this.col);
  };
  render() {
    //console.log("rendering robot image");
    return (
      <button className={"robot"} onClick={this.flip}>
        <img src={ROBOTPICS[this.props.orientation]} />
      </button>
    );
  }
}

export default Robot;
