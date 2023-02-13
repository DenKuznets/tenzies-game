import { useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(() => allNewDice());

  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.floor(Math.random() * (7 - 1) + 1),
        isHeld: false,
        id: nanoid(),
      });
    }
    return arr;
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      onClick={() => holdDice(die.id)}
      id={die.id}
    />
  ));

  function roll() {
    setDice(allNewDice());
  }

  function holdDice(diceId) {
    console.log(diceId);
  }

  return (
    <div className="app">
      <main>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll" onClick={roll}>Roll</button>
      </main>
    </div>
  );
}

export default App;
