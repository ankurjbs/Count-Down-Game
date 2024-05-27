import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  // this timer is defined inside the component ,so it is component specific. So it will work totally independent for each instances of components
  const timer = useRef();
  const dialog = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  function handleStart() {
    
    setTimerStarted(true);
    timer.current = setTimeout(() => {
      // this showModel is built in js function of dialog element. Suppose more than one developer is working on it. and he changed to <dialog> to /<div> this will not work because this is the property of dialog element to show the modal. Show to solve this issue we use a custom funtion 'open' and intililze through callable function 'useImperativeHandle' hook in the result component
      // dialog.current.showModal();
      dialog.current.open(); // 'open' name is up to you
    }, targetTime * 1000);
  }

  // to stop the challenge we have to create  one more function to handleStop but in this we have to use setTimeout from handleStart. so we will use ref hooks to tackle this issue.
  // suppose we set the variable timer= setTimeOut in handleStart and use it in clearTimeOut(timer). If we clicking two button simultaneously React will throw away first clicked timer variable and you will loss the game. So solution the ref
  function handleStop() {
    clearTimeout(timer.current);
    setTimerStarted(false);
  }
  return (
    <>
    {/* we can not send ref directlly to the component */}
      <ResultModal ref={dialog} targetTime={targetTime} result="lost"/>
      <section className="challenge">
        <h2>{title}</h2>
        {timeExpired && <p>You Lost</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer is In Active"}
        </p>
      </section>
    </>
  );
}
