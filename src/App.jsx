import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);
  useEffect(() => {
    let value = dice[0].value;
    let win = dice.every((die) => die.value === value && die.isHeld);
    if (win) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

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

  function rollDice() {
    setDice((prev) =>
      prev.map((die) => {
        let newDie = { ...die };
        // если кубик не отложен, перекинуть его (поменять значение)
        if (!newDie.isHeld)
          newDie.value = Math.floor(Math.random() * (7 - 1) + 1);
        return newDie;
      })
    );
  }

  function holdDice(id) {
    // console.log(id);
    setDice((prev) =>
      prev.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <div className="app">
      <main>
        <div className="dice-container">{diceElements}</div>
        <button className="roll" onClick={rollDice}>
          Roll
        </button>
      </main>
    </div>
  );
}

export default App;
