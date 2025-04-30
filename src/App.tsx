import React from 'react';
import './App.css';
import BirthdayTracker from '../src/BirthdayTracker';
import Nav from './nav';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className='nav-container'>
          <div><h1>Artic Events Tracker</h1></div>
         <div><Nav/></div> 
        </div>
        <BirthdayTracker />
      </header>
    </div>
  );
}

export default App;
