import React from "react";

function Dice(props) {
  return (
    <div className="dice">
      <img onClick={props.onClick} src={props.src} alt={props.alt}></img>
    </div>
  );
}

export default Dice;
