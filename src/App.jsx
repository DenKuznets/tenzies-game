import { useState } from "react";
import "./App.css";
import Die from "./Die";

function App() {

  const [nums, setNums] = useState(() => allNewDice());

  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++){
      arr.push(Math.floor(Math.random() * (7 - 1) + 1));
    }
    return arr;
  }

  const dice = nums.map((num, index) => <Die key={index} value={num} />
  );
  
  function roll() {
    setNums(allNewDice());
  }

  return (
    <div className="app">
      <main>
        <div className="dice-container">
          {dice}          
        </div>
        <button className="roll" onClick={roll}>Roll</button>
      </main>
    </div>
  );
}

export default App;
