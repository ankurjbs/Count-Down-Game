import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  // this timer is defined inside the component ,so it is component specific. So it will work totally independent for each instances of components
  const timer = useRef();
  const dialog = useRef();

  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timeExpired, setTimeExpired] = useState(false);
  // to calcluate remainig time and mange state we wil use following state not above
  const [timeRemaining,setTimeRemaining] = useState(targetTime*1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if(timeRemaining <= 0){
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }

  function handleResetTimer(){
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    /* timer.current = setTimeout(() => {
       setTimerStarted(true);
      // this showModel is built in js function of dialog element. Suppose more than one developer is working on it. and he changed to <dialog> to /<div> this will not work because this is the property of dialog element to show the modal. Show to solve this issue we use a custom funtion 'open' and intililze through callable function 'useImperativeHandle' hook in the result component
      // dialog.current.showModal();
      dialog.current.open(); // 'open' name is up to you
    }, targetTime * 1000); */

    // since we need remaining time so we will use following instead of the above.
    timer.current = setInterval(()=>{
      setTimeRemaining(prevTimeReamining => prevTimeReamining - 10);
    },10);
  }

  // to stop the challenge we have to create  one more function to handleStop but in this we have to use setTimeout from handleStart. so we will use ref hooks to tackle this issue.
  // suppose we set the variable timer= setTimeOut in handleStart and use it in clearTimeOut(timer). If we clicking two button simultaneously React will throw away first clicked timer variable and you will loss the game. So solution the ref
  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
    {/* we can not send ref directlly to the component */}
      <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} result={timerIsActive?'won':'loss'}/>
      <section className="challenge">
        <h2>{title}</h2>
        {timerIsActive && <p>You Lost</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer is In Active"}
        </p>
      </section>
    </>
  );
}
