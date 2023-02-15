import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use-window-size";
import { text } from "./local";

function App() {
  const langEng = "eng";
  const langRu = "rus";
  const [dice, setDice] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(true);
  const [loc, setLoc] = useState(langEng);
  const { width, height } = useWindowSize();
  const [counter, setCounter] = useState(10);
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
      setCounter(0);
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
    setLoc((prev) => (prev === langEng ? langRu : langEng));
  }

  function handleClick() {
    rollDice();
    setCounter((prev) => prev + 1);
    console.log(counter);
  }

  return (
    <div className="app">
      {tenzies && <Confetti width={width * 0.95} height={height} />}
      <main>
        <button onClick={switchLanguage} className="localization">
          {loc === langEng ? "RU" : "ENG"}
        </button>
        <h1>Tenzies</h1>
        <p>{text[loc].descr}</p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll" onClick={handleClick}>
          {tenzies ? text[loc].newGame : text[loc].rollBtn}{" "}
          {counter > 0 && !tenzies && counter}
        </button>
        <div className="score">
          {tenzies && (
            <h5>
              {`${text[loc].score} ${counter}`}
            </h5>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
