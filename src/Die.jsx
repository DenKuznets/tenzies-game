import "./Die.css";

export default function Die(props) {
  let heldClass = props.isHeld ? "green-bg" : "";
  let dots = [];
  for (let i = 0; i < props.value; i++) {
    dots.push(<div key={i} className="dot"></div>);
  }
  return (
    <div onClick={props.onClick} className={`die ${heldClass}`}>
      <div className={`dots${props.value}`}>{dots}</div>
    </div>
  );
}
