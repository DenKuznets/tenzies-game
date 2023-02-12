import './Die.css'

export default function Dice(props) {
  return (
    <div className='dice'>{ props.value }</div>
  )
}