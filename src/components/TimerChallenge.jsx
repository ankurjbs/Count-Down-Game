import { useState } from "react";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  function handleStart() {
    setTimerStarted(true);
    setTimeout(() => {
      setTimeExpired(true);
    }, targetTime * 1000);
  }

  // to stop the challenge we have to create  one more function to handleStop but in this we have to use setTimeout from handleStart. so we will use ref hooks to tackle this issue.

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timeExpired && <p>You Lost</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={handleStart}>
          {timerStarted ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? "Time is running..." : "Timer is In Active"}
      </p>
    </section>
  );
}
