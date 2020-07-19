import React from "react";
import "./css/App.css";
import RobotGrid from "./components/robotgrid";

function App() {
  return (
    <div className="App">
      <div>
        <header className="App-header">Parity Magic</header>
        <p>
          <b>Directions:</b> Start by pressing the shuffle button. After the
          grid of andriod robots is displayed, turn your back and ask a
          classmate to click on one robot and then move the mouse away from the
          page. Turn around and try to figure out which robot was pressed.
        </p>
        <h3>Click to flip one robot</h3>
      </div>
      <RobotGrid />
    </div>
  );
}

export default App;
