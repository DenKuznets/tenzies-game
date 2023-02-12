import "./App.css";
import Die from "./Die";

function App() {

  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++){
      arr.push(Math.floor(Math.random() * (7 - 1) + 1));
    }
    console.log(arr);
  }

  allNewDice()
  return (
    <div className="app">
      <main>
        <div className="dice-container">
          <Die value='1' />
          <Die value='1' />
          <Die value='1' />
          <Die value='1' />
          <Die value='1' />
          <Die value='1' />
          <Die value='1' />
          <Die value='1' />
          <Die value='1' />
          <Die value='1' />
          
        </div>
      </main>
    </div>
  );
}

export default App;
