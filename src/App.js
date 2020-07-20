import React, { Component } from "react";
import "./css/App.css";
import "./css/switch.css";
import RobotGrid from "./components/robotgrid";
import * as AppConstants from "./util/appconstants";
import Switch from "react-switch";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { oddParity: true };
    this.handleParity = this.handleParity.bind(this);
    this.myRobotGrid = React.createRef();
  }

  handleParity(oddParity) {
    console.log("odd parity changed to", oddParity, this.myRobotGrid);
    this.setState({ oddParity });
    this.myRobotGrid.current.changeParity(oddParity);
  }

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">{AppConstants.TITLE}</header>
          {" Click on a robot to flip it. "}
          <div className={"parityswitch"}>
            <Switch
              id={"parity"}
              uncheckedIcon={false}
              checkedIcon={false}
              height={15}
              width={30}
              onChange={this.handleParity}
              checked={this.state.oddParity}
            />
            {" Odd Parity "}
          </div>
        </div>

        <RobotGrid ref={this.myRobotGrid} oddParity={this.state.oddParity} />

        <p>
          <b>Directions:</b> Start by pressing the shuffle button. After the
          grid of andriod robots is displayed, turn your back and ask a
          classmate to click on one robot and then move the mouse away from the
          page. Turn around and try to figure out which robot was pressed.
        </p>
      </div>
    );
  }
}

export default App;
