import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import { useState } from 'react';
import { makepuzzle, solvepuzzle } from "sudoku";
import Rule from './components/Rule';

function App() {





  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku Game</h1>
      </header>
      <Board/>
      <Rule/>
    </div>
  );
}

export default App;
