import React from "react";

function DiceImage(props) {
  return (
    <div className="dice">
      <img onClick={props.onClick} src={props.src} alt={props.alt}></img>
    </div>
  );
}

export default DiceImage;
