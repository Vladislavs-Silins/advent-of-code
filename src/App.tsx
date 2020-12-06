import React from "react";
import "./App.css";
import { Advent } from "./components/advent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Advent data={"Data"} />
      </header>
    </div>
  );
}

export default App;
