import React from 'react';
import './App.css';
import BirthdayTracker from '../src/BirthdayTracker';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Birthday Tracker</h1>
        <BirthdayTracker />
      </header>
    </div>
  );
}

export default App;
