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
  const [rollCount, setRollCount] = useState(0);
  const [gameStart, setGameStart] = useState("");
  const [gameLength, setGameLength] = useState("");
  const tbt = "tenziesBestTime";
  const tbr = "tenziesBestRolls";

  useEffect(() => {
    let val = dice[0].value;
    let win = dice.every((die) => die.value === val && die.isHeld);
    if (win) {
      setTenzies(true);
      setGameLength(Math.ceil((Date.now() - gameStart) / 1000));
      let bestTime = localStorage.getItem(tbt);
      let bestRolls = localStorage.getItem(tbr);
      if (!bestTime || bestTime > gameLength)
        localStorage.setItem(tbt, gameLength);
      if (!bestRolls || bestRolls > rollCount)
        localStorage.setItem(tbr, rollCount);      
    }
  }, [dice, gameStart, gameLength, rollCount]);

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
      setRollCount(0);
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
    setRollCount((prev) => prev + 1);
    if (rollCount === 1) {
      setGameStart(Date.now());
    }
  }

  return (
    <div className="app">
      {tenzies && <Confetti width={width * 0.999} height={height} />}
      <main>
        <button onClick={switchLanguage} className="localization">
          {loc === langEng ? "RU" : "ENG"}
        </button>
        <h1>Tenzies</h1>
        <p>{text[loc].descr}</p>
        {rollCount > 0 && <div className="dice-container">{diceElements}</div>}
        {rollCount === 0 && text[loc].press}
        <button className="roll-btn" onClick={handleClick}>
          {tenzies ? text[loc].newGame : text[loc].rollBtn}{" "}
          {rollCount > 0 && !tenzies && rollCount}
        </button>
        {rollCount === 0 && text[loc].toStart}
        <div className="score">
          {tenzies && (
            <>
              <h5>{`${text[loc].victory} ${gameLength} ${text[loc].seconds} (${
                text[loc].best
              }: ${localStorage.getItem(tbt)})`}</h5>
              <h5>{`${text[loc].score} ${rollCount} (${
                text[loc].best
              }: ${localStorage.getItem(tbr)})`}</h5>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
