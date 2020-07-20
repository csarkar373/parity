import React, { Component } from "react";
import "../css/robot.css";
import RobotFront from "../img/androidFront.png";
import RobotBack from "../img/androidBack.png";
const ROBOTPICS = [RobotBack, RobotFront];
class Robot extends Component {
  constructor(props) {
    super(props);
    //console.log("orientation row col ", orientation, row, col);
    this.row = this.props.row;
    this.col = this.props.col;
  }
  flip = () => {
    this.props.onClick(this.row, this.col);
  };
  render() {
    this.row = this.props.row;
    this.col = this.props.col;
    //console.log("rendering robot image");
    let size = this.props.large ? 75 : 50;

    return (
      <button className={"robot"} onClick={this.flip}>
        <img
          src={ROBOTPICS[this.props.orientation]}
          alt={"img not found"}
          height={size}
          width={size}
        />
      </button>
    );
  }
}

export default Robot;
