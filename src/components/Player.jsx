import { useState, useRef } from "react";
export default function Player() {
  const playerName = useRef();
  const [changeName, setChangeName] = useState(null);

  function handleClick() {
    setChangeName(playerName.current.value);
    // after click on set name button we can reser the input box like this
    playerName.current.value = "";
    // but above idea is not good because we are maniplating the dom and set to empty
    //read and manipulate the all kinds of value is not idea behind the react to use hook ref.
  }

  return (
    <section id="player">
      <h2>Welcome {changeName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
