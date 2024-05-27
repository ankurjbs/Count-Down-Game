import { forwardRef } from "react";
// we can't use ref props directly to the function. if we want to pass one ref to another we used to special type of hooks forwardRef
const ResultModal =  forwardRef(function ResultModal({result,targetTime},ref){
    return <dialog ref={ref} className="result-modal">
        <h2>You {result}</h2>
        <p>The Target Timer was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>X seconds left.</strong></p>
        <form method="dialog">
            <button>Close</button>
        </form>
    </dialog>;
})

export default ResultModal;