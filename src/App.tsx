import React from "react";
import "./App.css";
import BirthdayTracker from "../src/BirthdayTracker";
import Nav from "./nav";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="nav-container">
          <h1 className="gradient-text">Artic Events Tracker</h1>
          <div>
            <Nav />
          </div>
        </div>
        <BirthdayTracker />
      </header>
    </div>
  );
};

export default App;
