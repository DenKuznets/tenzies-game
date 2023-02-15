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
  const [tenzies, setTenzies] = useState(false);
  const [loc, setLoc] = useState(langEng);
  const { width, height } = useWindowSize();
  const [counter, setCounter] = useState(0);
  const [gameStart, setGameStart] = useState("");
  useEffect(() => {
    let value = dice[0].value;
    let win = dice.every((die) => die.value === value && die.isHeld);
    if (win) {
      setTenzies(true);
    }
  }, [dice]);

  useEffect(() => {
    let timeToWin = "";
    if (counter === 1) {
      setGameStart(Date.now());
      console.log("game started", Date.now());
    }
    if (tenzies === true) {
      timeToWin = Date.now() - gameStart;
      console.log("time to win: ", Math.ceil(timeToWin / 1000), "секунд");
    }
  }, [counter, tenzies]);

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
        {counter > 0 && <div className="dice-container">{diceElements}</div>}
        {text[loc].press}
        <button className="roll-btn" onClick={handleClick}>
          {tenzies ? text[loc].newGame : text[loc].rollBtn}{" "}
          {counter > 0 && !tenzies && counter}
        </button>
        {text[loc].toStart}
        <div className="score">
          {tenzies && <h5>{`${text[loc].score} ${counter}`}</h5>}
        </div>
      </main>
    </div>
  );
}

export default App;
