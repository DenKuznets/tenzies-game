import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const langEng = "ENG";
  const langRu = "RU";
  const [dice, setDice] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [localization, setLocalization] = useState(langEng);
  let newGameText = localization === langEng ? "New Game" : "Новая Игра";
  let rollBtnText = localization === langEng ? "Roll" : "Бросить";
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
    // если tenzies === true , значит игра окончена и нажатие кнопки должно начать новую игру. Для этого сбрасываем тензис на false и кидаем 10 новых кубиков
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else
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

  function switchLanguage() {
    setLocalization((prev) => (prev === langEng ? langRu : langEng));
  }

  return (
    <div className="app">
      <main>
        {tenzies && <Confetti />}
        <button onClick={switchLanguage} className="localization">
          {localization === langEng ? "RU" : "ENG"}
        </button>
        <h1>Tenzies</h1>
        <p>
          {localization === langEng
            ? "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
            : "Кидайте кубики, пока не выбросите одинаковые значения на всех. Клик по кубику замораживает его."}
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll" onClick={rollDice}>
          {tenzies ? newGameText : rollBtnText}
        </button>
      </main>
    </div>
  );
}

export default App;
