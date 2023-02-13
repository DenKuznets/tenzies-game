import "./Die.css";

export default function Die(props) {
  let heldClass = props.isHeld ? "green-bg" : "";
  return (
    <div
      onClick={props.onClick}
      className={`die ${heldClass}`}
    >
      {props.value}
    </div>
  );
}
