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
      dialog.current.showModal();
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
